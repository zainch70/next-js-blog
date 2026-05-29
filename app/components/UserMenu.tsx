"use client";

import { useEffect, useRef, useState } from "react";
import { signOutUser } from "@/app/actions";

interface UserMenuProps {
  displayName: string;
  userEmail?: string | null;
  initials: string;
  compact?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function UserMenu({
  displayName,
  userEmail,
  initials,
  compact = false,
  onOpenChange,
}: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpenState = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpenState(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenState(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="user-menu" ref={rootRef}>
      <button
        type="button"
        className="user-menu__trigger"
        onClick={() => setOpenState(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        <span className="user-auth-badge__avatar" aria-hidden>
          {initials}
        </span>
        <span
          className={`user-menu__trigger-text min-w-0 text-left ${
            compact ? "hidden md:block" : "block"
          }`}
        >
          <span className="user-auth-badge__name block truncate max-w-[7rem] md:max-w-[9rem]">
            {displayName}
          </span>
          <span className="user-auth-badge__status">Logged in</span>
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="user-menu__dropdown" role="menu">
          <div className="user-menu__header">
            <span className="user-auth-badge__avatar user-auth-badge__avatar--lg" aria-hidden>
              {initials}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
              {userEmail && (
                <p className="text-xs text-muted truncate">{userEmail}</p>
              )}
            </div>
          </div>
          <form action={signOutUser} className="user-menu__signout-form">
            <button type="submit" className="user-menu__signout" role="menuitem">
              <LogoutIcon />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
