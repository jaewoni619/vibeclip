import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="relative">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
            첫 번째
            <br />
            <span className="text-gradient">AI 영상</span> 만들 준비 되셨나요?
          </h2>
          <p className="mt-4 text-lg text-foreground/50">
            수천 명의 크리에이터가 바이럴 AI 영상을 만들고 있습니다. 무료로 시작하세요.
          </p>

          <Link
            href="/create"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime px-10 py-5 text-lg font-bold text-background transition-transform hover:scale-105"
          >
            무료로 시작하기
          </Link>

          <p className="mt-4 text-sm text-foreground/30">
            신용카드 불필요 · 무료 영상 2개
          </p>
        </div>
      </div>
    </section>
  );
}
