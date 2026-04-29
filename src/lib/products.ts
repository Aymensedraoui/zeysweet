import cookie from "@/assets/product-cookie.jpg";
import brownie from "@/assets/product-brownie.jpg";
import cheesecake from "@/assets/product-cheesecake.jpg";
import dates from "@/assets/product-dates.jpg";
import cake from "@/assets/product-cake.jpg";
import giftbox from "@/assets/product-giftbox.jpg";
import giftDiscovery from "@/assets/gift-discovery.jpg";
import giftPremium from "@/assets/gift-premium.jpg";
import giftCustom from "@/assets/gift-custom.jpg";
import { Product } from "./store";

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
    id: "brownie",
    name: { fr: "Brownie Caramel Salé", ar: "براوني الكراميل المملح" },
    desc: { fr: "Fondant, intense, irrésistible", ar: "ذائب، قوي، لا يقاوم" },
    price: 30,
    image: brownie,
    badge: "nouveau",
  },
  {
    id: "cheesecake",
    name: { fr: "Cheesecake Framboise", ar: "تشيز كيك التوت" },
    desc: { fr: "Onctueux, frais, à tomber", ar: "كريمي، منعش، رائع" },
    price: 45,
    image: cheesecake,
  },
  {
    id: "dates",
    name: { fr: "Dates Farcies aux Cajou", ar: "تمر محشي بالكاجو" },
    desc: { fr: "Boîte de 12 — luxe doré", ar: "علبة 12 — فخامة ذهبية" },
    price: 120,
    image: dates,
  },
  {
    id: "cake",
    name: { fr: "Cake Citron Pavot", ar: "كيك الليمون والخشخاش" },
    desc: { fr: "Entier — moelleux & zesté", ar: "كامل — طري ومنعش" },
    price: 180,
    image: cake,
  },
  {
    id: "box",
    name: { fr: "Box Surprise Zey", ar: "علبة مفاجأة زي" },
    desc: { fr: "Assortiment du moment", ar: "تشكيلة اللحظة" },
    price: 220,
    image: giftbox,
    badge: "coup",
  },
];

export const giftBoxes = [
  { id: "gift-disc", price: 150, image: giftDiscovery, nameKey: "gifts.disc.name" as const, descKey: "gifts.disc.desc" as const },
  { id: "gift-prem", price: 280, image: giftPremium, nameKey: "gifts.prem.name" as const, descKey: "gifts.prem.desc" as const },
  { id: "gift-custom", price: 0, image: giftCustom, nameKey: "gifts.cust.name" as const, descKey: "gifts.cust.desc" as const },
];
