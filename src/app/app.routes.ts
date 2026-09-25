import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { CatalogComponent } from './features/produtos/pages/catalog/catalog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
