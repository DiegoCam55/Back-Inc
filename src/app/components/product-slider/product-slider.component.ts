import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../dashboard/services/products.service';
import { Producto } from '../../dashboard/interfaces/ProductoCategoria';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css',
})
export class ProductSliderComponent implements OnInit {
  private productsService = inject(ProductsService);

  currentIndex = 0;
  intervalId: any;
  intervalTime = 1000;
  items: Producto[] = [];

  ngOnInit() {
    //llamar servicios 
    this.productsService.getAllproduct().subscribe({
      next: (data: Producto[]) => {
        this.items = data.slice(10, 30);
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  showNext() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
}
