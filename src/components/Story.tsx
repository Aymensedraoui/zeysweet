import portrait from "@/assets/zey-portrait.jpg";

export default function Story() {
  return (
    <section id="story" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 bg-rose/15 rounded-3xl rotate-[-2deg]" />
          <img
            src={portrait}
            alt="Zey, fondatrice de Zey's Sweetness, dans sa cuisine"
            loading="lazy"
            className="relative rounded-3xl shadow-warm img-warm w-full max-w-[520px] mx-auto"
          />
          <div className="absolute -bottom-6 -right-2 sm:right-8 bg-cocoa text-cream rounded-full px-5 py-3 font-hand text-xl shadow-lg rotate-3">
            ✿ Depuis 2022
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6 max-w-lg">
          <p className="font-hand text-2xl text-caramel">Notre histoire</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa leading-tight">
            Tout a commencé dans une <span className="text-rose">petite cuisine.</span>
          </h2>
          <p className="text-cocoa/75 text-lg">
            Zey's Sweetness est née d'une passion simple : rendre les gens heureux avec de bonnes choses.
          </p>
          <p className="text-cocoa/70">
            Chaque bouchée est préparée à la main, avec des ingrédients soigneusement choisis et beaucoup, beaucoup
            d'amour. Pas de raccourcis, pas d'industriel — juste du vrai, du bon, du fait avec le cœur.
          </p>
          <a href="#order" className="btn-outline-cocoa">En savoir plus sur Zey →</a>
        </div>
      </div>
    </section>
  );
}
