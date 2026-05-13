import { useEffect } from "react";

/**
 * Premium scroll reveal.
 * - Auto-tags every <section> on the page (except #hero / first one)
 *   so it fades + lifts gently when entering the viewport.
 * - Also handles explicit `.reveal` and `.reveal-stagger` opt-ins.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Auto-tag sections so we don't have to touch every component.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section"));
    sections.forEach((s, idx) => {
      // Skip the hero (first section) — it has its own entrance animation.
      if (idx === 0) return;
      s.classList.add("reveal");
    });

    // Stagger children of any explicit `.reveal-stagger` parent.
    document.querySelectorAll<HTMLElement>(".reveal-stagger").forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--i", String(i));
        child.classList.add("reveal");
      });
    });

    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -80px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
