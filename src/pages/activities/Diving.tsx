import React from 'react';
import { Waves, Anchor, Camera, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { ResortData } from '../../types';

interface DivingProps {
  resort: ResortData;
}

export default function Diving({ resort }: DivingProps) {
  const courses = [
    {
      title: "Discover Scuba",
      description: "A perfect introduction for beginners to the underwater world.",
      icon: Waves
    },
    {
      title: "PADI Certification",
      description: "Become a certified diver with our professional instructors.",
      icon: ShieldCheck
    },
    {
      title: "Night Diving",
      description: "Experience the reef in a whole new light after dark.",
      icon: Anchor
    },
    {
      title: "Underwater Photography",
      description: "Capture the stunning marine life with our specialized courses.",
      icon: Camera
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-16 md:mb-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Diving Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Underwater Wonders</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Diving</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Explore the Depths</h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed mb-8">
              The Maldives is home to some of the world's most spectacular dive sites. Our PADI-certified dive center offers a range of courses and excursions for all levels.
            </p>
            <div className="space-y-4">
              {['PADI Certified Center', 'Multilingual Instructors', 'Modern Equipment', 'Diverse Dive Sites'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-900 font-medium">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span className="text-sm uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((item, index) => (
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
