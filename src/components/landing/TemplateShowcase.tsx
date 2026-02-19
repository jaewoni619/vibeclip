import Link from "next/link";
import { templates } from "@/data/templates";

const categoryLabels: Record<string, string> = {
  battle: "배틀",
  dance: "댄스",
  comedy: "코미디",
  trending: "트렌딩",
};

const featured = templates.filter((t) => t.popular);

export default function TemplateShowcase() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
              프롬프트가 어렵다면?
            </h2>
            <p className="mt-3 text-foreground/50">
              미리 만들어진 템플릿으로 바로 시작하세요.
            </p>
          </div>
          <Link
            href="/create"
            className="hidden text-sm font-medium text-cyan transition-colors hover:text-cyan/80 sm:block"
          >
            전체 템플릿 보기 →
          </Link>
        </div>

        {/* Template cards */}
        <div className="mt-10 flex gap-6 overflow-x-auto pb-4 scroll-container sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
          {featured.map((template) => (
            <Link
              key={template.id}
              href="/create"
              className="template-card glass-card group flex-shrink-0 w-[280px] sm:w-auto overflow-hidden"
            >
              {/* Thumbnail */}
              <div
                className="relative flex h-40 items-center justify-center bg-cover bg-center"
                style={{ background: `url(${template.thumbnail}) center/cover no-repeat, ${template.gradient}` }}
              >

                {/* Category badge */}
                <span className="absolute left-3 top-3 rounded-full bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/80 backdrop-blur-sm">
                  {categoryLabels[template.category] || template.category}
                </span>

                {/* Popular badge */}
                {template.popular && (
                  <span className="absolute right-3 top-3 rounded-full bg-cyan/20 px-2.5 py-1 text-xs font-bold text-cyan">
                    인기
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-foreground/50 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile: see all link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/create"
            className="text-sm font-medium text-cyan"
          >
            전체 템플릿 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
