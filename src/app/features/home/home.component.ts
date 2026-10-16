import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../produtos/services/product.service';

/** Tons de placeholder dos blocos de tipo de produto, alternando as cores da marca */
const TYPE_TONES = [
  'linear-gradient(160deg, #1f2c4a, #0E1A33)',
  'linear-gradient(160deg, #2c4a80, #1F3A6E)',
  'linear-gradient(160deg, #d9bb72, #B8923A)',
  'linear-gradient(160deg, #4b4f52, #2a2d2f)'
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly productService = inject(ProductService);

  readonly tones = TYPE_TONES;

  readonly highlights = [
    { title: 'Frete grátis', text: 'Em compras acima de R$ 299', icon: 'pi pi-truck' },
    { title: 'Troca fácil', text: 'Até 30 dias, sem burocracia', icon: 'pi pi-replay' },
    { title: 'Compra segura', text: 'Pagamento protegido', icon: 'pi pi-lock' },
    { title: '6x sem juros', text: 'No cartão de crédito', icon: 'pi pi-credit-card' }
  ];

  readonly types = toSignal(this.productService.getProductTypes(), { initialValue: [] });
  readonly featured = toSignal(this.productService.getFeatured(4), { initialValue: [] });
}
