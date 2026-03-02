// frontend/src/components/Header.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import logo from '../assets/logo.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isDashboard = location.pathname === '/admin';

  const handleActionClick = (e) => {
    if (token && isDashboard) {
      e.preventDefault();
      logout();
      navigate('/');
    }
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    // We added a fixed height (h-28 md:h-32) to give the flex items a specific container to align within
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center max-w-7xl mx-auto px-6 md:px-10 h-28 md:h-32">
      
      {/* 1. Left Column: Logo */}
      <div className="flex-1 flex justify-start">
        <Link 
          to="/" 
          onClick={closeMenu}
          className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-95 z-50"
        >
          <img 
            src={logo} 
            alt="River Breeze Logo" 
            className="h-28 md:h-40 w-auto drop-shadow-xl -ml-6 md:-ml-4 -mt-2" 
          />
        </Link>
      </div>

      {/* 2. Center Column: Navigation Links (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-4 lg:gap-8">
        <Link to="/services" className={`whitespace-nowrap font-bold text-sm uppercase tracking-widest transition-colors ${isHome && !token ? 'text-white/90 hover:text-white' : 'text-slate-500 hover:text-teal-600'}`}>
          Services
        </Link>
        <Link to="/quote" className={`whitespace-nowrap font-bold text-sm uppercase tracking-widest transition-colors ${isHome && !token ? 'text-white/90 hover:text-white' : 'text-slate-500 hover:text-teal-600'}`}>
          Get a Quote
        </Link>
        <Link to="/returning" className={`whitespace-nowrap font-bold text-sm uppercase tracking-widest transition-colors ${isHome && !token ? 'text-white/90 hover:text-white' : 'text-slate-500 hover:text-teal-600'}`}>
          Returning Clients
        </Link>
      </div>
      
      {/* 3. Right Column: Action Button & Mobile Hamburger */}
      <div className="flex-1 flex justify-end items-center gap-4 z-50">
        <Link 
          to={token ? (isDashboard ? '/' : '/admin') : (isLogin ? '/' : '/login')}
          onClick={handleActionClick}
          className={`hidden sm:flex items-center px-4 py-2 text-[10px] md:text-xs font-bold border rounded-lg transition-all uppercase tracking-widest shadow-lg whitespace-nowrap
            ${isHome && !token
              ? 'text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20' 
              : 'text-slate-700 border-slate-300 bg-white hover:bg-slate-50'
            }`}
        >
          {token ? (isDashboard ? 'Logout' : 'Dashboard') : (isLogin ? 'Return Home' : 'Admin Login')}
        </Link>

        {/* Hamburger Toggle Button (Mobile Only) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors 
            ${isHome && !isMobileMenuOpen && !token ? 'text-white hover:bg-white/20' : 'text-slate-800 hover:bg-slate-100'}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 4. Mobile Dropdown Menu (Stays exactly the same) */}
      {isMobileMenuOpen && (
        <div className="absolute top-28 left-4 right-4 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col p-2">
            <Link to="/services" onClick={closeMenu} className="p-4 font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-50 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-lg">Services</Link>
            <Link to="/quote" onClick={closeMenu} className="p-4 font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-50 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-lg">Get a Quote</Link>
            <Link to="/returning" onClick={closeMenu} className="p-4 font-bold text-slate-700 uppercase tracking-widest text-sm border-b border-slate-50 hover:bg-teal-50 hover:text-teal-700 transition-colors rounded-lg">Returning Clients</Link>
            <Link to={token ? (isDashboard ? '/' : '/admin') : (isLogin ? '/' : '/login')} onClick={handleActionClick} className="p-4 font-bold text-teal-600 uppercase tracking-widest text-sm hover:bg-teal-50 transition-colors rounded-lg">
              {token ? (isDashboard ? 'Logout' : 'Dashboard') : (isLogin ? 'Return Home' : 'Admin Login')}
            </Link>
          </div>
        </div>
      )}

    </nav>
  );
}