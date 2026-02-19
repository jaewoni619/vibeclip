"use client";

import { Template, CreationMode } from "@/types";
import { useToast } from "@/components/ui/Toast";

interface ResultViewerProps {
  template?: Template;
  promptText?: string;
  mode: CreationMode;
  onTryAnother: () => void;
  onGenerateAgain: () => void;
}

export default function ResultViewer({
  template,
  promptText,
  mode,
  onTryAnother,
  onGenerateAgain,
}: ResultViewerProps) {
  const { toast } = useToast();

  const handleDownload = () => {
    toast("다운로드 기능은 정식 출시 후 제공됩니다", "info");
  };

  const handleShare = async () => {
    const title = mode === "template" && template
      ? `ClipArena - ${template.name}`
      : "ClipArena AI 영상";
    const text = mode === "template" && template
      ? `${template.name} 영상을 ClipArena에서 만들어봤어요!`
      : "AI로 만든 영상을 ClipArena에서 확인하세요!";

    const shareData = { title, text, url: window.location.origin };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      toast("링크가 클립보드에 복사되었습니다!", "success");
    }
  };

  const bgStyle = mode === "template" && template
    ? { background: template.gradient }
    : { background: "linear-gradient(135deg, #0A1A2F 0%, #1A0A2F 30%, #0A2A1F 60%, #0A0A2F 100%)" };

  return (
    <div className="animate-fade-in-up">
      {/* Video player placeholder */}
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl"
        style={bgStyle}
      >
        <div className="absolute left-3 top-3 rounded-full bg-cyan/20 px-3 py-1 text-xs font-bold text-cyan backdrop-blur-sm">
          생성 완료
        </div>
        <div className="absolute bottom-3 right-3 rounded bg-background/70 px-2 py-0.5 text-xs text-foreground/60 backdrop-blur-sm">
          0:05
        </div>

        <div className="text-center px-6">
          {mode === "template" && template ? (
            <>
              <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <p className="font-[family-name:var(--font-display)] text-xl font-bold text-white/80">
                {template.name}
              </p>
            </>
          ) : (
            <p className="font-[family-name:var(--font-display)] text-xl font-bold text-white/80">
              AI 생성 영상
            </p>
          )}

          {mode === "prompt" && promptText && (
            <p className="mx-auto mt-2 max-w-md text-sm text-white/40 line-clamp-2">
              &ldquo;{promptText}&rdquo;
            </p>
          )}

          <p className="mt-1 text-sm text-white/50">
            생성된 영상 미리보기
          </p>

          <button
            className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="영상 재생"
            onClick={() => toast("데모 버전에서는 영상 재생을 지원하지 않습니다", "info")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan px-4 py-3 text-sm font-bold text-background transition-all hover:bg-cyan/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          다운로드
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          공유하기
        </button>
        <button
          onClick={onGenerateAgain}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          다시 생성
        </button>
        <button
          onClick={onTryAnother}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground/70 transition-all hover:border-foreground/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          새로 만들기
        </button>
      </div>
    </div>
  );
}
