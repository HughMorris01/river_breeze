// frontend/src/pages/Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  // Track which card is currently being hovered. Defaults to the center card.
  const [activeCard, setActiveCard] = useState('standard');

  return (
    <div className="pt-32 md:pt-48 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-6">
            Detailing Packages tailored for <br className="hidden md:block" />
            <span className="text-teal-500">River Living.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            Whether you need a rapid refresh before guests arrive or a massive top-to-bottom seasonal reset, we have a specialized protocol for your property.
          </p>
        </div>

        {/* The Packages Grid - Snaps back to standard when mouse leaves the whole area */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto"
          onMouseLeave={() => setActiveCard('standard')}
        >
          
          {/* PACKAGE 1: EXPRESS */}
          <div 
            onMouseEnter={() => setActiveCard('express')}
            className={`group relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-500 border
              ${activeCard === 'express' 
                ? 'bg-slate-800 border-transparent md:scale-105 z-20 shadow-2xl md:-translate-y-2' 
                : 'bg-white border-slate-100 md:scale-100 z-0 shadow-xl shadow-slate-200/50'
              }
            `}
          >
            {/* Background Image Reveal */}
            <div 
              className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out
                ${activeCard === 'express' ? '[clip-path:circle(150%_at_50%_50%)]' : '[clip-path:circle(0%_at_50%_50%)]'}
              `}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-slate-900/85"></div>
            </div>

            {/* Content Layer */}
            <div className={`relative z-10 flex flex-col h-full transition-colors duration-500 ${activeCard === 'express' ? 'text-white' : 'text-slate-800'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 backdrop-blur-sm ${activeCard === 'express' ? 'bg-teal-50/10' : 'bg-teal-50'}`}>
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-2xl font-black mb-3">Express Touch-Up</h3>
              <p className={`text-sm leading-relaxed mb-8 grow transition-colors duration-500 ${activeCard === 'express' ? 'text-slate-300' : 'text-slate-500'}`}>
                A rapid 1-hour surface wipe down and quick tidy. Perfect for last-minute guests or a quick refresh between your deep cleans.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'express' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> High-traffic surface sanitization</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'express' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Quick vacuum of main living areas</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'express' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Trash removal and light tidying</li>
              </ul>
              <div className={`pt-6 border-t mt-auto transition-colors duration-500 ${activeCard === 'express' ? 'border-white/20' : 'border-slate-100'}`}>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Fixed Rate</p>
                <p className={`text-3xl font-black transition-colors duration-500 ${activeCard === 'express' ? 'text-teal-400' : 'text-teal-600'}`}>$59.99</p>
              </div>
            </div>
          </div>

          {/* PACKAGE 2: STANDARD */}
          <div 
            onMouseEnter={() => setActiveCard('standard')}
            className={`group relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-500 border
              ${activeCard === 'standard' 
                ? 'bg-slate-800 border-transparent md:scale-105 z-20 shadow-2xl md:-translate-y-2' 
                : 'bg-white border-slate-100 md:scale-100 z-0 shadow-xl shadow-slate-200/50'
              }
            `}
          >
            {/* Background Image Reveal */}
            <div 
              className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out
                ${activeCard === 'standard' ? '[clip-path:circle(150%_at_50%_50%)]' : '[clip-path:circle(0%_at_50%_50%)]'}
              `}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-slate-900/85"></div>
            </div>
            
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 z-10"></div>
            
            <div className={`relative z-10 flex flex-col h-full transition-colors duration-500 ${activeCard === 'standard' ? 'text-white' : 'text-slate-800'}`}>
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-full">
                Most Popular
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 backdrop-blur-sm ${activeCard === 'standard' ? 'bg-white/10' : 'bg-teal-50'}`}>
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-black mb-3">Standard Clean</h3>
              <p className={`text-sm leading-relaxed mb-8 flex-grow transition-colors duration-500 ${activeCard === 'standard' ? 'text-slate-300' : 'text-slate-500'}`}>
                Perfect for routine upkeep and pristine maintenance. Includes deep dusting, vacuuming, mopping, and full surface sanitization.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'standard' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Deep dusting of all surfaces</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'standard' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Full kitchen & bathroom detail</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'standard' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Comprehensive floor care</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'standard' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Custom estimated by property size</li>
              </ul>
              <div className={`pt-6 border-t mt-auto transition-colors duration-500 ${activeCard === 'standard' ? 'border-white/20' : 'border-slate-100'}`}>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Starts At</p>
                <p className={`text-3xl font-black transition-colors duration-500 ${activeCard === 'standard' ? 'text-white' : 'text-teal-600'}`}>$85.00</p>
              </div>
            </div>
          </div>

          {/* PACKAGE 3: DEEP RESET */}
          <div 
            onMouseEnter={() => setActiveCard('reset')}
            className={`group relative rounded-3xl p-8 flex flex-col overflow-hidden transition-all duration-500 border
              ${activeCard === 'reset' 
                ? 'bg-slate-800 border-transparent md:scale-105 z-20 shadow-2xl md:-translate-y-2' 
                : 'bg-white border-slate-100 md:scale-100 z-0 shadow-xl shadow-slate-200/50'
              }
            `}
          >
            {/* Background Image Reveal */}
            <div 
              className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-out
                ${activeCard === 'reset' ? '[clip-path:circle(150%_at_50%_50%)]' : '[clip-path:circle(0%_at_50%_50%)]'}
              `}
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800&auto=format&fit=crop')" }}
            >
              <div className="absolute inset-0 bg-slate-900/85"></div>
            </div>

            {/* Content Layer */}
            <div className={`relative z-10 flex flex-col h-full transition-colors duration-500 ${activeCard === 'reset' ? 'text-white' : 'text-slate-800'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 backdrop-blur-sm ${activeCard === 'reset' ? 'bg-blue-50/10' : 'bg-blue-50'}`}>
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-2xl font-black mb-3">The Spring Reset</h3>
              <p className={`text-sm leading-relaxed mb-8 grow transition-colors duration-500 ${activeCard === 'reset' ? 'text-slate-300' : 'text-slate-500'}`}>
                Massive, top-to-bottom clean for a fresh start. Includes intense scrubbing, heavy buildup removal, and detailed attention to neglected areas.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'reset' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Baseboard and molding detailing</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'reset' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Intense shower & grout scrubbing</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'reset' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Hard-to-reach cobweb removal</li>
                <li className="flex items-start text-sm font-medium"><span className={`mr-2 transition-colors duration-500 ${activeCard === 'reset' ? 'text-teal-400' : 'text-teal-500'}`}>✓</span> Inside appliance cleaning available</li>
              </ul>
              <div className={`pt-6 border-t mt-auto transition-colors duration-500 ${activeCard === 'reset' ? 'border-white/20' : 'border-slate-100'}`}>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Starts At</p>
                <p className={`text-3xl font-black transition-colors duration-500 ${activeCard === 'reset' ? 'text-teal-400' : 'text-teal-600'}`}>$140.00</p>
              </div>
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