import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Users, Home, Utensils, User, ChevronRight, ChevronLeft, CheckCircle2, Zap, Minus, Plus, ShieldCheck, Clock } from 'lucide-react';
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
    { id: 1, name: 'Your Stay', icon: CalendarIcon },
    { id: 2, name: 'Contact Info', icon: User },
  ];

  return (
    <div className="w-full py-8 md:py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Fast & Private</p>
        <h1 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">Get Your Custom Quote</h1>
        <p className="text-stone-500 text-sm md:text-base max-w-lg mx-auto">Receive a personalized offer for your dream Maldivian getaway in minutes.</p>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-2xl shadow-stone-200/50 overflow-hidden">
        <div className="flex border-b border-stone-50">
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all ${step === s.id ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-400'}`}
            >
              <s.icon size={14} /> {s.name}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-12">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Check-in & Check-out</label>
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
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
                        className="luxury-datepicker-small"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Guests</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold">Adults</span>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setFormData({...formData, adults: Math.max(1, formData.adults - 1)})} className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center">-</button>
                          <span className="text-sm font-bold">{formData.adults}</span>
                          <button type="button" onClick={() => setFormData({...formData, adults: formData.adults + 1})} className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-bold">Kids</span>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})} className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center">-</button>
                          <span className="text-sm font-bold">{formData.children}</span>
                          <button type="button" onClick={() => setFormData({...formData, children: formData.children + 1})} className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Villa Type</label>
                    <select 
                      value={formData.roomType}
                      onChange={e => setFormData({...formData, roomType: e.target.value})}
                      className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm"
                    >
                      <option value="">Select a Villa</option>
                      {resort.room_types.map(room => (
                        <option key={room.id} value={room.name}>{room.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Meal Plan</label>
                    <select 
                      value={formData.mealPlan}
                      onChange={e => setFormData({...formData, mealPlan: e.target.value})}
                      className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm"
                    >
                      <option value="">Select Meal Plan</option>
                      {resort.meal_plans.map(plan => (
                        <option key={plan} value={plan}>{plan.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.checkIn || !formData.checkOut || !formData.roomType}
                  className="w-full md:w-auto bg-stone-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
                >
                  Continue to Contact <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Special Requests</label>
                  <textarea 
                    rows={3}
                    placeholder="Any special occasions or requirements?" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-stone-900 transition-all text-sm resize-none"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                <button 
                  type="button"
                  onClick={handleBack}
                  className="text-stone-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:text-stone-900 transition-colors"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <button 
                  type="submit"
                  className="w-full md:w-auto bg-emerald-600 text-white px-16 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20"
                >
                  Get My Quote Now
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: ShieldCheck, text: 'Best Price Guarantee' },
          { icon: Clock, text: '24/7 Local Support' },
          { icon: Zap, text: 'Instant Confirmation' },
          { icon: CheckCircle2, text: 'No Hidden Fees' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 text-center">
            <item.icon size={20} className="text-emerald-500" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
