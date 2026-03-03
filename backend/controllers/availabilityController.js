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
    const requestedHours = parseFloat(serviceHours) || 2.0;
    
    // --- NEW FOOTPRINT RULES ---
    const jobMins = requestedHours * 60;
    const standardFootprint = jobMins + 15; // Pass 1: Job + 15m travel buffer
    const squeezeFootprint = jobMins;       // Pass 2: Exact job time (cram mode)

    const startDate = date ? new Date(date) : new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 30);

    const shifts = await Shift.find({ date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 });
    const appointments = await Appointment.find({ 
       date: { $gte: startDate, $lte: endDate },
       status: { $in: ['Pending', 'Confirmed'] } 
    });

    const availableSlots = [];

    shifts.forEach(shift => {
      const shiftDateStr = shift.date.toISOString().split('T')[0];
      const dayAppointments = appointments.filter(a => a.date.toISOString().split('T')[0] === shiftDateStr);

      const shiftStartMins = toMins(shift.startTime);
      const shiftEndMins = toMins(shift.endTime);
      
      // DB times now represent the true footprint, no need to add virtual buffers here
      const bookedRanges = dayAppointments.map(a => ({
          start: toMins(a.startTime),
          end: toMins(a.endTime) 
      })).sort((a, b) => a.start - b.start);

      // --- GENERATOR FUNCTION ---
      const getValidSlotsForFootprint = (footprint) => {
        let candidates = new Set(); // Using a Set automatically prevents duplicate times

        if (bookedRanges.length === 0) {
            // RULE 3: Empty day. Start at shift start, step forward by 2 hours (120 mins)
            for (let c = shiftStartMins; c + footprint <= shiftEndMins; c += 120) {
                candidates.add(c);
            }
        } else {
            // RULES 4 & 5: Anchor flush to existing appointments and step outward
            bookedRanges.forEach(b => {
                // Anchor Backward (Flush to the start of an existing job)
                let backAnchor = b.start - footprint;
                while (backAnchor >= shiftStartMins) {
                    candidates.add(backAnchor);
                    backAnchor -= 120; // Step backwards by 2hrs
                }

                // Anchor Forward (Flush to the end of an existing job)
                let fwdAnchor = b.end;
                while (fwdAnchor + footprint <= shiftEndMins) {
                    candidates.add(fwdAnchor);
                    fwdAnchor += 120; // Step forwards by 2hrs
                }
            });
        }

        // Filter out any candidates that overlap with existing bookings
        const validMins = Array.from(candidates).filter(cStart => {
            const cEnd = cStart + footprint;
            if (cStart < shiftStartMins || cEnd > shiftEndMins) return false;

            const hasOverlap = bookedRanges.some(b => 
                (cStart >= b.start && cStart < b.end) || 
                (cEnd > b.start && cEnd <= b.end) ||
                (cStart <= b.start && cEnd >= b.end)
            );
            return !hasOverlap;
        });

        return validMins.sort((a, b) => a - b);
      };

      // --- PASS 1: STANDARD CHECK ---
      let validStarts = getValidSlotsForFootprint(standardFootprint);
      let usedFootprint = standardFootprint;
      let isSqueezed = false;

      // --- PASS 2: SQUEEZE CHECK (RULE 7) ---
      if (validStarts.length === 0) {
          validStarts = getValidSlotsForFootprint(squeezeFootprint);
          if (validStarts.length > 0) {
              usedFootprint = squeezeFootprint;
              isSqueezed = true; // Flagged so we can optionally show it in the UI later
          }
      }

      // Map mathematical results back to UI objects
      validStarts.forEach(startMins => {
          const endMins = startMins + usedFootprint;
          
          // Quality score boosts perfectly flushed fits to the top of the UI
          let qualityScore = isSqueezed ? 1 : 2; 
          const isFlush = bookedRanges.some(b => b.start === endMins || b.end === startMins);
          if (isFlush) qualityScore = 3;

          availableSlots.push({
              _id: `${shift._id}-${startMins}`,
              date: shift.date,
              startTime: toTimeStr(startMins),
              endTime: toTimeStr(endMins),
              shiftId: shift._id,
              qualityScore,
              isSqueezed
          });
      });
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