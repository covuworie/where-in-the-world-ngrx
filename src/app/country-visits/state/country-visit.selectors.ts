import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryVisitReducer from './country-visit.reducer';

export const selectCountryVisitsState =
  createFeatureSelector<CountryVisitReducer.State>(
    CountryVisitReducer.countryVisitsFeatureKey
  );

export const selectAllCountryVisits = createSelector(
  selectCountryVisitsState,
  CountryVisitReducer.selectAll
);

export const selectIsLoaded = createSelector(
  selectCountryVisitsState,
  (state) => state.isLoaded
);
