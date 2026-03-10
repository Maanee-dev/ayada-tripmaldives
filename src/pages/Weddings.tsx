import React from 'react';
import { Heart, Camera, Music, Utensils, CheckCircle2, Star } from 'lucide-react';
import { ResortData } from '../types';

interface WeddingsProps {
  resort: ResortData;
}

export default function Weddings({ resort }: WeddingsProps) {
  const packages = resort.wedding_packages || [];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-12 md:mb-20 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Weddings Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Eternal Love</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Your Dream Wedding</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Say "I Do" in Paradise</h2>
          <p className="text-stone-500 text-lg font-light leading-relaxed mb-12 max-w-3xl">
            Whether you're dreaming of a simple sunset ceremony on the beach or a grand celebration with family and friends, Ayada Maldives provides the perfect backdrop for your wedding or renewal of vows. Our dedicated wedding specialists will handle every detail to ensure your special day is as unique as your love story.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {packages.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl border border-stone-100 overflow-hidden group hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 md:p-12">
                  <h4 className="font-serif text-3xl mb-6">{item.name}</h4>
                  <p className="text-stone-500 text-base font-light leading-relaxed mb-8">{item.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                    {item.inclusions.map((inclusion, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-[11px] text-stone-400 font-bold uppercase tracking-widest">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full py-5 bg-stone-900 text-white rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20">
                    Inquire for Pricing & Availability
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
