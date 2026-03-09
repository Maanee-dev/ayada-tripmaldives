import React from 'react';
import { CheckCircle2, Waves, Sparkles, ChevronRight } from 'lucide-react';
import { ResortData } from '../types';
import { useForm } from '../context/FormContext';

interface ExperiencesProps {
  resort: ResortData;
}

export default function Experiences({ resort }: ExperiencesProps) {
  const { setShowForm } = useForm();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4">Island Experiences</h1>
        <p className="text-stone-400 uppercase tracking-[0.2em] text-xs font-bold">Unforgettable Moments at {resort.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif">Curated Activities</h2>
          <div className="space-y-6">
            {resort.features.map((feature, i) => (
              <div key={i} className="flex gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-100 hover:border-stone-900 transition-colors">
                <div className="text-stone-900 mt-1"><CheckCircle2 size={20} /></div>
                <div>
                  <p className="font-bold text-sm">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative rounded-3xl overflow-hidden h-[600px]">
          <img 
            src={resort.images[2]} 
            className="w-full h-full object-cover" 
            alt="Experience" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex flex-col justify-end p-8 text-white">
            <p className="text-xs uppercase tracking-widest font-bold mb-2 text-emerald-400">Signature Experience</p>
            <h3 className="text-2xl font-serif mb-4">Sunset Dhoni Cruise</h3>
            <p className="text-sm text-stone-300 leading-relaxed">Sail into the golden hour on a traditional Maldivian boat, accompanied by dolphins and refreshing cocktails.</p>
          </div>
        </div>
      </div>

      <div className="bg-stone-900 text-white p-12 rounded-[3rem] text-center">
        <Sparkles className="mx-auto mb-6 text-emerald-400" size={40} />
        <h2 className="text-3xl font-serif mb-4">Ready for Adventure?</h2>
        <p className="text-stone-400 mb-8 max-w-xl mx-auto">Our concierge team is ready to personalize your stay with exclusive excursions and private events.</p>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-white text-stone-900 px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-colors"
        >
          Inquire About Activities
        </button>
      </div>
    </div>
  );
}
