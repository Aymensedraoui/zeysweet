import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string;
  eyebrow?: string;
  title: string;
  accent?: string;
  height?: string; // tailwind class, e.g. "h-[60vh]"
};

/**
 * Cinematic full-bleed video strip used between sections.
 * - Desktop only (hidden on mobile) to protect LCP / data usage.
 * - Video plays muted/looped, lazy-loaded when first scrolled near.
 * - Text fades + lifts on scroll into view.
 */
export default function ScrollCinematic({
  videoUrl,
  eyebrow,
  title,
  accent,
  height = "h-[55vh] min-h-[420px] max-h-[640px]",
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoaded(true);
            setVisible(true);
            videoRef.current?.play().catch(() => {});
          } else {
            setVisible(false);
            videoRef.current?.pause();
          }
        }
      },
      { threshold: 0.15, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Subtle parallax on the video element
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        const v = videoRef.current;
        if (!el || !v) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        v.style.transform = `translate3d(0, ${center * -0.06}px, 0) scale(1.08)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-hidden="true"
      className={`relative w-full ${height} overflow-hidden bg-cocoa hidden md:block`}
    >
      {loaded && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/70 via-cocoa/40 to-cocoa/80" />

      <div
        className={`relative h-full container mx-auto flex items-center justify-center text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="max-w-3xl space-y-4 px-6">
          {eyebrow && <p className="font-hand text-rose text-2xl">{eyebrow}</p>}
          <h2 className="font-display italic text-cream text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {title}
            {accent && <> <span className="text-rose">{accent}</span></>}
          </h2>
        </div>
      </div>
    </section>
  );
}
