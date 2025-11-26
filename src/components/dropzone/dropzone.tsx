"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import NextImage from "next/image";
import { dropzone } from "./dropzone-styles";

interface DropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  className?: string;
}

const MAX_FILE_SIZE_MB: number = 5;
const MIN_RESOLUTION: number = 512;

export function Dropzone({ value, onChange, className }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value && preview) {
      setPreview(null);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [value, preview]);

  const validateAndSet = useCallback(
    (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Solo imágenes (JPEG, PNG, WEBP).");
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`Máximo ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);

      const img = new Image();

      img.onload = () => {
        if (img.width < MIN_RESOLUTION || img.height < MIN_RESOLUTION) {
          setError(`Mínimo ${MIN_RESOLUTION}px.`);
          URL.revokeObjectURL(objectUrl);
        } else {
          setPreview(objectUrl);
          onChange(file);
        }
      };

      img.onerror = () => {
        setError("Archivo dañado.");
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    },
    [onChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) validateAndSet(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      validateAndSet(e.target.files[0]);
    }
    e.target.value = "";
  };

  const styles = dropzone({
    isDragging,
    isError: !!error,
    hasFile: !!preview,
  });

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      // Usamos styles.base() y le pasamos la clase extra
      className={styles.base({ className })}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleInputChange}
      />

      {/* ESTADO: CON FOTO */}
      {preview ? (
        <div className={styles.previewWrapper()}>
          <NextImage
            src={preview}
            alt="Vista previa"
            fill
            className={styles.previewImage()}
            unoptimized
          />
          <div className={styles.overlay()}>
            <p className={styles.overlayText()}>Cambiar foto</p>
          </div>
        </div>
      ) : (
        /* ESTADO: VACÍO */
        <div className={styles.textWrapper()}>
          <div className={styles.iconWrapper()}>
            <svg
              className={styles.iconSvg()}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className={styles.textMain()}>
              Arrastra tu foto o{" "}
              <span className={styles.textHighlight()}>haz clic</span>
            </p>
            <p className={styles.textSub()}>
              Máx {MAX_FILE_SIZE_MB}MB. Mín {MIN_RESOLUTION}px.
            </p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div
          className={styles.errorMessage()}
          onClick={(e) => e.stopPropagation()}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
