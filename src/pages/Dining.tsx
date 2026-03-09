import React from 'react';
import { Utensils, Star, Waves, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface DiningProps {
  resort: ResortData;
}

export default function Dining({ resort }: DiningProps) {
  const { setShowForm } = useForm();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative h-[60vh] rounded-[3rem] overflow-hidden mb-20">
        <img 
          src={resort.images[2]} 
          className="w-full h-full object-cover" 
          alt="Dining at Ayada" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent flex flex-col justify-end p-12 lg:p-20">
          <div className="max-w-2xl">
            <p className="text-white/70 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-400" /> Epicurean Excellence
            </p>
            <h1 className="text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">A Culinary Journey Across the Island</h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">From authentic Maldivian flavors to international fine dining, discover seven unique venues designed to enchant your senses.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-all inline-flex items-center gap-2"
            >
              Reserve a Table <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif mb-4">Our Signature Venues</h2>
            <p className="text-stone-500 leading-relaxed">Each restaurant at {resort.name} offers a distinct atmosphere and menu, crafted by our award-winning international chefs.</p>
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-sm font-medium">
            <span className="flex items-center gap-1"><Clock size={14} /> Breakfast: 07:00 - 10:30</span>
            <span className="w-1 h-1 bg-stone-200 rounded-full" />
            <span className="flex items-center gap-1"><Clock size={14} /> Dinner: 19:00 - 22:00</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {resort.dining_venues.map((venue, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8">
                <img 
                  src={venue.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  alt={venue.name} 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm">
                    {venue.cuisine}
                  </div>
                  {i === 0 && (
                    <div className="bg-emerald-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Signature
                    </div>
                  )}
                </div>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-serif group-hover:text-emerald-700 transition-colors">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-stone-400 text-xs uppercase tracking-widest font-bold">
                    <MapPin size={12} /> {i % 2 === 0 ? 'Overwater' : 'Beachfront'}
                  </div>
                </div>
                <p className="text-stone-500 leading-relaxed mb-8 text-lg">{venue.description}</p>
                <div className="flex flex-wrap gap-3">
                  {venue.highlights.map((h, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone-400 border-b border-stone-200 pb-1">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Plans Section */}
      <div className="bg-stone-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden mb-20">
        <Waves className="absolute -top-20 -right-20 text-white/5 w-96 h-96" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-emerald-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Tailored Indulgence</p>
            <h2 className="text-5xl lg:text-6xl font-serif mb-8 leading-tight">Curated Meal Plans for Every Traveler</h2>
            <p className="text-stone-400 text-lg mb-12 leading-relaxed">Whether you prefer the flexibility of Half Board or the worry-free luxury of our Crystal All-Inclusive plan, we have designed our offerings to suit your island lifestyle.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resort.meal_plans.map((plan, i) => (
                <div key={i} className="group bg-white/5 hover:bg-white/10 border border-white/10 p-6 rounded-[2rem] transition-all cursor-default">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Utensils size={20} />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-2">{plan.replace(/_/g, ' ')}</h4>
                  <p className="text-xs text-stone-500">Includes {plan.includes('All_Inclusive') ? 'unlimited premium beverages' : 'daily breakfast & dinner'}.</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 shadow-2xl">
              <img 
                src={resort.images[3]} 
                className="w-full h-full object-cover" 
                alt="Dining Experience" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20">
                <p className="text-white font-serif text-xl mb-2">"The best dining experience in the Maldives, hands down."</p>
                <p className="text-white/60 text-xs uppercase tracking-widest font-bold">— Condé Nast Traveler</p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/20 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-500/10 blur-[100px] rounded-full" />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-20">
        <h3 className="text-4xl font-serif mb-6">Ready to Taste Paradise?</h3>
        <p className="text-stone-500 mb-10 max-w-xl mx-auto">Contact our concierge team to personalize your culinary journey or book a private destination dining experience.</p>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-stone-900 text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20"
        >
          Inquire Now
        </button>
      </div>
    </div>
  );
}
