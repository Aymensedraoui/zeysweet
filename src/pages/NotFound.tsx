import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const url = `https://zeysweet.com${location.pathname}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <title>Page introuvable (404) — Maison de douceurs</title>
        <meta name="description" content="Cette page n'existe pas. Retour à l'accueil Maison de douceurs — cookies & dattes farcies livrés à Rabat & Témara." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content="Page introuvable — Maison de douceurs" />
        <meta property="og:description" content="Cette page n'existe pas. Retour à l'accueil Maison de douceurs." />
        <meta property="og:url" content={url} />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
