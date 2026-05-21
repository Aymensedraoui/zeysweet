import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Download, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";

const BASE = "https://zeysweet.com";
const URL = `${BASE}/presse`;

const FACTS = [
  { k: "Fondée", v: "Rabat, Maroc" },
  { k: "Signatures", v: "Cookies Signature · Dattes farcies aux noix de cajou" },
  { k: "Production", v: "100% artisanale, en petite série quotidienne" },
  { k: "Livraison", v: "Rabat & Témara sous 24h" },
  { k: "Commande", v: "WhatsApp · +212 620 35 53 25" },
  { k: "Spécialités", v: "Coffrets cadeaux, mariages, événements corporate" },
];

const ANGLES = [
  "Une jeune femme marocaine relance la pâtisserie artisanale à Rabat",
  "Mariages au Maroc : la nouvelle vague des coffrets de dattes signature",
  "Comment WhatsApp est devenu le canal de vente n°1 des artisans à Rabat",
  "Le retour du fait-main à Hay Riad et Agdal : enquête sur les nouvelles maisons de douceurs",
];

export default function Press() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Presse", item: URL },
    ],
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Espace presse — Maison de douceurs · Maison de douceurs Rabat</title>
        <meta
          name="description"
          content="Kit média Maison de douceurs : présentation, photos HD, angles éditoriaux et contact direct pour journalistes et créateurs de contenu à Rabat."
        />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="fr" href={URL} />
        <link rel="alternate" hrefLang="ar" href={URL} />
        <link rel="alternate" hrefLang="x-default" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content="Espace presse — Maison de douceurs" />
        <meta
          property="og:description"
          content="Kit média, photos et angles pour la presse — Maison de douceurs, Rabat."
        />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        <section className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <span>Presse</span>
          </nav>
          <p className="font-hand text-2xl text-rose mb-3">Espace presse</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cocoa leading-tight">
            Pour les journalistes & créateurs
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">
            Vous écrivez sur la gastronomie, l'artisanat ou les femmes entrepreneures au Maroc ? On
            vous facilite la tâche : présentation, photos haute définition et angles éditoriaux
            prêts à exploiter.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-cocoa mb-4">L'essentiel en 30 secondes</h2>
              <dl className="space-y-3">
                {FACTS.map((f) => (
                  <div key={f.k} className="flex gap-3 text-sm">
                    <dt className="w-28 shrink-0 text-cocoa/55 uppercase tracking-wide text-xs pt-0.5">{f.k}</dt>
                    <dd className="text-cocoa font-medium">{f.v}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="font-display text-lg font-semibold text-cocoa mt-10 mb-3">Notre histoire en 3 lignes</h3>
              <p className="text-cocoa/80 text-sm leading-relaxed">
                Maison de douceurs est une maison de douceurs artisanale née à Rabat. Toute la
                production est faite à la main, en petite série, avec des ingrédients sélectionnés
                (beurre, chocolat noir, noix de cajou). Nos deux signatures — Cookies Signature et
                Dattes Farcies aux cajou — sont livrées à Rabat & Témara sous 24h après commande
                WhatsApp.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-cocoa mb-4">Angles éditoriaux suggérés</h2>
              <ul className="space-y-2 text-sm">
                {ANGLES.map((a) => (
                  <li key={a} className="p-3 rounded-lg bg-cream border border-cocoa/10 text-cocoa/85 leading-snug">
                    {a}
                  </li>
                ))}
              </ul>

              <h2 className="font-display text-2xl font-bold text-cocoa mt-10 mb-4">Médias</h2>
              <p className="text-sm text-cocoa/75 mb-3">
                Photos HD, logo et bio fondatrice envoyés sur demande sous 24h (zip ~30 Mo).
              </p>
              <a
                href="mailto:contact@maison-de-douceurs.ma?subject=Demande%20de%20kit%20presse%20la Maison%20Sweetness&body=Bonjour%2C%0A%0AJe%20suis%20%5Bnom%5D%20de%20%5Bm%C3%A9dia%5D%20et%20je%20souhaite%20recevoir%20le%20kit%20presse%20pour%20un%20article%20sur%20%5Bsujet%5D.%0A%0AMerci%20!"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-cocoa text-cream text-sm font-medium hover:bg-cocoa/85"
              >
                <Download className="w-4 h-4" /> Demander le kit presse
              </a>
            </div>
          </div>

          <div className="mt-16 p-6 md:p-8 rounded-2xl bg-rose/10 border border-rose/20">
            <h2 className="font-display text-xl font-bold text-cocoa">Contact presse direct</h2>
            <p className="text-cocoa/75 text-sm mt-2">
              Réponse sous 24h ouvrées. Pour un délai serré, privilégiez WhatsApp.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://wa.me/212620355325?text=Bonjour%2C%20je%20suis%20journaliste%20et%20je%20pr%C3%A9pare%20un%20article%20sur..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-rose text-cream text-sm font-medium hover:opacity-90"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp +212 620 35 53 25
              </a>
              <a
                href="mailto:contact@maison-de-douceurs.ma"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-cream border border-cocoa/15 text-cocoa text-sm font-medium hover:border-rose"
              >
                <Mail className="w-4 h-4" /> contact@maison-de-douceurs.ma
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
