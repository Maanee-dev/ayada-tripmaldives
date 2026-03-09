import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Waves, Share2, Menu, ChevronRight, ShieldCheck, Clock, MapPin, Gift } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface HomeProps {
  resort: ResortData;
}

export default function Home({ resort }: HomeProps) {
  const { setShowForm } = useForm();
  const navigate = useNavigate();

  return (
    <>
      {/* New Hero Section - Airbnb Style */}
      <div className="mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-4 tracking-tight">{resort.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-stone-900" />
                <span className="font-bold">{resort.rating}.0</span>
                <span className="text-stone-400 font-normal underline cursor-pointer ml-1">Verified Resort</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-stone-400 font-normal underline cursor-pointer">{resort.atoll}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-stone-50 px-4 py-2 rounded-lg transition-all">
              <Waves size={18} /> Save
            </button>
            <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:bg-stone-50 px-4 py-2 rounded-lg transition-all">
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 h-[50vh] md:h-[70vh] rounded-2xl overflow-hidden">
          <div className="md:col-span-2 h-full">
            <img 
              src={resort.images[0]} 
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" 
              alt={resort.name}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 md:gap-3 h-full">
            <div className="h-full overflow-hidden">
              <img src={resort.images[1]} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" alt="Resort View 1" referrerPolicy="no-referrer" />
            </div>
            <div className="h-full overflow-hidden">
              <img src={resort.images[2]} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" alt="Resort View 2" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 gap-2 md:gap-3 h-full">
            <div className="h-full overflow-hidden">
              <img src={resort.images[3]} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" alt="Resort View 3" referrerPolicy="no-referrer" />
            </div>
            <div className="h-full overflow-hidden relative">
              <img src={resort.images[4]} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" alt="Resort View 4" referrerPolicy="no-referrer" />
              <button className="absolute bottom-6 right-6 bg-white border border-stone-900 text-stone-900 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-stone-50 transition-all">
                <Menu size={16} /> Show all photos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Info Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-32 py-10 border-y border-stone-100">
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Location</p>
          <p className="font-serif text-xl md:text-2xl">{resort.atoll}</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Transfer</p>
          <p className="font-serif text-xl md:text-2xl">Seaplane / Domestic</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Villas</p>
          <p className="font-serif text-xl md:text-2xl">{resort.room_types.length} Categories</p>
        </div>
        <div className="text-center md:text-left">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-2">Dining</p>
          <p className="font-serif text-xl md:text-2xl">{resort.dining_venues.length} Venues</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
        <div className="lg:col-span-2">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">{resort.short_description}</h2>
            <p className="text-stone-500 text-lg md:text-xl leading-relaxed font-light mb-10">
              {resort.description}
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
                <ShieldCheck size={18} /> Best Price Guarantee
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-[10px]">
                <Clock size={18} /> 24/7 Local Support
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="py-10 group cursor-pointer">
                <h3 className="text-2xl font-serif mb-4 group-hover:text-emerald-800 transition-colors">The Experience</h3>
                <p className="text-stone-500 mb-8 leading-relaxed font-light">Discover a world of luxury and adventure in the heart of the Maldives.</p>
                <button 
                  onClick={() => navigate('/experiences')}
                  className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                >
                  Explore Experiences
                </button>
             </div>
             <div className="py-10 group cursor-pointer">
                <h3 className="text-2xl font-serif mb-4 group-hover:text-emerald-800 transition-colors">Villa Living</h3>
                <p className="text-stone-500 mb-8 leading-relaxed font-light">From overwater villas to beachfront suites, find your perfect sanctuary.</p>
                <button 
                  onClick={() => navigate('/rooms')}
                  className="text-[10px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                >
                  View All Rooms
                </button>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-32 bg-stone-50 rounded-2xl p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold mb-1">Resort Rating</p>
                <div className="flex items-center gap-1.5">
                  <Star size={18} className="fill-stone-900" />
                  <span className="text-3xl font-bold">{resort.rating}.0</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl mb-8 border border-stone-100">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Gift size={14} /> Exclusive Benefit
              </p>
              <p className="text-xs font-medium text-stone-600 leading-relaxed">Complimentary 24-Hour Butler Service included with all bookings through TripMaldives.</p>
            </div>

            <button 
              onClick={() => navigate('/request-quote')}
              className="w-full bg-stone-900 text-white py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-3 mb-6 shadow-xl shadow-stone-900/20"
            >
              Request Private Quote <ChevronRight size={18} />
            </button>
            
            <p className="text-[9px] text-center text-stone-400 uppercase tracking-[0.2em] font-bold">No payment required to inquire</p>

            <div className="mt-10 pt-10 border-t border-stone-100 space-y-5">
              <div className="flex items-center gap-4 text-xs text-stone-600 font-medium">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-stone-600 font-medium">
                <Clock size={18} className="text-emerald-500" />
                <span>24/7 Local Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
