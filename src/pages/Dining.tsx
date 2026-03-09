import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Star, Waves, ChevronRight, Clock, MapPin, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface DiningProps {
  resort: ResortData;
}

export default function Dining({ resort }: DiningProps) {
  const { setShowForm } = useForm();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(resort.dining_venues.length / itemsPerPage);
  const paginatedVenues = resort.dining_venues.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      {/* Full Width Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden mb-12 md:mb-20">
        <img 
          src={resort.images[2]} 
          className="w-full h-full object-cover" 
          alt="Dining at Ayada" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 flex items-center gap-3">
              <Sparkles size={18} /> Epicurean Excellence
            </p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">A Culinary Journey</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Venues List - Minimalistic */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Signature Venues</h2>
            <p className="text-stone-500 text-lg font-light leading-relaxed">Each restaurant at {resort.name} offers a distinct atmosphere and menu, crafted by our award-winning international chefs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-stone-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><Clock size={14} /> Breakfast: 07:00 - 10:30</span>
            <span className="flex items-center gap-2"><Clock size={14} /> Dinner: 19:00 - 22:00</span>
          </div>
        </div>

        <div className="space-y-24">
          {paginatedVenues.map((venue, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <div className={`w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img 
                  src={venue.image} 
                  className="w-full h-full object-cover" 
                  alt={venue.name} 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className={`w-full lg:w-1/2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full">
                    {venue.cuisine}
                  </div>
                  {i === 0 && (
                    <div className="text-[10px] font-bold uppercase tracking-widest text-stone-900 bg-stone-100 px-4 py-1.5 rounded-full flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Signature
                    </div>
                  )}
                </div>
                <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">{venue.name}</h3>
                <p className="text-stone-500 text-lg leading-relaxed mb-8 font-light">{venue.description}</p>
                <div className="flex flex-wrap gap-6 mb-10">
                  {venue.highlights.map((h, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                      {h}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => navigate('/request-quote')}
                  className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10"
                >
                  Reserve a Table
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 mb-24">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-4 rounded-full border border-stone-100 text-stone-400 disabled:opacity-20 hover:text-stone-900 hover:border-stone-900 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-full text-[10px] font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-stone-900 text-white shadow-lg' 
                    : 'text-stone-400 hover:text-stone-900'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-4 rounded-full border border-stone-100 text-stone-400 disabled:opacity-20 hover:text-stone-900 hover:border-stone-900 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* Meal Plans Section */}
      <div className="bg-stone-50 rounded-2xl p-8 md:p-12 lg:p-24 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Tailored Indulgence</p>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Curated Meal Plans</h2>
            <p className="text-stone-500 text-lg mb-12 leading-relaxed font-light">Whether you prefer the flexibility of Half Board or the worry-free luxury of our Crystal All-Inclusive plan, we have designed our offerings to suit your island lifestyle.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resort.meal_plans.map((plan, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-stone-100">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 mb-4">
                    <Utensils size={20} />
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-widest mb-2">{plan.replace(/_/g, ' ')}</h4>
                  <p className="text-[10px] text-stone-400 font-medium">Includes {plan.includes('All_Inclusive') ? 'unlimited premium beverages' : 'daily breakfast & dinner'}.</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={resort.images[3]} 
                className="w-full h-full object-cover" 
                alt="Dining Experience" 
                referrerPolicy="no-referrer" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-20">
        <h3 className="text-4xl font-serif mb-6">Ready to Taste Paradise?</h3>
        <p className="text-stone-500 mb-10 max-w-xl mx-auto font-light">Contact our concierge team to personalize your culinary journey or book a private destination dining experience.</p>
        <button 
          onClick={() => navigate('/request-quote')}
          className="bg-stone-900 text-white px-12 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
        >
          Inquire Now
        </button>
      </div>
      </div>
    </>
  );
}
