import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <Header />
      
      <main className="grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}