// frontend/src/pages/BookingConfirmation.jsx
import { useLocation, Link, Navigate } from 'react-router-dom';

// Standard 12-hour formatter
const formatAMPM = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  let hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; 
  return `${hour}:${m} ${ampm}`;
};

export default function BookingConfirmation() {
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  // Defensive programming: If someone manually types /confirmation into the URL, kick them home
  if (!bookingDetails) {
    return <Navigate to="/" />;
  }

  const { clientName, address, serviceType, date, startTime, endTime, price, isNewClient } = bookingDetails;

  // FIX: Safely extract just the 'YYYY-MM-DD' part before appending noon UTC
  const dateStr = date.split('T')[0];
  const displayDate = new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="pt-32 md:pt-48 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Success Header */}
        <div className="px-6 py-10 text-center bg-teal-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <svg className="w-10 h-10 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Booking Confirmed!</h2>
            <p className="text-teal-100 font-medium text-lg max-w-lg">
              Thank you, {clientName.split(' ')[0]}. Kate has received your request and your spot is locked in.
            </p>
          </div>
        </div>

        {/* Digital Receipt */}
        <div className="p-8 md:p-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-100 pb-2">
            Appointment Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">When</p>
              <p className="text-lg font-bold text-slate-800">{displayDate}</p>
              {/* APPLIED AM/PM FIX */}
              <p className="text-teal-600 font-bold mt-1">{formatAMPM(startTime)} - {formatAMPM(endTime)}</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Where</p>
              <p className="text-lg font-bold text-slate-800">{address}</p>
            </div>
          </div>

          <div className="bg-slate-800 text-white rounded-xl p-6 shadow-inner">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm">Service Package:</span>
              <span className="font-bold text-right">{serviceType}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm">Total Estimate:</span>
              <span className="font-bold text-right">${Number.isInteger(price) ? price : price.toFixed(2)}</span>
            </div>
            
            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
              <span className="text-slate-300 text-sm">Amount Paid Today:</span>
              <span className="font-black text-xl text-teal-400">{isNewClient ? '$20.00' : '$0.00'}</span>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-6">
              A confirmation email has been sent to your inbox. If you need to make changes, please contact Kate directly.
            </p>
            <Link 
              to="/"
              className="inline-block px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors shadow-sm"
            >
              Return to Homepage
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}