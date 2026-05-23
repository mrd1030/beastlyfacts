// Full animal encyclopedia — guideId matches a page/guide if it exists
export const encyclopediaAnimals = [
  // GECKOS
  { id: "crested-gecko", name: "Crested Gecko", scientific: "Correlophus ciliatus", category: "Geckos", emoji: "🦎", difficulty: "Low", guideId: "crested-gecko", available: true },
  { id: "leopard-gecko", name: "Leopard Gecko", scientific: "Eublepharis macularius", category: "Geckos", emoji: "🦎", difficulty: "Low", guideId: "leopard-gecko", available: true },
  { id: "gargoyle-gecko", name: "Gargoyle Gecko", scientific: "Rhacodactylus auriculatus", category: "Geckos", emoji: "🦎", difficulty: "Low", guideId: "gargoyle-gecko", available: true },
  { id: "mourning-gecko", name: "Mourning Gecko", scientific: "Lepidodactylus lugubris", category: "Geckos", emoji: "🦎", difficulty: "Low", guideId: "mourning-gecko", available: true },
  { id: "tokay-gecko", name: "Tokay Gecko", scientific: "Gekko gecko", category: "Geckos", emoji: "🦎", difficulty: "Intermediate", guideId: null, available: false },
  { id: "african-fat-tail", name: "African Fat-Tailed Gecko", scientific: "Hemitheconyx caudicinctus", category: "Geckos", emoji: "🦎", difficulty: "Low", guideId: null, available: false },
  { id: "leaf-tailed-gecko", name: "Leaf-Tailed Gecko", scientific: "Uroplatus spp.", category: "Geckos", emoji: "🦎", difficulty: "High", guideId: "leaf-tailed-gecko", available: true },

  // LIZARDS
  { id: "bearded-dragon", name: "Bearded Dragon", scientific: "Pogona vitticeps", category: "Lizards", emoji: "🦎", difficulty: "Moderate", guideId: "bearded-dragon", available: true },
  { id: "blue-tongue-skink", name: "Blue Tongue Skink", scientific: "Tiliqua spp.", category: "Lizards", emoji: "🦎", difficulty: "Low–Moderate", guideId: "blue-tongue-skink", available: true },
  { id: "ackie-monitor", name: "Ackie Monitor", scientific: "Varanus acanthurus", category: "Lizards", emoji: "🦎", difficulty: "High", guideId: "ackie-monitor", available: true },
  { id: "tegu", name: "Argentine Black & White Tegu", scientific: "Salvator merianae", category: "Lizards", emoji: "🦎", difficulty: "High", guideId: "tegu", available: true },
  { id: "chameleon-jackson", name: "Jackson's Chameleon", scientific: "Trioceros jacksonii", category: "Lizards", emoji: "🦎", difficulty: "High", guideId: "chameleon", available: true },
  { id: "green-anole", name: "Green Anole", scientific: "Anolis carolinensis", category: "Lizards", emoji: "🦎", difficulty: "Low–Moderate", guideId: null, available: false },
  { id: "savannah-monitor", name: "Savannah Monitor", scientific: "Varanus exanthematicus", category: "Lizards", emoji: "🦎", difficulty: "High", guideId: null, available: false },
  { id: "uromastyx", name: "Uromastyx", scientific: "Uromastyx spp.", category: "Lizards", emoji: "🦎", difficulty: "Moderate", guideId: null, available: false },

  // SNAKES
  { id: "ball-python", name: "Ball Python", scientific: "Python regius", category: "Snakes", emoji: "🐍", difficulty: "Moderate", guideId: "ball-python", available: true },
  { id: "corn-snake", name: "Corn Snake", scientific: "Pantherophis guttatus", category: "Snakes", emoji: "🐍", difficulty: "Low", guideId: "corn-snake", available: true },
  { id: "hognose-snake", name: "Hognose Snake", scientific: "Heterodon spp.", category: "Snakes", emoji: "🐍", difficulty: "Moderate", guideId: "hognose-snake", available: true },
  { id: "boa-constrictor", name: "Boa Constrictor", scientific: "Boa spp.", category: "Snakes", emoji: "🐍", difficulty: "Moderate–High", guideId: "boa-constrictor", available: true },
  { id: "kingsnake", name: "California Kingsnake", scientific: "Lampropeltis californiae", category: "Snakes", emoji: "🐍", difficulty: "Low", guideId: null, available: false },
  { id: "milk-snake", name: "Milk Snake", scientific: "Lampropeltis triangulum", category: "Snakes", emoji: "🐍", difficulty: "Low", guideId: null, available: false },
  { id: "blue-racer", name: "Blue Racer", scientific: "Coluber constrictor foxii", category: "Snakes", emoji: "🐍", difficulty: "High", guideId: null, available: false },

  // TURTLES & TORTOISES
  { id: "red-eared-slider", name: "Red-Eared Slider", scientific: "Trachemys scripta elegans", category: "Turtles & Tortoises", emoji: "🐢", difficulty: "High", guideId: "red-eared-slider", available: true },
  { id: "russian-tortoise", name: "Russian Tortoise", scientific: "Testudo horsfieldii", category: "Turtles & Tortoises", emoji: "🐢", difficulty: "Moderate", guideId: null, available: false },
  { id: "sulcata-tortoise", name: "Sulcata Tortoise", scientific: "Centrochelys sulcata", category: "Turtles & Tortoises", emoji: "🐢", difficulty: "High", guideId: null, available: false },
  { id: "box-turtle", name: "Box Turtle", scientific: "Terrapene spp.", category: "Turtles & Tortoises", emoji: "🐢", difficulty: "Moderate", guideId: null, available: false },

  // SMALL MAMMALS
  { id: "hedgehog", name: "Hedgehog", scientific: "Atelerix albiventris", category: "Small Mammals", emoji: "🦔", difficulty: "Intermediate", guideId: "hedgehog", available: true },
  { id: "rabbit", name: "Rabbit", scientific: "Oryctolagus cuniculus", category: "Small Mammals", emoji: "🐰", difficulty: "Beginner", guideId: "rabbit", available: true },
  { id: "guinea-pig", name: "Guinea Pig", scientific: "Cavia porcellus", category: "Small Mammals", emoji: "🐹", difficulty: "Beginner", guideId: "guinea-pig", available: true },
  { id: "chinchilla", name: "Chinchilla", scientific: "Chinchilla lanigera", category: "Small Mammals", emoji: "🐭", difficulty: "Intermediate", guideId: "chinchilla", available: true },
  { id: "ferret", name: "Ferret", scientific: "Mustela putorius furo", category: "Small Mammals", emoji: "🦡", difficulty: "Intermediate", guideId: null, available: false },
  { id: "sugar-glider", name: "Sugar Glider", scientific: "Petaurus breviceps", category: "Small Mammals", emoji: "🐿️", difficulty: "High", guideId: "sugar-glider", available: true },

  // BIRDS
  { id: "budgie", name: "Budgie / Parakeet", scientific: "Melopsittacus undulatus", category: "Birds", emoji: "🐦", difficulty: "Beginner", guideId: "budgie", available: true },
  { id: "cockatiel", name: "Cockatiel", scientific: "Nymphicus hollandicus", category: "Birds", emoji: "🦜", difficulty: "Beginner", guideId: null, available: false },
  { id: "conure", name: "Green Cheek Conure", scientific: "Pyrrhura molinae", category: "Birds", emoji: "🦜", difficulty: "Intermediate", guideId: null, available: false },
  { id: "african-grey", name: "African Grey Parrot", scientific: "Psittacus erithacus", category: "Birds", emoji: "🦜", difficulty: "High", guideId: "african-grey", available: true },
  { id: "lovebird", name: "Lovebird", scientific: "Agapornis spp.", category: "Birds", emoji: "🐦", difficulty: "Intermediate", guideId: "lovebird", available: true },

  // INVERTEBRATES
  { id: "tarantula", name: "Tarantula", scientific: "Various", category: "Invertebrates", emoji: "🕷️", difficulty: "Low–Moderate", guideId: null, available: false },
  { id: "praying-mantis", name: "Praying Mantis", scientific: "Various", category: "Invertebrates", emoji: "🦗", difficulty: "Low", guideId: null, available: false },
  { id: "millipede", name: "Giant African Millipede", scientific: "Archispirostreptus gigas", category: "Invertebrates", emoji: "🐛", difficulty: "Low", guideId: null, available: false },
  { id: "hissing-cockroach", name: "Madagascar Hissing Cockroach", scientific: "Gromphadorhina portentosa", category: "Invertebrates", emoji: "🪳", difficulty: "Low", guideId: null, available: false },

  // AMPHIBIANS
  { id: "pacman-frog", name: "Pac-Man Frog", scientific: "Ceratophrys ornata", category: "Amphibians", emoji: "🐸", difficulty: "Low", guideId: null, available: false },
  { id: "axolotl", name: "Axolotl", scientific: "Ambystoma mexicanum", category: "Amphibians", emoji: "🦎", difficulty: "Moderate", guideId: null, available: false },
  { id: "whites-tree-frog", name: "White's Tree Frog", scientific: "Litoria caerulea", category: "Amphibians", emoji: "🐸", difficulty: "Low", guideId: null, available: false },
  { id: "fire-belly-toad", name: "Fire-Bellied Toad", scientific: "Bombina orientalis", category: "Amphibians", emoji: "🐸", difficulty: "Low–Moderate", guideId: null, available: false },
];

export const encyclopediaCategories = [
  { name: "Geckos", emoji: "🦎" },
  { name: "Lizards", emoji: "🦎" },
  { name: "Snakes", emoji: "🐍" },
  { name: "Turtles & Tortoises", emoji: "🐢" },
  { name: "Small Mammals", emoji: "🦔" },
  { name: "Birds", emoji: "🐦" },
  { name: "Invertebrates", emoji: "🕷️" },
  { name: "Amphibians", emoji: "🐸" },
];

export const difficultyColor = {
  "Low": "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
  "Low–Moderate": "text-lime-600 bg-lime-50 dark:bg-lime-950 dark:text-lime-400",
  "Beginner": "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
  "Moderate": "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
  "Moderate–High": "text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400",
  "Intermediate": "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
  "High": "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400",
};
