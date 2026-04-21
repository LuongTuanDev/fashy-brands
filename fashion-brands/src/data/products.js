const apparelProducts = [
  {
    id: "a1",
    name: "\xC1o Kho\xE1c Obsidian Structure",
    price: 85e5,
    originalPrice: 12e6,
    category: "apparel",
    collection: "Obsidian Flow",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "\u0110en", hex: "#1a1a1a" }, { name: "X\xE1m", hex: "#5a5a5a" }],
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80"
    ],
    badge: "SALE",
    isNew: false,
    isBestseller: true,
    description: "\u0110\u01B0\u1EE3c l\u1EA5y c\u1EA3m h\u1EE9ng t\u1EEB ki\u1EBFn tr\xFAc \u0111\xE1 obsidian, chi\u1EBFc \xE1o kho\xE1c n\xE0y k\u1EBFt h\u1EE3p gi\u1EEFa v\u1EA3i k\u1EF9 thu\u1EADt cao v\xE0 th\u1EA9m m\u1EF9 \u0111i\xEAu kh\u1EAFc.",
    material: "V\u1EA3i Technical Microfiber 98%, Elastane 2%",
    rating: 4.8,
    reviews: 24
  },
  {
    id: "a2",
    name: "B\u1ED9 Tailored Gilded Sand",
    price: 122e5,
    category: "apparel",
    collection: "Golden Heritage",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "V\xE0ng C\xE1t", hex: "#c9a96e" }, { name: "Tr\u1EAFng Ng\xE0", hex: "#f5f0e8" }],
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
    ],
    isNew: true,
    isBestseller: false,
    description: "B\u1ED9 suit tailored \u0111\u01B0\u1EE3c l\xE0m th\u1EE7 c\xF4ng t\u1EEB v\u1EA3i linen cao c\u1EA5p pha l\u1EABn s\u1EE3i v\xE0ng th\u1EF1c.",
    material: "Linen Cao C\u1EA5p 80%, S\u1EE3i V\xE0ng 20%",
    rating: 4.9,
    reviews: 18
  },
  {
    id: "a3",
    name: "Tech-Shell Cyber Bloom",
    price: 68e5,
    category: "apparel",
    collection: "Neo-Heritage",
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Xanh Cyber", hex: "#0a2a4a" }, { name: "\u0110en", hex: "#0d0d0d" }],
    images: [
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
    ],
    isNew: true,
    isBestseller: false,
    description: "Shell jacket v\u1EDBi l\u1EDBp ph\u1EE7 nano-tech ch\u1ED1ng n\u01B0\u1EDBc tuy\u1EC7t \u0111\u1ED1i.",
    material: "Shell Nano-Tech 100%",
    rating: 4.7,
    reviews: 31
  },
  {
    id: "a4",
    name: "\u0110\u1EA7m D\u1EA1 H\u1ED9i Silk Glitch",
    price: 155e5,
    originalPrice: 19e6,
    category: "apparel",
    collection: "Digital Luxe",
    sizes: ["XS", "S", "M"],
    colors: [{ name: "B\u1EA1ch Kim", hex: "#e8e4dc" }, { name: "H\u1ED3ng Nude", hex: "#e8c9b0" }],
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
    ],
    badge: "SPECIAL EDITION",
    isNew: false,
    isBestseller: true,
    description: '\u0110\u1EA7m d\u1EA1 h\u1ED9i l\xE0m t\u1EEB l\u1EE5a t\u1EF1 nhi\xEAn cao c\u1EA5p v\u1EDBi h\u1ECDa ti\u1EBFt "glitch" k\u1EF9 thu\u1EADt s\u1ED1 \u0111\u1ED9c \u0111\xE1o.',
    material: "Silk 100% - Grade 6A",
    rating: 5,
    reviews: 12
  },
  {
    id: "a5",
    name: "S\u01A1 Mi Sculptural White",
    price: 42e5,
    category: "apparel",
    collection: "Obsidian Flow",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Tr\u1EAFng", hex: "#f0ede8" }],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=800&q=80"
    ],
    isNew: false,
    isBestseller: true,
    description: "\xC1o s\u01A1 mi \u0111\u01B0\u1EE3c may t\u1EEB poplin cotton Ai C\u1EADp v\u1EDBi ph\u1EA7n c\u1ED5 v\xE0 manchette \u0111i\xEAu kh\u1EAFc th\u1EE7 c\xF4ng.",
    material: "Egyptian Cotton 100%",
    rating: 4.6,
    reviews: 45
  },
  {
    id: "a6",
    name: "Qu\u1EA7n Hybrid Leather-Tech",
    price: 79e5,
    category: "apparel",
    collection: "Neo-Heritage",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "\u0110en", hex: "#0d0d0d" }, { name: "N\xE2u", hex: "#3d2b1f" }],
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
    ],
    isNew: true,
    isBestseller: false,
    description: "Qu\u1EA7n d\xE0i k\u1EBFt h\u1EE3p gi\u1EEFa da th\u1EADt v\xE0 v\u1EA3i k\u1EF9 thu\u1EADt cao.",
    material: "Da Th\u1EADt 40%, Technical Fabric 60%",
    rating: 4.5,
    reviews: 19
  },
  {
    id: "a7",
    name: "\xC1o Metallic Mesh Nova",
    price: 51e5,
    category: "apparel",
    collection: "Digital Luxe",
    sizes: ["XS", "S", "M", "L"],
    colors: [{ name: "B\u1EA1c", hex: "#c0c0c0" }, { name: "V\xE0ng", hex: "#c9a96e" }],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80"
    ],
    isNew: true,
    isBestseller: false,
    description: "Top l\xE0m t\u1EEB l\u01B0\u1EDBi kim lo\u1EA1i d\u1EC7t tay. M\u1ED7i m\u1EAFt l\u01B0\u1EDBi \u0111\u01B0\u1EE3c \u0111an th\u1EE7 c\xF4ng.",
    material: "Metallic Mesh 100% - Handwoven",
    rating: 4.8,
    reviews: 8
  },
  {
    id: "a8",
    name: "Gi\xE0y Geometric Strider",
    price: 92e5,
    category: "apparel",
    collection: "Golden Heritage",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: [{ name: "\u0110en", hex: "#0d0d0d" }, { name: "Tr\u1EAFng", hex: "#f0ede8" }],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    isBestseller: true,
    description: "Gi\xE0y cao g\xF3t v\u1EDBi \u0111\u1EBF h\xECnh h\u1ECDc \u0111\u1ED9c \u0111\xE1o, \u0111\u01B0\u1EE3c \u0111\xFAc t\u1EEB nh\u1EF1a acrylic trong su\u1ED1t.",
    material: "Da B\xEA Th\u1EADt, \u0110\u1EBF Acrylic",
    rating: 4.7,
    reviews: 22
  }
];
const jewelryProducts = [
  {
    id: "j1",
    name: "Nh\u1EABn V\xE0ng C\u1EA5u Tr\xFAc",
    price: 185e5,
    category: "jewelry",
    collection: "Obsidian Flow",
    sizes: ["6", "7", "8", "9", "10"],
    colors: [{ name: "V\xE0ng 18K", hex: "#c9a96e" }, { name: "V\xE0ng Tr\u1EAFng", hex: "#e8e4dc" }],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
      "https://images.unsplash.com/photo-1574792733795-c90d7f1f9f32?w=800&q=80"
    ],
    badge: "NEW ARRIVAL",
    isNew: true,
    description: "Nh\u1EABn v\xE0ng 18K v\u1EDBi thi\u1EBFt k\u1EBF c\u1EA5u tr\xFAc \u0111\u1ED9c \u0111\xE1o, l\u1EA5y c\u1EA3m h\u1EE9ng t\u1EEB ki\u1EBFn tr\xFAc Bauhaus hi\u1EC7n \u0111\u1EA1i.",
    material: "V\xE0ng 18K",
    rating: 4.9,
    reviews: 16
  },
  {
    id: "j2",
    name: "D\xE2y Chuy\u1EC1n V\xF4 C\u1EF1c",
    price: 32e6,
    category: "jewelry",
    collection: "Neo-Heritage",
    sizes: ["40cm", "45cm", "50cm"],
    colors: [{ name: "V\xE0ng 18K", hex: "#c9a96e" }, { name: "B\u1EA1ch Kim", hex: "#e8e4dc" }],
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
    ],
    isNew: false,
    isBestseller: true,
    description: "D\xE2y chuy\u1EC1n h\xECnh v\xF4 c\u1EF1c v\u1EDBi 2.5 carat kim c\u01B0\u01A1ng pave.",
    material: "V\xE0ng 18K, Kim C\u01B0\u01A1ng 2.5ct",
    rating: 5,
    reviews: 9
  },
  {
    id: "j3",
    name: "B\xF4ng Tai Tinh Th\u1EC3",
    price: 122e5,
    category: "jewelry",
    collection: "Obsidian Flow",
    sizes: [],
    colors: [{ name: "V\xE0ng H\u1ED3ng", hex: "#dba07a" }, { name: "B\u1EA1c", hex: "#c0c0c0" }],
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88558?w=800&q=80",
      "https://images.unsplash.com/photo-1635797255620-6b8eb6e1b2b0?w=800&q=80"
    ],
    isNew: false,
    isBestseller: true,
    description: "B\xF4ng tai tinh th\u1EC3 v\u1EDBi \u0111\xE1 sapphire xanh l\u01A1 \u0111\u01B0\u1EE3c bao quanh b\u1EDFi v\xF2ng kim c\u01B0\u01A1ng nh\u1ECF.",
    material: "V\xE0ng H\u1ED3ng 14K, Sapphire, Kim C\u01B0\u01A1ng",
    rating: 4.8,
    reviews: 27
  },
  {
    id: "j4",
    name: "V\xF2ng Tay Cyber-Link",
    price: 458e5,
    category: "jewelry",
    collection: "Neo-Heritage",
    sizes: ["16cm", "17cm", "18cm", "19cm"],
    colors: [{ name: "B\u1EA1ch Kim", hex: "#e8e4dc" }, { name: "V\xE0ng 18K", hex: "#c9a96e" }],
    images: [
      "https://images.unsplash.com/photo-1573408301185-9519f94815d4?w=800&q=80",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=800&q=80"
    ],
    isBestseller: true,
    description: "V\xF2ng tay v\u1EDBi m\u1EAFt x\xEDch h\xECnh l\u1EE5c gi\xE1c l\u1EA5y c\u1EA3m h\u1EE9ng t\u1EEB m\u1EA1ch \u0111i\u1EC7n t\u1EED.",
    material: "B\u1EA1ch Kim 95%",
    rating: 4.9,
    reviews: 14
  },
  {
    id: "j5",
    name: "Nh\u1EABn \u0110\u01A1n S\u1EAFc",
    price: 15e6,
    category: "jewelry",
    collection: "Obsidian Flow",
    sizes: ["5", "6", "7", "8"],
    colors: [{ name: "V\xE0ng \u0110en", hex: "#2a1f08" }, { name: "V\xE0ng 18K", hex: "#c9a96e" }],
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80"
    ],
    description: "Nh\u1EABn minimalist v\u1EDBi m\u1ED9t \u0111\u01B0\u1EDDng ch\u1EC9 v\xE0ng ch\u1EA1y quanh to\xE0n b\u1ED9 m\u1EB7t nh\u1EABn.",
    material: "V\xE0ng 18K Black Rhodium",
    rating: 4.6,
    reviews: 33
  },
  {
    id: "j6",
    name: "Chu\u1ED7i Ng\u1ECDc Trai \u0110en",
    price: 565e5,
    category: "jewelry",
    collection: "Neo-Heritage",
    sizes: ["45cm", "50cm", "55cm"],
    colors: [{ name: "\u0110en", hex: "#1a1a1a" }, { name: "Tr\u1EAFng", hex: "#f5f0e8" }],
    images: [
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80"
    ],
    isNew: false,
    isBestseller: true,
    description: "Chu\u1ED7i ng\u1ECDc trai Tahiti \u0111en t\u1EEB \u0111\u1EA3o Polynesia, \u0111\u01B0\u1EE3c ch\u1ECDn l\u1ECDc th\u1EE7 c\xF4ng.",
    material: "Ng\u1ECDc Trai Tahiti, V\xE0ng 18K",
    rating: 5,
    reviews: 7
  },
  {
    id: "j7",
    name: "C\xE0i \xC1o C\u01A1 Kh\xED",
    price: 24e6,
    category: "jewelry",
    collection: "Obsidian Flow",
    sizes: [],
    colors: [{ name: "B\u1EA1c", hex: "#c0c0c0" }, { name: "V\xE0ng", hex: "#c9a96e" }],
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ],
    description: "C\xE0i \xE1o h\xECnh b\xE1nh r\u0103ng c\u01A1 kh\xED v\u1EDBi c\u01A1 ch\u1EBF xoay th\u1EF1c s\u1EF1.",
    material: "B\u1EA1c 925, M\u1EA1 V\xE0ng 18K",
    rating: 4.7,
    reviews: 11
  },
  {
    id: "j8",
    name: "Khuy\xEAn Tai Prism",
    price: 199e5,
    category: "jewelry",
    collection: "Neo-Heritage",
    sizes: [],
    colors: [{ name: "Trong Su\u1ED1t", hex: "#e8f0ff" }, { name: "V\xE0ng H\u1ED3ng", hex: "#dba07a" }],
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80"
    ],
    isNew: true,
    description: "Khuy\xEAn tai h\xECnh l\u0103ng k\xEDnh v\u1EDBi \u0111\xE1 pha l\xEA Swarovski.",
    material: "V\xE0ng 14K, Swarovski Crystal",
    rating: 4.8,
    reviews: 19
  }
];
const accessoriesProducts = [
  {
    id: "ac1",
    name: "T\xFAi C\u1EA7m Tay Onyx Structure",
    nameEn: "BOLSA COLLECTION",
    price: 245e5,
    category: "accessories",
    subcategory: "T\xFAi x\xE1ch",
    collection: "Global Tech",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    ],
    isNew: false,
    isBestseller: true,
    description: "Clutch c\u1EA7m tay l\xE0m t\u1EEB da c\xE1 s\u1EA5u n\u01B0\u1EDBc m\u1EB7n nh\u1EADp kh\u1EA9u. Kh\xF3a gold-plated v\u1EDBi logo ATELIER n\u1ED5i.",
    material: "Da C\xE1 S\u1EA5u, Ph\u1EE5 Ki\u1EC7n V\xE0ng 18K",
    rating: 4.9,
    reviews: 28
  },
  {
    id: "ac2",
    name: "Th\u1EAFt L\u01B0ng Gilded Circuit",
    nameEn: "CIRCUIT SERIES",
    price: 82e5,
    category: "accessories",
    subcategory: "Th\u1EAFt l\u01B0ng",
    collection: "Obsidian Pure",
    sizes: ["70cm", "75cm", "80cm", "85cm", "90cm"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80"
    ],
    description: "Th\u1EAFt l\u01B0ng da \xDD v\u1EDBi h\u1ECDa ti\u1EBFt m\u1EA1ch \u0111i\u1EC7n t\u1EED \u0111\u01B0\u1EE3c kh\u1EAFc laser.",
    material: "Da \xDD Fullgrain, Inox 316L",
    rating: 4.7,
    reviews: 35
  },
  {
    id: "ac3",
    name: "Kh\u0103n L\u1EE5a Cyber Nebula",
    nameEn: "NEBULA SILK",
    price: 58e5,
    category: "accessories",
    subcategory: "Kh\u0103n",
    collection: "Global Tech",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
      "https://images.unsplash.com/photo-1614629956483-b5d44f71c0e8?w=800&q=80"
    ],
    isNew: true,
    description: "Kh\u0103n l\u1EE5a Twill cao c\u1EA5p v\u1EDBi h\u1ECDa ti\u1EBFt tinh v\xE2n v\u0169 tr\u1EE5 \u0111\u01B0\u1EE3c in k\u1EF9 thu\u1EADt s\u1ED1.",
    material: "L\u1EE5a Twill 100% - Grade 5A",
    rating: 4.8,
    reviews: 42
  },
  {
    id: "ac4",
    name: "K\xEDnh M\u1EAFt Chrome Apex",
    nameEn: "VISION TECH",
    price: 12e6,
    category: "accessories",
    subcategory: "K\xEDnh/g\u01B0\u01A1ng",
    collection: "Global Tech",
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=80",
      "https://images.unsplash.com/photo-1547638375-ebf04735d792?w=800&q=80"
    ],
    isBestseller: true,
    description: "K\xEDnh m\u1EAFt v\u1EDBi g\u1ECDng titan c\u01B0\u1EDDng l\u1EF1c v\xE0 tr\xF2ng g\u01B0\u01A1ng m\u1EA1 chrome.",
    material: "Titanium, Chrome Mirror Lens",
    rating: 4.9,
    reviews: 18
  },
  {
    id: "ac5",
    name: "V\xED Da Obsidian Minimal",
    nameEn: "ESSENTIAL LINE",
    price: 45e5,
    category: "accessories",
    subcategory: "V\xED",
    collection: "Obsidian Pure",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    description: "V\xED m\u1ECFng t\u1ED1i gi\u1EA3n l\xE0m t\u1EEB da b\xEA \u0111en matte v\u1EDBi l\u1EDBp ch\u1ED1ng RFID.",
    material: "Da B\xEA Matte Italy",
    rating: 4.6,
    reviews: 56
  },
  {
    id: "ac6",
    name: "T\xFAi Du L\u1ECBch Zenith Black",
    nameEn: "NOMAD LUXURY",
    price: 38e6,
    category: "accessories",
    subcategory: "T\xFAi x\xE1ch",
    collection: "Global Tech",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    ],
    isNew: true,
    isBestseller: false,
    description: "T\xFAi du l\u1ECBch 48h l\xE0m t\u1EEB canvas technical v\xE0 da nappa \u0111en.",
    material: "Canvas Technical, Da Nappa, Nh\xF4m H\xE0ng Kh\xF4ng",
    rating: 4.8,
    reviews: 13
  },
  {
    id: "ac7",
    name: "\u0110\u1ED3ng H\u1ED3 Gilded Skeleton",
    nameEn: "CHRONOS ELITE",
    price: 115e6,
    category: "accessories",
    subcategory: "\u0110\u1ED3ng h\u1ED3",
    collection: "Obsidian Pure",
    images: [
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80"
    ],
    isBestseller: true,
    description: "\u0110\u1ED3ng h\u1ED3 skeleton th\u1EE7 c\xF4ng v\u1EDBi b\u1ED9 m\xE1y l\u1ED9 100%. Limited edition 10 chi\u1EBFc.",
    material: "V\xE0ng 18K, Sapphire Crystal, Da C\xE1 S\u1EA5u",
    rating: 5,
    reviews: 5
  },
  {
    id: "ac8",
    name: "N\u01B0\u1EDBc Hoa Atelier N\xB001",
    nameEn: "SIGNATURE SCENT",
    price: 65e5,
    category: "accessories",
    subcategory: "N\u01B0\u1EDBc hoa",
    collection: "Global Tech",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80",
      "https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80"
    ],
    isNew: true,
    description: "N\u01B0\u1EDBc hoa \u0111\u1ED9c quy\u1EC1n ATELIER v\u1EDBi 24 n\u1ED1t h\u01B0\u01A1ng hi\u1EBFm. Extrait de Parfum 50ml.",
    material: "N\u01B0\u1EDBc hoa Extrait de Parfum 30%",
    rating: 4.9,
    reviews: 31
  }
];
const allProducts = [...apparelProducts, ...jewelryProducts, ...accessoriesProducts];
function getProductsByCategory(category) {
  return allProducts.filter((p) => p.category === category);
}
function getProductById(id) {
  return allProducts.find((p) => p.id === id);
}
function getBestSellers(limit = 6) {
  return allProducts.filter((p) => p.isBestseller).slice(0, limit);
}
function getNewArrivals(limit = 8) {
  return allProducts.filter((p) => p.isNew).slice(0, limit);
}
const collections = {
  apparel: ["Obsidian Flow", "Golden Heritage", "Neo-Heritage", "Digital Luxe"],
  jewelry: ["Obsidian Flow", "Neo-Heritage"],
  accessories: ["Global Tech", "Obsidian Pure"]
};
const accessorySubcategories = ["T\xFAi x\xE1ch", "Th\u1EAFt l\u01B0ng", "K\xEDnh/g\u01B0\u01A1ng", "\u0110\u1ED3ng h\u1ED3"];
const categoryMeta = {
  apparel: {
    title: "Trang Ph\u1EE5c",
    titleAccent: "Th\u01B0\u1EE3ng H\u1EA1ng",
    subtitle: "Kh\xE1m ph\xE1 b\u1ED9 s\u01B0u t\u1EADp trang ph\u1EE5c \u0111\u01B0\u1EE3c ch\u1EAFt l\u1ECDc th\u1EE7 c\xF4ng, n\u01A1i c\xF4ng ngh\u1EC7 t\u01B0\u01A1ng lai giao thoa c\xF9ng di s\u1EA3n th\u1EE7 c\xF4ng tinh x\u1EA3o.",
    priceMax: 2e7
  },
  jewelry: {
    title: "Trang S\u1EE9c",
    titleAccent: "Cao C\u1EA5p",
    subtitle: "Kh\xE1m ph\xE1 b\u1ED9 s\u01B0u t\u1EADp trang s\u1EE9c \u0111\u01B0\u1EE3c ch\u1EAFt l\u1ECDc th\u1EE7 c\xF4ng, n\u01A1i c\xF4ng ngh\u1EC7 t\u01B0\u01A1ng lai giao thoa c\xF9ng di s\u1EA3n th\u1EE7 c\xF4ng tinh x\u1EA3o.",
    priceMax: 6e7
  },
  accessories: {
    title: "Ph\u1EE5 Ki\u1EC7n",
    titleAccent: "Th\u01B0\u1EE3ng H\u1EA1ng",
    subtitle: "Kh\xE1m ph\xE1 b\u1ED9 s\u01B0u t\u1EADp ph\u1EE5 ki\u1EC7n \u0111\u01B0\u1EE3c ch\u1EAFt l\u1ECDc th\u1EE7 c\xF4ng, n\u01A1i c\xF4ng ngh\u1EC7 t\u01B0\u01A1ng lai giao thoa c\xF9ng di s\u1EA3n th\u1EE7 c\xF4ng tinh x\u1EA3o.",
    priceMax: 12e7
  }
};
export {
  accessorySubcategories,
  allProducts,
  categoryMeta,
  collections,
  getBestSellers,
  getNewArrivals,
  getProductById,
  getProductsByCategory
};
