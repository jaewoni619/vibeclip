"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TemplateGrid from "@/components/create/TemplateGrid";
import ImageUploader from "@/components/create/ImageUploader";
import GenerateButton from "@/components/create/GenerateButton";
import GeneratingModal from "@/components/create/GeneratingModal";
import ResultViewer from "@/components/create/ResultViewer";
import PromptInput from "@/components/create/PromptInput";
import PromptSuggestions from "@/components/create/PromptSuggestions";
import ReferenceImageUploader from "@/components/create/ReferenceImageUploader";
import DurationSelector from "@/components/create/DurationSelector";
import { Category, Template, CreationMode, VideoStyle, VideoFormat, Duration } from "@/types";

const styles: { id: VideoStyle; label: string }[] = [
  { id: "cinematic", label: "시네마틱" },
  { id: "anime", label: "애니메" },
  { id: "pixel", label: "픽셀아트" },
  { id: "ink", label: "수묵화" },
  { id: "cartoon", label: "카툰" },
];

const formats: { id: VideoFormat; label: string; desc: string }[] = [
  { id: "9:16", label: "9:16", desc: "릴스" },
  { id: "16:9", label: "16:9", desc: "유튜브" },
  { id: "1:1", label: "1:1", desc: "피드" },
];

function CreatePageInner() {
  const searchParams = useSearchParams();
  const urlPrompt = searchParams.get("prompt") || "";

  // Shared state
  const [mode, setMode] = useState<CreationMode>("prompt");
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle>("cinematic");
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>("9:16");
  const [selectedDuration, setSelectedDuration] = useState<Duration>("5s");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Prompt mode state — initialize from URL param if present
  const [promptText, setPromptText] = useState(urlPrompt);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);

  // Template mode state
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("battle");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templatePromptText, setTemplatePromptText] = useState("");
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);

  // When template is selected, populate the editable prompt
  const handleTemplateSelect = useCallback((template: Template | null) => {
    setSelectedTemplate(template);
    if (template) {
      setTemplatePromptText(template.prompt);
    }
  }, []);

  const canGeneratePrompt = promptText.length >= 10;
  const canGenerateTemplate = selectedTemplate !== null;

  const handleGenerate = useCallback(() => {
    if (mode === "prompt" && !canGeneratePrompt) return;
    if (mode === "template" && !canGenerateTemplate) return;
    setIsGenerating(true);
    setShowResult(false);
  }, [mode, canGeneratePrompt, canGenerateTemplate]);

  const handleGenerateComplete = useCallback(() => {
    setIsGenerating(false);
    setShowResult(true);
  }, []);

  const handleReset = useCallback(() => {
    setShowResult(false);
    if (mode === "prompt") {
      setPromptText("");
      setReferenceImages([]);
    } else {
      setSelectedTemplate(null);
      setTemplatePromptText("");
      setImageA(null);
      setImageB(null);
    }
  }, [mode]);

  const handleGenerateAgain = useCallback(() => {
    setShowResult(false);
    setIsGenerating(true);
  }, []);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-grid pt-16">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          {/* Page header */}
          <div className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
              영상 만들기
            </h1>
            <p className="mt-2 text-sm text-foreground/50">
              프롬프트로 상상하는 모든 영상을 만들어보세요
            </p>
          </div>

          {/* Tab switcher */}
          <div className="relative mx-auto mb-8 flex w-fit rounded-full border border-border bg-surface p-1">
            <button
              onClick={() => setMode("prompt")}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                mode === "prompt"
                  ? "text-background"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              프롬프트
            </button>
            <button
              onClick={() => setMode("template")}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                mode === "template"
                  ? "text-background"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              템플릿
            </button>
            {/* Sliding indicator */}
            <div
              className="tab-indicator absolute top-1 bottom-1 rounded-full bg-cyan"
              style={{
                left: mode === "prompt" ? "4px" : "50%",
                width: "calc(50% - 4px)",
              }}
            />
          </div>

          {/* Content area */}
          {showResult ? (
            <ResultViewer
              template={mode === "template" ? selectedTemplate ?? undefined : undefined}
              promptText={mode === "prompt" ? promptText : undefined}
              mode={mode}
              onTryAnother={handleReset}
              onGenerateAgain={handleGenerateAgain}
            />
          ) : (
            <div className="space-y-6">
              {mode === "prompt" ? (
                <>
                  {/* Prompt input */}
                  <PromptInput value={promptText} onChange={setPromptText} />

                  {/* Prompt suggestions */}
                  <PromptSuggestions onSelect={setPromptText} />

                  {/* Reference image uploader */}
                  <ReferenceImageUploader
                    images={referenceImages}
                    onImagesChange={setReferenceImages}
                  />
                </>
              ) : (
                <>
                  {/* Template grid */}
                  <TemplateGrid
                    selectedCategory={selectedCategory}
                    selectedTemplate={selectedTemplate}
                    onCategoryChange={setSelectedCategory}
                    onTemplateSelect={handleTemplateSelect}
                  />

                  {/* Selected template info + editable prompt */}
                  {selectedTemplate && (
                    <div className="glass-card space-y-4 p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 shrink-0 overflow-hidden rounded-lg"
                          style={{ background: selectedTemplate.gradient }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selectedTemplate.thumbnail}
                            alt={selectedTemplate.name}
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">{selectedTemplate.name}</h3>
                          <p className="text-sm text-foreground/50">
                            {selectedTemplate.description}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs font-medium text-foreground/40">
                          프롬프트 (수정 가능)
                        </label>
                        <textarea
                          value={templatePromptText}
                          onChange={(e) => setTemplatePromptText(e.target.value)}
                          className="w-full resize-none rounded-lg border border-border bg-surface-light px-4 py-3 text-sm leading-relaxed text-foreground/80 placeholder:text-foreground/25 focus:border-cyan/30 focus:outline-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Image uploader */}
                  <div>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground/40">
                      이미지 업로드
                    </h2>
                    <ImageUploader
                      imageA={imageA}
                      imageB={imageB}
                      onImageA={setImageA}
                      onImageB={setImageB}
                    />
                  </div>
                </>
              )}

              {/* Options (collapsible, shared) */}
              <div className="glass-card overflow-hidden">
                <button
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className="flex w-full items-center justify-between p-4 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                >
                  <span>스타일 & 옵션</span>
                  <span className={`transition-transform ${optionsOpen ? "rotate-180" : ""}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 4.5l3 3 3-3" />
                    </svg>
                  </span>
                </button>

                {optionsOpen && (
                  <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
                    {/* Style selector */}
                    <div>
                      <label className="mb-2 block text-xs font-medium text-foreground/40">
                        스타일
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {styles.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedStyle(s.id)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedStyle === s.id
                                ? "bg-cyan/10 text-cyan border border-cyan/30"
                                : "border border-border text-foreground/50 hover:text-foreground/70"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Format selector */}
                    <div>
                      <label className="mb-2 block text-xs font-medium text-foreground/40">
                        포맷
                      </label>
                      <div className="flex gap-2">
                        {formats.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setSelectedFormat(f.id)}
                            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                              selectedFormat === f.id
                                ? "bg-cyan/10 text-cyan border border-cyan/30"
                                : "border border-border text-foreground/50 hover:text-foreground/70"
                            }`}
                          >
                            <span className="font-bold">{f.label}</span>
                            <span className="ml-1 text-foreground/30">{f.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration selector */}
                    <DurationSelector
                      value={selectedDuration}
                      onChange={setSelectedDuration}
                    />
                  </div>
                )}
              </div>

              {/* Generate button */}
              <GenerateButton
                canGenerate={mode === "prompt" ? canGeneratePrompt : canGenerateTemplate}
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                creditCost={
                  mode === "template" && selectedTemplate
                    ? selectedTemplate.creditCost["5s_720p"]
                    : 10
                }
                mode={mode}
              />
            </div>
          )}
        </div>

        {/* Generating modal */}
        <GeneratingModal
          isOpen={isGenerating}
          onComplete={handleGenerateComplete}
        />
      </main>
      <Footer />
    </>
  );
}

export default function CreatePage() {
  return (
    <Suspense>
      <CreatePageInner />
    </Suspense>
  );
}
