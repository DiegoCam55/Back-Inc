import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../interfaces/ProductoCategoria';
import { ProductsService } from '../../services/products.service';
import { CardComponent } from '../../../components/card/card.component';
import {
  Subject,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Subscription } from 'rxjs';

import * as action from '../../redux/shopping.action';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productsService = inject(ProductsService);
  products: Producto[] = [];
  searchTerm: string = '';
  categoryId: number = 0;
  searchSubject = new Subject<string>();

  private categorySubscription!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener productos con base en la categoría
    this.categorySubscription = this.store
      .select((state: AppState) => state.shopping.categoryId)
      .subscribe((selectedCategoryId: number) => {
        if (
          selectedCategoryId !== undefined &&
          selectedCategoryId !== this.categoryId
        ) {
          this.categoryId = selectedCategoryId;
          this.loadProducts();
        }
      });

    this.loadProducts();
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  loadProducts() {
    // Cargar productos según la categoría seleccionada o realizar búsqueda
    if (this.categoryId !== 0) {
      this.productsService.getCategoriesProduct(this.categoryId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Error al obtener productos por categoría:', err);
          this.products = [];
        },
      });
    } else {
      this.searchSubject
        .pipe(
          startWith(''),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) =>
            term
              ? this.productsService.getSearchAllproduct(term)
              : this.productsService.getAllproduct()
          )
        )
        .subscribe({
          next: (data) => {
            this.products = data;
          },
          error: (err) => {
            console.error('Error al buscar productos:', err);
            this.products = [];
          },
        });
    }
  }

  onSearchChange(term: string) {
    // Actualizar el término de búsqueda y recargar productos
    if (this.categoryId !== 0) {
      this.categoryId = 0;
      this.loadProducts();
    }
    this.searchSubject.next(term);
  }

  addToCart($event: Producto) {
    // Llamada de redux o NgRX para agregar productos al carrito
    this.store.dispatch(action.addProduct({ producto: $event }));
  }
}
