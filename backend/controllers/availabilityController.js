// backend/controllers/availabilityController.js
import Shift from '../models/Shift.js';
import Appointment from '../models/Appointment.js';

// --- HELPER FUNCTIONS FOR TIME MATH ---
const toMins = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};
const toTimeStr = (mins) => {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

// @desc    Calculate available time slots based on Shifts, Appointments, and Gap Rules
// @route   GET /api/availability
// @query   {string} date - The requested date in YYYY-MM-DD format
// @query   {number} serviceHours - The length of the requested service in hours
// @access  Public (Used by the Booking Calendar engine to show real-time availability)
export const getAvailability = async (req, res) => {
  try {
    const { date, serviceHours } = req.query; 
    const requestedHours = parseFloat(serviceHours) || 2.0; //2.0 hours default if not provided in request to prevent Nan errors
    const requestedMins = requestedHours * 60;

    const startDate = date ? new Date(date) : new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);

    const shifts = await Shift.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 });
    const appointments = await Appointment.find({ 
       date: { $gte: startDate, $lte: endDate },
       status: { $in: ['Pending', 'Confirmed'] } // Canceled jobs do not block time
    });

    const availableSlots = [];

    // --- THE SMART ANCHOR ENGINE (v2.0) ---
    shifts.forEach(shift => {
      const shiftDateStr = shift.date.toISOString().split('T')[0];
      const dayAppointments = appointments.filter(a => a.date.toISOString().split('T')[0] === shiftDateStr);

      const shiftStartMins = toMins(shift.startTime);
      const shiftEndMins = toMins(shift.endTime);

      // 1. Inflate existing appointments with a mandatory 30-min travel buffer
      const bookedRanges = dayAppointments.map(a => ({
          start: toMins(a.startTime),
          end: toMins(a.endTime) + 30 
      })).sort((a, b) => a.start - b.start);

      // 2. Iterate through the shift in 30-minute intervals
      for (let currentStart = shiftStartMins; currentStart + requestedMins <= shiftEndMins; currentStart += 30) {
          const currentEnd = currentStart + requestedMins;

          // Check for direct overlap with any existing bookings
          const hasOverlap = bookedRanges.some(b => 
              (currentStart >= b.start && currentStart < b.end) || 
              (currentEnd > b.start && currentEnd <= b.end) ||
              (currentStart <= b.start && currentEnd >= b.end)
          );

          if (hasOverlap) continue;

          // 3. THE BOUNDARY GRACE PERIOD & GAP VALIDATION
          let prevEnd = shiftStartMins;
          for (const b of bookedRanges) {
              if (b.end <= currentStart) prevEnd = Math.max(prevEnd, b.end);
          }
          const gapBefore = currentStart - prevEnd;
          const isStartBoundary = (prevEnd === shiftStartMins);

          let nextStart = shiftEndMins;
          for (const b of bookedRanges) {
              if (b.start >= currentEnd) nextStart = Math.min(nextStart, b.start);
          }
          const gapAfter = nextStart - currentEnd;
          const isEndBoundary = (nextStart === shiftEndMins);

          // THE ULTIMATE RULE:
          // If a gap touches the start or end of the day, it is always valid (sleeping in / going home early).
          // If a gap is trapped between two jobs, it MUST be 0 (flush) or >= 120 (room for an Express Clean).
          const isValidBefore = isStartBoundary ? true : (gapBefore === 0 || gapBefore >= 120);
          const isValidAfter = isEndBoundary ? true : (gapAfter === 0 || gapAfter >= 120);

          if (isValidBefore && isValidAfter) {
              // Quality Score ensures we still suggest the most efficient, tightest-packed schedules first!
              let qualityScore = 1; // Edge case (leaves awkward gap at start/end of day)
              if (gapBefore === 0 || gapAfter === 0) qualityScore = 2; // Anchored to at least one job
              if (gapBefore === 0 && gapAfter === 0) qualityScore = 3; // Perfect flush fit between two jobs

              availableSlots.push({
                  _id: `${shift._id}-${currentStart}`,
                  date: shift.date,
                  startTime: toTimeStr(currentStart),
                  endTime: toTimeStr(currentEnd),
                  shiftId: shift._id,
                  qualityScore
              });
          }
      }
    });

    res.status(200).json(availableSlots);

  } catch (error) {
    console.error("Availability Engine Error:", error);
    res.status(500).json({ message: "Error calculating availability" });
  }
};

// @desc    Get raw shifts for the Admin Dashboard (Today & Future)
// @route   GET /api/availability/shifts
// @access  Private/Admin
// @return  {Array} Shifts flagged with 'isLocked: true' if appointments exist on that date
export const getShifts = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const shifts = await Shift.find({ date: { $gte: today } }).lean().sort({ date: 1 });
    const activeAppointments = await Appointment.find({
      date: { $gte: today },
      status: { $in: ['Pending', 'Confirmed'] }
    }).lean();

    const lockedShifts = shifts.map(shift => {
      const shiftDateStr = shift.date.toISOString().split('T')[0];
      const hasOverlap = activeAppointments.some(appt => {
        const apptDateStr = appt.date.toISOString().split('T')[0];
        return apptDateStr === shiftDateStr; 
      });

      return { ...shift, isLocked: hasOverlap };
    });

    res.status(200).json(lockedShifts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shifts' });
  }
};

// @desc    Add a new working shift (Includes "Shift Stitcher" Interval Merge Logic)
// @route   POST /api/availability
// @body    {string} date, {string} startTime, {string} endTime
// @access  Private/Admin
// @note    If a new shift is added that touches or overlaps an existing shift on the same day, 
//          the database automatically merges them into a single contiguous block.
export const addShift = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    
    // Isolate the exact calendar day
    const shiftDate = new Date(date);
    shiftDate.setHours(0,0,0,0);
    const nextDay = new Date(shiftDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // 1. Fetch all existing shifts for this specific date
    const existingShifts = await Shift.find({ date: { $gte: shiftDate, $lt: nextDay } });

    // 2. Prepare intervals for merging (e.g., [[420, 720], [720, 750]])
    let intervals = existingShifts.map(s => [toMins(s.startTime), toMins(s.endTime)]);
    intervals.push([toMins(startTime), toMins(endTime)]); // Add the new requested time

    // 3. Sort intervals chronologically by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // 4. Execute the Interval Merge algorithm
    const merged = [];
    let current = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= current[1]) { 
        // Overlapping or adjacent blocks: Merge them by extending the end time
        current[1] = Math.max(current[1], intervals[i][1]);
      } else {
        // Distinct block: Push the current and start tracking the next
        merged.push(current);
        current = intervals[i];
      }
    }
    merged.push(current);

    // 5. Clean up old fragments and save the unified contiguous shifts
    await Shift.deleteMany({ date: { $gte: shiftDate, $lt: nextDay } });

    const savedShifts = [];
    for (const m of merged) {
      const s = await Shift.create({
        date,
        startTime: toTimeStr(m[0]),
        endTime: toTimeStr(m[1])
      });
      savedShifts.push(s);
    }

    res.status(201).json(savedShifts);
  } catch (error) {
    console.error("Shift Stitcher Error:", error);
    res.status(500).json({ message: 'Error adding shift' });
  }
};

// @desc    Delete a working shift by ID
// @route   DELETE /api/availability/:id
// @access  Private/Admin
export const deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);
    if (!shift) return res.status(404).json({ message: 'Shift not found' });

    const shiftDate = new Date(shift.date);
    shiftDate.setHours(0,0,0,0);
    const nextDay = new Date(shiftDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const overlappingAppts = await Appointment.find({
      date: { $gte: shiftDate, $lt: nextDay },
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (overlappingAppts.length > 0) {
      return res.status(400).json({ message: 'Cannot delete: You have active appointments on this day. Please cancel them first.' });
    }

    await Shift.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shift' });
  }
};