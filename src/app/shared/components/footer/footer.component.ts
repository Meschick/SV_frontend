import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly columns: Array<{ title: string; links: Array<{ label: string; route: string }> }> = [
    {
      title: 'Loja',
      links: [
        { label: 'Camisetas', route: '/produtos/camisetas' },
        { label: 'Bermudas', route: '/produtos/bermudas' },
        { label: 'Calças', route: '/produtos/calcas' },
        { label: 'Peças de inverno', route: '/produtos/pecas-de-inverno' },
        { label: 'Tênis', route: '/produtos/tenis' },
        { label: 'Acessórios', route: '/produtos/acessorios' }
      ]
    },
    {
      title: 'Ajuda',
      links: ['Trocas e devoluções', 'Prazos de entrega', 'Guia de medidas', 'Fale conosco'].map((label) => ({ label, route: '/' }))
    },
    {
      title: 'Institucional',
      links: ['Sobre a MK Store', 'Trabalhe conosco', 'Privacidade', 'Termos de uso'].map((label) => ({ label, route: '/' }))
    }
  ];
}
