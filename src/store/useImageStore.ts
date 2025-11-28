import { create } from 'zustand';

interface ImageState {
  imageData: string | null; // Base64 de la imagen
  analysisData: string | null; // Descripción de Gemini
  setImage: (data: string) => void;
  setAnalysis: (data: string) => void;
  reset: () => void;
}

export const useImageStore = create<ImageState>((set) => ({
  imageData: null,
  analysisData: null,

  setImage: (data) => set({ imageData: data }),
  setAnalysis: (data) => set({ analysisData: data }),
  reset: () => set({ imageData: null, analysisData: null }),
}));