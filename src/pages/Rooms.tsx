import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Waves, Maximize, Users, ChevronRight, Star, Sparkles, ShieldCheck, Coffee, Wind, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { ResortData, RoomType } from '../types';
import { useForm } from '../context/FormContext';

interface RoomsProps {
  resort: ResortData;
}

export default function Rooms({ resort }: RoomsProps) {
  const { setShowForm } = useForm();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<'all' | 'beach' | 'water'>('all');
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRooms = resort.room_types.filter(room => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'beach') return room.name.toLowerCase().includes('beach');
    if (activeCategory === 'water') return room.name.toLowerCase().includes('water') || room.name.toLowerCase().includes('ocean');
    return true;
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <>
      {/* Full Width Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden mb-12 md:mb-20">
        <img 
          src={resort.images[1]} 
          className="w-full h-full object-cover" 
          alt="Luxury Villas" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Private Sanctuaries</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Your Haven of Tranquility</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Category Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="flex flex-wrap justify-center gap-6">
          {(['all', 'beach', 'water'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all pb-2 border-b-2 ${
                activeCategory === cat 
                  ? 'border-stone-900 text-stone-900' 
                  : 'border-transparent text-stone-300 hover:text-stone-500'
              }`}
            >
              {cat === 'water' ? 'Overwater' : cat === 'beach' ? 'Beachfront' : 'All Villas'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 text-stone-400">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={16} className="text-emerald-500" /> Private Pool
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={16} className="text-emerald-500" /> Butler Service
          </div>
        </div>
      </div>

      {/* Rooms List - Minimalistic */}
      <div className="space-y-24 mb-24">
        {paginatedRooms.map((room, i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <div className="w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-xl">
              <img 
                src={room.image} 
                className="w-full h-full object-cover" 
                alt={room.name} 
                referrerPolicy="no-referrer" 
              />
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-1.5 text-emerald-600 mb-6">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">{room.name}</h3>
              <p className="text-stone-500 text-lg leading-relaxed mb-8 font-light line-clamp-3">{room.description}</p>
              
              <div className="flex flex-wrap items-center gap-8 mb-10">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  <Maximize size={16} /> {room.size}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  <Users size={16} /> 2 Adults
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setSelectedRoom(room)}
                  className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10"
                >
                  View Details
                </button>
                <button 
                  onClick={() => navigate('/request-quote')}
                  className="border border-stone-200 text-stone-900 px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-all"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
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

      {/* Room Details Popup */}
      {selectedRoom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedRoom(null)} />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col lg:flex-row">
            <button 
              onClick={() => setSelectedRoom(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-stone-900 hover:bg-stone-900 hover:text-white transition-all z-20 shadow-lg"
            >
              <X size={20} />
            </button>
            
            <div className="w-full lg:w-1/2 h-64 lg:h-auto shrink-0">
              <img src={selectedRoom.image} className="w-full h-full object-cover" alt={selectedRoom.name} referrerPolicy="no-referrer" />
            </div>
            
            <div className="p-8 md:p-12 lg:p-16 flex-1">
              <p className="text-emerald-600 uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Luxury Sanctuary</p>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">{selectedRoom.name}</h2>
              <div className="space-y-8 mb-12">
                <p className="text-stone-500 text-lg leading-relaxed font-light">{selectedRoom.description}</p>
                
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-stone-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Total Area</p>
                    <p className="text-xl font-serif">{selectedRoom.size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Occupancy</p>
                    <p className="text-xl font-serif">2 Adults</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-900 font-bold">Signature Features</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <ShieldCheck size={16} className="text-emerald-500" /> Private Pool
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Sparkles size={16} className="text-emerald-500" /> Butler Service
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Coffee size={16} className="text-emerald-500" /> Nespresso Machine
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedRoom(null);
                  navigate('/request-quote');
                }}
                className="w-full bg-stone-900 text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20"
              >
                Request Quote for this Villa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Concierge Section */}
      <div className="mt-20 md:mt-32 relative rounded-2xl overflow-hidden bg-stone-50 p-8 md:p-12 lg:p-24 text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Personalized Service</p>
          <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">Expert Guidance</h2>
          <p className="text-stone-500 text-sm md:text-lg mb-12 leading-relaxed font-light">Our luxury island specialists are available 24/7 to help you select the villa that best suits your group's needs and preferences.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/request-quote')}
              className="bg-stone-900 text-white px-10 py-5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20"
            >
              Speak to a Specialist
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
