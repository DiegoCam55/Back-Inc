import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category, Producto } from '../interfaces/ProductoCategoria';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private URLApi = 'https://api.escuelajs.co/api/v1/';
  constructor() {}

  getAllCategories() {
    return this.http.get<Category[]>(`${this.URLApi}categories`);
  }
  getAllproduct() {
    return this.http.get<Producto[]>(`${this.URLApi}products`);
  }
  getCategoriesProduct(categoryId: number) {
    return this.http.get<Producto[]>(
      `${this.URLApi}products/?categoryId=${categoryId}`
    );
  }
  getSearchAllproduct(searchTerm: string) {
    return this.http.get<Producto[]>(
      `${this.URLApi}products/?title=${searchTerm}`
    );
  }
}
