import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Calendar, Users, Info, Utensils, Phone, ShieldCheck, Clock, Search, MessageCircle, ShoppingBag } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';
import { useInquiry } from '../context/InquiryContext';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: React.ReactNode;
  resort: ResortData;
}

export default function Layout({ children, resort }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return !localStorage.getItem('cookieConsent');
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { showForm, setShowForm } = useForm();
  const { items, setIsBucketOpen } = useInquiry();
  const [formStep, setFormStep] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieBanner(false);
  };

  const navLinks = [
    { name: 'Offers', path: '/offers' },
    { name: 'Dining', path: '/dining' },
    { name: 'Rooms', path: '/rooms' },
    { 
      name: 'Activities', 
      path: '#',
      subLinks: [
        { name: 'Excursions', path: '/activities/excursions' },
        { name: 'Watersports', path: '/activities/watersports' },
        { name: 'Diving', path: '/activities/diving' },
        { name: 'Sports & Recreation', path: '/activities/sports-recreation' },
        { name: 'Secret Garden', path: '/activities/secret-garden' },
        { name: 'Zuzuu Kids Club', path: '/activities/zuzuu-kids-club' },
        { name: 'Exotic Animals', path: '/activities/exotic-animals' },
      ]
    },
    { name: 'All Inclusive', path: '/all-inclusive' },
    { name: 'AySpa', path: '/ayspa' },
    { name: 'Weddings', path: '/weddings' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 w-full z-50 bg-white border-b border-stone-100">
        <div className="w-full px-6 md:px-12 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-8 xl:gap-12">
            <Link to="/" className="flex flex-col items-center group shrink-0">
              <svg 
                version="1.0" 
                xmlns="http://www.w3.org/2000/svg"
                width="50px" 
                height="34px" 
                viewBox="0 0 600.000000 395.000000"
                preserveAspectRatio="xMidYMid meet"
                className="text-stone-900 group-hover:text-emerald-600 transition-colors"
              >
                <g transform="translate(0.000000,395.000000) scale(0.050000,-0.050000)" fill="currentColor" stroke="none">
                  <path d="M3950 6733 c-197 -90 -362 -406 -630 -1216 -252 -756 -412 -1048 -770 -1397 -337 -329 -378 -480 -128 -480 440 0 829 550 1257 1780 245 704 359 879 466 715 47 -73 134 -554 136 -751 3 -387 187 -896 367 -1012 266 -172 570 -21 940 467 329 433 390 413 474 -156 183 -1234 446 -1388 1344 -787 379 255 446 254 776 -7 357 -282 524 -316 1067 -219 358 64 489 64 667 0 200 -72 283 -48 178 52 -149 141 -381 178 -806 128 -529 -62 -637 -36 -978 240 -436 352 -562 352 -1099 -8 -565 -377 -740 -240 -861 673 -83 635 -138 789 -306 859 -192 80 -341 -31 -674 -504 -501 -713 -603 -620 -767 700 -89 720 -336 1068 -653 923z"/>
                  <path d="M8868 5159 c-257 -99 -407 -346 -287 -475 169 -181 439 94 439 447 0 80 -11 82 -152 28z"/>
                </g>
              </svg>
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-[10px] uppercase tracking-[0.1em] font-bold text-stone-400">
              {navLinks.map(link => (
                link.subLinks ? (
                  <div key={link.name} className="relative group py-4">
                    <button className="flex items-center gap-1 hover:text-stone-900 transition-colors uppercase tracking-[0.1em]">
                      {link.name}
                      <ChevronDown size={10} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    <div className="absolute top-full left-0 w-56 bg-white border border-stone-100 shadow-xl rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                      {link.subLinks.map(sub => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-5 py-2 text-[9px] hover:bg-stone-50 hover:text-stone-900 transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`hover:text-stone-900 transition-colors whitespace-nowrap ${location.pathname === link.path ? 'text-stone-900' : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setIsBucketOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-all"
              aria-label="Inquiry Bucket"
            >
              <ShoppingBag size={18} />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {items.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <a 
              href="https://wa.me/9607771234" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-emerald-50 text-emerald-500 hover:text-emerald-600 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <Link 
              to="/request-quote"
              className="hidden lg:flex bg-stone-900 text-white px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20"
            >
              Request for Quote
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 bg-stone-100 rounded-full text-stone-900 hover:bg-stone-200 transition-colors"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-0 bg-white z-[60] flex items-center px-4 animate-in fade-in duration-300">
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto w-full flex items-center gap-4">
              <Search size={24} className="text-stone-400" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search experiences, villas, or offers..." 
                className="flex-1 bg-transparent border-none outline-none text-xl md:text-3xl font-serif placeholder:text-stone-200"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 md:top-20 left-0 w-full bg-white border-b border-stone-100 shadow-xl animate-in slide-in-from-top-4 duration-300 z-40 overflow-y-auto max-h-[calc(100vh-5rem)]">
            <nav className="flex flex-col p-8 gap-6 text-sm uppercase tracking-[0.2em] font-bold text-stone-600">
              {navLinks.map(link => (
                link.subLinks ? (
                  <div key={link.name} className="flex flex-col gap-4">
                    <button 
                      onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                      className="flex items-center justify-between w-full hover:text-stone-900 transition-colors"
                    >
                      {link.name}
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isActivitiesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isActivitiesOpen && (
                      <div className="flex flex-col gap-4 pl-4 border-l border-stone-100 animate-in slide-in-from-top-2 duration-300">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-xs text-stone-400 hover:text-stone-900 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    ) }
                  </div>
                ) : (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={`hover:text-stone-900 transition-colors ${location.pathname === link.path ? 'text-stone-900' : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-6 border-t border-stone-100 flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBucketOpen(true);
                  }}
                  className="flex items-center gap-2 text-stone-900 font-bold"
                >
                  <div className="relative">
                    <ShoppingBag size={18} />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {items.length}
                      </span>
                    )}
                  </div>
                  Inquiry Bucket
                </button>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="flex items-center gap-2 text-stone-900 font-bold"
                >
                  <Search size={18} /> Search
                </button>
                <a 
                  href="https://wa.me/9607771234" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-500 font-bold"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <Link 
                  to="/request-quote"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-stone-900 text-white py-4 rounded-xl text-center font-bold uppercase tracking-widest text-[10px]"
                >
                  Request for Quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 py-16 mt-24">
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-4">Maldives Serenity Travels Experience</p>
            <p className="text-xs text-stone-500 max-w-2xl mx-auto leading-relaxed mb-8">
              All bookings, payments, and travel arrangements are legally processed and managed by Maldives Serenity Travels (License No: MST-2024-ADDU), Addu City, Maldives.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">
              <Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
              <Link to="/cancellation-policy" className="hover:text-stone-900 transition-colors">Cancellation & Refund</Link>
              <Link to="/booking-conditions" className="hover:text-stone-900 transition-colors">Booking Conditions</Link>
              <Link to="/cookie-policy" className="hover:text-stone-900 transition-colors">Cookie Policy</Link>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-100 text-center">
            <p className="text-[9px] text-stone-300 uppercase tracking-[0.2em]">© {new Date().getFullYear()} Maldives Serenity Travels. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatBot />

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-20 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[100] animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white rounded-2xl p-6 shadow-2xl border border-stone-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-stone-900 mb-1">Cookie Consent</h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  We use cookies to enhance your booking experience. By continuing, you consent to our use of essential and analytics cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={acceptCookies}
                className="flex-1 bg-stone-900 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all"
              >
                Accept All
              </button>
              <Link 
                to="/cookie-policy"
                className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-all text-center"
              >
                Customize
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full p-4 z-50 bg-white/95 backdrop-blur-xl border-t border-stone-100 flex gap-3">
        <a 
          href="https://wa.me/9607771234" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 bg-emerald-500 text-white py-4 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
        <button 
          onClick={() => navigate('/request-quote')}
          className="flex-[2] bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] shadow-xl shadow-stone-900/20 active:scale-[0.98] transition-all"
        >
          Request Quote
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
            className="relative bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90vh] flex flex-col"
          >
            <div className="bg-stone-900 p-6 md:p-8 text-white shrink-0">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
              <h3 className="text-xl md:text-2xl font-serif mb-1 md:mb-2">Request Quotation</h3>
              <p className="text-stone-400 text-[10px] md:text-sm">Step {formStep} of 3: {formStep === 1 ? 'Stay Details' : formStep === 2 ? 'Guest Info' : 'Contact Details'}</p>
              
              <div className="mt-4 md:mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500" 
                  style={{ width: `${(formStep / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 md:p-8 overflow-y-auto">
              {formStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Preferred Dates</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="e.g. Oct 2024" 
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
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
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
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
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
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
                        className="w-full pl-12 pr-4 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none appearance-none"
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
                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors"
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
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="flex-1 border border-stone-200 py-4 rounded-xl font-bold hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormStep(3)}
                      className="flex-[2] bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors"
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
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
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
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="flex-1 border border-stone-200 py-4 rounded-xl font-bold hover:bg-stone-50 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-xl shadow-stone-900/20"
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
