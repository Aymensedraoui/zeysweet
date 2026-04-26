import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  { quote: "Le meilleur cookie que j'aie jamais mangé. J'en commande toutes les semaines.", name: "Sara", city: "Casablanca" },
  { quote: "Le coffret cadeau était magnifique. Ma mère a adoré chaque détail.", name: "Karim", city: "Rabat" },
  { quote: "Des brownies à tomber par terre. Livrés à l'heure. Je ne commande plus ailleurs.", name: "Nadia", city: "Marrakech" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto text-center max-w-3xl">
        <p className="font-hand text-2xl text-caramel">Ce qu'ils en disent</p>
        <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2 mb-12">
          Des bouches pleines, des cœurs comblés.
        </h2>

        <div
          className="relative min-h-[220px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex justify-center gap-1 text-caramel mb-4">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-5 h-5 fill-current" />)}
              </div>
              <blockquote className="font-display italic text-2xl lg:text-3xl text-cocoa leading-snug">
                "{r.quote}"
              </blockquote>
              <p className="mt-6 text-cocoa/60">
                <span className="font-hand text-xl text-caramel">— {r.name}</span>, {r.city}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Avis ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-caramel" : "w-2 bg-cocoa/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
