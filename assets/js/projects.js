// ============================================================
// BLAOSK — Portfolio project data (18 productions)
// size: grid span class → "feat" (2x2) | "tall" (1x2) | "wide" (2x1) | "norm" (1x1)
// ============================================================

const PROJECTS = [
  {
    slug: "necklace",
    size: "feat",
    cover: "assets/img/covers/necklace.jpg",
    full: "assets/img/full/necklace.jpg",
    videoId: "sPxX0oG5kek",
    title: { en: "Necklace — Tropical Vine", pt: "Colar — Tropical Vine" },
    category: { en: "Fine Jewelry · Oria", pt: "Alta Joalheria · Oria" },
    blurb: {
      en: "Tropical Vine for Oria — the moment raw gold and gemstones are forged, captured with an obsession for perfect illumination.",
      pt: "Tropical Vine para a Oria — o instante em que ouro bruto e gemas são forjados, capturado com obsessão pela iluminação perfeita."
    }
  },
  {
    slug: "vasco",
    size: "feat",
    cover: "assets/img/covers/vasco.jpg",
    full: "assets/img/full/vasco.jpg",
    videoId: "CAtkG9ALvV4",
    title: { en: "Vasco — The Heart of the Hill", pt: "Vasco — O Coração da Colina" },
    category: { en: "Watches · Limited Edition", pt: "Relojoaria · Edição Limitada" },
    blurb: {
      en: "A commemorative timepiece for Vasco da Gama's centenary — 18k rose gold, malachite dial and a hand-engraved caravel, in full 4K macro-realism.",
      pt: "Um relógio comemorativo para o centenário do Vasco da Gama — ouro rosé 18k, mostrador em malaquita e uma caravela gravada em relevo, em macro-realismo 4K."
    }
  },
  {
    slug: "copan",
    size: "tall",
    cover: "assets/img/covers/copan.jpg",
    full: "assets/img/full/copan.jpg",
    videoId: "8sI3YOhNzj8",
    title: { en: "Copan — The Architect of Scent", pt: "Copan — O Arquiteto do Perfume" },
    category: { en: "Fragrance · CGI", pt: "Perfumaria · CGI" },
    blurb: {
      en: "An olfactory tribute to Oscar Niemeyer's curves — molten glass, concrete textures and architectural light, rendered entirely in Higgsfield.",
      pt: "Um tributo olfativo às curvas de Oscar Niemeyer — vidro fundido, texturas de concreto e luz arquitetônica, renderizados inteiramente no Higgsfield."
    }
  },
  {
    slug: "coke-machine",
    size: "tall",
    cover: "assets/img/covers/coke-machine.jpg",
    full: "assets/img/full/coke-machine.jpg",
    videoId: "rUBVLZHD-TQ",
    title: { en: "Coca-Cola Concept — Engineering Joy", pt: "Conceito Coca-Cola — Engenharia da Alegria" },
    category: { en: "Product Design · CGI", pt: "Design de Produto · CGI" },
    blurb: {
      en: "A concept dual-cola home dispenser, engineered in Blender down to the mechanical detail — chilled, sparkling perfection in under three minutes.",
      pt: "Um dispenser doméstico conceito de duas torneiras, projetado no Blender até o menor detalhe mecânico — perfeição gelada e gaseificada em menos de três minutos."
    }
  },
  {
    slug: "vernier",
    size: "wide",
    cover: "assets/img/covers/vernier.jpg",
    full: "assets/img/full/vernier.jpg",
    videoId: "hYQawz_rbOc",
    title: { en: "Jean Vernier — Vortex of Precision", pt: "Jean Vernier — Vórtice de Precisão" },
    category: { en: "Watches · CGI", pt: "Relojoaria · CGI" },
    blurb: {
      en: "Modeled in Blender and rendered through Higgsfield's Seedance 2.0, this chronograph emerges from a vortex of red and black sand — a tribute to 45 years of watchmaking.",
      pt: "Modelado no Blender e renderizado com o Seedance 2.0 do Higgsfield, este cronógrafo emerge de um vórtice de areia vermelha e preta — um tributo a 45 anos de relojoaria."
    }
  },
  {
    slug: "pinga-chic",
    size: "wide",
    cover: "assets/img/covers/pinga-chic.jpg",
    full: "assets/img/full/pinga-chic.jpg",
    videoId: "rsL88kw2ol8",
    title: { en: "Pinga Chic — The Soul of Rio", pt: "Pinga Chic — A Alma do Rio" },
    category: { en: "Spirits · CGI", pt: "Bebidas · CGI" },
    blurb: {
      en: "A tribute to Rio's tropical nightlife — golden cachaça poured against a balcony skyline, modeled in Blender and brought to life in Higgsfield.",
      pt: "Um tributo às noites tropicais do Rio — cachaça dourada servida contra o horizonte de uma cobertura, modelada no Blender e trazida à vida no Higgsfield."
    }
  },
  {
    slug: "bracelet",
    size: "norm",
    cover: "assets/img/covers/bracelet.jpg",
    full: "assets/img/full/bracelet.jpg",
    videoId: "hPbMyvVboEY",
    title: { en: "Bracelet — Bespoke Brilliance", pt: "Bracelete — Brilho Sob Medida" },
    category: { en: "Fine Jewelry · CGI", pt: "Alta Joalheria · CGI" },
    blurb: {
      en: "\"Crafted for Eternity\" — a master-jeweler-grade CAD model in Rhinoceros, given a glow no physical lens could match.",
      pt: "\"Crafted for Eternity\" — um modelo CAD em nível de joalheria no Rhinoceros, com um brilho que nenhuma lente física alcançaria."
    }
  },
  {
    slug: "everlast",
    size: "norm",
    cover: "assets/img/covers/everlast.jpg",
    full: "assets/img/full/everlast.jpg",
    videoId: "7yablruAVN4",
    title: { en: "Everlast — Every Second Hits Back", pt: "Everlast — Cada Segundo Revida" },
    category: { en: "Watches · Sport", pt: "Relojoaria · Esporte" },
    blurb: {
      en: "3D-modeled in Blender, this sports watch is put through boxing gyms, forest trails and poolside splashes — proving luxury and durability can share a wrist.",
      pt: "Modelado em 3D no Blender, este relógio esportivo enfrenta academias de boxe, trilhas na floresta e respingos de piscina — provando que luxo e durabilidade cabem no mesmo pulso."
    }
  },
  {
    slug: "headphones",
    size: "norm",
    cover: "assets/img/covers/headphones.jpg",
    full: "assets/img/full/headphones.jpg",
    videoId: null,
    title: { en: "Zora — Deep Focus", pt: "Zora — Foco Profundo" },
    category: { en: "Product Design · CGI", pt: "Design de Produto · CGI" },
    blurb: {
      en: "Zora explores \"deep focus\" audio — visualizing active noise cancellation and a 40mm driver through carbon fiber, titanium and ambient light.",
      pt: "Zora explora o áudio de \"foco profundo\" — visualizando o cancelamento de ruído e um driver de 40mm através de fibra de carbono, titânio e luz ambiente."
    }
  },
  {
    slug: "italian-bag",
    size: "norm",
    cover: "assets/img/covers/italian-bag.jpg",
    full: "assets/img/full/italian-bag.jpg",
    videoId: "1prOF-cD4a0",
    title: { en: "The Tulip Bag — Tactile Luxury", pt: "Bolsa The Tulip — Luxo Tátil" },
    category: { en: "Fashion · CGI", pt: "Moda · CGI" },
    blurb: {
      en: "A Blender Market base model transformed with buttery, grain-rich Italian leather textures — from artisan stitching to polished hardware.",
      pt: "Um modelo-base do Blender Market transformado com texturas de couro italiano encorpado — da costura artesanal às ferragens polidas."
    }
  },
  {
    slug: "nikea",
    size: "norm",
    cover: "assets/img/covers/nikea.jpg",
    full: "assets/img/full/nikea.jpg",
    videoId: "mb6GM7t5chc",
    title: { en: "NIKEA — Just Do It Yourself", pt: "NIKEA — Just Do It Yourself" },
    category: { en: "Footwear · Concept", pt: "Calçados · Conceito" },
    blurb: {
      en: "Nike's performance heritage meets IKEA's flat-pack spirit — a 100% AI-native concept sneaker, from the box to the forest floor.",
      pt: "A herança de performance da Nike encontra o espírito \"monte você mesmo\" da IKEA — um tênis conceito 100% nativo em IA, da caixa ao chão da floresta."
    }
  },
  {
    slug: "oria-orange-perfume",
    size: "norm",
    cover: "assets/img/covers/oria-orange-perfume.jpg",
    full: "assets/img/full/oria-orange-perfume.jpg",
    videoId: "BkQgdm30e74",
    title: { en: "Oria — Liquid Sunshine", pt: "Oria — Sol Líquido" },
    category: { en: "Fragrance · CGI", pt: "Perfumaria · CGI" },
    blurb: {
      en: "Mediterranean summer in a bottle — intricate orange-slice glass modeled in Blender, lit as if in a physical studio.",
      pt: "Verão mediterrâneo em um frasco — vidro intrincado em formato de laranja modelado no Blender, iluminado como em um estúdio físico."
    }
  },
  {
    slug: "oria-pearl-ring",
    size: "norm",
    cover: "assets/img/covers/oria-pearl-ring.jpg",
    full: "assets/img/full/oria-pearl-ring.jpg",
    videoId: "umW73ihyhao",
    title: { en: "Oria — Coastal Elegance", pt: "Oria — Elegância Litorânea" },
    category: { en: "Fine Jewelry · CGI", pt: "Alta Joalheria · CGI" },
    blurb: {
      en: "Starting from a 3D asset, Higgsfield breathes life into gold and mother-of-pearl — chasing the moment ocean mist meets golden-hour light.",
      pt: "Partindo de um ativo 3D, o Higgsfield dá vida ao ouro e à madrepérola — capturando o momento em que a maresia encontra a luz do fim de tarde."
    }
  },
  {
    slug: "oria-diamond-ring",
    size: "norm",
    cover: "assets/img/covers/oria-diamond-ring.jpg",
    full: "assets/img/full/oria-diamond-ring.jpg",
    videoId: "9BH_zZGkcn0",
    title: { en: "Oria — Past Meets Future", pt: "Oria — Passado Encontra o Futuro" },
    category: { en: "Fine Jewelry · CGI", pt: "Alta Joalheria · CGI" },
    blurb: {
      en: "From a hand-drawn 1800s editorial sketch to a hyper-real diamond ring — a seamless transition between heritage and innovation.",
      pt: "De um esboço editorial desenhado à mão, inspirado nos anos 1800, a um anel de diamantes hiper-realista — herança e inovação em uma só peça."
    }
  },
  {
    slug: "schwartz",
    size: "norm",
    cover: "assets/img/covers/schwartz.jpg",
    full: "assets/img/full/schwartz.jpg",
    videoId: "S6k3IJK959w",
    title: { en: "Schwartz — The Red Carpet Standard", pt: "Schwartz — O Padrão do Tapete Vermelho" },
    category: { en: "Footwear · Fashion", pt: "Calçados · Moda" },
    blurb: {
      en: "From a single sketch to manufacturing-grade CAD in Rhinoceros — chasing patent leather and diamonds under red-carpet flashbulbs.",
      pt: "De um único esboço a um CAD de nível industrial no Rhinoceros — perseguindo o verniz e os diamantes sob os flashes do tapete vermelho."
    }
  },
  {
    slug: "squisito",
    size: "norm",
    cover: "assets/img/covers/squisito.jpg",
    full: "assets/img/full/squisito.jpg",
    videoId: "XruCfq0ESRI",
    title: { en: "Squisito — Pure Indulgence", pt: "Squisito — Pura Indulgência" },
    category: { en: "Food · CGI", pt: "Alimentos · CGI" },
    blurb: {
      en: "A sensory dive into artisanal gelato — melting chocolate and passionfruit splashes, rendered with a food stylist's eye.",
      pt: "Um mergulho sensorial no gelato artesanal — chocolate derretendo e respingos de maracujá, renderizados com o olhar de um food stylist."
    }
  },
  {
    slug: "safra-coffee",
    size: "norm",
    cover: null,
    full: null,
    videoId: "DhVcoUfhKWk",
    title: { en: "Safra Coffee — Harvesting the Sun", pt: "Safra Coffee — Colhendo o Sol" },
    category: { en: "Video · AI Motion", pt: "Vídeo · Movimento em IA" },
    blurb: {
      en: "A journey from farm to cup, built in Blender and Higgsfield — chasing the steam, sunbeams and golden-hour warmth of a working plantation.",
      pt: "Uma jornada da fazenda à xícara, construída no Blender e no Higgsfield — perseguindo o vapor, os raios de sol e o calor dourado de uma fazenda em atividade."
    }
  },
  {
    slug: "yara-tucuma",
    size: "norm",
    cover: null,
    full: null,
    videoId: "1-blKlMzy5g",
    title: { en: "Yara Tucumã — Amazonian Vitality", pt: "Yara Tucumã — Vitalidade Amazônica" },
    category: { en: "Video · AI Motion", pt: "Vídeo · Movimento em IA" },
    blurb: {
      en: "A 100% AI-native journey through the Amazonian tucumã fruit — from sun-drenched palms to the translucent glow of the final product.",
      pt: "Uma jornada 100% nativa em IA pelo tucumã amazônico — das palmeiras banhadas de sol à luminosidade translúcida do produto final."
    }
  }
];
