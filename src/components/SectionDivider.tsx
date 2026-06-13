import { useEffect, useRef, useState } from "react";

type Props = {
  videoUrl: string;
  label?: string;
};

/**
 * Cinematic ribbon divider between sections.
 * Desktop only, lazy-loaded video with a readable label band.
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
      className="relative w-full h-40 md:h-56 overflow-hidden bg-cocoa hidden md:block"
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
      {/* Soft side fades only — keep the video visible in the middle */}
      <div className="absolute inset-0 bg-gradient-to-r from-cocoa via-transparent to-cocoa" />
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/30 via-transparent to-cocoa/40" />

      {label && (
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="flex items-center gap-5 px-8 py-3 rounded-full bg-cocoa/60 backdrop-blur-sm border border-rose/30 shadow-warm">
            <span className="text-rose text-lg">✦</span>
            <span className="font-display italic text-cream text-2xl md:text-3xl tracking-wide whitespace-nowrap">
              {label}
            </span>
            <span className="text-rose text-lg">✦</span>
          </div>
        </div>
      )}
    </div>
  );
}
