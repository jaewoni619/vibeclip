"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/Toast";

const plans = [
  {
    name: "무료",
    price: "$0",
    period: "",
    highlight: false,
    credits: "크레딧 20개 (1회)",
    features: [
      { text: "크레딧 20개 (1회)", included: true },
      { text: "720p 화질", included: true },
      { text: "워터마크 포함", included: true },
      { text: "1080p 화질", included: false },
      { text: "영상 다운로드", included: false },
      { text: "우선 생성", included: false },
    ],
    cta: "무료로 시작",
    ctaHref: "/create",
    ctaAction: false,
    ctaStyle: "border border-border bg-surface text-foreground/70 hover:border-foreground/20 hover:text-foreground",
  },
  {
    name: "스타터",
    price: "$9.99",
    period: "/월",
    highlight: true,
    credits: "월 200 크레딧",
    features: [
      { text: "월 200 크레딧", included: true },
      { text: "1080p 화질", included: true },
      { text: "워터마크 없음", included: true },
      { text: "영상 다운로드", included: true },
      { text: "이메일 지원", included: true },
      { text: "우선 생성", included: false },
    ],
    cta: "스타터 시작",
    ctaHref: null,
    ctaAction: true,
    ctaStyle: "bg-cyan text-background hover:bg-cyan/90",
  },
  {
    name: "프로",
    price: "$19.99",
    period: "/월",
    highlight: false,
    credits: "월 500 크레딧",
    features: [
      { text: "월 500 크레딧", included: true },
      { text: "1080p 화질", included: true },
      { text: "워터마크 없음", included: true },
      { text: "영상 다운로드", included: true },
      { text: "우선 생성", included: true },
      { text: "우선 지원", included: true },
    ],
    cta: "프로 시작",
    ctaHref: null,
    ctaAction: true,
    ctaStyle: "border border-magenta/30 bg-magenta/10 text-magenta hover:bg-magenta/20",
  },
];

const creditPacks = [
  { credits: 100, price: "$4.99", perCredit: "$0.05" },
  { credits: 300, price: "$12.99", perCredit: "$0.04", popular: true },
  { credits: 500, price: "$19.99", perCredit: "$0.04" },
];

const faqs = [
  {
    q: "크레딧은 어떻게 사용되나요?",
    a: "영상 생성 시 길이와 화질에 따라 크레딧이 차감됩니다. 5초 720p 영상은 10크레딧, 10초 1080p 영상은 40크레딧이 소요됩니다.",
  },
  {
    q: "언제든 해지할 수 있나요?",
    a: "네! 구독은 언제든 해지 가능합니다. 남은 크레딧은 결제 기간이 끝날 때까지 사용할 수 있습니다.",
  },
  {
    q: "사용하지 않은 크레딧은 이월되나요?",
    a: "월 구독 크레딧은 매달 초기화됩니다. 단, 크레딧 팩으로 구매한 크레딧은 유효기간이 없습니다.",
  },
  {
    q: "이미지를 꼭 업로드해야 하나요?",
    a: "아니요! 프롬프트만으로 영상을 생성할 수 있습니다. 참고 이미지는 선택사항으로, 원하는 스타일이나 캐릭터를 전달할 때 도움이 됩니다. JPG, PNG, WebP 형식을 지원합니다.",
  },
  {
    q: "영상 생성은 얼마나 걸리나요?",
    a: "대부분의 영상은 30~60초 이내에 생성됩니다. 프로 구독자는 생성 대기열에서 우선 처리됩니다.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handlePaidPlan = (planName: string) => {
    toast(`${planName} 결제는 정식 출시 후 제공됩니다`, "info");
  };

  const handleBuyPack = (credits: number) => {
    toast(`${credits} 크레딧 팩 구매는 정식 출시 후 제공됩니다`, "info");
  };

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-grid pt-16">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {/* 헤더 */}
          <div className="mb-12 text-center">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
              심플하고 투명한{" "}
              <span className="text-gradient">요금제</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/50">
              무료로 시작하고, 필요할 때 업그레이드하세요.
            </p>
          </div>

          {/* 플랜 카드 */}
          <div className="grid gap-6 sm:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-transform hover:scale-[1.02] ${
                  plan.highlight ? "gradient-border" : "glass-card"
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
                <div className="mt-4">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-bold">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-foreground/40">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-foreground/50">{plan.credits}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      {f.included ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cyan">
                          <path d="M2.5 7l3 3 6-6" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-foreground/20">
                          <line x1="3" y1="3" x2="11" y2="11" />
                          <line x1="11" y1="3" x2="3" y2="11" />
                        </svg>
                      )}
                      <span className={f.included ? "text-foreground/70" : "text-foreground/30"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.ctaHref ? (
                  <Link
                    href={plan.ctaHref}
                    className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${plan.ctaStyle}`}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePaidPlan(plan.name)}
                    className={`mt-8 w-full rounded-lg py-3 text-center text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${plan.ctaStyle}`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 크레딧 비용표 */}
          <div className="mt-16 glass-card overflow-hidden">
            <div className="border-b border-border px-6 py-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold">
                크레딧 비용표
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-light">
                    <th className="px-4 py-3 font-medium text-foreground/50">길이 &amp; 화질</th>
                    <th className="px-4 py-3 font-medium text-foreground/50">크레딧</th>
                    <th className="px-4 py-3 font-medium text-foreground/50">환산 금액</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "5초 @ 720p", credits: 10, price: "~$0.50" },
                    { label: "5초 @ 1080p", credits: 20, price: "~$1.00" },
                    { label: "10초 @ 720p", credits: 20, price: "~$1.00" },
                    { label: "10초 @ 1080p", credits: 40, price: "~$2.00" },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-foreground/70">{row.label}</td>
                      <td className="px-4 py-3 font-bold text-cyan">{row.credits}</td>
                      <td className="px-4 py-3 text-foreground/40">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 크레딧 팩 */}
          <div className="mt-16">
            <div className="mb-6 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                크레딧이 더 필요하신가요?
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                크레딧 팩을 구매하세요 — 유효기간 없음.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {creditPacks.map((pack) => (
                <div
                  key={pack.credits}
                  className={`relative rounded-xl p-5 text-center transition-transform hover:scale-[1.02] ${
                    pack.popular ? "gradient-border" : "glass-card"
                  }`}
                >
                  {pack.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-cyan/20 px-2 py-0.5 text-xs font-bold text-cyan">
                      가성비 최고
                    </span>
                  )}
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold">
                    {pack.credits}
                  </p>
                  <p className="mt-1 text-sm text-foreground/50">크레딧</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">
                    {pack.price}
                  </p>
                  <p className="mt-1 text-xs text-foreground/30">
                    크레딧당 {pack.perCredit}
                  </p>
                  <button
                    onClick={() => handleBuyPack(pack.credits)}
                    className="mt-4 w-full rounded-lg border border-border bg-surface py-2 text-sm font-medium text-foreground/60 transition-all hover:border-cyan/30 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                  >
                    구매하기
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <div className="mb-6 text-center">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                자주 묻는 질문
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan"
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-4 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-foreground/50">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 하단 CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-xl bg-lime px-8 py-4 text-base font-bold text-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              무료로 시작하기
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
