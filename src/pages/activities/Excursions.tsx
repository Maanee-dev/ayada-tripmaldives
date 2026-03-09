import React from 'react';
import { Compass, Ship, Camera, Sun, CheckCircle2, Star } from 'lucide-react';
import { ResortData } from '../../types';

interface ExcursionsProps {
  resort: ResortData;
}

export default function Excursions({ resort }: ExcursionsProps) {
  const excursions = [
    {
      title: "Sunset Cruise",
      description: "Enjoy a romantic cruise as the sun sets over the Indian Ocean.",
      icon: Sun
    },
    {
      title: "Dolphin Spotting",
      description: "A thrilling adventure to see dolphins in their natural habitat.",
      icon: Compass
    },
    {
      title: "Local Island Visit",
      description: "Experience the local culture and traditions of the Maldives.",
      icon: Ship
    },
    {
      title: "Private Island Picnic",
      description: "A secluded getaway on a private sandbank with a gourmet picnic.",
      icon: Camera
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-16 md:mb-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Excursions Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Curated Adventures</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Excursions</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Explore the Wonders of the Atoll</h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed mb-8">
              From romantic sunset cruises to thrilling dolphin spotting adventures, our excursions are designed to help you discover the natural beauty and culture of the Maldives.
            </p>
            <div className="space-y-4">
              {['Professional Guides', 'Private Options Available', 'Safety Equipment Provided', 'Refreshments Included'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-900 font-medium">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {excursions.map((item, index) => (
              <div key={index} className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:shadow-xl transition-all group">
                <item.icon className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h4 className="font-serif text-xl mb-3">{item.title}</h4>
                <p className="text-stone-500 text-sm font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
