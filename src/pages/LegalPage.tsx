import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppModal from "@/components/WhatsAppModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

type Slug = "mentions-legales" | "cgv" | "confidentialite";

const META: Record<Slug, { description: string }> = {
  "mentions-legales": { description: "Mentions légales de Zey's Sweetness — maison de douceurs artisanale à Rabat & Témara : éditeur, hébergement, propriété intellectuelle, contact." },
  cgv: { description: "Conditions Générales de Vente Zey's Sweetness : commande WhatsApp, prix en MAD, livraison Rabat & Témara, conservation, allergènes." },
  confidentialite: { description: "Politique de confidentialité Zey's Sweetness : données collectées, utilisation, conservation et vos droits sur vos informations." },
};


const CONTENT: Record<Slug, { title: string; body: { h: string; p: string }[] }> = {
  "mentions-legales": {
    title: "Mentions légales",
    body: [
      { h: "Éditeur du site", p: "Zey's Sweetness — maison de douceurs artisanale basée à Rabat & Témara, Maroc. Pour toute question, contactez-nous via WhatsApp ou par email." },
      { h: "Hébergement", p: "Ce site est hébergé sur une infrastructure cloud sécurisée." },
      { h: "Propriété intellectuelle", p: "L'ensemble des contenus présents sur ce site (textes, photographies, identité visuelle) sont la propriété exclusive de Zey's Sweetness. Toute reproduction sans autorisation est interdite." },
      { h: "Contact", p: "WhatsApp : +212 620 35 53 25 — Email : contact@zeyssweetness.ma" },
    ],
  },
  cgv: {
    title: "Conditions Générales de Vente",
    body: [
      { h: "Commande", p: "Toute commande est passée via WhatsApp après ajout des produits au panier. Un échange de confirmation est effectué avant préparation. Commande minimum : 150 MAD." },
      { h: "Prix & paiement", p: "Les prix sont indiqués en dirhams marocains (MAD), TTC. Les modes de paiement acceptés sont : espèces à la livraison et virement bancaire." },
      { h: "Livraison", p: "Livraison à Rabat offerte sous 24h. Témara, Harhoura, Salé : +30 MAD. Autres villes : +80 MAD, sous 48 à 72h selon la destination." },
      { h: "Conservation & qualité", p: "Nos produits étant artisanaux et frais, ils ne peuvent être ni repris ni échangés une fois livrés. En cas de problème, contactez-nous dans les 24h." },
      { h: "Allergènes", p: "Nos pâtisseries peuvent contenir : gluten, œufs, lait, fruits à coque. Merci de nous signaler toute allergie lors de la commande." },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    body: [
      { h: "Données collectées", p: "Nous collectons uniquement les informations nécessaires au traitement de votre commande : prénom, numéro WhatsApp, adresse de livraison." },
      { h: "Utilisation", p: "Vos données servent exclusivement à préparer et livrer votre commande, et à vous tenir informé(e) de son statut. Nous ne les transmettons à aucun tiers." },
      { h: "Conservation", p: "Vos données sont conservées le temps nécessaire au traitement de la commande, puis supprimées sur simple demande." },
      { h: "Vos droits", p: "Vous pouvez à tout moment demander la suppression de vos données en nous écrivant via WhatsApp ou à contact@zeyssweetness.ma." },
    ],
  },
};

export default function LegalPage() {
  const { slug } = useParams<{ slug: Slug }>();
  const data = (slug && CONTENT[slug]) || CONTENT["mentions-legales"];
  useEffect(() => { document.title = `${data.title} — Zey's Sweetness`; window.scrollTo(0, 0); }, [data.title]);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="container mx-auto max-w-3xl">
          <Link to="/" className="text-sm text-cocoa/60 hover:text-cocoa">← Retour à l'accueil</Link>
          <h1 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-4 mb-10">{data.title}</h1>
          <div className="space-y-8">
            {data.body.map((s, i) => (
              <section key={i}>
                <h2 className="font-display font-semibold text-xl text-cocoa mb-2">{s.h}</h2>
                <p className="text-cocoa/75 leading-relaxed">{s.p}</p>
              </section>
            ))}
          </div>
          <p className="text-xs text-cocoa/50 mt-12">Dernière mise à jour : mai 2026.</p>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppModal />
      <FloatingWhatsApp />
    </div>
  );
}
