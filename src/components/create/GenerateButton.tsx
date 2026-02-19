"use client";

import { CreationMode } from "@/types";

interface GenerateButtonProps {
  canGenerate: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
  creditCost?: number;
  mode: CreationMode;
}

export default function GenerateButton({
  canGenerate,
  isGenerating,
  onGenerate,
  creditCost = 10,
  mode,
}: GenerateButtonProps) {
  const disabled = !canGenerate || isGenerating;

  return (
    <div>
      <button
        onClick={onGenerate}
        disabled={disabled}
        className={`w-full rounded-xl py-4 text-base font-bold transition-all ${
          disabled
            ? "cursor-not-allowed bg-foreground/10 text-foreground/30"
            : "bg-lime text-background hover:scale-[1.02]"
        }`}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
            생성 중...
          </span>
        ) : (
          <span>영상 생성하기</span>
        )}
      </button>

      <p className="mt-2 text-center text-xs text-foreground/30">
        {canGenerate
          ? `크레딧 ${creditCost}개 사용 (잔여 20개)`
          : mode === "prompt"
            ? "프롬프트를 입력해주세요 (최소 10자)"
            : "템플릿을 선택해주세요"}
      </p>
    </div>
  );
}
