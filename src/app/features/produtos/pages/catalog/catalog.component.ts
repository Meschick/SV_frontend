import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  readonly categories: string[];
  readonly sortOptions: Array<{ label: string; value: string }> = [
    { label: 'Relevância', value: 'Relevância' },
    { label: 'Menor preço', value: 'Menor preço' },
    { label: 'Maior preço', value: 'Maior preço' },
    { label: 'Mais novos', value: 'Mais novos' }
  ];

  selectedCategory = 'Todos';
  selectedSort = 'Relevância';

  private allProducts: Product[];
  filteredProducts: Product[] = [];

  constructor(private readonly productService: ProductService) {
    this.categories = this.productService.getCategories();
    this.allProducts = this.productService.getProducts();
    this.filteredProducts = [...this.allProducts];
    this.applyFilters();
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  setSort(sort: string): void {
    this.selectedSort = sort;
    this.applyFilters();
  }

  private applyFilters(): void {
    let products = this.allProducts.filter((product) => {
      return this.selectedCategory === 'Todos' || product.category === this.selectedCategory;
    });

    switch (this.selectedSort) {
      case 'Menor preço':
        products = [...products].sort((a, b) => a.price - b.price);
        break;
      case 'Maior preço':
        products = [...products].sort((a, b) => b.price - a.price);
        break;
      case 'Mais novos':
        products = [...products].sort((a, b) => b.id - a.id);
        break;
      default:
        products = [...products].sort((a, b) => b.rating - a.rating);
    }

    this.filteredProducts = products;
  }
}
