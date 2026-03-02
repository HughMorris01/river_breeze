import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import QuoteCalculator from './pages/QuoteCalculator';
import NewClientBooking from './pages/NewClientBooking';
import ReturningClientConfirm from './pages/ReturningClientConfirm';
import ReturningClientBooking from './pages/ReturningClientBooking';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  const { token } = useAuthStore();

  useEffect(() => {
    let timeoutId;
    const wakeUpServer = async () => {
      try {
        timeoutId = setTimeout(() => {
          toast.loading("Waking up secure booking server...", { id: 'cold-start', duration: 8000 });
        }, 1500);

        const res = await fetch('/api/availability');
        
        clearTimeout(timeoutId);
        toast.dismiss('cold-start');

        if (res.ok) {
           console.log("Server is awake and ready.");
        }
      } catch (error) {
        console.error("Wake up ping failed:", error);
        clearTimeout(timeoutId);
        toast.dismiss('cold-start');
      }
    };

    wakeUpServer();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900">
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
        
        <Header />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quote" element={<QuoteCalculator />} />
            <Route path="/booking" element={<NewClientBooking />} />
            <Route path="/returning" element={<ReturningClientConfirm />} />
            <Route path="/returning/confirm" element={<ReturningClientBooking />} />
            
            <Route path="/login" element={
              token ? <Navigate to="/admin" /> : <LoginPage />
            } />

            <Route path="/admin" element={
              token ? <AdminDashboard /> : <Navigate to="/login" />
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

       <Footer />
      </div>
    </Router>
  );
}