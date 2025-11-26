"use client";

import { Dropzone } from "@/components/dropzone/dropzone";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 text-gray-900 font-sans">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-800">
          AI Avatar Generator
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sube tu mejor selfie para transformarla
        </p>

        <Dropzone value={file} onChange={setFile} />

        <button
          disabled={!file}
          className="w-full mt-6 py-3.5 px-6 bg-violet-600 hover:bg-violet-700 
            text-white font-bold rounded-xl shadow-lg shadow-violet-200 
            transition-all transform active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {file ? "Analizar Foto ✨" : "Esperando imagen..."}
        </button>
      </div>
    </main>
  );
}
