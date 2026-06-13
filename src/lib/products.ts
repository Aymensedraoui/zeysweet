import cookie from "@/assets/product-cookie.jpg";
import dates from "@/assets/product-dates.jpg";
import giftCustom from "@/assets/gift-custom.jpg";
import { Product } from "./store";

// === LAUNCH CATALOGUE ===
// We are launching with two signature products. When new products are added
// (brownie, cheesecake, cake, premium gift boxes), re-import their images
// from src/assets and add entries below.


export const products: Product[] = [
  {
    id: "cookie",
    name: { fr: "Le Cookie Signature", ar: "كوكيز التوقيع" },
    desc: { fr: "Chocolat noir & noix de pécan", ar: "شوكولاتة سوداء وجوز البقان" },
    price: 35,
    image: cookie,
    badge: "bestseller",
  },
  {
    id: "dates",
    name: { fr: "Dates Farcies aux Cajou", ar: "تمر محشي بالكاجو" },
    desc: { fr: "Boîte de 12 — luxe doré", ar: "علبة 12 — فخامة ذهبية" },
    price: 120,
    image: dates,
    badge: "bestseller",
  },
];

// Only the "Sur Mesure" coffret is offered this week (composed from our 2
// signature products). Discovery / Premium boxes will return next week.
export const giftBoxes = [
  { id: "gift-custom", price: 0, image: giftCustom, nameKey: "gifts.cust.name" as const, descKey: "gifts.cust.desc" as const },
];
