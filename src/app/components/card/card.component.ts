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
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.log('Error al cargar la imagen:', img.src);
    img.src =
      'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'; // Imagen por defecto
  }
}
