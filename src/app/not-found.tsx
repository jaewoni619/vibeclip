import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grid">
      <div className="text-center px-4">
        <div className="text-8xl mb-6 text-foreground/10 font-[family-name:var(--font-display)] font-bold">?</div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold mb-4">
          <span className="text-cyan">404</span>
        </h1>
        <p className="text-lg text-foreground/50 mb-8">
          페이지를 찾을 수 없습니다
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 text-sm font-bold text-background transition-all hover:bg-cyan/90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
