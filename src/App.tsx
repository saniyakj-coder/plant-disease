/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { DiagnosisResultDisplay } from './components/DiagnosisResult';
import { History } from './components/History';
import { DiagnosisResult } from './types';
import { diagnosePlant } from './services/gemini';
import { AlertCircle, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<DiagnosisResult | null>(null);
  const [history, setHistory] = useState<DiagnosisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load history from local storage
  useEffect(() => {
    const savedHistory = localStorage.getItem('plant_guard_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('plant_guard_history', JSON.stringify(history));
    }
  }, [history]);

  const handleUpload = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setCurrentResult(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      
      const base64Image = await base64Promise;
      const diagnosis = await diagnosePlant(base64Image, file.type);
      
      const newResult: DiagnosisResult = {
        ...diagnosis,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        imageUrl: base64Image
      };

      setCurrentResult(newResult);
      setHistory(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the image. Please try again with a clearer photo of the plant leaf.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleSelectHistory = (result: DiagnosisResult) => {
    setCurrentResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pb-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-leaf-200 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf-100 text-leaf-700 text-sm font-bold tracking-wide uppercase"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Plant Care
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-leaf-900 serif leading-tight"
            >
              Keep your plants <br />
              <span className="text-leaf-500 italic">thriving & healthy</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-leaf-600 max-w-2xl mx-auto"
            >
              Instant plant disease detection. Upload a photo of any leaf to get a professional diagnosis and personalized protection guide in seconds.
            </motion.p>
          </div>
        </section>

        {/* Action Section */}
        <section id="diagnose" className="px-4">
          <UploadZone onUpload={handleUpload} isAnalyzing={isAnalyzing} />
          
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {currentResult && <DiagnosisResultDisplay result={currentResult} />}
        </section>

        {/* Features Section */}
        {!currentResult && !isAnalyzing && (
          <section className="max-w-5xl mx-auto mt-24 px-4 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-leaf-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-leaf-50 flex items-center justify-center text-leaf-500">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-leaf-900">Global Database</h3>
              <p className="text-leaf-600 text-sm leading-relaxed">
                Trained on thousands of plant species and diseases from all over the world.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-leaf-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-leaf-900">Expert Advice</h3>
              <p className="text-leaf-600 text-sm leading-relaxed">
                Get scientifically-backed treatment plans and long-term prevention strategies.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-leaf-100 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-leaf-900">Instant Results</h3>
              <p className="text-leaf-600 text-sm leading-relaxed">
                Advanced computer vision provides diagnosis in seconds, right from your browser.
              </p>
            </div>
          </section>
        )}

        {/* History Section */}
        <History
          history={history}
          onSelect={handleSelectHistory}
          onDelete={handleDeleteHistory}
        />
      </main>

      <footer className="bg-leaf-900 py-12 px-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-leaf-400" />
            <span className="text-xl font-bold tracking-tight">PlantGuard AI</span>
          </div>
          <p className="text-leaf-400 text-sm">
            © {new Date().getFullYear()} PlantGuard AI. Empowering gardeners worldwide.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-leaf-400 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-leaf-400 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-leaf-400 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
