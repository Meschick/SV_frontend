import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { PRODUCT_TYPES_MOCK } from '../mocks/product-types.mock';
import { PRODUCTS_MOCK } from '../mocks/products.mock';
import {
  FilterOption,
  Product,
  ProductFilterOptions,
  ProductQuery,
  ProductType
} from '../models/product.model';

/** Latência simulada para exercitar os estados de carregamento enquanto não há backend. */
const MOCK_LATENCY = 250;

const LETTER_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG'];

/**
 * Fonte de dados de produtos. Hoje lê dos mocks; quando o backend existir, cada método
 * vira uma chamada HTTP mantendo as mesmas assinaturas.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductTypes(): Observable<ProductType[]> {
    return of(PRODUCT_TYPES_MOCK);
  }

  getProductType(slug: string): Observable<ProductType | undefined> {
    return of(PRODUCT_TYPES_MOCK.find((type) => type.slug === slug));
  }

  getFeatured(limit = 4): Observable<Product[]> {
    const featured = [...PRODUCTS_MOCK].sort((a, b) => b.rating - a.rating).slice(0, limit);
    return of(featured).pipe(delay(MOCK_LATENCY));
  }

  getProducts(query: ProductQuery): Observable<Product[]> {
    const search = normalize(query.search);

    const products = PRODUCTS_MOCK.filter(
      (product) =>
        (!query.type || product.type === query.type) &&
        matchesAny(query.categories, [product.category]) &&
        matchesAny(query.brands, [product.brand]) &&
        matchesAny(query.colors, product.colors.map((color) => color.name)) &&
        matchesAny(query.sizes, product.sizes) &&
        (!search || normalize(`${product.name} ${product.brand} ${product.category}`).includes(search))
    );

    return of(sortProducts(products, query.sort)).pipe(delay(MOCK_LATENCY));
  }

  /** Opções disponíveis para os filtros de um tipo (ou de toda a loja), com a contagem de produtos. */
  getFilterOptions(typeSlug?: string): Observable<ProductFilterOptions> {
    const products = PRODUCTS_MOCK.filter((product) => !typeSlug || product.type === typeSlug);
    const type = PRODUCT_TYPES_MOCK.find((item) => item.slug === typeSlug);

    const categories = type
      ? type.categories.map((value) => ({
          value,
          count: products.filter((product) => product.category === value).length
        }))
      : [];

    const colorHex = new Map(products.flatMap((product) => product.colors).map((color) => [color.name, color.hex]));

    return of({
      categories,
      brands: countBy(products, (product) => [product.brand]).sort((a, b) => a.value.localeCompare(b.value)),
      colors: countBy(products, (product) => product.colors.map((color) => color.name)).map((option) => ({
        ...option,
        hex: colorHex.get(option.value)
      })),
      sizes: countBy(products, (product) => product.sizes).sort((a, b) => compareSizes(a.value, b.value))
    });
  }
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function matchesAny(selected: string[], values: string[]): boolean {
  return !selected.length || values.some((value) => selected.includes(value));
}

function countBy(products: Product[], pick: (product: Product) => string[]): FilterOption[] {
  const counts = new Map<string, number>();
  products.forEach((product) => {
    new Set(pick(product)).forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  });
  return [...counts].map(([value, count]) => ({ value, count }));
}

/** Tamanhos em letra primeiro (PP → XGG), depois numéricos em ordem crescente e por fim "Único". */
function compareSizes(a: string, b: string): number {
  const rank = (size: string): number => {
    const letter = LETTER_SIZES.indexOf(size);
    if (letter >= 0) return letter;
    const numeric = Number(size);
    return Number.isNaN(numeric) ? 10_000 : 100 + numeric;
  };
  return rank(a) - rank(b);
}

function sortProducts(products: Product[], sort: ProductQuery['sort']): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'menor-preco':
      return sorted.sort((a, b) => a.price - b.price);
    case 'maior-preco':
      return sorted.sort((a, b) => b.price - a.price);
    case 'novidades':
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}
