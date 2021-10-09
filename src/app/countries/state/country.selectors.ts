import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CountryReducer from '../state/country.reducer';

export const selectCountriesState = createFeatureSelector<CountryReducer.State>(
  CountryReducer.countriesFeatureKey
);

export const selectAllCountries = createSelector(
  selectCountriesState,
  CountryReducer.selectAll
);

export const selectTotal = createSelector(
  selectCountriesState,
  CountryReducer.selectTotal
);

export const selectCommonToOfficialName = createSelector(
  selectAllCountries,
  (countries) => {
    const commonToOfficialName: { [commonName: string]: string } = {};
    countries.forEach(
      (country) =>
        (commonToOfficialName[country.name.common] = country.name.official)
    );
    return commonToOfficialName;
  }
);
