import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCountry from './reducers/country.reducer';
import * as fromCountryVisit from '../country-visits/state/country-visit.reducer';
import * as fromWishList from './reducers/wish-list.reducer';
import * as fromUserSettings from './reducers/user-settings.reducer';

export interface AppState {
  [fromCountry.countriesFeatureKey]: fromCountry.State;
  [fromCountryVisit.countryVisitsFeatureKey]: fromCountryVisit.State;
  [fromWishList.wishListFeatureKey]: fromWishList.State;
  [fromUserSettings.userSettingsFeatureKey]: fromUserSettings.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromCountry.countriesFeatureKey]: fromCountry.reducer,
  [fromCountryVisit.countryVisitsFeatureKey]: fromCountryVisit.reducer,
  [fromWishList.wishListFeatureKey]: fromWishList.reducer,
  [fromUserSettings.userSettingsFeatureKey]: fromUserSettings.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
