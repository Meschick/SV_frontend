import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly categories = ['Todos', 'Casual', 'Formal', 'Esportivo', 'Acessórios'];

  readonly products: Product[] = [
    {
      id: 1,
      name: 'Jaqueta Urban',
      category: 'Casual',
      price: 399.9,
      oldPrice: 489.9,
      rating: 4.8,
      tag: 'Novo',
      image: 'linear-gradient(135deg, #d9d9d9, #4c4c4c 55%, #191919)',
      colors: ['Preto', 'Bege', 'Marrom']
    },
    {
      id: 2,
      name: 'Camisa Premium',
      category: 'Formal',
      price: 189.9,
      oldPrice: 239.9,
      rating: 4.9,
      tag: 'Top',
      image: 'linear-gradient(135deg, #f4e8d1, #c29d69 55%, #2b2318)',
      colors: ['Ivory', 'Azul', 'Preto']
    },
    {
      id: 3,
      name: 'Calça Slim',
      category: 'Casual',
      price: 219.9,
      oldPrice: 279.9,
      rating: 4.7,
      tag: 'Popular',
      image: 'linear-gradient(135deg, #e8dfd4, #8e6d45 55%, #2a241d)',
      colors: ['Cinza', 'Marrom', 'Preto']
    },
    {
      id: 4,
      name: 'Moletom Drift',
      category: 'Esportivo',
      price: 249.9,
      oldPrice: 319.9,
      rating: 4.8,
      tag: 'Essencial',
      image: 'linear-gradient(135deg, #f5efe5, #b59878 55%, #423426)',
      colors: ['Creme', 'Vinho', 'Grafite']
    },
    {
      id: 5,
      name: 'Relógio Clássico',
      category: 'Acessórios',
      price: 349.9,
      oldPrice: 429.9,
      rating: 4.6,
      tag: 'Limitado',
      image: 'linear-gradient(135deg, #d8dfe7, #68788b 55%, #1a2025)',
      colors: ['Prata', 'Preto', 'Dourado']
    },
    {
      id: 6,
      name: 'Bermuda Essential',
      category: 'Casual',
      price: 159.9,
      oldPrice: 199.9,
      rating: 4.5,
      tag: 'Novo',
      image: 'linear-gradient(135deg, #dfe7e4, #7d8d84 55%, #1e2a26)',
      colors: ['Verde', 'Bege', 'Preto']
    },
    {
      id: 7,
      name: 'Camiseta Atelier',
      category: 'Formal',
      price: 149.9,
      oldPrice: 189.9,
      rating: 4.7,
      tag: 'Coleção',
      image: 'linear-gradient(135deg, #ece7db, #c2b29d 55%, #2e251d)',
      colors: ['Bege', 'Branco', 'Caramelo']
    },
    {
      id: 8,
      name: 'Boné Urban',
      category: 'Acessórios',
      price: 119.9,
      oldPrice: 149.9,
      rating: 4.4,
      tag: 'Promo',
      image: 'linear-gradient(135deg, #d3d3d3, #868686 55%, #202020)',
      colors: ['Cinza', 'Preto', 'Marrom']
    }
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  getCategories(): string[] {
    return [...this.categories];
  }
}
