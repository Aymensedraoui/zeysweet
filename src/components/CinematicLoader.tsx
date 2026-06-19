import { useEffect, useRef, useState } from "react";
import loaderAsset from "@/assets/loader-cinematic.mp4.asset.json";

const SESSION_KEY = "zs_loader_shown";

export default function CinematicLoader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startRef = useRef<number>(Date.now());
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  const MIN_DURATION_MS = isMobile ? 900 : 1800;

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      const elapsed = Date.now() - startRef.current;
      const wait = Math.max(0, MIN_DURATION_MS - elapsed);
      window.setTimeout(() => {
        setLeaving(true);
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem(SESSION_KEY, "1");
          document.body.style.overflow = "";
        }, 650);
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Hard fallback in case 'load' never fires
      const fallback = window.setTimeout(dismiss, 4500);
      return () => {
        window.removeEventListener("load", dismiss);
        window.clearTimeout(fallback);
        document.body.style.overflow = "";
      };
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] bg-cocoa flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {!isMobile && (
        <video
          ref={videoRef}
          src={loaderAsset.url}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa/40 via-cocoa/30 to-cocoa/80" />

      <div className="relative text-center space-y-5 px-6 animate-fade-in">
        <p className="font-hand text-rose text-2xl tracking-wide">Zey's Sweetness</p>
        <h1 className="font-display italic text-cream text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          Maison de <span className="text-rose">douceurs</span>
        </h1>
        <div className="mx-auto h-[2px] w-40 bg-cream/20 overflow-hidden rounded-full">
          <div className="h-full w-1/3 bg-caramel animate-[loader_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes loader {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
