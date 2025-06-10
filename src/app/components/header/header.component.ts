import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Observable } from 'rxjs';
import { ShoppingModalComponent } from '../shopping-modal/shopping-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, CommonModule, ShoppingModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartCount = 0;
  showCart = false;

  constructor(private store: Store<AppState>) {
    // llmada de redux o NgRX para asignar el número de productos en el carrito
    this.store
      .select((state) => state.shopping.Productos.length)
      .subscribe((count) => {
        this.cartCount = count;
      });
  }

  openCart() {
    // abrir o cerrar el carrito
    if (this.cartCount != 0) this.showCart = !this.showCart;
  }
}
