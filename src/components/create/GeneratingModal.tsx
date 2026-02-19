"use client";

import { useEffect, useState, useCallback } from "react";

const stages = [
  { text: "영상 생성 중...", duration: 1200 },
  { text: "스타일 적용 중...", duration: 1200 },
  { text: "색감 보정 중...", duration: 800 },
  { text: "거의 완성됐어요...", duration: 800 },
];

interface GeneratingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export default function GeneratingModal({ isOpen, onComplete }: GeneratingModalProps) {
  const [stage, setStage] = useState(0);

  const stableComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!isOpen) {
      setStage(0);
      return;
    }

    document.body.style.overflow = "hidden";

    let timer: ReturnType<typeof setTimeout>;
    let currentStage = 0;

    const advance = () => {
      currentStage++;
      if (currentStage >= stages.length) {
        stableComplete();
        return;
      }
      setStage(currentStage);
      timer = setTimeout(advance, stages[currentStage].duration);
    };

    timer = setTimeout(advance, stages[0].duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen, stableComplete]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="영상 생성 중"
    >
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
        {/* Loading spinner */}
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-border border-t-cyan" />

        <p className="mb-6 text-lg font-medium text-foreground/80">
          {stages[stage].text}
        </p>

        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div className="progress-bar-fill h-full rounded-full bg-cyan" />
        </div>

        <p className="mt-4 text-xs text-foreground/30">
          보통 몇 초면 완성됩니다
        </p>
      </div>
    </div>
  );
}
