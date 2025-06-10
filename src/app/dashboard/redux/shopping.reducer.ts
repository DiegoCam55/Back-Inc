import { createReducer, on } from '@ngrx/store';
import { Producto } from '../interfaces/ProductoCategoria';
import { addProduct, changeCategory, removeProduct } from './shopping.action';

export interface ShoppingState {
  Productos: Producto[];
  categoryId: number;
}

export const initialState: ShoppingState = {
  Productos: [],
  categoryId: 0,
};

export const shoppingReducer = createReducer(
  initialState,

  on(addProduct, (state, { producto }) => {
    const existing = state.Productos.find((p) => p.id === producto.id);
    if (existing) {
      // Si ya existe, aumenta el stock
      return {
        ...state,
        Productos: state.Productos.map((p) =>
          p.id === producto.id ? { ...p, stock: (p.stock || 1) + 1 } : p
        ),
      };
    } else {
      // Si no existe, lo agrega con stock 1
      return {
        ...state,
        Productos: [...state.Productos, { ...producto, stock: 1 }],
      };
    }
  }),
  on(removeProduct, (state, { producto }) => {
    const existing = state.Productos.find((p) => p.id === producto.id);
    if (existing) {
      if ((existing.stock || 1) > 1) {
        // Si hay más de 1 en stock, resta 1
        return {
          ...state,
          Productos: state.Productos.map((p) =>
            p.id === producto.id ? { ...p, stock: (p.stock || 1) - 1 } : p
          ),
        };
      } else {
        // Si solo hay 1, lo elimina del carrito
        return {
          ...state,
          Productos: state.Productos.filter((p) => p.id !== producto.id),
        };
      }
    }
    return state;
  }),

  on(changeCategory, (state, { categoryId }) => ({
    ...state,
    categoryId,
  }))
);
