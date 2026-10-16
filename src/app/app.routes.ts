import { Routes } from '@angular/router';

const productList = () =>
  import('./features/produtos/pages/product-list/product-list.component').then((m) => m.ProductListComponent);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'produtos',
    loadComponent: productList
  },
  {
    path: 'produtos/:tipo',
    loadComponent: productList
  },
  {
    path: 'catalog',
    redirectTo: 'produtos'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
