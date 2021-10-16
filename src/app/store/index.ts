import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCountry from './reducers/country.reducer';
import * as fromCountryVisit from '../country-visits/state/country-visit.reducer';
import * as fromWishList from './reducers/wish-list.reducer';

export interface AppState {
  [fromCountry.countriesFeatureKey]: fromCountry.State;
  [fromCountryVisit.countryVisitsFeatureKey]: fromCountryVisit.State;
  [fromWishList.wishListFeatureKey]: fromWishList.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountry.countriesFeatureKey]: fromCountry.reducer,
  [fromCountryVisit.countryVisitsFeatureKey]: fromCountryVisit.reducer,
  [fromWishList.wishListFeatureKey]: fromWishList.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
