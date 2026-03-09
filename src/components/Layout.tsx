import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Calendar, Users, Info, Utensils, Phone, ShieldCheck, Clock } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface LayoutProps {
  children: React.ReactNode;
  resort: ResortData;
}

export default function Layout({ children, resort }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showForm, setShowForm } = useForm();
  const [formStep, setFormStep] = useState(1);
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    guests: '2 Adults',
    roomType: '',
    mealPlan: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thank you! Your reservation request for a quotation has been received. A luxury specialist will contact you shortly.");
    setShowForm(false);
    setFormStep(1);
  };

  const navLinks = [
    { name: 'Experiences', path: '/experiences' },
    { name: 'Offers', path: '/offers' },
    { name: 'Dining', path: '/dining' },
    { name: 'Rooms', path: '/rooms' },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`hover:text-stone-900 transition-colors ${location.pathname === link.path ? 'text-stone-900' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <Link to="/" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex flex-col items-center">
            <span className="text-xl md:text-2xl font-bold tracking-tighter text-stone-900">TRIPMALDIVES</span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium -mt-1">A Maldives Serenity Travels Experience</span>
          </Link>
          
          <div className="flex items-center gap-4 md:gap-6 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">
            <button className="hidden sm:flex items-center gap-2 hover:text-stone-900 transition-colors"><X size={14} className="rotate-45" /> Search</button>
            <button className="hidden sm:block hover:text-stone-900 transition-colors">$ USD</button>
            <button className="hidden sm:block hover:text-stone-900 transition-colors">EN</button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-stone-100 rounded-full text-stone-900 hover:bg-stone-200 transition-colors"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-stone-100 shadow-xl animate-in slide-in-from-top-4 duration-300 z-40">
            <nav className="flex flex-col p-8 gap-6 text-sm uppercase tracking-[0.2em] font-bold text-stone-600">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`hover:text-stone-900 transition-colors ${location.pathname === link.path ? 'text-stone-900' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-stone-100 flex flex-col gap-4">
                <button className="flex items-center gap-2 text-stone-400"><X size={14} className="rotate-45" /> Search</button>
                <div className="flex gap-8">
                  <button className="text-stone-400">$ USD</button>
                  <button className="text-stone-400">EN</button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">TripMaldives Performance Brand</p>
          <p className="text-xs text-stone-500 max-w-2xl mx-auto leading-relaxed">
            TripMaldives is a performance brand of Maldives Serenity Travels. All bookings, payments, and travel arrangements are legally processed and managed by Maldives Serenity Travels (License No: MST-2024-ADDU), Addu City, Maldives.
          </p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 bg-white/80 backdrop-blur-lg border-t border-stone-200">
        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold shadow-xl shadow-stone-900/20"
        >
          Request Quotation
        </button>
      </div>

      {/* Multi-Step Lead Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300">
          <div 
            onClick={() => setShowForm(false)}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300"
          />
          <div 
            className="relative bg-white w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
          >
            <div className="bg-stone-900 p-8 text-white">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-serif mb-2">Request Quotation</h3>
              <p className="text-stone-400 text-sm">Step {formStep} of 3: {formStep === 1 ? 'Stay Details' : formStep === 2 ? 'Guest Info' : 'Contact Details'}</p>
              
              <div className="mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500" 
                  style={{ width: `${(formStep / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-8">
              {formStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Preferred Dates</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="e.g. Oct 2024" 
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                        value={formData.dates}
                        onChange={e => setFormData({...formData, dates: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                      <select 
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
                        value={formData.guests}
                        onChange={e => setFormData({...formData, guests: e.target.value})}
                      >
                        <option>2 Adults</option>
                        <option>2 Adults + 1 Child</option>
                        <option>2 Adults + 2 Children</option>
                        <option>4+ Adults</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Preferred Villa Category</label>
                    <div className="relative">
                      <Info className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                      <select 
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
                        value={formData.roomType}
                        onChange={e => setFormData({...formData, roomType: e.target.value})}
                        required
                      >
                        <option value="">Select a Villa</option>
                        {resort.room_types.map(room => (
                          <option key={room.id} value={room.name}>{room.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Preferred Meal Plan</label>
                    <div className="relative">
                      <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                      <select 
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
                        value={formData.mealPlan}
                        onChange={e => setFormData({...formData, mealPlan: e.target.value})}
                        required
                      >
                        <option value="">Select a Meal Plan</option>
                        {resort.meal_plans.map(plan => (
                          <option key={plan} value={plan}>{plan.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (formData.dates && formData.roomType && formData.mealPlan) {
                        setFormStep(2);
                      } else {
                        alert("Please fill in all fields.");
                      }
                    }}
                    className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="flex-1 border border-stone-200 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="flex-[2] bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="flex-1 border border-stone-200 py-4 rounded-2xl font-bold hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-stone-900 text-white py-4 rounded-2xl font-bold hover:bg-stone-800 transition-colors shadow-xl shadow-stone-900/20"
                    >
                      Request Private Quote
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 text-center uppercase tracking-widest">
                    By clicking, you agree to be contacted by a Serenity Travels specialist.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Global CTA Trigger - can be used from any page via context if needed, but for now we'll just use the sticky widget in pages */}
    </div>
  );
}
