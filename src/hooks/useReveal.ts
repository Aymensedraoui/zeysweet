import { useEffect } from "react";

/**
 * Initialises a single IntersectionObserver that adds `is-visible`
 * to any `.reveal` element when it enters the viewport.
 * Children of `.reveal-stagger` get a CSS variable --i set to their index
 * so the shared transition-delay rule staggers them.
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Stamp stagger indexes
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
