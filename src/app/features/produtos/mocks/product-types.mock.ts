import { ProductType } from '../models/product.model';

export const PRODUCT_TYPES_MOCK: ProductType[] = [
  {
    slug: 'camisetas',
    name: 'Camisetas',
    icon: 'pi pi-tag',
    categories: ['Grife', 'Nike', 'Polo', 'Surf', 'Básica', 'Oversized']
  },
  {
    slug: 'bermudas',
    name: 'Bermudas',
    icon: 'pi pi-sun',
    categories: ['Tactel', 'Jeans', 'Sarja', 'Moletom', 'Surf']
  },
  {
    slug: 'pecas-de-inverno',
    name: 'Peças de inverno',
    icon: 'pi pi-cloud',
    categories: ['Jaquetas', 'Moletons', 'Corta-vento', 'Tricô', 'Puffer']
  },
  {
    slug: 'calcas',
    name: 'Calças',
    icon: 'pi pi-briefcase',
    categories: ['Jeans', 'Sarja', 'Jogger', 'Alfaiataria', 'Cargo']
  },
  {
    slug: 'bones',
    name: 'Bonés',
    icon: 'pi pi-star',
    categories: ['Aba curva', 'Aba reta', 'Trucker', 'Dad hat', 'Bucket']
  },
  {
    slug: 'acessorios',
    name: 'Acessórios',
    icon: 'pi pi-clock',
    categories: ['Relógios', 'Cintos', 'Carteiras', 'Óculos', 'Mochilas']
  },
  {
    slug: 'chinelas',
    name: 'Chinelas',
    icon: 'pi pi-compass',
    categories: ['Slide', 'Dedo', 'Papete']
  },
  {
    slug: 'tenis',
    name: 'Tênis',
    icon: 'pi pi-bolt',
    categories: ['Casual', 'Corrida', 'Basquete', 'Skate', 'Chunky']
  }
];
