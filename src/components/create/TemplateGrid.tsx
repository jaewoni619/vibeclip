"use client";

import { templates } from "@/data/templates";
import { Category, Template } from "@/types";

const categoryTabs: { id: Category | "all"; name: string }[] = [
  { id: "all", name: "전체" },
  { id: "battle", name: "배틀" },
  { id: "dance", name: "댄스" },
  { id: "comedy", name: "코미디" },
  { id: "trending", name: "트렌딩" },
];

interface TemplateGridProps {
  selectedCategory: Category | "all";
  selectedTemplate: Template | null;
  onCategoryChange: (cat: Category | "all") => void;
  onTemplateSelect: (tpl: Template) => void;
}

export default function TemplateGrid({
  selectedCategory,
  selectedTemplate,
  onCategoryChange,
  onTemplateSelect,
}: TemplateGridProps) {
  const filtered =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scroll-container">
        {categoryTabs.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-cyan/10 text-cyan border border-cyan/30"
                : "border border-border text-foreground/50 hover:border-foreground/20 hover:text-foreground/70"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {filtered.map((tpl) => {
          const isSelected = selectedTemplate?.id === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => onTemplateSelect(tpl)}
              className={`group relative overflow-hidden rounded-xl text-left transition-all ${
                isSelected
                  ? "ring-2 ring-cyan"
                  : "ring-1 ring-border hover:ring-foreground/20"
              }`}
            >
              {/* Thumbnail */}
              <div
                className="relative flex h-24 items-center justify-center"
                style={{ background: tpl.gradient }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-cyan/20">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan text-sm font-bold text-background">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 7l3 3 6-6" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="bg-surface p-3">
                <h4 className="text-sm font-bold truncate">
                  {tpl.name}
                </h4>
                <p className="mt-0.5 text-xs text-foreground/40 truncate">
                  {tpl.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
