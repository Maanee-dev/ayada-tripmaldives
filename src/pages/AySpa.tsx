import React from 'react';
import { Waves, CheckCircle2, Heart, Wind, ShieldCheck, Star } from 'lucide-react';
import { ResortData } from '../types';

interface AySpaProps {
  resort: ResortData;
}

export default function AySpa({ resort }: AySpaProps) {
  const treatments = resort.spa_treatments || [];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-12 md:mb-20 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="AySpa Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Wellness Sanctuary</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">AySpa Wellness</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">A Journey of Rejuvenation</h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed mb-12 max-w-3xl">
            AySpa has been designed to rejuvenate the body, mind and spirit. The spa features a Turkish Hammam, a Vichy room, a private sauna and steam room, and a relaxation area with a plunge pool. Each treatment is a carefully curated experience designed to transport you to a state of total tranquility.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatments.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-stone-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif text-2xl">{item.name}</h4>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{item.duration}</span>
                  </div>
                  <p className="text-stone-500 text-sm font-light leading-relaxed mb-6">{item.description}</p>
                  <div className="space-y-2">
                    {item.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
