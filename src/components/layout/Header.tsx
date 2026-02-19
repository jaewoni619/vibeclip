"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/Toast";

const navItems = [
  { href: "/create", label: "만들기" },
  { href: "/gallery", label: "갤러리" },
  { href: "/pricing", label: "요금제" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const menuRef = useRef<HTMLDivElement>(null);

  // 모바일 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // 라우트 변경 시 모바일 메뉴 닫기
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      requestAnimationFrame(() => setMobileOpen(false));
    }
  }, [pathname]);

  // ESC 키로 모바일 메뉴 닫기
  useEffect(() => {
    if (!mobileOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  const handleSignIn = () => {
    toast("로그인 기능은 정식 출시 후 제공됩니다", "info");
  };

  return (
    <header ref={menuRef} className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
            ClipArena
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${
                  isActive
                    ? "bg-cyan/10 text-cyan"
                    : "text-foreground/60 hover:bg-surface hover:text-foreground/90"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 우측 */}
        <div className="hidden items-center gap-4 md:flex">
          <span className="flex items-center gap-1.5 text-sm text-foreground/60">
            <span className="text-xs text-foreground/40">크레딧</span>
            <span className="font-medium text-cyan">20</span>
          </span>
          <button
            onClick={handleSignIn}
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-cyan/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            로그인
          </button>
        </div>

        {/* 모바일 햄버거 */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan rounded-md"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
        >
          <span
            className={`h-0.5 w-6 bg-foreground/70 transition-all duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground/70 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground/70 transition-all duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan/10 text-cyan"
                    : "text-foreground/70 hover:bg-surface hover:text-cyan"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-2 flex items-center justify-between border-t border-border px-4 pt-4">
            <span className="flex items-center gap-1.5 text-sm text-foreground/60">
              <span className="text-xs text-foreground/40">크레딧</span>
              <span className="font-medium text-cyan">20</span>
            </span>
            <button
              onClick={handleSignIn}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/80"
            >
              로그인
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
