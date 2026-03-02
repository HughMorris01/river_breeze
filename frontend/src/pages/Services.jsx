// frontend/src/pages/Services.jsx
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div className="pt-32 md:pt-48 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-6">
            Detailing Packages tailored for <br className="hidden md:block" />
            <span className="text-teal-500">River Living.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            Whether you need a rapid refresh before guests arrive or a massive top-to-bottom seasonal reset, we have a specialized protocol for your property.
          </p>
        </div>

        {/* The Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          
          {/* Package 1: Express */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden">
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Express Touch-Up</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
              A rapid 1-hour surface wipe down and quick tidy. Perfect for last-minute guests or a quick refresh between your deep cleans.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> High-traffic surface sanitization</li>
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Quick vacuum of main living areas</li>
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Trash removal and light tidying</li>
            </ul>
            <div className="pt-6 border-t border-slate-100 mt-auto">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Fixed Rate</p>
              <p className="text-3xl font-black text-teal-600">$59.99</p>
            </div>
          </div>

          {/* Package 2: Standard (Highlighted) */}
          <div className="bg-slate-800 rounded-3xl p-8 shadow-2xl hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden transform md:scale-105 z-10">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500"></div>
            <div className="w-14 h-14 bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <div className="absolute top-6 right-6 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full">
              Most Popular
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Standard Clean</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
              Perfect for routine upkeep and pristine maintenance. Includes deep dusting, vacuuming, mopping, and full surface sanitization.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-slate-300 font-medium"><span className="text-teal-400 mr-2">✓</span> Deep dusting of all accessible surfaces</li>
              <li className="flex items-start text-sm text-slate-300 font-medium"><span className="text-teal-400 mr-2">✓</span> Full kitchen & bathroom sanitization</li>
              <li className="flex items-start text-sm text-slate-300 font-medium"><span className="text-teal-400 mr-2">✓</span> Comprehensive floor care (vacuum & mop)</li>
              <li className="flex items-start text-sm text-slate-300 font-medium"><span className="text-teal-400 mr-2">✓</span> Custom estimated by property size</li>
            </ul>
            <div className="pt-6 border-t border-slate-700 mt-auto">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Starts At</p>
              <p className="text-3xl font-black text-white">$85.00</p>
            </div>
          </div>

          {/* Package 3: Deep Reset */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 flex flex-col relative overflow-hidden">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-2xl">🌊</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">The Spring Reset</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
              Massive, top-to-bottom clean for a fresh start. Includes intense scrubbing, heavy buildup removal, and detailed attention to neglected areas.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Baseboard and molding detailing</li>
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Intense shower & grout scrubbing</li>
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Hard-to-reach cobweb & dust removal</li>
              <li className="flex items-start text-sm text-slate-600 font-medium"><span className="text-teal-500 mr-2">✓</span> Inside appliance cleaning available</li>
            </ul>
            <div className="pt-6 border-t border-slate-100 mt-auto">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Starts At</p>
              <p className="text-3xl font-black text-teal-600">$140.00</p>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center bg-teal-50 rounded-3xl p-10 md:p-16 border border-teal-100 max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-4">Ready to see your exact price?</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Use our smart calculator to get an instant, custom estimate based on your exact square footage, bedrooms, and add-ons.
          </p>
          <Link 
            to="/quote" 
            className="inline-block px-10 py-5 bg-teal-600 hover:bg-teal-700 text-white font-black text-lg rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Get My Instant Quote →
          </Link>
        </div>

      </div>
    </div>
  );
}