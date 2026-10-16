import { ParamMap, Params } from '@angular/router';

import { ProductQuery, ProductSort } from '../models/product.model';

/** Filtros que aceitam múltiplos valores, com o nome do query param correspondente na URL. */
export const FILTER_PARAMS = {
  categories: 'categoria',
  brands: 'marca',
  colors: 'cor',
  sizes: 'tamanho'
} as const;

export type FilterKey = keyof typeof FILTER_PARAMS;

export const SORT_OPTIONS: Array<{ label: string; value: ProductSort }> = [
  { label: 'Relevância', value: 'relevancia' },
  { label: 'Menor preço', value: 'menor-preco' },
  { label: 'Maior preço', value: 'maior-preco' },
  { label: 'Novidades', value: 'novidades' }
];

/** Lê a URL (/produtos/:tipo?categoria=..&marca=..) e monta o ProductQuery. */
export function queryFromUrl(params: ParamMap, queryParams: ParamMap): ProductQuery {
  const sort = queryParams.get('ordem') as ProductSort | null;

  return {
    type: params.get('tipo') ?? undefined,
    categories: queryParams.getAll(FILTER_PARAMS.categories),
    brands: queryParams.getAll(FILTER_PARAMS.brands),
    colors: queryParams.getAll(FILTER_PARAMS.colors),
    sizes: queryParams.getAll(FILTER_PARAMS.sizes),
    search: queryParams.get('busca') ?? '',
    sort: SORT_OPTIONS.some((option) => option.value === sort) ? sort! : 'relevancia'
  };
}

/** Query params de um filtro; lista vazia vira null para remover o parâmetro da URL. */
export function filterParam(key: FilterKey, values: string[]): Params {
  return { [FILTER_PARAMS[key]]: values.length ? values : null };
}
