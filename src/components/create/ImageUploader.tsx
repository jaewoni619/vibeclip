"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ImageUploaderProps {
  imageA: string | null;
  imageB: string | null;
  onImageA: (url: string | null) => void;
  onImageB: (url: string | null) => void;
}

function UploadSlot({
  label,
  image,
  onImage,
}: {
  label: string;
  image: string | null;
  onImage: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (image && image.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const validateFile = useCallback((file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast("JPG, PNG, WebP 이미지만 업로드 가능합니다", "error");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast("파일 크기는 10MB 이하만 가능합니다", "error");
      return false;
    }
    return true;
  }, [toast]);

  const handleFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return;
      if (image && image.startsWith("blob:")) {
        URL.revokeObjectURL(image);
      }
      const url = URL.createObjectURL(file);
      onImage(url);
    },
    [onImage, validateFile, image]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFile]
  );

  const handleRemove = useCallback(() => {
    if (image && image.startsWith("blob:")) {
      URL.revokeObjectURL(image);
    }
    onImage(null);
  }, [image, onImage]);

  if (image) {
    return (
      <div className="relative flex-1">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-cyan/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={label}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-sm text-foreground/70 backdrop-blur-sm transition-colors hover:bg-red-500/20 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            aria-label={`${label} 이미지 삭제`}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="10" y2="10" />
              <line x1="10" y1="2" x2="2" y2="10" />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs font-medium text-foreground/50">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
          isDragging
            ? "border-cyan bg-cyan/5 scale-[1.02]"
            : "border-border hover:border-foreground/30 hover:bg-surface/50"
        }`}
        aria-label={`${label} 이미지 업로드`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/20">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-xs font-medium text-foreground/40">{label}</span>
        <span className="text-[10px] text-foreground/25">
          클릭 또는 드래그
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  );
}

export default function ImageUploader({
  imageA,
  imageB,
  onImageA,
  onImageB,
}: ImageUploaderProps) {
  return (
    <div className="flex items-center gap-4">
      <UploadSlot label="이미지 1" image={imageA} onImage={onImageA} />

      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="h-8 w-px bg-border" />
      </div>

      <UploadSlot label="이미지 2" image={imageB} onImage={onImageB} />
    </div>
  );
}
