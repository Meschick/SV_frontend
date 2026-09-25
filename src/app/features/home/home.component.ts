import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories = [
    { name: 'Casual', label: 'Roupas leves e modernas', icon: 'pi pi-star' },
    { name: 'Formal', label: 'Peças sofisticadas', icon: 'pi pi-briefcase' },
    { name: 'Esportivo', label: 'Conforto e liberdade', icon: 'pi pi-bolt' },
    { name: 'Acessórios', label: 'Detalhes que finalizam', icon: 'pi pi-tag' }
  ];

  highlights = [
    { title: 'Entrega rápida', text: 'Para todo o Brasil em até 5 dias úteis.', icon: 'pi pi-truck' },
    { title: 'Compra segura', text: 'Pagamento protegido e suporte dedicado.', icon: 'pi pi-shield' },
    { title: 'Troca fácil', text: 'Política simples para sua comodidade.', icon: 'pi pi-refresh' }
  ];

  products = [
    { name: 'Jaqueta Urban', price: 'R$ 399,90', tag: 'Novo', tone: 'dark' },
    { name: 'Camisa Premium', price: 'R$ 189,90', tag: 'Top', tone: 'stone' },
    { name: 'Calça Slim', price: 'R$ 219,90', tag: 'Best seller', tone: 'gold' },
    { name: 'Moletom Drift', price: 'R$ 249,90', tag: 'Popular', tone: 'cream' }
  ];
}
