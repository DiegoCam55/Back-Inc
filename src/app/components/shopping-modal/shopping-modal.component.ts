import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Producto } from '../../dashboard/interfaces/ProductoCategoria';
import { CommonModule } from '@angular/common';
import { removeProduct } from '../../dashboard/redux/shopping.action';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-modal',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './shopping-modal.component.html',
  styleUrl: './shopping-modal.component.css',
})
export class ShoppingModalComponent implements OnInit {
  ShoppingProduct: Producto[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // llamada de redux o NgRX para asignar los productos en el carrito
    this.store
      .select((state) => state.shopping.Productos)
      .subscribe((product) => {
        this.ShoppingProduct = product;
      });
  }

  removeFromCart(producto: Producto) {
     // llamada de redux o NgRX para eliminar los productos en el carrito
    this.store.dispatch(removeProduct({ producto }));
  }
}
