import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Users, Home, Utensils, User, ChevronRight, ChevronLeft, CheckCircle2, Sparkles, Minus, Plus } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, isBefore, startOfToday } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface RequestQuoteProps {
  resort: ResortData;
}

export default function RequestQuote({ resort }: RequestQuoteProps) {
  const { formData, setFormData } = useForm();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote Request:', formData);
    navigate('/thank-you');
  };

  const steps = [
    { id: 1, name: 'Dates', icon: CalendarIcon },
    { id: 2, name: 'Guests', icon: Users },
    { id: 3, name: 'Room', icon: Home },
    { id: 4, name: 'Dining', icon: Utensils },
    { id: 5, name: 'Details', icon: User },
  ];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="text-center mb-16 md:mb-24">
        <p className="text-emerald-600 uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-6">Personalized Journey</p>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif mb-10 leading-[0.9] tracking-tighter">Request a Private Quote</h1>
        <div className="flex justify-center items-center gap-3 md:gap-6">
          {steps.map((s) => (
            <React.Fragment key={s.id}>
              <div className={`flex flex-col items-center gap-3 ${step >= s.id ? 'text-stone-900' : 'text-stone-300'}`}>
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? 'border-stone-900 bg-stone-900 text-white shadow-2xl shadow-stone-900/20' : 'border-stone-100 bg-stone-50'}`}>
                  <s.icon size={step >= s.id ? 24 : 20} className="transition-all" />
                </div>
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">{s.name}</span>
              </div>
              {s.id < 5 && <div className={`h-0.5 w-6 md:w-16 rounded-full transition-all duration-500 ${step > s.id ? 'bg-stone-900' : 'bg-stone-100'}`} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/50 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 md:p-16">
              {step === 1 && (
                <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">When would you like to visit?</h2>
                    <p className="text-stone-500 text-lg font-light">Select your preferred dates for an accurate quotation.</p>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-6 text-center lg:text-left">Check-in & Check-out</label>
                      <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100 flex justify-center">
                        <DayPicker
                          mode="range"
                          selected={{
                            from: formData.checkIn ? new Date(formData.checkIn) : undefined,
                            to: formData.checkOut ? new Date(formData.checkOut) : undefined
                          }}
                          onSelect={(range) => {
                            setFormData({
                              ...formData,
                              checkIn: range?.from ? format(range.from, 'yyyy-MM-dd') : '',
                              checkOut: range?.to ? format(range.to, 'yyyy-MM-dd') : ''
                            });
                          }}
                          disabled={{ before: startOfToday() }}
                          numberOfMonths={window.innerWidth > 768 ? 2 : 1}
                          className="luxury-datepicker"
                          styles={{
                            caption: { color: '#1c1917', fontFamily: 'serif' },
                            head_cell: { color: '#a8a29e', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' },
                            day_selected: { backgroundColor: '#1c1917', color: 'white', borderRadius: '50%' },
                            day_today: { color: '#10b981', fontWeight: 'bold' }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">Check-in</p>
                      <p className="text-lg font-serif">{formData.checkIn ? format(new Date(formData.checkIn), 'MMM dd, yyyy') : 'Select Date'}</p>
                    </div>
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1">Check-out</p>
                      <p className="text-lg font-serif">{formData.checkOut ? format(new Date(formData.checkOut), 'MMM dd, yyyy') : 'Select Date'}</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-10">
                    <button 
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.checkIn || !formData.checkOut}
                      className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all flex items-center gap-3 disabled:opacity-30 shadow-xl shadow-stone-900/20"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Who is traveling with you?</h2>
                    <p className="text-stone-500 text-lg font-light">This helps us recommend the best villa for your party.</p>
                  </div>
                  <div className="space-y-6 max-w-md mx-auto md:mx-0">
                    <div className="flex items-center justify-between p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
                      <div>
                        <p className="font-bold text-2xl text-stone-900 mb-1">Adults</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Ages 12+</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})}
                          className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:border-stone-900 transition-all text-stone-400 hover:text-stone-900"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="text-3xl font-bold w-8 text-center text-stone-900">{formData.adults}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, adults: formData.adults + 1})}
                          className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:border-stone-900 transition-all text-stone-400 hover:text-stone-900"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 shadow-sm">
                      <div>
                        <p className="font-bold text-2xl text-stone-900 mb-1">Children</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold">Ages 0-11</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
                          className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:border-stone-900 transition-all text-stone-400 hover:text-stone-900"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="text-3xl font-bold w-8 text-center text-stone-900">{formData.children}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, children: formData.children + 1})}
                          className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:border-stone-900 transition-all text-stone-400 hover:text-stone-900"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-10">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:text-stone-900 transition-colors"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      type="button"
                      onClick={handleNext}
                      className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all flex items-center gap-3 shadow-xl shadow-stone-900/20"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Choose your sanctuary</h2>
                    <p className="text-stone-500 text-lg font-light">Select your preferred villa category.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {resort.room_types.map((room) => (
                      <div 
                        key={room.id}
                        onClick={() => setFormData({...formData, roomType: room.name})}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col md:flex-row gap-6 ${formData.roomType === room.name ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-200'}`}
                      >
                        <div className="w-full md:w-40 aspect-video md:aspect-square rounded-xl overflow-hidden shrink-0">
                          <img src={room.image} className="w-full h-full object-cover" alt={room.name} referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg md:text-xl font-serif">{room.name}</h4>
                            {formData.roomType === room.name && <CheckCircle2 className="text-emerald-500" size={20} />}
                          </div>
                          <p className="text-stone-500 text-xs md:text-sm font-light line-clamp-2">{room.description}</p>
                          <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] font-bold mt-3">{room.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-10">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:text-stone-900 transition-colors"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.roomType}
                      className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all flex items-center gap-3 disabled:opacity-30 shadow-xl shadow-stone-900/20"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Select your meal plan</h2>
                    <p className="text-stone-500 text-lg font-light">Choose the dining experience that suits you best.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {resort.meal_plans.map((plan) => (
                      <div 
                        key={plan}
                        onClick={() => setFormData({...formData, mealPlan: plan})}
                        className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${formData.mealPlan === plan ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-200'}`}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                            <Utensils size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold uppercase tracking-[0.15em] text-[10px] mb-1">{plan.replace(/_/g, ' ')}</h4>
                            <p className="text-xs text-stone-500 font-light">Includes {plan.includes('All_Inclusive') ? 'unlimited premium beverages' : 'daily breakfast & dinner'}.</p>
                          </div>
                        </div>
                        {formData.mealPlan === plan && <CheckCircle2 className="text-emerald-500" size={20} />}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-10">
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:text-stone-900 transition-colors"
                    >
                      <ChevronLeft size={18} /> Back
                    </button>
                    <button 
                      type="button"
                      onClick={handleNext}
                      disabled={!formData.mealPlan}
                      className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 transition-all flex items-center gap-3 disabled:opacity-30 shadow-xl shadow-stone-900/20"
                    >
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">Final Details</h2>
                    <p className="text-stone-500 text-lg font-light">Provide your contact information to receive your quote.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all text-base"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all text-base"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000" 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all text-base"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Special Requests (Optional)</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell us about any special occasions or requirements..." 
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none resize-none transition-all text-base"
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8 pt-10">
                    <button 
                      type="submit"
                      className="w-full max-w-md bg-[#1c1917] text-white py-10 rounded-[2.5rem] font-bold uppercase tracking-[0.3em] text-sm hover:bg-stone-800 transition-all flex flex-col items-center justify-center gap-4 shadow-2xl shadow-stone-900/40 group relative overflow-hidden"
                    >
                      <span className="relative z-10">Request Private Quote</span>
                      <Sparkles size={24} className="text-emerald-400 relative z-10 group-hover:scale-125 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                    
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:text-stone-900 transition-colors"
                    >
                      <ChevronLeft size={18} /> Back to Details
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 text-center uppercase tracking-[0.2em] font-bold mt-8">
                    By clicking, you agree to be contacted by a Serenity Travels specialist.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="hidden lg:block">
          <div className="sticky top-32 space-y-8">
            <div className="bg-stone-900 rounded-2xl md:rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-6">Your Selection</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <CalendarIcon className="text-emerald-400 mt-1" size={20} />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Stay Period</p>
                    <p className="text-sm font-medium">{formData.checkIn || 'Not selected'} — {formData.checkOut || 'Not selected'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="text-emerald-400 mt-1" size={20} />
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Guests</p>
                    <p className="text-sm font-medium">{formData.adults} Adults, {formData.children} Children</p>
                  </div>
                </div>
                {formData.roomType && (
                  <div className="flex items-start gap-4">
                    <Home className="text-emerald-400 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Sanctuary</p>
                      <p className="text-sm font-medium">{formData.roomType}</p>
                    </div>
                  </div>
                )}
                {formData.roomType && (
                  <div className="flex items-start gap-4">
                    <Utensils className="text-emerald-400 mt-1" size={20} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Dining Plan</p>
                      <p className="text-sm font-medium uppercase tracking-widest text-[10px]">{formData.mealPlan.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-2xl md:rounded-3xl p-10 border border-emerald-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-serif text-xl text-emerald-900">Serenity Guarantee</h4>
              </div>
              <p className="text-emerald-800/70 text-sm leading-relaxed font-light">
                Our luxury specialists ensure you receive the most competitive private rates and exclusive inclusions not available elsewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
