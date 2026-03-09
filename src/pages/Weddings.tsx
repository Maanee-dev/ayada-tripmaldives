import React from 'react';
import { Heart, Camera, Music, Utensils, CheckCircle2, Star } from 'lucide-react';
import { ResortData } from '../types';

interface WeddingsProps {
  resort: ResortData;
}

export default function Weddings({ resort }: WeddingsProps) {
  const services = [
    {
      title: "Wedding Planning",
      description: "Dedicated wedding specialists to handle every detail of your special day.",
      icon: Heart
    },
    {
      title: "Photography",
      description: "Professional photographers to capture your most precious moments.",
      icon: Camera
    },
    {
      title: "Gala Dinner",
      description: "Exquisite dining experiences tailored to your preferences.",
      icon: Utensils
    },
    {
      title: "Live Music",
      description: "Traditional Maldivian Boduberu or contemporary live entertainment.",
      icon: Music
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-16 md:mb-24 overflow-hidden">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Say "I Do" in Paradise</h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed mb-8">
              Whether you're dreaming of a simple sunset ceremony on the beach or a grand celebration with family and friends, Ayada Maldives provides the perfect backdrop for your wedding or renewal of vows.
            </p>
            <div className="space-y-4">
              {['Beachfront Ceremonies', 'Traditional Maldivian Style', 'Renewal of Vows', 'Honeymoon Packages'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-900 font-medium">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, index) => (
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
