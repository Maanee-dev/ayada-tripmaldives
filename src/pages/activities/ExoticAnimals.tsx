import React from 'react';
import { Sun, Heart, Camera, Wind, CheckCircle2, MapPin, Info, Waves, Bird, Turtle, Zap, Shell } from 'lucide-react';
import { ResortData } from '../../types';

interface ExoticAnimalsProps {
  resort: ResortData;
}

export default function ExoticAnimals({ resort }: ExoticAnimalsProps) {
  const species = [
    {
      title: "Reef Sharks",
      description: "Black tip reef shark and white tip reef shark are commonly found in lagoon and at the reef. Hammerheads and nurse shark are also found in the waters of Maldives. None of these are actually aggressive if you do not touch them.",
      location: "Anywhere in the shallow waters around Ayada Maldives, or every day 18:00 at our daily fish experience.",
      image: "https://images.unsplash.com/photo-1560275619-4662e36fa65c?auto=format&fit=crop&q=80&w=800", // Placeholder for d1fe15db1ff38ec564191b8dfffa866c.jpg
      icon: Waves
    },
    {
      title: "Birds",
      description: "The most commonly seen sea birds are herons, cranes and seagulls. There are more than 12 species of herons, the most common being the grey heron (Ardea Cinerea Rectirostris) or Maakana in Dhivehi.",
      location: "Spot grey herons walking around the islands or standing motionless in shallow water. Their favorite location is the rocky beach near Ocean Breeze.",
      image: "https://images.unsplash.com/photo-1549402256-92836b1f1df7?auto=format&fit=crop&q=80&w=800", // Placeholder for birds.jpg
      icon: Bird
    },
    {
      title: "Turtles",
      description: "Five of the seven species of sea turtles can be found in the Maldives, with the two most common being the Hawksbill turtle and the Green Turtle, often sighted living on the reef.",
      location: "Encounter them while snorkeling or diving in the shallow waters surrounding Ayada Maldives. Ask our water-sport team for exact locations.",
      image: "https://images.unsplash.com/photo-1544551763-47a0159f963f?auto=format&fit=crop&q=80&w=800", // Placeholder for Hawksbill_Sea_Turtle...
      icon: Turtle
    },
    {
      title: "Fruit Bats",
      description: "You will see many of these harmless bats hanging from the trees, all around our jungle areas. Fruit bats mostly eat fruit juice and flower nectar.",
      location: "Spotted all around the island. Their distinct squeaking sound will sure draw your attention.",
      image: "https://images.unsplash.com/photo-1530041539828-114de669390e?auto=format&fit=crop&q=80&w=800", // Placeholder for DQLGWqaVAAEKsv-.jpg
      icon: Zap
    },
    {
      title: "Garden Lizards",
      description: "The Oriental Garden Lizard is also known as the 'Changeable Lizard', due to its wide variation in coloration and ability to change colors significantly during the breeding season.",
      location: "Sunbathing on pathways, hiding in lush vegetation, or climbing trees all around the island.",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800", // Placeholder for Garden lizards
      icon: Sun
    },
    {
      title: "Stingrays",
      description: "Not only stingrays, but eagle rays and further species can be seen frequently around the island. These creatures are best to be observed from a reasonable distance.",
      location: "Frequently seen near the arrival jetty and close to Ile de Joie - our wine and cheese specialty bar.",
      image: "https://images.unsplash.com/photo-1590534247854-e97d5e3fe367?auto=format&fit=crop&q=80&w=800", // Placeholder for 30046351757_...
      icon: Waves
    },
    {
      title: "Crabs",
      description: "A large variety of crabs can be seen on our beaches and even in the inner island areas, from tiny hermit crabs to larger land crabs.",
      location: "Hermit crabs in white sands anywhere; land crabs in the evening or early morning around pathways and gardens.",
      image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800", // Placeholder for 57447344_...
      icon: Shell
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#faf9f6]">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-16 md:mb-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506953244844-97369d4122a0?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Exotic Animals of Ayada Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Tropical Wildlife</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Exotic Animals</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Introduction */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight text-stone-900">Island Inhabitants</h2>
          <p className="text-stone-600 text-xl font-light leading-relaxed">
            Our island is blessed with tropical wildlife, both on land and underwater. We have collected some of the most interesting species you will encounter during your stay at Ayada Maldives.
          </p>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-32">
          {species.map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-[400px] mb-8 overflow-hidden rounded-[32px] shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                  <item.icon className="text-emerald-600" size={24} />
                </div>
              </div>
              
              <div className="px-2">
                <h3 className="text-3xl font-serif text-stone-900 mb-4">{item.title}</h3>
                <p className="text-stone-600 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
                
                <div className="bg-stone-100 p-6 rounded-2xl border border-stone-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-emerald-600 shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">Where to see them?</p>
                      <p className="text-stone-700 text-sm font-medium leading-relaxed">
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-stone-900 rounded-[48px] p-12 md:p-24 text-center text-white mb-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10"><Camera size={100} /></div>
            <div className="absolute bottom-10 right-10"><Heart size={100} /></div>
          </div>
          
          <h3 className="text-3xl md:text-5xl font-serif mb-8 relative z-10">Respect Our Wildlife</h3>
          <p className="text-stone-400 text-lg font-light max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">
            We encourage all guests to observe our island's inhabitants from a respectful distance. Please do not touch or feed the wildlife to ensure their natural behaviors and health are maintained.
          </p>
          <div className="flex justify-center gap-4 relative z-10">
            <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs uppercase tracking-widest">
              <CheckCircle2 className="text-emerald-400" size={16} />
              Observe Only
            </div>
            <div className="flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs uppercase tracking-widest">
              <CheckCircle2 className="text-emerald-400" size={16} />
              No Feeding
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
