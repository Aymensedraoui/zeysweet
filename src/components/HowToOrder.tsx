const steps = [
  { n: "01", icon: "🍪", title: "Choisissez vos douceurs", sub: "Parcourez nos créations du moment." },
  { n: "02", icon: "💬", title: "Passez votre commande", sub: "Sur WhatsApp ou directement ici." },
  { n: "03", icon: "📦", title: "Recevez avec amour", sub: "Livré chez vous en 24h à Casa." },
];

export default function HowToOrder() {
  return (
    <section className="py-24 lg:py-32 relative" style={{ background: "hsl(var(--pistachio) / 0.08)" }}>
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="font-hand text-2xl text-pistachio">— Étape par étape —</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            Commander, c'est simple.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative bg-card rounded-3xl p-8 text-center shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full gradient-cocoa text-cream flex items-center justify-center text-2xl shadow-lg">
                {s.icon}
              </div>
              <p className="font-hand text-3xl text-caramel mt-6">{s.n}</p>
              <h3 className="font-display font-bold text-xl text-cocoa mt-2">{s.title}</h3>
              <p className="text-sm text-cocoa/60 mt-2">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
