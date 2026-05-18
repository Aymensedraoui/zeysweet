import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { Clock, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { POSTS, POSTS_LIST } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { buildWhatsAppLink } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";

const BASE = "https://zeysweet.com";
const ORG_NAME = "Zey's Sweetness";
const DEFAULT_OG = `${BASE}/og-image.jpg`;

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = POSTS[slug];
  if (!post) return <Navigate to="/404" replace />;

  const url = `${BASE}/blog/${post.slug}`;
  const waLink = buildWhatsAppLink([], "", "fr");

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDesc,
    image: DEFAULT_OG,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: post.author, url: BASE },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: BASE,
      logo: { "@type": "ImageObject", url: DEFAULT_OG },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${BASE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const related = (post.related || [])
    .map((s) => POSTS[s])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDesc} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="fr" href={url} />
        <link rel="alternate" hrefLang="ar" href={url} />
        <link rel="alternate" hrefLang="x-default" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDesc} />
        <meta property="og:image" content={DEFAULT_OG} />
        <meta property="article:published_time" content={post.date} />
        {post.updated && <meta property="article:modified_time" content={post.updated} />}
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={DEFAULT_OG} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        <article className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-rose">Journal</Link>
            <span className="mx-2">/</span>
            <span>{post.category}</span>
          </nav>

          <div className="flex items-center gap-3 text-xs text-cocoa/60 mb-4">
            <span className="px-3 py-1 rounded-full bg-rose/10 text-rose font-medium">{post.category}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readingMinutes} min de lecture
            </span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-cocoa leading-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-cocoa/80 mb-10">{post.excerpt}</p>

          <div className="prose-zey">{renderMarkdown(post.body)}</div>

          {/* Inline CTA */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-cream border border-cocoa/10">
            <p className="font-hand text-xl text-rose mb-2">Envie de passer commande ?</p>
            <h3 className="font-display text-2xl font-bold text-cocoa mb-3">Réponse sur WhatsApp en moins d'une heure</h3>
            <p className="text-cocoa/75 mb-5">Livraison 24h à Rabat & Témara, paiement cash à la livraison.</p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`blog:${post.slug}`)}
              className="btn-rose btn-glow inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Commander sur WhatsApp
            </a>
          </div>

          {/* Cross links to local pages */}
          {post.crossLinks && post.crossLinks.length > 0 && (
            <div className="mt-10">
              <h3 className="font-display text-xl font-bold text-cocoa mb-4">À découvrir aussi</h3>
              <ul className="space-y-2">
                {post.crossLinks.map((c) => (
                  <li key={c.to}>
                    <Link to={c.to} className="text-rose hover:text-cocoa underline underline-offset-4">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="bg-cream/60 py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-3xl font-bold text-cocoa mb-8">Articles liés</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/blog/${r.slug}`}
                    className="block bg-card rounded-2xl p-6 shadow-sm border border-cocoa/5 hover:shadow-warm transition-shadow"
                  >
                    <span className="text-xs px-3 py-1 rounded-full bg-rose/10 text-rose font-medium">{r.category}</span>
                    <h3 className="font-display text-xl font-bold text-cocoa mt-3 mb-2">{r.title}</h3>
                    <p className="text-cocoa/75 text-sm">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/blog" className="text-rose hover:text-cocoa font-semibold underline underline-offset-4">
                  ← Voir tous les articles
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Suggest other posts if none related */}
        {related.length === 0 && (
          <section className="container mx-auto px-4 py-16 max-w-3xl">
            <Link to="/blog" className="text-rose hover:text-cocoa font-semibold underline underline-offset-4">
              ← Voir tous les articles
            </Link>
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// Re-export for unused warning suppression
export const _allPosts = POSTS_LIST;
