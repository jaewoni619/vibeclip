import Link from "next/link";

const plans = [
  {
    name: "무료",
    price: "$0",
    period: "",
    highlight: false,
    features: ["크레딧 20개 (1회)", "720p 화질", "워터마크 포함"],
    cta: "무료로 시작",
  },
  {
    name: "스타터",
    price: "$9.99",
    period: "/월",
    highlight: true,
    features: ["월 200 크레딧", "1080p 화질", "워터마크 없음", "다운로드 가능"],
    cta: "스타터 시작",
  },
  {
    name: "프로",
    price: "$19.99",
    period: "/월",
    highlight: false,
    features: ["월 500 크레딧", "1080p 화질", "워터마크 없음", "우선 처리"],
    cta: "프로 시작",
  },
];

export default function PricingPreview() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
            심플한 요금제
          </h2>
          <p className="mt-3 text-foreground/50">
            무료로 시작하고, 필요할 때 업그레이드하세요.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? "gradient-border"
                  : "glass-card"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-3 py-1 text-xs font-bold text-background">
                  가장 인기
                </span>
              )}

              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                {plan.name}
              </h3>
              <div className="mt-3">
                <span className="font-[family-name:var(--font-display)] text-4xl font-bold">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-foreground/40">{plan.period}</span>
                )}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/60">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cyan">
                      <path d="M2.5 7l3 3 6-6" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing"
                className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-bold transition-all ${
                  plan.highlight
                    ? "bg-cyan text-background hover:bg-cyan/90"
                    : "border border-border bg-surface text-foreground/70 hover:border-cyan/30 hover:text-foreground"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
