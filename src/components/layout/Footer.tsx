import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-foreground/40">
          <span>&copy; 2026 ClipArena</span>
          <span>&middot;</span>
          <Link href="#" className="transition-colors hover:text-foreground/60">이용약관</Link>
          <span>&middot;</span>
          <Link href="#" className="transition-colors hover:text-foreground/60">개인정보처리방침</Link>
        </div>
        <div className="text-sm text-foreground/40">
          Made with AI by 곰곰코딩랩
        </div>
      </div>
    </footer>
  );
}
