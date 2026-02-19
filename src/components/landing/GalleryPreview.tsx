import Link from "next/link";
import { templates, galleryItems } from "@/data/templates";

const preview = galleryItems.slice(0, 4);

function formatViews(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  return n.toString();
}

export default function GalleryPreview() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            다른 사람들이 만든 영상
          </h2>
          <p className="mt-3 text-foreground/50">
            VibeClip 커뮤니티의 인기 클립을 만나보세요.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((item) => {
            const tpl = item.templateId
              ? templates.find((t) => t.id === item.templateId)
              : undefined;
            const isPrompt = item.creationMode === "prompt";

            return (
              <div
                key={item.id}
                className="template-card glass-card group overflow-hidden"
              >
                {/* Thumbnail */}
                <div
                  className="relative flex h-44 items-center justify-center"
                  style={{
                    background: tpl
                      ? `url(${tpl.thumbnail}) center/cover no-repeat, ${tpl.gradient}`
                      : item.thumbnail
                        ? `url(${item.thumbnail}) center/cover no-repeat, linear-gradient(135deg, #0A1A2F 0%, #0A1A3F 50%, #0A2A1F 100%)`
                        : "linear-gradient(135deg, #0A1A2F 0%, #0A1A3F 50%, #0A2A1F 100%)",
                  }}
                >
                  {/* thumbnail shown via CSS background-image on parent */}
                  <span className="absolute bottom-2 right-2 rounded bg-background/70 px-2 py-0.5 text-xs text-foreground/60 backdrop-blur-sm">
                    0:05
                  </span>
                  <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${
                    isPrompt
                      ? "bg-cyan/20 text-cyan"
                      : "bg-background/60 text-foreground/60"
                  }`}>
                    {isPrompt ? "프롬프트" : "템플릿"}
                  </span>
                </div>

                {/* Info */}
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
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="text-sm font-medium text-cyan transition-colors hover:text-cyan/80"
          >
            갤러리 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
