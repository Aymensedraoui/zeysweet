import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { POSTS_LIST } from "@/lib/posts";

const BASE = "https://zeysweet.com";
const ORG_NAME = "Maison de douceurs";

export default function BlogIndex() {
  const url = `${BASE}/blog`;
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Le journal — ${ORG_NAME}`,
    url,
    publisher: { "@type": "Organization", name: ORG_NAME, url: BASE },
    blogPost: POSTS_LIST.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${BASE}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Journal", item: url },
    ],
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Le journal de Maison de douceurs — Cookies, dattes & douceurs à Rabat</title>
        <meta
          name="description"
          content="Idées cadeaux, conseils mariage, conservation, recettes : le journal de Maison de douceurs, maison de douceurs à Rabat & Témara."
        />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="fr" href={url} />
        <link rel="alternate" hrefLang="ar" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content="Le journal — Maison de douceurs" />
        <meta
          property="og:description"
          content="Cadeaux, mariage, conservation : nos guides pour bien choisir vos douceurs à Rabat."
        />
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <span>Journal</span>
          </nav>
          <p className="font-hand text-2xl text-rose mb-3">Notre journal</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cocoa max-w-3xl leading-tight">
            Guides, conseils et idées gourmandes
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">
            Tout ce qu'on apprend à fabriquer des cookies maison et des dattes farcies à Rabat, partagé sans filtre.
          </p>
        </section>

        <section className="container mx-auto px-4 pb-24">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {POSTS_LIST.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="block bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-cocoa/5 hover:shadow-warm transition-shadow"
              >
                <div className="flex items-center gap-3 text-xs text-cocoa/60 mb-3">
                  <span className="px-3 py-1 rounded-full bg-rose/10 text-rose font-medium">{p.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {p.readingMinutes} min
                  </span>
                  <time dateTime={p.date}>
                    {new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-cocoa mb-2">{p.title}</h2>
                <p className="text-cocoa/75 text-sm leading-relaxed">{p.excerpt}</p>
                <span className="mt-4 inline-block text-rose font-semibold text-sm">Lire l'article →</span>
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
