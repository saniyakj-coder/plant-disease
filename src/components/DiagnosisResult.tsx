import React from 'react';
import { CheckCircle2, AlertCircle, Info, ShieldCheck, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { DiagnosisResult } from '../types';

interface DiagnosisResultDisplayProps {
  result: DiagnosisResult;
}

export const DiagnosisResultDisplay: React.FC<DiagnosisResultDisplayProps> = ({ result }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-12 space-y-8"
    >
      {/* Hero Result Section */}
      <div className="bg-white rounded-3xl shadow-xl shadow-leaf-100/50 overflow-hidden border border-leaf-100">
        <div className="md:flex">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src={result.imageUrl}
              alt="Analyzed leaf"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md text-white font-semibold shadow-lg ${result.isHealthy ? 'bg-emerald-500/80' : 'bg-red-500/80'}`}>
                {result.isHealthy ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                {result.isHealthy ? 'Healthy' : 'Diseased'}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-400">Plant Species</span>
                <span className="text-xs font-bold text-leaf-500 bg-leaf-50 px-2 py-1 rounded">
                  {Math.round(result.confidence * 100)}% Confidence
                </span>
              </div>
              <h2 className="text-3xl font-bold text-leaf-900 serif">{result.plantName}</h2>
            </div>

            {!result.isHealthy && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">Detected Condition</span>
                <h3 className="text-xl font-semibold text-red-600 mt-1">{result.diseaseName}</h3>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-leaf-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-leaf-50 flex items-center justify-center text-leaf-500">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-leaf-400">Status</p>
                  <p className="text-sm font-semibold">{result.isHealthy ? 'Optimal' : 'Needs Attention'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-leaf-50 flex items-center justify-center text-leaf-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-leaf-400">Protection</p>
                  <p className="text-sm font-semibold">{result.isHealthy ? 'Preventive' : 'Curative'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Symptoms & Causes */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl border border-leaf-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-leaf-50 flex items-center justify-center text-leaf-500">
                <Info className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-leaf-900">Symptoms & Observations</h4>
            </div>
            <ul className="space-y-2">
              {result.symptoms.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-leaf-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-300 mt-1.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-3xl border border-leaf-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-leaf-900">Potential Causes</h4>
            </div>
            <ul className="space-y-2">
              {result.causes.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-leaf-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-300 mt-1.5 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Treatment & Prevention */}
        <div className="space-y-6">
          <section className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-emerald-900">Treatment Plan</h4>
            </div>
            <ul className="space-y-2">
              {result.treatment.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-leaf-900 p-6 rounded-3xl shadow-sm text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-leaf-700 flex items-center justify-center text-leaf-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold">Prevention Guide</h4>
            </div>
            <ul className="space-y-2">
              {result.prevention.map((p, i) => (
                <li key={i} className="flex gap-3 text-sm text-leaf-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-leaf-500 mt-1.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
