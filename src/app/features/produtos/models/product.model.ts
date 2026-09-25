export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  tag: string;
  image: string;
  colors: string[];
}
