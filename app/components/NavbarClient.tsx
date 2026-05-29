"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "./PageContainer";
import UserMenu from "./UserMenu";

interface NavbarClientProps {
  isLoggedIn: boolean;
  userName?: string | null;
  userEmail?: string | null;
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  }
  if (email?.trim()) return email.charAt(0).toUpperCase();
  return "U";
}

export default function NavbarClient({
  isLoggedIn,
  userName,
  userEmail,
}: NavbarClientProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();
  const displayName = userName?.trim() || userEmail?.split("@")[0] || "User";
  const initials = getInitials(userName, userEmail);

  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isNarrow) setNavOpen(false);
  }, [isNarrow]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const closeNav = () => setNavOpen(false);

  const scrollToBlogs = () => {
    closeNav();
    const el = document.getElementById("blogs");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "/#blogs");
    }
  };

  const guestNavLinks = (
    <>
      {pathname === "/" ? (
        <button type="button" onClick={scrollToBlogs} className="nav-link">
          Blogs
        </button>
      ) : (
        <Link href="/#blogs" className="nav-link" onClick={closeNav}>
          Blogs
        </Link>
      )}
      <Link href="/page" className="nav-link" onClick={closeNav}>
        All Blogs
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <PageContainer className="relative overflow-visible">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-foreground shrink-0 min-w-0"
            onClick={closeNav}
          >
            <span className="w-8 h-8 rounded-lg bg-accent text-white text-sm flex items-center justify-center shrink-0">
              B
            </span>
            <span className="truncate text-sm sm:text-base">Blog App</span>
          </Link>

          {/* Desktop/tablet nav — md (768px) and up */}
          <div className="hidden md:flex items-center justify-center gap-1 flex-1 min-w-0 px-4">
            {isLoggedIn ? (
              <Link href="/" className="nav-link">
                My Blogs
              </Link>
            ) : (
              guestNavLinks
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {isLoggedIn ? (
              <>
                <UserMenu
                  displayName={displayName}
                  userEmail={userEmail}
                  initials={initials}
                  compact
                  onOpenChange={(open) => open && setNavOpen(false)}
                />
                {isNarrow && (
                  <button
                    type="button"
                    className="nav-menu-toggle inline-flex"
                    onClick={() => setNavOpen((o) => !o)}
                    aria-expanded={navOpen}
                    aria-controls="mobile-nav"
                    aria-label={navOpen ? "Close menu" : "Open menu"}
                  >
                    {navOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login" className="nav-link">
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-semibold text-white bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg whitespace-nowrap transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
                {isNarrow && (
                  <button
                    type="button"
                    className="nav-menu-toggle inline-flex"
                    onClick={() => setNavOpen((o) => !o)}
                    aria-expanded={navOpen}
                    aria-controls="mobile-nav"
                    aria-label={navOpen ? "Close menu" : "Open menu"}
                  >
                    {navOpen ? <CloseIcon /> : <MenuIcon />}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Mobile drawer — only on narrow viewports */}
      {isNarrow && navOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[45] bg-foreground/25"
            aria-label="Close menu"
            onClick={closeNav}
          />
          <div
            id="mobile-nav"
            className="fixed left-0 right-0 top-14 sm:top-16 z-[50] border-b border-border bg-card shadow-xl"
          >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 space-y-1">
              {isLoggedIn ? (
                <Link href="/" className="nav-link-mobile" onClick={closeNav}>
                  My Blogs
                </Link>
              ) : (
                <>
                  {pathname === "/" ? (
                    <button
                      type="button"
                      className="nav-link-mobile w-full text-left"
                      onClick={scrollToBlogs}
                    >
                      Blogs
                    </button>
                  ) : (
                    <Link href="/#blogs" className="nav-link-mobile" onClick={closeNav}>
                      Blogs
                    </Link>
                  )}
                  <Link href="/page" className="nav-link-mobile" onClick={closeNav}>
                    All Blogs
                  </Link>
                  <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
                    <Link
                      href="/login"
                      className="nav-mobile-auth-secondary text-center"
                      onClick={closeNav}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="nav-mobile-auth-primary text-center"
                      onClick={closeNav}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
