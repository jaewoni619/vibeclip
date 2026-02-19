"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useToast } from "@/components/ui/Toast";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ReferenceImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ReferenceImageUploader({
  images,
  onImagesChange,
  maxImages = 4,
}: ReferenceImageUploaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.startsWith("blob:")) URL.revokeObjectURL(img);
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast("JPG, PNG, WebP 이미지만 업로드 가능합니다", "error");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast("파일 크기는 10MB 이하만 가능합니다", "error");
        return;
      }
      if (images.length >= maxImages) {
        toast(`참고 이미지는 최대 ${maxImages}장까지 가능합니다`, "error");
        return;
      }
      const url = URL.createObjectURL(file);
      onImagesChange([...images, url]);
    },
    [images, maxImages, onImagesChange, toast]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFile]
  );

  const handleRemove = useCallback(
    (idx: number) => {
      const img = images[idx];
      if (img.startsWith("blob:")) URL.revokeObjectURL(img);
      onImagesChange(images.filter((_, i) => i !== idx));
    },
    [images, onImagesChange]
  );

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
      >
        <span>참고 이미지 (선택사항) {images.length > 0 && `· ${images.length}장`}</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 4.5l3 3 3-3" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`참고 이미지 ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  onClick={() => handleRemove(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground/70 backdrop-blur-sm transition-colors hover:bg-red-500/20 hover:text-red-400"
                  aria-label={`참고 이미지 ${i + 1} 삭제`}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="1" y1="1" x2="7" y2="7" />
                    <line x1="7" y1="1" x2="1" y2="7" />
                  </svg>
                </button>
              </div>
            ))}

            {images.length < maxImages && (
              <button
                onClick={() => inputRef.current?.click()}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-foreground/20 transition-colors hover:border-foreground/30 hover:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                aria-label="참고 이미지 추가"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            )}
          </div>

          <p className="mt-2 text-[10px] text-foreground/25">
            영상 스타일의 참고가 될 이미지를 첨부하세요 (최대 {maxImages}장)
          </p>

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
      )}
    </div>
  );
}
