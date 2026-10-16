import { Product, ProductColor } from '../models/product.model';

const C = {
  preto: { name: 'Preto', hex: '#16181D' },
  branco: { name: 'Branco', hex: '#F4F2EE' },
  marinho: { name: 'Marinho', hex: '#0E1A33' },
  azul: { name: 'Azul', hex: '#2C4A80' },
  cinza: { name: 'Cinza', hex: '#8A8F99' },
  bege: { name: 'Bege', hex: '#CDB99A' },
  verde: { name: 'Verde', hex: '#4A5D4E' },
  vinho: { name: 'Vinho', hex: '#6B1E2A' },
  caramelo: { name: 'Caramelo', hex: '#A86B32' }
} satisfies Record<string, ProductColor>;

const TOP = ['P', 'M', 'G', 'GG', 'XG'];
const BOTTOM = ['38', '40', '42', '44', '46', '48'];
const FEET = ['37', '38', '39', '40', '41', '42', '43', '44'];
const UNICO = ['Único'];

/** Placeholder visual até termos fotos: gradiente baseado na cor principal do produto. */
function gradient(hex: string): string {
  return `linear-gradient(160deg, color-mix(in srgb, ${hex} 70%, #ffffff) 0%, ${hex} 100%)`;
}

type Seed = Omit<Product, 'id' | 'image' | 'rating'> & { rating?: number };

const SEEDS: Seed[] = [
  // Camisetas
  { name: 'Camiseta Essential Logo', type: 'camisetas', category: 'Grife', brand: 'Calvin Klein', price: 179.9, oldPrice: 219.9, colors: [C.preto, C.branco, C.marinho], sizes: TOP },
  { name: 'Camiseta Sportswear Club', type: 'camisetas', category: 'Nike', brand: 'Nike', price: 149.9, colors: [C.preto, C.branco, C.cinza], sizes: TOP, tag: 'Mais vendido' },
  { name: 'Camisa Polo Piquet Clássica', type: 'camisetas', category: 'Polo', brand: 'Lacoste', price: 399.9, oldPrice: 459.9, colors: [C.marinho, C.branco, C.verde], sizes: TOP },
  { name: 'Camiseta Surf Line', type: 'camisetas', category: 'Surf', brand: 'Quiksilver', price: 129.9, colors: [C.azul, C.branco, C.preto], sizes: TOP },
  { name: 'Camiseta Oversized Heavy', type: 'camisetas', category: 'Oversized', brand: 'Reserva', price: 159.9, colors: [C.bege, C.preto, C.cinza], sizes: TOP, tag: 'Novo' },
  { name: 'Camiseta Básica Pima', type: 'camisetas', category: 'Básica', brand: 'Reserva', price: 99.9, colors: [C.branco, C.preto, C.marinho, C.cinza], sizes: TOP },
  // Bermudas
  { name: 'Bermuda Tactel Volley', type: 'bermudas', category: 'Tactel', brand: 'Hurley', price: 139.9, colors: [C.azul, C.preto, C.verde], sizes: TOP },
  { name: 'Bermuda Jeans Slim', type: 'bermudas', category: 'Jeans', brand: "Levi's", price: 229.9, oldPrice: 269.9, colors: [C.azul, C.preto], sizes: BOTTOM },
  { name: 'Bermuda Chino Sarja', type: 'bermudas', category: 'Sarja', brand: 'Reserva', price: 189.9, colors: [C.bege, C.marinho, C.verde], sizes: BOTTOM },
  { name: 'Bermuda Moletom Club', type: 'bermudas', category: 'Moletom', brand: 'Nike', price: 199.9, colors: [C.cinza, C.preto], sizes: TOP },
  { name: 'Boardshort Pro', type: 'bermudas', category: 'Surf', brand: 'Quiksilver', price: 219.9, colors: [C.marinho, C.azul], sizes: BOTTOM, tag: 'Novo' },
  // Peças de inverno
  { name: 'Jaqueta Bomber Urban', type: 'pecas-de-inverno', category: 'Jaquetas', brand: 'Tommy Hilfiger', price: 599.9, oldPrice: 699.9, colors: [C.preto, C.verde, C.marinho], sizes: TOP },
  { name: 'Moletom Canguru Essentials', type: 'pecas-de-inverno', category: 'Moletons', brand: 'Adidas', price: 349.9, colors: [C.cinza, C.preto, C.marinho], sizes: TOP },
  { name: 'Corta-vento Windrunner', type: 'pecas-de-inverno', category: 'Corta-vento', brand: 'Nike', price: 449.9, colors: [C.preto, C.azul], sizes: TOP },
  { name: 'Suéter Tricô Gola Careca', type: 'pecas-de-inverno', category: 'Tricô', brand: 'Reserva', price: 279.9, colors: [C.bege, C.vinho, C.marinho], sizes: TOP },
  { name: 'Jaqueta Puffer Matelassê', type: 'pecas-de-inverno', category: 'Puffer', brand: 'The North Face', price: 899.9, oldPrice: 1099.9, colors: [C.preto, C.marinho], sizes: TOP, tag: 'Limitado' },
  // Calças
  { name: 'Calça Jeans 511 Slim', type: 'calcas', category: 'Jeans', brand: "Levi's", price: 399.9, colors: [C.azul, C.preto], sizes: BOTTOM, tag: 'Mais vendido' },
  { name: 'Calça Chino Sarja', type: 'calcas', category: 'Sarja', brand: 'Reserva', price: 259.9, colors: [C.bege, C.marinho, C.verde], sizes: BOTTOM },
  { name: 'Calça Jogger Tech Fleece', type: 'calcas', category: 'Jogger', brand: 'Nike', price: 499.9, colors: [C.preto, C.cinza], sizes: TOP },
  { name: 'Calça Alfaiataria Slim', type: 'calcas', category: 'Alfaiataria', brand: 'Calvin Klein', price: 349.9, oldPrice: 429.9, colors: [C.preto, C.cinza, C.marinho], sizes: BOTTOM },
  { name: 'Calça Cargo Ripstop', type: 'calcas', category: 'Cargo', brand: 'Oakley', price: 329.9, colors: [C.verde, C.preto, C.bege], sizes: BOTTOM },
  // Bonés
  { name: 'Boné 9FORTY Aba Curva', type: 'bones', category: 'Aba curva', brand: 'New Era', price: 199.9, colors: [C.preto, C.marinho], sizes: UNICO },
  { name: 'Boné 59FIFTY Aba Reta', type: 'bones', category: 'Aba reta', brand: 'New Era', price: 249.9, colors: [C.preto], sizes: ['56', '57', '58', '59', '60'] },
  { name: 'Boné Trucker Logo', type: 'bones', category: 'Trucker', brand: 'Oakley', price: 179.9, colors: [C.preto, C.cinza], sizes: UNICO },
  { name: 'Boné Dad Hat Bordado', type: 'bones', category: 'Dad hat', brand: 'Lacoste', price: 229.9, colors: [C.branco, C.marinho, C.bege], sizes: UNICO, tag: 'Novo' },
  { name: 'Bucket Hat Sarja', type: 'bones', category: 'Bucket', brand: 'Adidas', price: 159.9, colors: [C.bege, C.preto], sizes: UNICO },
  // Acessórios
  { name: 'Relógio Cronógrafo Aço', type: 'acessorios', category: 'Relógios', brand: 'Tommy Hilfiger', price: 899.9, oldPrice: 1099.9, colors: [C.preto, C.cinza], sizes: UNICO },
  { name: 'Cinto Couro Reversível', type: 'acessorios', category: 'Cintos', brand: 'Calvin Klein', price: 249.9, colors: [C.preto, C.caramelo], sizes: ['90', '95', '100', '105'] },
  { name: 'Carteira Slim Couro', type: 'acessorios', category: 'Carteiras', brand: 'Lacoste', price: 299.9, colors: [C.preto, C.caramelo], sizes: UNICO },
  { name: 'Óculos de Sol Holbrook', type: 'acessorios', category: 'Óculos', brand: 'Oakley', price: 699.9, colors: [C.preto], sizes: UNICO, tag: 'Mais vendido' },
  { name: 'Mochila Urban 25L', type: 'acessorios', category: 'Mochilas', brand: 'The North Face', price: 549.9, colors: [C.preto, C.cinza], sizes: UNICO },
  // Chinelas
  { name: 'Slide Adilette', type: 'chinelas', category: 'Slide', brand: 'Adidas', price: 199.9, colors: [C.preto, C.branco], sizes: FEET },
  { name: 'Chinelo Top Logo', type: 'chinelas', category: 'Dedo', brand: 'Havaianas', price: 59.9, colors: [C.preto, C.azul, C.branco], sizes: FEET },
  { name: 'Slide Victori One', type: 'chinelas', category: 'Slide', brand: 'Nike', price: 179.9, colors: [C.preto], sizes: FEET },
  { name: 'Chinelo Rakka', type: 'chinelas', category: 'Dedo', brand: 'Kenner', price: 159.9, colors: [C.preto, C.cinza], sizes: FEET, tag: 'Novo' },
  { name: 'Papete Trilha', type: 'chinelas', category: 'Papete', brand: 'Oakley', price: 299.9, colors: [C.preto, C.verde], sizes: FEET },
  // Tênis
  { name: 'Tênis Air Force 1', type: 'tenis', category: 'Casual', brand: 'Nike', price: 799.9, colors: [C.branco, C.preto], sizes: FEET, tag: 'Mais vendido' },
  { name: 'Tênis Ultraboost Light', type: 'tenis', category: 'Corrida', brand: 'Adidas', price: 1099.9, oldPrice: 1299.9, colors: [C.preto, C.branco], sizes: FEET },
  { name: 'Tênis Old Skool', type: 'tenis', category: 'Skate', brand: 'Vans', price: 449.9, colors: [C.preto, C.marinho], sizes: FEET },
  { name: 'Tênis Wave Prophecy', type: 'tenis', category: 'Corrida', brand: 'Mizuno', price: 1299.9, colors: [C.cinza, C.preto], sizes: FEET },
  { name: 'Tênis Court Classic', type: 'tenis', category: 'Casual', brand: 'Lacoste', price: 599.9, colors: [C.branco, C.verde], sizes: FEET },
  { name: 'Tênis Chunky Runner', type: 'tenis', category: 'Chunky', brand: 'Puma', price: 549.9, colors: [C.bege, C.branco], sizes: FEET, tag: 'Novo' }
];

export const PRODUCTS_MOCK: Product[] = SEEDS.map((seed, index) => ({
  ...seed,
  id: index + 1,
  rating: seed.rating ?? Math.round((4.3 + ((index * 7) % 7) / 10) * 10) / 10,
  image: gradient(seed.colors[0].hex)
}));
