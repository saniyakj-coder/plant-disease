import React from 'react';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';
import { DiagnosisResult } from '../types';

interface HistoryProps {
  history: DiagnosisResult[];
  onSelect: (result: DiagnosisResult) => void;
  onDelete: (id: string) => void;
}

export const History: React.FC<HistoryProps> = ({ history, onSelect, onDelete }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-16" id="history">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-leaf-500" />
          <h3 className="text-xl font-bold text-leaf-900">Recent Scans</h3>
        </div>
      </div>

      <div className="grid gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl p-4 border border-leaf-100 hover:border-leaf-300 transition-all cursor-pointer flex items-center gap-4 shadow-sm hover:shadow-md"
            onClick={() => onSelect(item)}
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <img
                src={item.imageUrl}
                alt={item.plantName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${item.isHealthy ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <h4 className="font-bold text-leaf-900 truncate">{item.plantName}</h4>
              </div>
              <p className="text-sm text-leaf-500 truncate">
                {item.isHealthy ? 'Healthy' : item.diseaseName} • {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="p-2 text-leaf-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <ChevronRight className="w-5 h-5 text-leaf-300 group-hover:text-leaf-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
