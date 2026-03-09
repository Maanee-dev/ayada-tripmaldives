import React, { useState, useEffect } from 'react';
import { Waves, Sparkles, Gift, Plane, ChevronRight, Clock, Tag, Info, CheckCircle2 } from 'lucide-react';
import { ResortData, Offer, supabase } from '../types';
import { useForm } from '../context/FormContext';

interface OffersProps {
  resort: ResortData;
}

export default function Offers({ resort }: OffersProps) {
  const { setShowForm } = useForm();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data, error } = await supabase
          .from('offers')
          .select('*')
          .eq('resort_id', resort.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOffers(data || []);
      } catch (err) {
        console.error('Error fetching offers:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, [resort.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="mb-20 text-center">
        <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Limited Time Opportunities</p>
        <h1 className="text-5xl lg:text-7xl font-serif mb-6">Exclusive Island Offers</h1>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover a collection of curated experiences and exceptional value, designed to make your stay at {resort.name} even more unforgettable.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className="group relative bg-white rounded-[3rem] overflow-hidden border border-stone-100 hover:border-stone-200 transition-all shadow-xl shadow-stone-200/20"
          >
            <div className="aspect-[16/9] overflow-hidden relative">
              <img 
                src={offer.image} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={offer.title} 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900 shadow-sm">
                  {offer.category}
                </div>
                <div className="bg-emerald-500/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-sm flex items-center gap-1">
                  <Tag size={10} /> {offer.discount.split(' ')[0]}
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-serif text-white mb-2">{offer.title}</h2>
                <div className="flex items-center gap-4 text-white/70 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12} /> Valid until {new Date(offer.expiry_date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="p-10">
              <p className="text-stone-500 leading-relaxed mb-8 line-clamp-3">{offer.description}</p>
              
              <div className="space-y-4 mb-10">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 flex items-center gap-2">
                  <Sparkles size={14} className="text-emerald-500" /> Key Inclusions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {offer.inclusions.slice(0, 4).map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-500">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-stone-100">
                <button 
                  onClick={() => setSelectedOffer(offer)}
                  className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2"
                >
                  <Info size={14} /> Full Details
                </button>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-stone-800 transition-all flex items-center gap-2"
                >
                  Book Now <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Offer Details */}
      {selectedOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedOffer(null)} />
          <div className="relative bg-white w-full max-w-4xl max-h-full overflow-y-auto rounded-[3rem] shadow-2xl">
            <button 
              onClick={() => setSelectedOffer(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors z-10"
            >
              ×
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto relative">
                <img src={selectedOffer.image} className="w-full h-full object-cover" alt={selectedOffer.title} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-stone-900/20" />
              </div>
              <div className="p-10 lg:p-16">
                <p className="text-emerald-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">{selectedOffer.category}</p>
                <h2 className="text-4xl font-serif mb-6">{selectedOffer.title}</h2>
                <p className="text-stone-500 mb-8 leading-relaxed">{selectedOffer.description}</p>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4">What's Included</h4>
                    <ul className="space-y-3">
                      {selectedOffer.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                          <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Dining</h4>
                    <p className="text-sm text-stone-500 leading-relaxed">{selectedOffer.dining}</p>
                  </div>

                  <div className="p-6 bg-stone-50 rounded-3xl">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3">Terms & Conditions</h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed italic">{selectedOffer.terms_and_conditions}</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedOffer(null);
                    setShowForm(true);
                  }}
                  className="w-full mt-12 bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all"
                >
                  Inquire About This Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfers Section */}
      <div className="bg-stone-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
        <Waves className="absolute -top-20 -right-20 text-white/5 w-96 h-96" />
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Seamless Arrival</p>
          <h2 className="text-5xl font-serif mb-8">Island Transfers</h2>
          <p className="text-stone-400 text-lg leading-relaxed">
            Your journey to paradise is handled with the utmost care. From the moment you land at Velana International Airport, our team is there to guide you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {resort.transfers.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] text-center hover:bg-white/10 transition-all group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Plane size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-serif mb-4">{t.replace(/_/g, ' ')}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Enjoy a scenic 50-minute domestic flight followed by a 45-minute luxury speedboat journey to our private island.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
