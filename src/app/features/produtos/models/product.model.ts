export interface ProductColor {
  name: string;
  hex: string;
}

/** Tipo de produto (Camisetas, Bermudas, Tênis...). Cada tipo possui suas próprias categorias. */
export interface ProductType {
  slug: string;
  name: string;
  icon: string;
  categories: string[];
}

export interface Product {
  id: number;
  name: string;
  /** slug do ProductType */
  type: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  tag?: string;
  image: string;
  colors: ProductColor[];
  sizes: string[];
}

export type ProductSort = 'relevancia' | 'menor-preco' | 'maior-preco' | 'novidades';

/** Contrato de busca. Espelha os query params da listagem e deve ser o mesmo enviado ao backend. */
export interface ProductQuery {
  type?: string;
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  search: string;
  sort: ProductSort;
}

export interface FilterOption {
  value: string;
  count: number;
  /** Presente apenas nas opções de cor */
  hex?: string;
}

export interface ProductFilterOptions {
  categories: FilterOption[];
  brands: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
}
