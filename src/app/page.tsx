"use client";

import { useState } from "react";
import { Dropzone } from "@/components/dropzone/dropzone";
import { useImageStore } from "@/store/useImageStore";
import { homePage } from "./styles/page-styles";
import { useRouter } from "next/navigation";
import Image from "next/image";
import errorIcon from "@/assets/icons/error.svg";
import spinnerIcon from "@/assets/icons/spinner.svg";

export default function Home() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setImage, setAnalysis } = useImageStore();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async (): Promise<void> => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(file);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Image,
          style: "simpsons",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo analizar la imagen");
      }

      setImage(base64Image);
      setAnalysis(data.message);

      router.push("/pick-style");
    } catch (err) {
      console.error("Error analizando imagen:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const styles = homePage({
    isAnalyzing,
    isButtonDisabled: !file || isAnalyzing,
  });

  return (
    <main className={styles.main()}>
      <div className={styles.container()}>
        <div className={styles.header()}>
          <h1 className={styles.title()}>AI Avatar Generator</h1>
          <p className={styles.subtitle()}>
            Sube tu mejor selfie para transformarla
          </p>
        </div>

        <div className={styles.dropzoneWrapper()}>
          <Dropzone value={file} onChange={setFile} />
        </div>

        {error && (
          <div className={styles.errorAlert()}>
            <Image
              src={errorIcon}
              alt="Error"
              className="w-5 h-5 min-w-[20px]"
              width={20}
              height={20}
            />
            <span>{error}</span>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={styles.button()}
        >
          {isAnalyzing ? (
            <>
              <Image
                src={spinnerIcon}
                alt="Cargando"
                className={styles.spinner()}
                width={20}
                height={20}
              />
              Analizando...
            </>
          ) : file ? (
            "Analizar Foto ✨"
          ) : (
            "Selecciona una imagen"
          )}
        </button>
      </div>
    </main>
  );
}
