// Centralized FR/AR translations for Zey's Sweetness.
// Add a key once here, use t("key") everywhere. No external i18n lib needed.

export type Lang = "fr" | "ar";

export const dict = {
  // Nav
  "nav.products":       { fr: "Nos Douceurs",      ar: "حلوياتنا" },
  "nav.story":          { fr: "Notre Histoire",    ar: "قصتنا" },
  "nav.gifts":          { fr: "Coffrets Cadeaux",  ar: "علب الهدايا" },
  "nav.order":          { fr: "Commander",          ar: "اطلب الآن" },
  "nav.contact":        { fr: "Contact",            ar: "تواصل" },
  "nav.lang":           { fr: "العربية",            ar: "Français" },
  "nav.cta":            { fr: "Commander",          ar: "اطلب" },
  "nav.cart":           { fr: "Panier",             ar: "السلة" },
  "nav.menu":           { fr: "Menu",               ar: "القائمة" },
  "nav.close":          { fr: "Fermer",             ar: "إغلاق" },

  // Hero
  "hero.eyebrow":       { fr: "✦ Fait maison · Fait avec amour", ar: "✦ صنع منزلي · بكل حب" },
  "hero.title.a":       { fr: "La douceur qui fait", ar: "الحلاوة التي تنسي" },
  "hero.title.b":       { fr: "tout oublier.",      ar: "كل شيء" },
  "hero.subtitle":      { fr: "Des pâtisseries artisanales préparées à la main, avec des ingrédients vrais et beaucoup d'amour.",
                          ar: "حلويات مصنوعة يدويا بمكونات حقيقية وحب كبير." },
 "hero.cta1":          { fr: "💬 Commander sur WhatsApp", ar: "💬 اطلب عبر واتساب" },
 "hero.cta2":          { fr: "Voir nos créations →",   ar: "شاهد إبداعاتنا →" },
  "hero.social":        { fr: "+500 clients heureux à Casablanca", ar: "+500 زبون سعيد في الدار البيضاء" },
  "hero.badge.coup":    { fr: "Coup de",            ar: "الأكثر" },
  "hero.badge.heart":   { fr: "cœur",               ar: "حبا" },
  "hero.quote":         { fr: "« Le meilleur cookie de ma vie. »", ar: "« أفضل كوكيز في حياتي. »" },
  "hero.quote.author":  { fr: "— Sara, Casablanca", ar: "— سارة، الدار البيضاء" },

  // Trust
 "trust.1.t":          { fr: "Fait maison",            ar: "صنع منزلي" },
 "trust.1.s":          { fr: "Chaque jour, à Casa",    ar: "كل يوم في الدار البيضاء" },
 "trust.2.t":          { fr: "Ingrédients sélectionnés", ar: "مكونات مختارة" },
 "trust.2.s":          { fr: "Beurre, chocolat, amour", ar: "زبدة، شوكولاتة، حب" },
 "trust.3.t":          { fr: "Livraison Casablanca",   ar: "توصيل بالدار البيضاء" },
 "trust.3.s":          { fr: "Sous 24h, soignée",      ar: "خلال 24 ساعة بعناية" },
 "trust.4.t":          { fr: "Commande sur WhatsApp",  ar: "اطلب عبر واتساب" },
 "trust.4.s":          { fr: "Simple et rapide",       ar: "بسيط وسريع" },

  // Products
  "products.eyebrow":   { fr: "— Nos Créations —",   ar: "— إبداعاتنا —" },
  "products.title":     { fr: "Ce qui rend nos clients accros.", ar: "ما يجعل زبائننا مدمنين." },
  "products.add":       { fr: "Commander",           ar: "اطلب" },
  "products.added":     { fr: "Ajouté à votre commande ✓",  ar: "أضيف إلى طلبك ✓" },
  "products.badge.bestseller": { fr: "Coup de cœur", ar: "الأكثر مبيعا" },
  "products.badge.nouveau":    { fr: "Nouveau",      ar: "جديد" },

  // Story
  "story.eyebrow":      { fr: "Notre histoire",     ar: "قصتنا" },
  "story.title.a":      { fr: "Tout a commencé dans une", ar: "بدأ كل شيء في" },
  "story.title.b":      { fr: "petite cuisine.",    ar: "مطبخ صغير." },
  "story.p1":           { fr: "Zey's Sweetness est née d'une passion simple : rendre les gens heureux avec de bonnes choses.",
                          ar: "ولدت حلاوة زي من شغف بسيط : جعل الناس سعداء بأشياء لذيذة." },
  "story.p2":           { fr: "Chaque bouchée est préparée à la main, avec des ingrédients soigneusement choisis et beaucoup, beaucoup d'amour. Pas de raccourcis, pas d'industriel — juste du vrai, du bon, du fait avec le cœur.",
                          ar: "كل قضمة محضرة يدويا، بمكونات مختارة بعناية وحب كبير. لا اختصارات، لا صناعي — فقط حقيقي، لذيذ، ومصنوع من القلب." },
  "story.cta":          { fr: "En savoir plus sur Zey →", ar: "اعرف المزيد عن زي →" },
  "story.since":        { fr: "✿ Depuis 2022",      ar: "✿ منذ 2022" },

  // Cinematic
  "cine.eyebrow":       { fr: "Le bestseller absolu", ar: "الأكثر مبيعا على الإطلاق" },
  "cine.title.a":       { fr: "Le Cookie qui a",      ar: "الكوكيز الذي" },
  "cine.title.b":       { fr: "tout changé.",         ar: "غير كل شيء." },
  "cine.b1":            { fr: "Pâte maison fermentée 24h", ar: "عجين منزلي مخمر 24 ساعة" },
  "cine.b2":            { fr: "Chocolat noir 70% de qualité", ar: "شوكولاتة سوداء 70% فاخرة" },
  "cine.b3":            { fr: "Cuit frais à chaque commande", ar: "يخبز طازجا مع كل طلب" },
  "cine.cta":           { fr: "Commander le Cookie Signature →", ar: "اطلب كوكيز التوقيع →" },

  // Gifts
  "gifts.eyebrow":      { fr: "Coffrets cadeaux",   ar: "علب الهدايا" },
  "gifts.title":        { fr: "Offrir, c'est aussi une façon d'aimer.", ar: "الإهداء أيضا طريقة للحب." },
  "gifts.sub":          { fr: "Nos coffrets sont préparés avec soin, emballés à la main, et livrés avec un message personnalisé.",
                          ar: "علبنا محضرة بعناية، مغلفة يدويا، ومسلمة برسالة شخصية." },
  "gifts.custom":       { fr: "Personnaliser",      ar: "خصص" },
  "gifts.quote":        { fr: "Sur devis",          ar: "حسب الطلب" },
  "gifts.occ.1":        { fr: "🎂 Anniversaire",    ar: "🎂 عيد ميلاد" },
  "gifts.occ.2":        { fr: "💍 Mariage",         ar: "💍 زفاف" },
  "gifts.occ.3":        { fr: "🎓 Diplôme",         ar: "🎓 تخرج" },
  "gifts.occ.4":        { fr: "💼 Corporate",       ar: "💼 شركات" },
  "gifts.occ.5":        { fr: "❤ Juste comme ça",  ar: "❤ بدون مناسبة" },
  "gifts.disc.name":    { fr: "Coffret Découverte", ar: "علبة الاكتشاف" },
  "gifts.disc.desc":    { fr: "4 cookies · 4 brownies · 1 carte personnalisée", ar: "4 كوكيز · 4 براوني · بطاقة شخصية" },
  "gifts.prem.name":    { fr: "Coffret Premium",    ar: "علبة بريميوم" },
  "gifts.prem.desc":    { fr: "8 douceurs assorties · dates · cheesecake mini · ruban soie", ar: "8 حلويات متنوعة · تمر · ميني تشيز كيك · شريط حرير" },
  "gifts.cust.name":    { fr: "Coffret Sur Mesure", ar: "علبة حسب الطلب" },
  "gifts.cust.desc":    { fr: "Composez votre coffret — prix selon contenu", ar: "اختر مكونات علبتك — السعر حسب المحتوى" },

  // How to order
  "how.eyebrow":        { fr: "— Étape par étape —", ar: "— خطوة بخطوة —" },
  "how.title":          { fr: "Commander, c'est simple.", ar: "الطلب سهل." },
  "how.s1.t":           { fr: "Choisissez vos douceurs", ar: "اختر حلوياتك" },
  "how.s1.s":           { fr: "Parcourez nos créations du moment.", ar: "تصفح إبداعاتنا الجديدة." },
  "how.s2.t":           { fr: "Passez votre commande", ar: "قم بطلبك" },
  "how.s2.s":           { fr: "Sur WhatsApp ou directement ici.", ar: "عبر واتساب أو مباشرة هنا." },
  "how.s3.t":           { fr: "Recevez avec amour", ar: "استلم بحب" },
  "how.s3.s":           { fr: "Livré chez vous en 24h à Casa.", ar: "يصلك خلال 24 ساعة في كازا." },

  // Testimonials
  "tst.eyebrow":        { fr: "Ce qu'ils en disent", ar: "ماذا يقولون" },
  "tst.title":          { fr: "Des bouches pleines, des cœurs comblés.", ar: "أفواه ممتلئة وقلوب راضية." },
  "tst.1.q":            { fr: "Le meilleur cookie que j'aie jamais mangé. J'en commande toutes les semaines.", ar: "أفضل كوكيز أكلته في حياتي. أطلبه كل أسبوع." },
  "tst.1.n":            { fr: "Sara",               ar: "سارة" },
  "tst.1.c":            { fr: "Casablanca",          ar: "الدار البيضاء" },
  "tst.2.q":            { fr: "Le coffret cadeau était magnifique. Ma mère a adoré chaque détail.", ar: "علبة الهدية كانت رائعة. أمي أحبت كل تفصيل." },
  "tst.2.n":            { fr: "Karim",              ar: "كريم" },
  "tst.2.c":            { fr: "Rabat",              ar: "الرباط" },
  "tst.3.q":            { fr: "Des brownies à tomber par terre. Livrés à l'heure. Je ne commande plus ailleurs.", ar: "براوني لا يقاوم. توصيل في الوقت. لم أعد أطلب من مكان آخر." },
  "tst.3.n":            { fr: "Nadia",              ar: "نادية" },
  "tst.3.c":            { fr: "Marrakech",          ar: "مراكش" },

  // Gallery
  "gal.eyebrow":        { fr: "@zeysweetness",    ar: "@zeysweetness" },
  "gal.title":          { fr: "La vie est plus douce avec Zey's.", ar: "الحياة أحلى مع زي." },
  "gal.follow":         { fr: "Suivre @zeysweetness", ar: "تابع @zeysweetness" },

  // Order CTA
  "cta.eyebrow":        { fr: "Prête à craquer ?",  ar: "هل أنت مستعدة ؟" },
  "cta.title.a":        { fr: "Prête à vous faire", ar: "جاهزة لتدليل" },
  "cta.title.b":        { fr: "plaisir.",           ar: "نفسك." },
  "cta.sub":            { fr: "Commandez maintenant et recevez chez vous dans les 24h à Casablanca.", ar: "اطلبي الآن واستلمي في منزلك خلال 24 ساعة في الدار البيضاء." },
  "cta.btn":            { fr: "💬 Commander via WhatsApp", ar: "💬 اطلب عبر واتساب" },
  "cta.see":            { fr: "Voir tous les produits", ar: "شاهد كل المنتجات" },

  // Cart
  "cart.title":         { fr: "Votre panier",       ar: "سلتك" },
  "cart.items":         { fr: "article(s)",         ar: "منتج" },
  "cart.empty.t":       { fr: "Votre panier est vide", ar: "سلتك فارغة" },
  "cart.empty.s":       { fr: "Une douceur ne se refuse pas.", ar: "لا يمكن رفض الحلوى." },
  "cart.discover":      { fr: "Découvrir nos créations", ar: "اكتشف إبداعاتنا" },
  "cart.gift":          { fr: "💌 Message cadeau (optionnel)", ar: "💌 رسالة الهدية (اختياري)" },
  "cart.gift.ph":       { fr: "Un mot doux à inscrire dans le coffret...", ar: "كلمة لطيفة تضاف داخل العلبة..." },
  "cart.subtotal":      { fr: "Sous-total",         ar: "المجموع الفرعي" },
  "cart.delivery":      { fr: "Livraison",          ar: "التوصيل" },
  "cart.delivery.free": { fr: "Offerte",            ar: "مجانا" },
  "cart.total":         { fr: "Total",              ar: "المجموع" },
  "cart.checkout":      { fr: "💬 Commander via WhatsApp", ar: "💬 اطلب عبر واتساب" },
  "cart.online":        { fr: "Payer en ligne · Bientôt disponible", ar: "الدفع الإلكتروني · قريبا" },
  "cart.min":           { fr: "Commande minimum",   ar: "الحد الأدنى للطلب" },
  "cart.min.warn":      { fr: "Ajoutez encore", ar: "أضف بعد" },
  "cart.min.warn2":     { fr: "MAD pour valider votre commande.", ar: "درهم لتأكيد طلبك." },

  // Modal
  "mod.eyebrow":        { fr: "Presque prêt !",     ar: "تقريبا جاهز !" },
  "mod.title":          { fr: "Votre commande est prête !", ar: "طلبك جاهز !" },
  "mod.intro":          { fr: "Quelques infos pour la livraison, puis nous ouvrirons WhatsApp avec votre résumé.", ar: "بعض المعلومات للتوصيل، ثم سنفتح واتساب مع ملخص طلبك." },
  "mod.name":           { fr: "Votre prénom",       ar: "اسمك" },
  "mod.phone":          { fr: "Téléphone (WhatsApp)", ar: "الهاتف (واتساب)" },
  "mod.address":        { fr: "Adresse de livraison", ar: "عنوان التوصيل" },
  "mod.zone":           { fr: "Zone de livraison",  ar: "منطقة التوصيل" },
  "mod.zone.center":    { fr: "Casablanca centre",  ar: "وسط الدار البيضاء" },
  "mod.zone.peri":      { fr: "Casablanca périphérie (+30 MAD)", ar: "ضواحي الدار البيضاء (+30 درهم)" },
  "mod.zone.other":     { fr: "Autre ville (+80 MAD)", ar: "مدينة أخرى (+80 درهم)" },
  "mod.when":           { fr: "Date / créneau souhaité", ar: "التاريخ / الوقت المرغوب" },
  "mod.when.ph":        { fr: "Ex : Demain après-midi",  ar: "مثلا : غدا بعد الظهر" },
  "mod.send":           { fr: "Envoyer sur WhatsApp ✓", ar: "إرسال عبر واتساب ✓" },
  "mod.cancel":         { fr: "Modifier ma sélection", ar: "تعديل اختياري" },
  "mod.req":            { fr: "Requis",             ar: "مطلوب" },

  // Footer
  "ft.tag":             { fr: "Made with love. Tasted with joy.", ar: "صنع بحب، يذاق بفرح." },
  "ft.about":           { fr: "Pâtisserie artisanale, à la main, à Casablanca. Pour les bons moments — et tous les autres aussi.", ar: "حلويات يدوية بالدار البيضاء. للحظات الجميلة — ولكل اللحظات الأخرى." },
  "ft.links":           { fr: "Liens",              ar: "روابط" },
  "ft.delivery":        { fr: "Livraison",          ar: "التوصيل" },
  "ft.contact":         { fr: "Contact",            ar: "تواصل" },
  "ft.payment":         { fr: "Paiement",           ar: "الدفع" },
  "ft.legal":           { fr: "Mentions légales",   ar: "إشعارات قانونية" },
  "ft.cgv":             { fr: "CGV",                ar: "الشروط العامة" },
  "ft.privacy":         { fr: "Confidentialité",    ar: "الخصوصية" },
  "ft.copyright":       { fr: "© 2026 Zey's Sweetness — Fait avec ❤ au Maroc", ar: "© 2026 حلاوة زي — صنع بحب في المغرب" },

  // FAQ
  "faq.eyebrow":        { fr: "Questions fréquentes", ar: "أسئلة شائعة" },
  "faq.title":          { fr: "Tout ce que vous voulez savoir.", ar: "كل ما تريد معرفته." },
  "faq.q1":             { fr: "Quels sont les délais de livraison ?", ar: "ما هي مدة التوصيل ؟" },
  "faq.a1":             { fr: "Nous livrons à Casablanca en 24h. Pour les autres villes, comptez 48 à 72h selon la destination.", ar: "نوصل في الدار البيضاء خلال 24 ساعة. للمدن الأخرى، من 48 إلى 72 ساعة حسب الوجهة." },
  "faq.q2":             { fr: "Les produits contiennent-ils des allergènes ?", ar: "هل تحتوي المنتجات على مسببات حساسية ؟" },
  "faq.a2":             { fr: "Nos pâtisseries contiennent gluten, œufs, lait et fruits à coque. Indiquez-nous toute allergie sur WhatsApp.", ar: "تحتوي حلوياتنا على الغلوتين والبيض والحليب والمكسرات. أخبرنا بأي حساسية عبر واتساب." },
  "faq.q3":             { fr: "Puis-je commander sur mesure ?", ar: "هل يمكنني الطلب حسب الطلب ؟" },
  "faq.a3":             { fr: "Bien sûr ! Pour les coffrets sur mesure ou commandes spéciales (mariage, événement), contactez-nous 5 jours à l'avance.", ar: "بالطبع ! للعلب المخصصة أو الطلبات الخاصة، تواصل معنا 5 أيام مسبقا." },
  "faq.q4":             { fr: "Quels sont les modes de paiement ?", ar: "ما هي وسائل الدفع ؟" },
  "faq.a4":             { fr: "Cash à la livraison ou virement bancaire. Le paiement en ligne par carte sera bientôt disponible.", ar: "الدفع نقدا عند التسليم أو تحويل بنكي. الدفع الإلكتروني قريبا." },
  "faq.q5":             { fr: "Combien de temps se conservent les pâtisseries ?", ar: "كم تدوم الحلويات ؟" },
  "faq.a5":             { fr: "Nos cookies et brownies se conservent 5 jours à température ambiante. Cheesecakes : 3 jours au frais.", ar: "الكوكيز والبراوني تدوم 5 أيام في درجة حرارة الغرفة. التشيز كيك : 3 أيام في الثلاجة." },

  // Contact
  "contact.eyebrow":    { fr: "Restons en contact", ar: "ابقَ على تواصل" },
  "contact.title":      { fr: "Une envie ? Un message suffit.", ar: "فكرة حلوة ؟ رسالة واحدة تكفي." },
  "contact.sub":        { fr: "Réponse en moins d'une heure, du lundi au samedi.", ar: "نرد في أقل من ساعة، من الإثنين إلى السبت." },
  "contact.whatsapp":   { fr: "WhatsApp",           ar: "واتساب" },
  "contact.zone":       { fr: "Zone de livraison", ar: "منطقة التوصيل" },
  "contact.zone.v":     { fr: "Casablanca & périphérie · Autres villes sur demande", ar: "الدار البيضاء وضواحيها · مدن أخرى عند الطلب" },
  "contact.hours":      { fr: "Horaires",           ar: "ساعات العمل" },
  "contact.hours.v":    { fr: "Lun – Sam · 10h – 20h", ar: "الإثنين – السبت · 10ص – 8م" },
  "contact.cta":        { fr: "💬 Écrire sur WhatsApp", ar: "💬 راسلنا على واتساب" },
  "contact.insta":      { fr: "Suivez-nous",        ar: "تابعنا" },
} as const;

export type Key = keyof typeof dict;

export const t = (key: Key, lang: Lang): string => {
  const entry = dict[key];
  return entry ? entry[lang] : key;
};
