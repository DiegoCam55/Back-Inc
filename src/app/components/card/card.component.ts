import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../dashboard/interfaces/ProductoCategoria';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) product!: Producto;
  @Output() addToCartEvent = new EventEmitter<Producto>();

  // eminir el evento para agregar un producto al carrito
  addToCart(arg0: Producto) {
    this.addToCartEvent.emit(arg0);
  }
}
