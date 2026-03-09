import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ChatBot() {
  const whatsappNumber = "+96072509060";
  const message = "Hello! I'm interested in booking a luxury getaway to Ayada Maldives.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-24 md:right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full border-4 border-[#25D366] animate-pulse" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Chat with a Specialist
      </div>
    </a>
  );
}
