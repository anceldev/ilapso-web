export const talleres = [
  {
    id: "velas",
    href: "/talleres/velas",
    title: "Velas Artesanales",
    description: "Aprende a crear luz y atmósfera con tus propias manos. En este taller exploramos el mundo de las ceras vegetales y los aromas para que diseñes una vela única, desde el vertido hasta el detalle final.",
    image: "/images/product-1.jpg",
    date: "Febrero 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "velas",
    register: "https://www.google.com",
  },
  {
    id: "perfumes",
    href: "/talleres/perfumes",
    title: "Perfumes Artesanales",
    description: "Aprende a crear perfumes únicos con tus propias manos. En este taller exploramos el mundo de los perfumes y los aromas para que diseñes un perfume único, desde el vertido hasta el detalle final.",
    image: "/images/product-2.jpg",
    date: "Febrero 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "perfumes",
    register: "https://www.google.com",
  },
  {
    id: "jabones",
    href: "/talleres/jabones",
    title: "Jabones Artesanales",
    description: "Aprende a crear jabones únicos con tus propias manos. En este taller exploramos el mundo de los jabones y los aromas para que diseñes un jabón único, desde el vertido hasta el detalle final.",
    image: "/images/product-3.jpg",
    date: "Febrero 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "jabones",
    register: "https://www.google.com",
  },
]

export const talleresVelas = [
  {
    id: "taller-velas-febrero-2026",
    taller_id: "tv-feb-2026",
    href: "/talleres/taller-velas-febrero-2026",
    title: "Velas Artesanales",
    description: "Aprende a crear luz y atmósfera con tus propias manos. En este taller exploramos el mundo de las ceras vegetales y los aromas para que diseñes una vela única, desde el vertido hasta el detalle final.",
    image: "/images/product-1.jpg",
    date: "Febrero 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "velas",
    register: "https://buy.stripe.com/test_28EbJ21CT1c7g3A4Z92VG00",

  },
  {
    id: "taller-velas-mayo-2026",
    taller_id: "tvs-mayo-2026",
      href: "/talleres/taller-velas-mayo-2026",
    title: "Velas Artesanales",
    description: "Aprende a crear luz y atmósfera con tus propias manos. En este taller exploramos el mundo de las ceras vegetales y los aromas para que diseñes una vela única, desde el vertido hasta el detalle final",
    image: "/images/product-2.jpg",
    date: "Mayo 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "velas",
    register: "https://www.google.com",
  },
]
export const talleresPerfumes = [
  {
    id: "taller-perfumes-febrero-2026",
    taller_id: "tp-feb-2026",
    href: "/talleres/taller-perfumes-febrero-2026",
    title: "Perfumes Sólidos",
    description: "Descubre una nueva forma de perfumarte: texturas sedosas y aromas naturales que se funden con el calor de tu piel. Un ritual íntimo, delicado y libre de alcohol.",
    image: "/images/product-3.jpg",
    date: "Febrero 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "perfumes",
    register: "https://www.google.com",
  },
]

export const talleresJabones = [
  {
    id: "taller-jabones-febrero-2026",
    taller_id: "tj-feb-2026",
    href: "/talleres/taller-jabones-febrero-2026",
    title: "Jabones Artesanales",
    description: "Jabones creados con ingredientes naturales y aceites vegetales que respetan tu cuerpo. Una limpieza suave y nutritiva que transforma el baño en un momento de puro mimo",
    image: "/images/product-4.jpg",
    date: "Abril 2026",
    time: "10:00 - 12:00",
    location: "Madrid",
    price: "100 €",
    capacity: 10,
    type: "jabones",
    register: "https://www.google.com",
  },
]
export const productsTypes = [
  {
    id: "replicas",
    name: "RÉPLICAS",
    description: "Nos apasiona dar forma a piezas especiales que cuenten vuestra historia.",
    href: "/productos/replicas",
    image: "/images/product-1.jpg",
  },
  {
    id: "velas-artesanales",
    name: "VELAS ARTESANALES",
    description: "Luz que nace del detalle. Ceras vegetales vertidas en recipientes creados a mano para transformar tu atmósfera.",
    href: "/productos/velas-artesanales",
    image: "/images/product-2.jpg",
  },
  {
    id: "perfumes-solidos",
    name: "PERFUMES SÓLIDOS",
    description: "La esencia de la naturaleza en un formato íntimo y delicado, diseñado para fundirse con tu piel.",
    href: "/productos/perfumes-solidos",
    image: "/images/product-3.jpg",
  },
  {
    id: "jabones-artesanales",
    name: "JABONES ARTESANALES",
    description: "Cuidado consciente y sensorial. Limpieza profunda con ingredientes naturales que respetan tu cuerpo y el entorno.",
    href: "/productos/jabones-artesanales",
    image: "/images/product-4.jpg",
  },
];

export const productsReplicas = [
  {
    id: 1,
    slug: "1-replica",
    name: "Réplica",
    description: "Réplica de pie o mano, con marco artesanal grabado",
    price: [
      {
        id: 1,
        price: "90€",
        details: "De 0 a 3 meses",
      },
      {
        id: 2,
        price: "110€",
        details: "De 4 a 24 meses",
      }
    ],
    image: "/images/hand-1.png",
  },
  {
    id: 2,
    slug: "2-replicas",
    name: "2 réplicas",
    description: "2 pies o manos, con marco artesanal grabado",
    price: [
      {
        id: 1,
        price: "140€",
        details: "De 0 a 3 meses",
      },
      {
        id: 2,
        price: "160€",
        details: "De 4 a 24 meses",
      }
    ],
    image: "/images/rep-prod2.webp",
  },
  {
    id: 3,
    slug: "4-replicas",
    name: "4 réplicas",
    description: "2 pies y 2 manos, con marco artesanal grabado",
    price: [
      {
        id: 1,
        price: "240€",
        details: "De 0 a 3 meses",
      },
      {
        id: 2,
        price: "300€",
        details: "De 4 a 24 meses",
      }
    ],
    image: "/images/hand-2.jpg",
  },
  {
    id: 4,
    slug: "1-1-replicas",
    name: "1 + 1 réplicas",
    description: "1 pie de bebé y 1 mano de adulto, con peana artesanal grabado",
    price: [
      {
        id: 1,
        price: "190€",
        details: "",
      },
    ],
    image: "/images/hand-2.jpg",
  },
  {
    id: 5,
    slug: "2-2-replicas",
    name: "2 + 2 réplicas",
    description: "2 pies o manos de bebé y 2 pies o manos de adulto, con peana artesanal grabado",
    price: [
      {
        id: 1,
        price: "230€",
        details: "",
      },
    ],
    image: "/images/rep-prod5.webp",
  },
  {
    id: 6,
    slug: "replicas-manos-adultos",
    name: "Réplicas",
    description: "Réplicas de manos de adultos, con peana artesanal grabado",
    price: [
      {
        id: 1,
        price: "165€",
        details: "2 manos",
      },
      {
        id: 2,
        price: "220€",
        details: "3 manos",
      },
      {
        id: 3,
        price: "290€",
        details: "4 manos",
      },
    ],
    image: "/images/rep-prod6.webp",
  },
  {
    id: 7,
    slug: "replica-barriga",
    name: "Réplica",
    description: "Réplica de barriga, con peana artesanal grabado",
    price: [
      {
        id: 1,
        price: "250",
        details: "Sólo barriga",
      },
      {
        id: 2,
        price: "275",
        details: "Barriga y 2 manos",
      },
      {
        id: 3,
        price: "300",
        details: "Barriga y 4 manos",
      },
    ],
    image: "/images/hand-2.jpg",
  },
]

export const productsVelas = [
  {
    id: 1,
    slug: "vela-pequena",
    name: "Vela pequeña",
    description: "Vela artesanal de cera vegetal en recipiente de cerámica, 8cm de altura",
    price: [
      {
        id: 1,
        price: "25€",
        details: "Aroma lavanda",
      },
      {
        id: 2,
        price: "25€",
        details: "Aroma vainilla",
      },
      {
        id: 3,
        price: "25€",
        details: "Aroma cítrico",
      }
    ],
    image: "/images/product-1.jpg",
  },
  {
    id: 2,
    slug: "vela-mediana",
    name: "Vela mediana",
    description: "Vela artesanal de cera vegetal en recipiente de cerámica, 12cm de altura",
    price: [
      {
        id: 1,
        price: "35€",
        details: "Aroma lavanda",
      },
      {
        id: 2,
        price: "35€",
        details: "Aroma vainilla",
      },
      {
        id: 3,
        price: "35€",
        details: "Aroma cítrico",
      }
    ],
    image: "/images/product-2.jpg",
  },
  {
    id: 3,
    slug: "vela-grande",
    name: "Vela grande",
    description: "Vela artesanal de cera vegetal en recipiente de cerámica, 18cm de altura",
    price: [
      {
        id: 1,
        price: "45€",
        details: "Aroma lavanda",
      },
      {
        id: 2,
        price: "45€",
        details: "Aroma vainilla",
      },
      {
        id: 3,
        price: "45€",
        details: "Aroma cítrico",
      }
    ],
    image: "/images/product-1.jpg",
  },
  {
    id: 4,
    slug: "pack-3-velas-pequenas",
    name: "Pack 3 velas pequeñas",
    description: "Set de 3 velas pequeñas con aromas combinados, ideal para regalo",
    price: [
      {
        id: 1,
        price: "65€",
        details: "Aromas surtidos",
      },
    ],
    image: "/images/product-2.jpg",
  },
  {
    id: 5,
    slug: "vela-personalizada",
    name: "Vela personalizada",
    description: "Vela artesanal con recipiente personalizado y aroma a elegir",
    price: [
      {
        id: 1,
        price: "55€",
        details: "Incluye grabado personalizado",
      },
    ],
    image: "/images/product-1.jpg",
  },
]

export const productsPerfumes = [
  {
    id: 1,
    slug: "perfume-solido-individual",
    name: "Perfume sólido individual",
    description: "Perfume sólido en formato compacto, 10g, con base de cera de abeja y aceites esenciales",
    price: [
      {
        id: 1,
        price: "28€",
        details: "Aroma floral",
      },
      {
        id: 2,
        price: "28€",
        details: "Aroma amaderado",
      },
      {
        id: 3,
        price: "28€",
        details: "Aroma fresco",
      }
    ],
    image: "/images/product-3.jpg",
  },
  {
    id: 2,
    slug: "pack-2-perfumes-solidos",
    name: "Pack 2 perfumes sólidos",
    description: "Set de 2 perfumes sólidos con aromas complementarios, ideal para probar diferentes fragancias",
    price: [
      {
        id: 1,
        price: "50€",
        details: "Aromas surtidos",
      },
    ],
    image: "/images/product-3.jpg",
  },
  {
    id: 3,
    slug: "perfume-solido-premium",
    name: "Perfume sólido premium",
    description: "Perfume sólido de mayor tamaño, 20g, con ingredientes premium y fragancia exclusiva",
    price: [
      {
        id: 1,
        price: "45€",
        details: "Aroma exclusivo",
      },
    ],
    image: "/images/product-3.jpg",
  },
  {
    id: 4,
    slug: "perfume-solido-personalizado",
    name: "Perfume sólido personalizado",
    description: "Perfume sólido con fragancia personalizada según tus preferencias",
    price: [
      {
        id: 1,
        price: "55€",
        details: "Consulta personalizada incluida",
      },
    ],
    image: "/images/product-3.jpg",
  },
]

export const productsJabones = [
  {
    id: 1,
    slug: "jabon-individual",
    name: "Jabón individual",
    description: "Jabón artesanal de 100g, con aceites vegetales y aceites esenciales naturales",
    price: [
      {
        id: 1,
        price: "12€",
        details: "Aroma lavanda",
      },
      {
        id: 2,
        price: "12€",
        details: "Aroma menta",
      },
      {
        id: 3,
        price: "12€",
        details: "Aroma cítrico",
      }
    ],
    image: "/images/product-4.jpg",
  },
  {
    id: 2,
    slug: "pack-3-jabones",
    name: "Pack 3 jabones",
    description: "Set de 3 jabones artesanales con diferentes aromas, ideal para uso diario",
    price: [
      {
        id: 1,
        price: "30€",
        details: "Aromas surtidos",
      },
    ],
    image: "/images/product-4.jpg",
  },
  {
    id: 3,
    slug: "jabon-exfoliante",
    name: "Jabón exfoliante",
    description: "Jabón artesanal con propiedades exfoliantes, 100g, con semillas naturales",
    price: [
      {
        id: 1,
        price: "15€",
        details: "Aroma menta",
      },
      {
        id: 2,
        price: "15€",
        details: "Aroma cítrico",
      }
    ],
    image: "/images/product-4.jpg",
  },
  {
    id: 4,
    slug: "jabon-hidratante",
    name: "Jabón hidratante",
    description: "Jabón artesanal con propiedades hidratantes intensas, 100g, con aceite de oliva y manteca de karité",
    price: [
      {
        id: 1,
        price: "18€",
        details: "Aroma lavanda",
      },
      {
        id: 2,
        price: "18€",
        details: "Sin aroma",
      }
    ],
    image: "/images/product-4.jpg",
  },
  {
    id: 5,
    slug: "pack-completo-jabones",
    name: "Pack completo",
    description: "Set completo con 5 jabones artesanales de diferentes tipos y aromas",
    price: [
      {
        id: 1,
        price: "65€",
        details: "Variedad completa",
      },
    ],
    image: "/images/product-4.jpg",
  },
]


// Función helper para obtener todos los talleres por tipo/categoría
export function getTalleresByType(type: string) {
  const allTalleres = [...talleresVelas, ...talleresPerfumes, ...talleresJabones];
  return allTalleres.filter(taller => taller.type === type);
}

// Función helper para obtener un taller por su ID
export function getTallerById(id: string) {
  const allTalleres = [...talleresVelas, ...talleresPerfumes, ...talleresJabones];
  return allTalleres.find(taller => taller.id === id);
}

// Función helper para obtener información de la categoría
export function getCategoriaInfo(type: string) {
  return talleres.find(cat => cat.id === type);
}

// Función helper para obtener información de la categoría de productos
export function getProductoCategoriaInfo(id: string) {
  return productsTypes.find(cat => cat.id === id);
}

// Función helper para obtener productos por categoría
export function getProductosByCategoria(categoria: string) {
  switch (categoria) {
    case "replicas":
      return productsReplicas;
    case "velas-artesanales":
      return productsVelas;
    case "perfumes-solidos":
      return productsPerfumes;
    case "jabones-artesanales":
      return productsJabones;
    default:
      return [];
  }
}

// Función helper para obtener un producto por categoría y slug
export function getProductoBySlug(categoria: string, slug: string) {
  const productos = getProductosByCategoria(categoria);
  return productos.find(producto => producto.slug === slug);
}