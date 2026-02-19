"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { templates, galleryItems } from "@/data/templates";
import { Category } from "@/types";

type FilterTab = Category | "all" | "prompt";

const categoryTabs: { id: FilterTab; name: string }[] = [
  { id: "all", name: "전체" },
  { id: "prompt", name: "직접 프롬프트" },
  { id: "battle", name: "배틀" },
  { id: "dance", name: "댄스" },
  { id: "comedy", name: "코미디" },
  { id: "trending", name: "트렌딩" },
];

function formatViews(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  return n.toString();
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<FilterTab>("all");

  const filtered =
    filter === "all"
      ? galleryItems
      : filter === "prompt"
        ? galleryItems.filter((item) => item.creationMode === "prompt")
        : galleryItems.filter((item) => {
            if (item.creationMode === "prompt") return false;
            const tpl = templates.find((t) => t.id === item.templateId);
            return tpl?.category === filter;
          });

  const trending = galleryItems
    .slice()
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-grid pt-16">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
              갤러리
            </h1>
            <p className="mt-1 text-sm text-foreground/50">
              ClipArena 커뮤니티가 만든 영상을 구경해보세요.
            </p>
          </div>

          {/* Trending section */}
          <section className="mb-12">
            <h2 className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-bold">
              이번 주 인기 영상
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {trending.map((item, idx) => {
                const tpl = item.templateId
                  ? templates.find((t) => t.id === item.templateId)
                  : undefined;
                const isPrompt = item.creationMode === "prompt";

                return (
                  <div
                    key={item.id}
                    className="template-card group overflow-hidden rounded-xl border border-border"
                  >
                    <div
                      className="relative flex h-48 items-center justify-center"
                      style={{
                        background: tpl?.gradient || "linear-gradient(135deg, #0A1A2F 0%, #0A1A3F 50%, #0A2A1F 100%)",
                      }}
                    >
                      {tpl && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={tpl.thumbnail} alt={tpl.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </>
                      )}
                      <span className="absolute bottom-2 right-2 rounded bg-background/70 px-2 py-0.5 text-xs text-foreground/60 backdrop-blur-sm">
                        0:05
                      </span>
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-cyan/20 px-2 py-0.5 text-xs font-bold text-cyan">
                        #{idx + 1}
                      </span>
                      <span className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${
                        isPrompt ? "bg-cyan/20 text-cyan" : "bg-background/60 text-foreground/60"
                      }`}>
                        {isPrompt ? "프롬프트" : "템플릿"}
                      </span>
                    </div>
                    <div className="bg-surface p-4">
                      <h3 className="font-bold truncate">{item.title}</h3>
                      {isPrompt && item.prompt && (
                        <p className="mt-1 text-xs text-foreground/30 line-clamp-1">
                          &ldquo;{item.prompt}&rdquo;
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between text-xs text-foreground/40">
                        <div className="flex items-center gap-3">
                          <span>조회 {formatViews(item.views)}</span>
                          <span>좋아요 {formatViews(item.likes)}</span>
                        </div>
                        <span>{item.createdAt}</span>
                      </div>
                      <Link
                        href="/create"
                        className="mt-3 block rounded-lg border border-cyan/30 bg-cyan/5 py-2 text-center text-xs font-bold text-cyan transition-all hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                      >
                        나도 만들기 →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Filter tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scroll-container" role="tablist" aria-label="카테고리 필터">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                role="tab"
                aria-selected={filter === cat.id}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                  filter === cat.id
                    ? "bg-cyan/10 text-cyan border border-cyan/30"
                    : "border border-border text-foreground/50 hover:text-foreground/70"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="tabpanel">
            {filtered.length === 0 ? (
              <div className="col-span-full py-16 text-center text-foreground/30">
                이 카테고리에는 아직 영상이 없습니다.
              </div>
            ) : (
              filtered.map((item) => {
                const tpl = item.templateId
                  ? templates.find((t) => t.id === item.templateId)
                  : undefined;
                const isPrompt = item.creationMode === "prompt";

                return (
                  <div
                    key={item.id}
                    className="template-card glass-card group overflow-hidden"
                  >
                    <div
                      className="relative flex h-44 items-center justify-center"
                      style={{
                        background: tpl?.gradient || "linear-gradient(135deg, #0A1A2F 0%, #0A1A3F 50%, #0A2A1F 100%)",
                      }}
                    >
                      {tpl && (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={tpl.thumbnail} alt={tpl.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </>
                      )}
                      <span className="absolute bottom-2 right-2 rounded bg-background/70 px-2 py-0.5 text-xs text-foreground/60 backdrop-blur-sm">
                        0:05
                      </span>
                      <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${
                        isPrompt ? "bg-cyan/20 text-cyan" : "bg-background/60 text-foreground/60"
                      }`}>
                        {isPrompt ? "프롬프트" : tpl?.name || "템플릿"}
                      </span>
                      {/* Hover play icon */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/0 transition-all group-hover:bg-white/20">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold truncate">{item.title}</h3>
                      {isPrompt && item.prompt && (
                        <p className="mt-1 text-xs text-foreground/30 line-clamp-1">
                          &ldquo;{item.prompt}&rdquo;
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between text-xs text-foreground/40">
                        <div className="flex items-center gap-3">
                          <span>조회 {formatViews(item.views)}</span>
                          <span>좋아요 {formatViews(item.likes)}</span>
                        </div>
                        <span>{item.createdAt}</span>
                      </div>
                      <Link
                        href="/create"
                        className="mt-3 block rounded-lg border border-border py-2 text-center text-xs font-medium text-foreground/50 transition-all hover:border-cyan/30 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                      >
                        나도 만들기 →
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
