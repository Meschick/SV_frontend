import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

import { ProductFilterOptions, ProductQuery, ProductType } from '../../models/product.model';
import { FilterKey } from '../../utils/product-query';

export interface FilterToggle {
  key: FilterKey;
  value: string;
}

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CheckboxModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss'
})
export class ProductFiltersComponent {
  @Input({ required: true }) options!: ProductFilterOptions;
  @Input({ required: true }) query!: ProductQuery;
  /** Exibidos quando a listagem não está restrita a um tipo, para navegar até ele */
  @Input() types: ProductType[] = [];
  /** Evita ids duplicados quando o componente aparece duas vezes na página (sidebar e drawer) */
  @Input() idPrefix = 'filter';

  @Output() toggle = new EventEmitter<FilterToggle>();

  isSelected(key: FilterKey, value: string): boolean {
    return this.query[key].includes(value);
  }

  selectedCount(key: FilterKey): number {
    return this.query[key].length;
  }
}
