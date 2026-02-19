"use client";

import { Duration } from "@/types";

interface DurationSelectorProps {
  value: Duration;
  onChange: (value: Duration) => void;
}

const options: { id: Duration; label: string }[] = [
  { id: "5s", label: "5초" },
  { id: "10s", label: "10초" },
];

export default function DurationSelector({ value, onChange }: DurationSelectorProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-foreground/40">
        길이
      </label>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              value === opt.id
                ? "bg-cyan/10 text-cyan border border-cyan/30"
                : "border border-border text-foreground/50 hover:text-foreground/70"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
