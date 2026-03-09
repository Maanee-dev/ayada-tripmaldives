import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Welcome to TRIPMALDIVES. How can I assist you with your luxury getaway today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are a luxury travel assistant for TRIPMALDIVES, a performance brand of Maldives Serenity Travels. You are helpful, sophisticated, and knowledgeable about luxury resorts in the Maldives, specifically Ayada Maldives. Keep responses concise and elegant.",
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "I apologize, I'm having trouble connecting right now. Please try again or contact our specialists." }]);
    } catch (error) {
      console.error('ChatBot Error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm currently resting in paradise. Please try again later or use our WhatsApp support." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-24 md:right-8 z-[100] w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 md:bottom-40 md:right-8 z-[100] w-[calc(100vw-3rem)] md:w-96 h-[500px] bg-white rounded-[2rem] shadow-2xl border border-stone-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-stone-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="font-serif text-lg">Island Concierge</h4>
                <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles size={10} /> Powered by AI
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none' 
                    : 'bg-stone-50 text-stone-600 rounded-tl-none border border-stone-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-stone-50 p-4 rounded-2xl rounded-tl-none border border-stone-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-stone-100 bg-stone-50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about Ayada Maldives..." 
                className="w-full pl-4 pr-12 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none text-sm"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-stone-900 text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
