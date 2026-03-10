import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUpload, isAnalyzing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    disabled: isAnalyzing,
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer transition-all duration-300",
          "border-2 border-dashed rounded-3xl p-12 text-center",
          isDragActive ? "border-leaf-500 bg-leaf-50" : "border-leaf-200 hover:border-leaf-400 bg-white",
          isAnalyzing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            isDragActive ? "bg-leaf-500 text-white" : "bg-leaf-100 text-leaf-500"
          )}>
            {isDragActive ? <Upload className="w-10 h-10" /> : <Camera className="w-10 h-10" />}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-leaf-900 mb-2">
              {isDragActive ? "Drop your image here" : "Upload a leaf photo"}
            </h3>
            <p className="text-leaf-500 max-w-xs mx-auto">
              Drag and drop an image of a plant leaf, or click to browse files.
            </p>
          </div>

          <div className="flex items-center gap-6 mt-4 text-sm font-medium text-leaf-400">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>JPG, PNG, WebP</span>
            </div>
            <div className="w-1 h-1 bg-leaf-200 rounded-full" />
            <span>Max 10MB</span>
          </div>
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-leaf-500 border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-leaf-700 animate-pulse">Analyzing plant health...</p>
          </div>
        )}
      </div>
    </div>
  );
};
