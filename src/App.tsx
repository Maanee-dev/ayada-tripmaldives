import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResortData, supabase } from './types';
import Layout from './components/Layout';
import Home from './pages/Home';
import Experiences from './pages/Experiences';
import Offers from './pages/Offers';
import Dining from './pages/Dining';
import Rooms from './pages/Rooms';

import { FormProvider } from './context/FormContext';

export default function App() {
  const [resort, setResort] = useState<ResortData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResort() {
      try {
        const { data, error } = await supabase
          .from('resorts')
          .select('*')
          .eq('slug', 'ayada-maldives')
          .single();

        if (error) throw error;
        setResort(data);
      } catch (err) {
        console.error('Error fetching resort:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchResort();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
          <p className="text-stone-400 text-sm uppercase tracking-widest font-bold">Loading Paradise...</p>
        </div>
      </div>
    );
  }

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-stone-900 font-serif text-xl">Resort not found.</p>
      </div>
    );
  }

  return (
    <Router>
      <FormProvider>
        <Layout resort={resort}>
          <Routes>
            <Route path="/" element={<Home resort={resort} />} />
            <Route path="/experiences" element={<Experiences resort={resort} />} />
            <Route path="/offers" element={<Offers resort={resort} />} />
            <Route path="/dining" element={<Dining resort={resort} />} />
            <Route path="/rooms" element={<Rooms resort={resort} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </FormProvider>
    </Router>
  );
}
