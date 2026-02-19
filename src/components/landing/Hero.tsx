"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { videoIdeas } from "@/data/templates";

type DemoPhase = "typing" | "ready" | "generating" | "result";

const demoSequences = [
  {
    prompt: "우주 정거장에서 바라본 지구의 일출, 시네마틱 카메라 워크",
    resultTitle: "우주 정거장의 일출",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    prompt: "지브리 스타일의 꽃밭을 걷는 소녀, 바람에 흔들리는 풀잎",
    resultTitle: "지브리 스타일 꽃밭",
    gradient: "linear-gradient(135deg, #1a2a1a 0%, #2a3a20 50%, #1a3020 100%)",
  },
  {
    prompt: "네온 도시에서 달리는 오토바이, 비 오는 밤의 추격전",
    resultTitle: "네온 도시 추격전",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2a1040 50%, #1a1a3e 100%)",
  },
  {
    prompt: "드래곤이 화염을 내뿜으며 하늘을 나는 판타지 장면",
    resultTitle: "드래곤의 비행",
    gradient: "linear-gradient(135deg, #2a1a0a 0%, #3a2010 50%, #2a1a1a 100%)",
  },
  {
    prompt: "맑은 바다 산호초 사이를 헤엄치는 거북이, 빛줄기",
    resultTitle: "산호초 바다의 거북이",
    gradient: "linear-gradient(135deg, #0a1a2a 0%, #0a2a3a 50%, #0a2a2a 100%)",
  },
];

type Depth = "far" | "mid" | "near";

interface CardPlacement {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  depth: Depth;
  animation: 1 | 2 | 3;
  delay: string;
}

const cardPlacements: CardPlacement[] = [
  { top: "6%", left: "3%", depth: "far", animation: 1, delay: "0s" },
  { top: "14%", right: "5%", depth: "mid", animation: 2, delay: "-8s" },
  { top: "28%", left: "2%", depth: "near", animation: 3, delay: "-4s" },
  { top: "8%", left: "28%", depth: "far", animation: 2, delay: "-12s" },
  { top: "22%", right: "2%", depth: "far", animation: 1, delay: "-16s" },
  { bottom: "32%", left: "4%", depth: "mid", animation: 3, delay: "-6s" },
  { bottom: "18%", right: "3%", depth: "near", animation: 1, delay: "-10s" },
  { bottom: "8%", left: "8%", depth: "far", animation: 2, delay: "-14s" },
  { top: "45%", right: "4%", depth: "mid", animation: 1, delay: "-3s" },
  { bottom: "6%", right: "12%", depth: "far", animation: 3, delay: "-18s" },
  { top: "5%", right: "25%", depth: "far", animation: 3, delay: "-20s" },
  { bottom: "14%", left: "22%", depth: "far", animation: 2, delay: "-9s" },
];

const depthStyles: Record<Depth, { opacity: string; scale: string; bg: string; border: string; text: string; fontSize: string; accent: string }> = {
  far: {
    opacity: "opacity-[0.35]",
    scale: "scale-[0.8]",
    bg: "bg-white/[0.03]",
    border: "border-white/[0.06]",
    text: "text-foreground/40",
    fontSize: "text-[11px]",
    accent: "bg-foreground/10",
  },
  mid: {
    opacity: "opacity-[0.50]",
    scale: "scale-[0.9]",
    bg: "bg-white/[0.04]",
    border: "border-white/[0.08]",
    text: "text-foreground/55",
    fontSize: "text-xs",
    accent: "bg-foreground/15",
  },
  near: {
    opacity: "opacity-[0.65]",
    scale: "scale-100",
    bg: "bg-white/[0.05]",
    border: "border-white/[0.10]",
    text: "text-foreground/70",
    fontSize: "text-sm",
    accent: "bg-foreground/20",
  },
};

export default function Hero() {
  const [seqIdx, setSeqIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("typing");

  const current = demoSequences[seqIdx];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charIdx < current.prompt.length) {
        timer = setTimeout(() => setCharIdx((prev) => prev + 1), 40);
      } else {
        timer = setTimeout(() => setPhase("ready"), 500);
      }
    } else if (phase === "ready") {
      timer = setTimeout(() => setPhase("generating"), 1000);
    } else if (phase === "generating") {
      timer = setTimeout(() => setPhase("result"), 2000);
    } else if (phase === "result") {
      timer = setTimeout(() => {
        setSeqIdx((prev) => (prev + 1) % demoSequences.length);
        setCharIdx(0);
        setPhase("typing");
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [phase, charIdx, current.prompt.length]);

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-grid">
      {/* Floating video idea cards — background layer (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {videoIdeas.map((idea, i) => {
          const placement = cardPlacements[i % cardPlacements.length];
          const depth = depthStyles[placement.depth];

          return (
            <Link
              key={idea.id}
              href={`/create?prompt=${encodeURIComponent(idea.prompt)}`}
              className={`pointer-events-auto absolute rounded-lg border backdrop-blur-sm px-3 py-2 transition-all duration-500 ${depth.opacity} ${depth.scale} ${depth.bg} ${depth.border} animate-float-${placement.animation} hover:opacity-80 hover:border-white/20`}
              style={{
                top: placement.top,
                bottom: placement.bottom,
                left: placement.left,
                right: placement.right,
                animationDelay: placement.delay,
                maxWidth: placement.depth === "far" ? "160px" : placement.depth === "mid" ? "180px" : "200px",
              }}
              tabIndex={-1}
            >
              <div className="flex items-start gap-1.5">
                <div className={`mt-0.5 h-full w-[2px] shrink-0 rounded-full ${depth.accent}`} style={{ minHeight: "16px" }} />
                <span className={`leading-snug ${depth.text} ${depth.fontSize}`}>
                  {idea.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile: show fewer cards */}
      <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden="true">
        {videoIdeas.slice(0, 5).map((idea, i) => {
          const mobilePlacements: CardPlacement[] = [
            { top: "5%", left: "3%", depth: "far", animation: 1, delay: "0s" },
            { top: "12%", right: "3%", depth: "far", animation: 2, delay: "-8s" },
            { bottom: "22%", left: "5%", depth: "far", animation: 3, delay: "-4s" },
            { bottom: "10%", right: "4%", depth: "far", animation: 1, delay: "-12s" },
            { top: "30%", right: "2%", depth: "far", animation: 2, delay: "-16s" },
          ];
          const placement = mobilePlacements[i];
          const depth = depthStyles[placement.depth];

          return (
            <Link
              key={idea.id}
              href={`/create?prompt=${encodeURIComponent(idea.prompt)}`}
              className={`pointer-events-auto absolute rounded-lg border backdrop-blur-sm px-2 py-1.5 transition-all duration-500 ${depth.opacity} ${depth.scale} ${depth.bg} ${depth.border} animate-float-${placement.animation}`}
              style={{
                top: placement.top,
                bottom: placement.bottom,
                left: placement.left,
                right: placement.right,
                animationDelay: placement.delay,
                maxWidth: "130px",
              }}
              tabIndex={-1}
            >
              <span className="text-[10px] leading-snug text-foreground/30">
                {idea.title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-1.5 text-sm text-foreground/70">
          AI 영상 생성 플랫폼
        </div>

        {/* Main heading */}
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          상상하는 모든 것을
          <br />
          <span className="text-gradient">AI 영상으로</span> 만들기
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/60 sm:text-xl">
          텍스트 프롬프트 하나로 몇 초 만에 고품질 AI 영상 생성.
          <br className="hidden sm:block" />
          프롬프트가 어렵다면? 템플릿으로 바로 시작하세요.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-xl bg-lime px-8 py-4 text-base font-bold text-background transition-transform hover:scale-105"
          >
            무료로 영상 만들기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-1">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-4 text-base font-medium text-foreground/80 transition-all hover:border-foreground/20 hover:text-foreground"
          >
            갤러리 보기
          </Link>
        </div>

        {/* Credit info */}
        <p className="mt-6 text-sm text-foreground/40">
          무료 영상 2개, 회원가입 불필요
        </p>

        {/* Interactive demo window */}
        <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-border">
          {/* Window title bar */}
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
            </div>
            <span className="ml-2 text-xs text-foreground/30">ClipArena</span>
          </div>

          {/* Demo content area */}
          <div
            className="p-6 sm:p-8"
            style={{
              background: "linear-gradient(135deg, #0A0A1F 0%, #0F1228 50%, #0A0A1F 100%)",
            }}
          >
            {phase === "result" ? (
              /* Result display */
              <div key={seqIdx} className="animate-fade-in-up">
                {/* Video thumbnail */}
                <div
                  className="relative aspect-video overflow-hidden rounded-xl"
                  style={{ background: current.gradient }}
                >
                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white/70">
                    0:05
                  </span>

                  {/* Completion badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-cyan/20 px-2.5 py-1 text-xs font-bold text-cyan">
                    생성 완료
                  </span>
                </div>

                {/* Result info */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-left">
                    <h4 className="text-sm font-bold">{current.resultTitle}</h4>
                    <p className="mt-0.5 text-xs text-foreground/40">방금 생성됨</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground/50">
                      다운로드
                    </span>
                    <span className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground/50">
                      공유
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Input area */
              <div className="space-y-4">
                {/* Prompt input */}
                <div
                  className={`rounded-xl border bg-background/40 px-5 py-4 backdrop-blur-sm transition-colors duration-300 ${
                    phase === "ready" ? "border-cyan/30" : "border-foreground/10"
                  }`}
                >
                  <p className="min-h-[3rem] text-left text-sm leading-relaxed text-foreground/60 sm:text-base">
                    {current.prompt.slice(0, charIdx)}
                    {phase === "typing" && (
                      <span className="animate-cursor-blink ml-0.5 inline-block h-[1.1em] w-[2px] bg-cyan align-text-bottom" />
                    )}
                  </p>
                </div>

                {/* Options row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/40">
                    시네마틱
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/40">
                    16:9
                  </span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/40">
                    5초
                  </span>
                  <div className="flex-1" />
                  <span className="text-xs text-foreground/20">
                    {charIdx}/{current.prompt.length}
                  </span>
                </div>

                {/* Generate button / Progress bar */}
                {phase === "generating" ? (
                  <div className="relative h-11 overflow-hidden rounded-lg bg-foreground/5">
                    <div className="demo-progress-bar absolute inset-y-0 left-0 rounded-lg bg-cyan" />
                    <div className="relative z-10 flex h-full items-center justify-center">
                      <span className="text-xs font-bold text-foreground/60">생성 중...</span>
                    </div>
                  </div>
                ) : (
                  <button
                    className={`w-full rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                      phase === "ready"
                        ? "bg-foreground text-background"
                        : "bg-foreground/80 text-background/80"
                    }`}
                    tabIndex={-1}
                  >
                    영상 생성하기
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
