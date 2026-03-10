import React from 'react';
import { Sun, Heart, Wind, ShieldCheck, CheckCircle2, Leaf, Droplets, Flower2, TreePine, Truck } from 'lucide-react';
import { ResortData } from '../../types';

interface SecretGardenProps {
  resort: ResortData;
}

export default function SecretGarden({ resort }: SecretGardenProps) {
  const gardenSections = [
    {
      title: "Hydroponic",
      description: "We grow salads in our hydroponic plantation. Hydroponics is a subset of hydro-culture and is a method, circulating mineral nutrient solutions in a closed system, in water, without soil.",
      icon: Droplets,
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800", // Placeholder for IMG_2563.JPG
      alt: "Hydroponic plantation"
    },
    {
      title: "Banana Plantation",
      description: "A variety of Maldivian banana is grown in our garden, providing fresh, local fruit for our guests.",
      icon: Sun,
      image: "https://images.unsplash.com/photo-1528532651404-9a5d2a49e0ca?auto=format&fit=crop&q=80&w=800", // Placeholder for banana.jpg
      alt: "Banana plantation"
    },
    {
      title: "Vegetable Garden",
      description: "A wide selection of vegetables and herbs can be found at our Secret Garden, such as basil, mint, tomato, eggplants, Maldivian chilly or spinach leaves.",
      icon: Leaf,
      image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800", // Placeholder for eggplant.jpg / tomato plant.jpg
      alt: "Vegetable garden"
    },
    {
      title: "Orchid House",
      description: "The place where we nurse the orchids, getting them ready to beautify our island with their exotic colors.",
      icon: Flower2,
      image: "https://images.unsplash.com/photo-1599236480225-894656970028?auto=format&fit=crop&q=80&w=800", // Placeholder for IMG_2529.JPG
      alt: "Orchid house"
    },
    {
      title: "Nursery",
      description: "The area used to nurse plants and trees to decorate roads and paths around our tropical paradise.",
      icon: TreePine,
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800", // Placeholder for IMG_2572.JPG
      alt: "Plant nursery"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700 bg-[#f5f5f0]">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] -mx-6 md:-mx-12 lg:-mx-16 -mt-16 md:-mt-24 mb-16 md:mb-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
          alt="Secret Garden Maldives"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-900/40 flex flex-col justify-end p-6 md:p-16 lg:p-24">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-emerald-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4">Organic Sanctuary</p>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-[0.9] tracking-tighter">Secret Garden</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-32">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight text-stone-900">From Garden to Table</h2>
            <p className="text-stone-600 text-lg font-light leading-relaxed mb-8">
              The Secret Garden at Ayada Maldives is a heaven of organic vegetables, herbs and fruits grown in the heart of the island. Our head gardener is passionately cooperating with our executive chef to deliver fresh 0-km produce, from the garden to our guest's plates.
            </p>
            <div className="space-y-4">
              {['Organic Produce', 'Sustainable Practices', 'Hydroponic Plantation', '0-km Freshness'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-900 font-medium">
                  <CheckCircle2 className="text-emerald-600" size={20} />
                  <span className="text-sm uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200"
              className="rounded-[32px] shadow-2xl"
              alt="Fresh garden produce"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl hidden md:block max-w-xs border border-stone-100">
              <p className="font-serif text-xl text-stone-900 mb-2 italic">"Passionately grown, freshly served."</p>
              <p className="text-stone-500 text-sm">— Head Gardener</p>
            </div>
          </div>
        </div>

        {/* Garden Sections Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif text-stone-900 mb-4">Explore Our Garden</h3>
            <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gardenSections.map((section, index) => (
              <div key={index} className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100 group">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={section.image} 
                    alt={section.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl">
                    <section.icon className="text-emerald-600" size={24} />
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-serif text-stone-900 mb-4">{section.title}</h4>
                  <p className="text-stone-600 text-sm font-light leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Island Farming Section */}
        <div className="bg-emerald-900 rounded-[48px] p-8 md:p-16 lg:p-24 text-white mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <Leaf size={400} className="rotate-45 translate-x-1/2 -translate-y-1/4" />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-800 rounded-2xl">
                <Truck className="text-emerald-400" size={32} />
              </div>
              <h3 className="text-3xl md:text-5xl font-serif">Local Island Farming</h3>
            </div>
            
            <div className="space-y-6 text-emerald-50/80 text-lg font-light leading-relaxed">
              <p>
                Our garden has limited production, so we ship fresh local produce, mainly mango, watermelon and Maldivian chilly, from the nearby local island collective.
              </p>
              <p>
                Our chef and gardeners visit the farm regularly to ensure quality and production standards. We supply seeds, support farmers to improve farming techniques and eventually buy their produce that will be shipped back to Ayada Maldives.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              {['Mango', 'Watermelon', 'Maldivian Chilly'].map((item) => (
                <span key={item} className="px-6 py-2 bg-emerald-800/50 border border-emerald-700 rounded-full text-sm uppercase tracking-widest font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
