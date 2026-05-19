import { Helmet } from "react-helmet-async";
import { Link, useLocation, Navigate } from "react-router-dom";
import { MapPin, Clock, MessageCircle, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { buildWhatsAppLink } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { LOCAL_PAGES, type LocalPage } from "@/lib/localPages";

const ORG_NAME = "Zey's Sweetness";
const PHONE = "+212620355325";
const BASE = "https://zeysweet.com";
const DEFAULT_OG = `${BASE}/og-image.jpg`;

function buildJsonLd(p: LocalPage) {
  const url = `${BASE}/${p.slug}`;
  const image = p.ogImage || DEFAULT_OG;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: ORG_NAME,
      image,
      url,
      telephone: PHONE,
      priceRange: "MAD",
      address: {
        "@type": "PostalAddress",
        addressLocality: p.city,
        addressCountry: "MA",
      },
      areaServed: p.zones.map((z) => ({ "@type": "Place", name: z })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.product.name,
      description: p.intro,
      brand: { "@type": "Brand", name: ORG_NAME },
      image,
      offers: {
        "@type": "Offer",
        priceCurrency: "MAD",
        price: p.product.priceValue,
        availability: "https://schema.org/InStock",
        url,
        seller: { "@type": "Organization", name: ORG_NAME },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: p.h1, item: url },
      ],
    },
  ];
}

export default function LocalLanding() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").replace(/\/$/, "");
  const page = LOCAL_PAGES[slug];
  if (!page) return <Navigate to="/404" replace />;

  const waLink = buildWhatsAppLink([], "", "fr");
  const jsonLd = buildJsonLd(page);
  const url = `${BASE}/${page.slug}`;
  const ogImg = page.ogImage || DEFAULT_OG;
  const onWhatsAppClick = () => trackWhatsAppClick(`local:${page.slug}`);

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDesc} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="fr" href={url} />
        <link rel="alternate" hrefLang="ar" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImg} />
        {jsonLd.map((j, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(j)}</script>
        ))}
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <span>{page.city}</span>
          </nav>
          <p className="font-hand text-2xl text-rose mb-3">{page.kicker}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cocoa max-w-3xl leading-tight">
            {page.h1}
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">{page.intro}</p>

          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Nos engagements">
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> Fait main</li>
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> Petite série</li>
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> Livraison 24h</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick}
              aria-label="Envoyer un message WhatsApp pour commander"
              className="btn-rose btn-glow inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Commander sur WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              aria-label={`Appeler Zey's Sweetness au ${PHONE}`}
              className="btn-outline-cocoa inline-flex items-center gap-2"
            >
              Appeler {PHONE}
            </a>
          </div>

          {page.heroImage && (
            <div className="mt-12 rounded-3xl overflow-hidden shadow-warm">
              <img
                src={page.heroImage}
                alt={`${page.product.name} — ${page.city}, Zey's Sweetness`}
                width={1280}
                height={800}
                loading="eager"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-cocoa/70">
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-rose" /> Livraison {page.city}</span>
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-rose" /> Sous 24h</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-rose" /> Fait main</span>
          </div>
        </section>

        {/* Sections */}
        <section className="container mx-auto px-4 pb-16 space-y-16">
          {page.sections.map((s, i) => (
            <article key={i} className="max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cocoa mb-4">{s.title}</h2>
              <p className="text-cocoa/80 leading-relaxed">{s.body}</p>
              {s.bullets && (
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-cocoa/80">
                      <Check className="w-5 h-5 text-rose mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {/* Zones chips */}
          <article className="max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-cocoa mb-4">Quartiers livrés à {page.city}</h2>
            <div className="flex flex-wrap gap-2">
              {page.zones.map((z) => (
                <span key={z} className="px-4 py-2 rounded-full bg-cream border border-cocoa/10 text-sm text-cocoa">{z}</span>
              ))}
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section className="bg-cream/60 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cocoa mb-10">Questions fréquentes</h2>
            <div className="space-y-6">
              {page.faqs.map((f, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 shadow-sm border border-cocoa/5">
                  <h3 className="font-display text-lg font-semibold text-cocoa mb-2">{f.q}</h3>
                  <p className="text-cocoa/75">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + cross links */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cocoa mb-4">Prêt à commander à {page.city} ?</h2>
          <p className="text-cocoa/70 mb-8 max-w-xl mx-auto">Réponse sur WhatsApp en moins d'une heure. Livraison 24h, paiement cash.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick}
            aria-label="Envoyer un message WhatsApp pour commander"
            className="btn-rose btn-glow inline-flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Commander maintenant
          </a>
          <div className="mt-12 flex flex-col gap-3 items-center">
            {page.crossLinks.map((c) => (
              <Link key={c.to} to={c.to} className="text-rose hover:text-cocoa font-medium underline underline-offset-4">
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
