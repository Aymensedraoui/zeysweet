import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string;
  label?: string;
};

/**
 * Thin cinematic divider between sections.
 * Desktop only, lazy-loaded, ornamental.
 */
export default function SectionDivider({ videoUrl, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoaded(true);
            vRef.current?.play().catch(() => {});
          } else {
            vRef.current?.pause();
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative w-full h-24 md:h-32 overflow-hidden bg-cocoa hidden md:block"
    >
      {loaded && (
        <video
          ref={vRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-cocoa via-cocoa/40 to-cocoa" />
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/60 to-cocoa/60" />
      {label && (
        <div className="relative h-full flex items-center justify-center">
          <span className="font-hand text-rose text-xl tracking-widest opacity-80">
            ✦ {label} ✦
          </span>
        </div>
      )}
    </div>
  );
}
