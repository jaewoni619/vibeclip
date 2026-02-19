"use client";

import { promptSuggestions } from "@/data/templates";

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void;
}

export default function PromptSuggestions({ onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scroll-container">
      {promptSuggestions.map((suggestion, i) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion.textKo)}
          className="animate-stagger-in shrink-0 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground/60 transition-all hover:border-foreground/20 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {suggestion.category}
        </button>
      ))}
    </div>
  );
}
