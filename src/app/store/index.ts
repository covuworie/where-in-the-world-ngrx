import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCountry from '../countries/state/country.reducer';
import * as fromWishList from './reducers/wish-list.reducer';

export interface AppState {
  [fromCountry.countriesFeatureKey]: fromCountry.State;
  [fromWishList.wishListFeatureKey]: fromWishList.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountry.countriesFeatureKey]: fromCountry.reducer,
  [fromWishList.wishListFeatureKey]: fromWishList.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
