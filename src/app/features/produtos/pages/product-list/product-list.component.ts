import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { combineLatest, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs';

import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { FilterToggle, ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { Product, ProductFilterOptions, ProductQuery, ProductSort } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FILTER_PARAMS, FilterKey, SORT_OPTIONS, filterParam, queryFromUrl } from '../../utils/product-query';

interface ActiveFilter {
  key: FilterKey | 'search';
  value: string;
}

const EMPTY_QUERY: ProductQuery = {
  categories: [],
  brands: [],
  colors: [],
  sizes: [],
  search: '',
  sort: 'relevancia'
};

const EMPTY_OPTIONS: ProductFilterOptions = { categories: [], brands: [], colors: [], sizes: [] };

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedModule, DrawerModule, ProductCardComponent, ProductFiltersComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly sortOptions = SORT_OPTIONS;
  readonly skeletons = Array.from({ length: 6 });

  private readonly query$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
    map(([params, queryParams]) => queryFromUrl(params, queryParams)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly query = toSignal(this.query$, { initialValue: EMPTY_QUERY });
  readonly types = toSignal(this.productService.getProductTypes(), { initialValue: [] });
  readonly filterOptions = toSignal(
    this.query$.pipe(
      map((query) => query.type),
      distinctUntilChanged(),
      switchMap((type) => this.productService.getFilterOptions(type))
    ),
    { initialValue: EMPTY_OPTIONS }
  );

  readonly loading = signal(true);
  readonly products = signal<Product[] | null>(null);
  readonly filtersOpen = signal(false);

  readonly currentType = computed(() => this.types().find((type) => type.slug === this.query().type));
  readonly typeNotFound = computed(() => !!this.query().type && this.types().length > 0 && !this.currentType());

  readonly title = computed(() => {
    if (this.currentType()) return this.currentType()!.name;
    return this.query().search ? `Resultados para “${this.query().search}”` : 'Todos os produtos';
  });

  readonly activeFilters = computed<ActiveFilter[]>(() => {
    const query = this.query();
    const filters: ActiveFilter[] = (Object.keys(FILTER_PARAMS) as FilterKey[]).flatMap((key) =>
      query[key].map((value) => ({ key, value }))
    );
    return query.search ? [{ key: 'search', value: query.search }, ...filters] : filters;
  });

  constructor() {
    // Mantém os produtos anteriores na tela enquanto a nova busca carrega, evitando "piscar" a grade
    this.query$
      .pipe(
        tap(() => this.loading.set(true)),
        switchMap((query) => this.productService.getProducts(query)),
        takeUntilDestroyed()
      )
      .subscribe((products) => {
        this.products.set(products);
        this.loading.set(false);
      });
  }

  toggleFilter({ key, value }: FilterToggle): void {
    const current = this.query()[key];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    this.updateUrl(filterParam(key, next));
  }

  removeFilter(filter: ActiveFilter): void {
    if (filter.key === 'search') {
      this.updateUrl({ busca: null });
    } else {
      this.toggleFilter({ key: filter.key, value: filter.value });
    }
  }

  setSort(sort: ProductSort): void {
    this.updateUrl({ ordem: sort === 'relevancia' ? null : sort });
  }

  clearFilters(): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
  }

  trackById(_: number, product: Product): number {
    return product.id;
  }

  private updateUrl(queryParams: Record<string, unknown>): void {
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }
}
