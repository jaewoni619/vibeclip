"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { promptPlaceholders } from "@/data/templates";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

export default function PromptInput({
  value,
  onChange,
  maxLength = 500,
}: PromptInputProps) {
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const minH = 128; // ~4 lines
    const maxH = 280; // ~10 lines
    el.style.height = Math.min(Math.max(el.scrollHeight, minH), maxH) + "px";
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  // Rotate placeholder every 4 seconds
  useEffect(() => {
    if (value.length > 0) return;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setPlaceholderIdx((prev) => (prev + 1) % promptPlaceholders.length);
        setIsFading(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="prompt-glow relative rounded-2xl">
      <div className="relative rounded-2xl border border-border bg-surface transition-colors focus-within:border-cyan/40">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value);
            }
          }}
          placeholder={isFading ? "" : promptPlaceholders[placeholderIdx]}
          className="w-full resize-none bg-transparent px-5 pt-5 pb-10 text-base leading-relaxed text-foreground placeholder:text-foreground/25 focus:outline-none"
          rows={4}
          aria-label="영상 프롬프트 입력"
        />

        {/* Character counter */}
        <div className="absolute bottom-3 right-4 text-xs text-foreground/30">
          {value.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}
