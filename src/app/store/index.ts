import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCountry from '../countries/state/country.reducer';

export interface AppState {
  [fromCountry.countriesFeatureKey]: fromCountry.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountry.countriesFeatureKey]: fromCountry.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
