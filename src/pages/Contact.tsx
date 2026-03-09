import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Globe } from 'lucide-react';
import { ResortData } from '../types';

interface ContactProps {
  resort: ResortData;
}

export default function Contact({ resort }: ContactProps) {
  const contactInfo = [
    {
      title: "Email Us",
      value: "info@maldivesserenitytravels.com",
      icon: Mail,
      link: "mailto:info@maldivesserenitytravels.com"
    },
    {
      title: "Call Us",
      value: "+960 777 1234",
      icon: Phone,
      link: "tel:+9607771234"
    },
    {
      title: "WhatsApp",
      value: "+960 777 1234",
      icon: MessageCircle,
      link: "https://wa.me/9607771234"
    },
    {
      title: "Our Location",
      value: "Addu City, Maldives",
      icon: MapPin,
      link: "#"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto py-12 md:py-24">
        <div className="text-center mb-16 md:mb-24">
          <p className="text-emerald-600 uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-6">Get in Touch</p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif mb-10 leading-[0.9] tracking-tighter">Contact Us</h1>
          <p className="text-stone-500 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Our luxury specialists are available 24/7 to assist you with your booking and travel arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-8 md:p-16">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Subject</label>
                  <input 
                    type="text" 
                    placeholder="General Inquiry" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Message</label>
                  <textarea 
                    rows={6}
                    placeholder="How can we help you plan your dream holiday?" 
                    className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                <button className="w-full bg-stone-900 text-white py-5 rounded-xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-stone-900 rounded-3xl p-10 text-white shadow-xl">
              <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-6">Contact Details</h3>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 group"
                  >
                    <info.icon className="text-emerald-400 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">{info.title}</p>
                      <p className="text-sm font-medium group-hover:text-emerald-400 transition-colors">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 rounded-3xl p-10 border border-emerald-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Clock size={24} />
                </div>
                <h4 className="font-serif text-xl text-emerald-900">Always Available</h4>
              </div>
              <p className="text-emerald-800/70 text-sm leading-relaxed font-light">
                Our team is dedicated to providing you with the highest level of service. We aim to respond to all inquiries within 2 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
