import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MegaMenuItem, MenuItem, SharedModule } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { forkJoin, map, of, switchMap } from 'rxjs';

import { FilterOption, ProductType } from '../../../features/produtos/models/product.model';
import { ProductService } from '../../../features/produtos/services/product.service';

/** Quantidade de marcas exibidas por tipo no mega menu */
const MENU_BRANDS_LIMIT = 6;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SharedModule, MegaMenuModule, DrawerModule, PanelMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  // Mock até a etapa do carrinho
  readonly cartCount = 2;
  readonly isMenuOpen = signal(false);
  isScrolled = false;

  private readonly menuData$ = this.productService.getProductTypes().pipe(
    switchMap((types) =>
      types.length
        ? forkJoin(
            types.map((type) =>
              this.productService.getFilterOptions(type.slug).pipe(map((options) => ({ type, brands: options.brands })))
            )
          )
        : of([])
    )
  );

  readonly megaMenuItems = toSignal(this.menuData$.pipe(map((data) => data.map(({ type, brands }) => this.toMegaMenuItem(type, brands)))), {
    initialValue: [] as MegaMenuItem[]
  });

  readonly mobileMenuItems = toSignal(this.menuData$.pipe(map((data) => data.map(({ type }) => this.toPanelMenuItem(type)))), {
    initialValue: [] as MenuItem[]
  });

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 8;
  }

  search(term: string): void {
    const busca = term.trim();
    this.router.navigate(['/produtos'], { queryParams: busca ? { busca } : {} });
    this.isMenuOpen.set(false);
  }

  /** Painel do mega menu: colunas de categorias, marcas e atalhos do tipo */
  private toMegaMenuItem(type: ProductType, brands: FilterOption[]): MegaMenuItem {
    const route = ['/produtos', type.slug];
    const topBrands = [...brands].sort((a, b) => b.count - a.count).slice(0, MENU_BRANDS_LIMIT);

    return {
      label: type.name,
      items: [
        [
          {
            label: 'Categorias',
            items: type.categories.map((category) => ({ label: category, routerLink: route, queryParams: { categoria: category } }))
          }
        ],
        [
          {
            label: 'Marcas',
            items: topBrands.map((brand) => ({ label: brand.value, routerLink: route, queryParams: { marca: brand.value } }))
          }
        ],
        [
          {
            label: 'Destaques',
            items: [
              { label: `Ver tudo em ${type.name}`, routerLink: route, styleClass: 'menu-see-all' },
              { label: 'Novidades', routerLink: route, queryParams: { ordem: 'novidades' } },
              { label: 'Menor preço', routerLink: route, queryParams: { ordem: 'menor-preco' } }
            ]
          }
        ]
      ]
    };
  }

  private toPanelMenuItem(type: ProductType): MenuItem {
    const route = ['/produtos', type.slug];
    const close = () => this.isMenuOpen.set(false);

    return {
      label: type.name,
      items: [
        { label: 'Ver tudo', routerLink: route, command: close },
        ...type.categories.map((category) => ({ label: category, routerLink: route, queryParams: { categoria: category }, command: close }))
      ]
    };
  }
}
