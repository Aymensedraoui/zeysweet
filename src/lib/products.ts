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
  { id: "cookie", name: "Le Cookie Signature", desc: "Chocolat noir & noix de pécan", price: 35, image: cookie, badge: "bestseller" },
  { id: "brownie", name: "Brownie Caramel Salé", desc: "Fondant, intense, irrésistible", price: 30, image: brownie, badge: "nouveau" },
  { id: "cheesecake", name: "Cheesecake Framboise", desc: "Onctueux, frais, à tomber", price: 45, image: cheesecake },
  { id: "dates", name: "Dates Farcies aux Cajou", desc: "Boîte de 12 — luxe doré", price: 120, image: dates },
  { id: "cake", name: "Cake Citron Pavot", desc: "Entier — moelleux & zesté", price: 180, image: cake },
  { id: "box", name: "Box Surprise Zey", desc: "Assortiment du moment", price: 220, image: giftbox, badge: "coup" },
];

export const giftBoxes = [
  {
    id: "gift-disc",
    name: "Coffret Découverte",
    price: 150,
    image: giftDiscovery,
    contents: "4 cookies · 4 brownies · 1 carte personnalisée",
  },
  {
    id: "gift-prem",
    name: "Coffret Premium",
    price: 280,
    image: giftPremium,
    contents: "8 douceurs assorties · dates · cheesecake mini · ruban soie",
  },
  {
    id: "gift-custom",
    name: "Coffret Sur Mesure",
    price: 0,
    image: giftCustom,
    contents: "Composez votre coffret — prix selon contenu",
  },
];
