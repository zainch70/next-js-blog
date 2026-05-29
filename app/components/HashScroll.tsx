"use client";

import { useEffect } from "react";

/** Scrolls to #blogs after navigating to home with a hash (Next.js often skips native hash scroll). */
export default function HashScroll() {
  useEffect(() => {
    if (window.location.hash !== "#blogs") return;

    const scrollToBlogs = () => {
      const el = document.getElementById("blogs");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const id = requestAnimationFrame(scrollToBlogs);
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
