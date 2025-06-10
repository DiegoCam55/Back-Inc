import { createAction, props } from '@ngrx/store';
import { Producto } from '../interfaces/ProductoCategoria';

export const addProduct = createAction(
  '[addProduct] add product',
  props<{ producto: Producto }>()
);
export const removeProduct = createAction(
  '[removeProduct] remove product',
  props<{ producto: Producto }>()
);
export const changeCategory = createAction(
  '[changeCategory] change category',
  props<{ categoryId: number }>()
);
