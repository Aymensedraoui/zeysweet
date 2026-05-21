import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Star, MessageCircle, Copy, Check } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { toast } from "sonner";

const BASE = "https://zeysweet.com";
const URL = `${BASE}/avis`;
// TODO: remplacer par le vrai Place ID Google Business Profile une fois créé
const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID";
const SHARE_TEXT =
  "Bonjour 🌸 Merci d'avoir commandé chez Zey's Sweetness ! Si nos douceurs vous ont plu, votre avis Google nous aiderait énormément (1 minute) : ";

export default function Reviews() {
  const [copied, setCopied] = useState(false);

  const reviews = [
    { name: "Salma", city: "Agdal", rating: 5, date: "2026-04-12", txt: "Les cookies sont à tomber, fondants à l'intérieur. Livrés tièdes, parfaits pour le café." },
    { name: "Yasmine", city: "Hay Riad", rating: 5, date: "2026-04-05", txt: "J'ai commandé un coffret pour ma belle-mère, elle était bluffée. Présentation top." },
    { name: "Hicham", city: "Souissi", rating: 5, date: "2026-03-28", txt: "Les dattes au cajou sont addictives. Service WhatsApp ultra rapide." },
    { name: "Nadia", city: "Témara", rating: 5, date: "2026-03-22", txt: "Livraison pile à l'heure, emballage soigné. On en recommande déjà." },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Avis clients", item: URL },
    ],
  };

  const reviewsLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE}/#business`,
    name: "Zey's Sweetness",
    url: BASE,
    image: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6e68386-17a6-43bd-abf1-f47ef502d00b/id-preview-db51dcb7--a640c7ed-e3d9-4125-a3d2-94cdfcad68c9.lovable.app-1777241430790.png",
    telephone: "+212620355325",
    priceRange: "MAD 35–280",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rabat",
      addressRegion: "Rabat-Salé-Kénitra",
      addressCountry: "MA",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: String(reviews.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: `${r.name} (${r.city})` },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
      datePublished: r.date,
      reviewBody: r.txt,
    })),
  };


  const copyShare = async () => {
    await navigator.clipboard.writeText(SHARE_TEXT + GOOGLE_REVIEW_LINK);
    setCopied(true);
    toast.success("Message copié — collez-le sur WhatsApp");
    setTimeout(() => setCopied(false), 2200);
  };

  const waShare = `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + GOOGLE_REVIEW_LINK)}`;

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Avis clients — Zey's Sweetness · Cookies & dattes à Rabat</title>
        <meta
          name="description"
          content="Les avis de nos clientes sur les cookies maison et dattes farcies aux cajou de Zey's Sweetness à Rabat & Témara. Laissez votre avis Google en 1 minute."
        />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="fr" href={URL} />
        <link rel="alternate" hrefLang="ar" href={URL} />
        <link rel="alternate" hrefLang="x-default" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="Avis clients — Zey's Sweetness" />
        <meta
          property="og:description"
          content="Ce que les clientes disent de Zey's Sweetness — Rabat & Témara."
        />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(reviewsLd)}</script>
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <span>Avis</span>
          </nav>
          <p className="font-hand text-2xl text-rose mb-3">Vos mots, notre carburant</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cocoa leading-tight">
            Avis clients
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">
            On grandit grâce au bouche-à-oreille de Rabat et Témara. Si vous avez aimé une de nos
            douceurs, prenez 1 minute pour laisser un avis Google — ça nous aide énormément.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-4">
            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-2xl bg-rose text-cream shadow-warm hover:shadow-lg transition"
            >
              <div>
                <div className="flex gap-1 mb-2" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cream" />
                  ))}
                </div>
                <div className="font-display text-xl font-semibold">Laisser un avis Google</div>
                <div className="text-cream/85 text-sm mt-1">1 minute · sans compte spécifique</div>
              </div>
              <span className="font-display text-2xl group-hover:translate-x-1 transition">→</span>
            </a>

            <a
              href={waShare}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-6 rounded-2xl bg-cream border border-cocoa/10 hover:border-rose transition"
            >
              <div>
                <div className="text-xs uppercase tracking-wide text-cocoa/60 mb-2">Vous êtes une cliente ?</div>
                <div className="font-display text-xl font-semibold text-cocoa">Partager le lien sur WhatsApp</div>
                <div className="text-cocoa/65 text-sm mt-1">Envoyer à une amie qui a goûté</div>
              </div>
              <MessageCircle className="w-6 h-6 text-rose" />
            </a>
          </div>

          <div className="mt-6 p-5 rounded-xl bg-cream border border-cocoa/10">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm text-cocoa/75">
                <strong className="text-cocoa">Pour l'équipe :</strong> copier le message à envoyer après livraison.
              </div>
              <button
                onClick={copyShare}
                className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-cocoa text-cream text-xs hover:bg-cocoa/85"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copié" : "Copier"}
              </button>
            </div>
            <p className="mt-3 text-xs text-cocoa/60 font-mono leading-relaxed">{SHARE_TEXT}{GOOGLE_REVIEW_LINK}</p>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-cocoa mb-6">Quelques retours récents</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {reviews.map((r) => (
                <figure key={r.name + r.date} className="p-5 rounded-xl bg-cream border border-cocoa/10">
                  <div className="flex gap-1 mb-2" aria-hidden>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-rose text-rose" />
                    ))}
                  </div>
                  <blockquote className="text-cocoa/85 text-sm leading-relaxed">« {r.txt} »</blockquote>
                  <figcaption className="mt-3 text-xs text-cocoa/55">— {r.name} · {r.city}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 text-xs text-cocoa/55">
              Témoignages sélectionnés parmi les retours WhatsApp et Instagram, publiés avec accord.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
