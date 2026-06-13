import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Star, MessageCircle, Copy, Check, Heart } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { toast } from "sonner";

const BASE = "https://zeysweet.com";
const URL = `${BASE}/avis`;
// TODO ⚠️ Place ID Google à VÉRIFIER dans Google Business Profile officiel.
// Trouver le bon ID : https://developers.google.com/maps/documentation/places/web-service/place-id
// Tant qu'il n'est pas confirmé, le lien "Laisser un avis" peut renvoyer sur une mauvaise fiche.
const GOOGLE_REVIEW_LINK = "https://search.google.com/local/writereview?placeid=ChIJrQRPdYKqCw0RNMbSfaXmVhI";
const SHARE_TEXT =
  "Bonjour 🌸 Merci d'avoir commandé chez Zey's Sweetness ! Si nos douceurs vous ont plu, votre avis Google nous aiderait énormément (1 minute) : ";

export default function Reviews() {
  const [copied, setCopied] = useState(false);

  // ⚠️ Les avis affichés ici doivent venir de vraies clientes (capture d'écran
  // ou copier-coller WhatsApp/Instagram, AVEC leur accord). Tant que le tableau
  // est vide, la page affiche un état "bientôt" honnête plutôt que des faux avis.
  // Pour ajouter un avis : pousser un objet { name, city, rating, date, txt }.
  const reviews: { name: string; city: string; rating: number; date: string; txt: string }[] = [];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Avis clients", item: URL },
    ],
  };

  // Le bloc LocalBusiness/Review n'est injecté que s'il y a de vrais avis,
  // sinon Google peut signaler un schéma Review sans contenu = pénalité.
  const reviewsLd =
    reviews.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${BASE}/#business`,
          name: "Zey's Sweetness",
          url: BASE,
          image: `${BASE}/og-image.jpg`,
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
            ratingValue: (
              reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            ).toFixed(1),
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
        }
      : null;

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
        {reviewsLd && (
          <script type="application/ld+json">{JSON.stringify(reviewsLd)}</script>
        )}
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
            <h2 className="font-display text-2xl font-bold text-cocoa mb-6">
              {reviews.length > 0 ? "Quelques retours récents" : "Les premiers retours arrivent"}
            </h2>

            {reviews.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-cocoa/15 bg-cream/60 p-8 text-center">
                <Heart className="w-8 h-8 text-rose mx-auto mb-3" />
                <p className="font-display italic text-xl text-cocoa">
                  Nous démarrons la maison à Rabat.
                </p>
                <p className="mt-2 text-sm text-cocoa/70 max-w-md mx-auto">
                  Les premiers avis clients seront publiés ici dès leur accord. Pour l'instant, place au goût et au service — on a hâte de vous lire.
                </p>
                <a
                  href={GOOGLE_REVIEW_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-rose !py-2.5 !px-5 text-sm mt-5 inline-flex"
                >
                  Être la première à laisser un avis
                </a>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
