import React, { useState } from 'react';
import { Waves, Maximize, Users, ChevronRight, Star, Sparkles, ShieldCheck, Coffee, Wind } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface RoomsProps {
  resort: ResortData;
}

export default function Rooms({ resort }: RoomsProps) {
  const { setShowForm } = useForm();
  const [activeCategory, setActiveCategory] = useState<'all' | 'beach' | 'water'>('all');

  const filteredRooms = resort.room_types.filter(room => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'beach') return room.name.toLowerCase().includes('beach');
    if (activeCategory === 'water') return room.name.toLowerCase().includes('water') || room.name.toLowerCase().includes('ocean');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="relative h-[50vh] rounded-[3rem] overflow-hidden mb-16">
        <img 
          src={resort.images[1]} 
          className="w-full h-full object-cover" 
          alt="Luxury Villas" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-transparent flex flex-col justify-center p-12 lg:p-20">
          <div className="max-w-xl">
            <p className="text-white/70 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Private Sanctuaries</p>
            <h1 className="text-5xl lg:text-6xl font-serif text-white mb-6">Your Haven of Tranquility</h1>
            <p className="text-white/80 text-lg leading-relaxed">Discover a collection of award-winning villas, each featuring a private pool and dedicated butler service.</p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div className="flex gap-4">
          {(['all', 'beach', 'water'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/20' 
                  : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
              }`}
            >
              {cat === 'water' ? 'Overwater' : cat === 'beach' ? 'Beachfront' : 'All Villas'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-6 text-stone-400">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-emerald-500" /> Private Pool
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={16} className="text-emerald-500" /> Butler Service
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {filteredRooms.map((room, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[16/11] rounded-[3rem] overflow-hidden mb-8 shadow-2xl shadow-stone-200/50">
              <img 
                src={room.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={room.name} 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-1">Starting from</p>
                <p className="text-xl font-serif text-stone-900">{resort.price_range.split('-')[0]}</p>
              </div>
              <div className="absolute bottom-8 left-8 flex gap-2">
                <div className="bg-stone-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <Maximize size={12} /> {room.size}
                </div>
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                  <Users size={12} /> Up to {room.capacity}
                </div>
              </div>
            </div>
            
            <div className="px-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-serif group-hover:text-emerald-800 transition-colors">{room.name}</h3>
                <div className="flex items-center gap-1 text-emerald-600">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>
              </div>
              
              <p className="text-stone-500 text-lg leading-relaxed mb-8 line-clamp-2">{room.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                <div className="flex gap-4">
                  <Coffee size={18} className="text-stone-300" />
                  <Wind size={18} className="text-stone-300" />
                  <Waves size={18} className="text-stone-300" />
                </div>
                <button 
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 group-hover:gap-4 transition-all"
                >
                  Explore Villa <ChevronRight size={16} className="text-emerald-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Concierge Section */}
      <div className="mt-32 relative rounded-[4rem] overflow-hidden bg-stone-50 p-12 lg:p-24">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <Waves className="w-full h-full text-stone-900" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Personalized Service</p>
          <h2 className="text-5xl font-serif mb-8 leading-tight">Can't decide on the perfect sanctuary?</h2>
          <p className="text-stone-500 text-lg mb-12 leading-relaxed">Our luxury island specialists are available 24/7 to help you select the villa that best suits your group's needs and preferences.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-stone-900 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20"
            >
              Speak to a Specialist
            </button>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white border border-stone-200 text-stone-900 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-50 transition-all"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
