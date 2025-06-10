import { ActionReducerMap } from '@ngrx/store';
import * as shop from './dashboard/redux/shopping.reducer';

export interface AppState {
  shopping: shop.ShoppingState;
}

export const appReducers: ActionReducerMap<AppState> = {
  shopping: shop.shoppingReducer,
};
