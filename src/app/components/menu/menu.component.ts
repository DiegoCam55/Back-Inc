import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../dashboard/services/products.service';
import { Category } from '../../dashboard/interfaces/ProductoCategoria';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as action from '../../dashboard/redux/shopping.action';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  changeCategory(categoryId: number) {
    this.store.dispatch(action.changeCategory({ categoryId }));
  }

  private productsService = inject(ProductsService);
  categories: Category[] = [];
  selectedCategory: number = 0;

  ngOnInit(): void {
    //llamar servicios  y asignar las categorías
    this.productsService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = [
          {
            id: 0,
            name: 'Todas',
            slug: '',
            image: '',
            creationAt: new Date(),
            updatedAt: new Date(),
          },
          ...data,
        ];
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
        this.categories = [
          {
            id: 0,
            name: 'Todas',
            slug: '',
            image: '',
            creationAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      },
    });

    //llamada de redux o NgRX para asignar la categoría seleccionada
    this.store
      .select((state) => state.shopping.categoryId)
      .subscribe((id) => {
        this.selectedCategory = id;
      });
  }
}
