import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryReducer from '../state/country.reducer';

export const selectFeatureProperty =
  createFeatureSelector<CountryReducer.State>(
    CountryReducer.countriesFeatureKey
  );

export const selectAllCountries = createSelector(
  selectFeatureProperty,
  CountryReducer.selectAll
);

export const selectTotal = createSelector(
  selectFeatureProperty,
  CountryReducer.selectTotal
);

export const selectCountriesExists = createSelector(
  selectTotal,
  (total) => total > 0
);
