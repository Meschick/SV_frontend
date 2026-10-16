import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Product } from '../../../features/produtos/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  get discount(): number | null {
    const { price, oldPrice } = this.product;
    return oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null;
  }

  get colorNames(): string {
    return this.product.colors.map((color) => color.name).join(', ');
  }

  get installment(): number {
    return this.product.price / 6;
  }
}
