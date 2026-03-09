import React from 'react';
import { Star, Waves, Sparkles, Menu, ChevronRight, ShieldCheck, Clock } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface HomeProps {
  resort: ResortData;
}

export default function Home({ resort }: HomeProps) {
  const { setShowForm } = useForm();

  return (
    <>
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif mb-2">{resort.name}</h1>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-stone-900" />
              <span className="font-bold">{resort.rating}.0</span>
              <span className="text-stone-400 underline cursor-pointer">Verified Resort</span>
            </div>
            <span className="text-stone-400 underline cursor-pointer">{resort.atoll}</span>
          </div>
          <div className="flex items-center gap-6 text-stone-900 font-medium">
            <button className="flex items-center gap-2 hover:underline"><Waves size={16} /> Save</button>
            <button className="flex items-center gap-2 hover:underline"><Sparkles size={16} /> Share</button>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[500px] mb-12 rounded-2xl overflow-hidden">
        <div className="col-span-2 row-span-2 relative group cursor-pointer">
          <img 
            src={resort.images[0]} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt={resort.name}
            referrerPolicy="no-referrer"
            fetchpriority="high"
          />
        </div>
        <div className="hidden md:block relative group cursor-pointer">
          <img src={resort.images[1]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`${resort.name} 1`} referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:block relative group cursor-pointer">
          <img src={resort.images[2]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`${resort.name} 2`} referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:block relative group cursor-pointer">
          <img src={resort.images[3]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`${resort.name} 3`} referrerPolicy="no-referrer" />
        </div>
        <div className="hidden md:block relative group cursor-pointer">
          <img src={resort.images[4]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`${resort.name} 4`} referrerPolicy="no-referrer" />
          <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2">
            <Menu size={14} /> Show all photos
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          <div className="border-b border-stone-100 pb-8 mb-8">
            <h2 className="text-2xl font-serif mb-2">{resort.short_description}</h2>
            <p className="text-stone-400 text-sm">{resort.uvp}</p>
          </div>

          <div className="border-t border-stone-100 pt-8 mb-12">
            <p className="text-stone-600 leading-relaxed mb-4">
              {resort.description}
            </p>
            <button className="text-stone-900 font-bold underline flex items-center gap-1">Show more <ChevronRight size={14} /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-stone-50 rounded-3xl">
                <h3 className="text-xl font-serif mb-4">The Experience</h3>
                <p className="text-sm text-stone-500 mb-6">Discover a world of luxury and adventure in the heart of the Maldives.</p>
                <button className="bg-stone-900 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Explore Experiences</button>
             </div>
             <div className="p-8 bg-emerald-50 rounded-3xl">
                <h3 className="text-xl font-serif mb-4">Villa Living</h3>
                <p className="text-sm text-emerald-700/70 mb-6">From overwater villas to beachfront suites, find your perfect sanctuary.</p>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">View All Rooms</button>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="sticky top-32 bg-white border border-stone-100 rounded-2xl p-8 shadow-2xl shadow-stone-200/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xl font-bold">{resort.price_range}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star size={12} className="fill-stone-900" />
                <span className="font-bold">{resort.rating}.0</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Exclusive Benefit</p>
              <p className="text-xs font-medium text-emerald-800">Complimentary 24-Hour Butler Service included with all bookings.</p>
            </div>

            <button 
              onClick={() => setShowForm(true)}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center justify-center gap-2 mb-4"
            >
              Request Quotation <ChevronRight size={16} />
            </button>
            
            <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest">No payment required now</p>

            <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span>Best Price Guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <Clock size={16} className="text-emerald-500" />
                <span>24/7 Local Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
