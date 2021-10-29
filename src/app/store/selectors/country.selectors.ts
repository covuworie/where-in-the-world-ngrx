import { createFeatureSelector, createSelector } from '@ngrx/store';
import CountryDetailViewModel from '../../countries/country-detail/country-detail-view.model';
import * as CountryReducer from '../reducers/country.reducer';

export const selectCountriesState = createFeatureSelector<CountryReducer.State>(
  CountryReducer.countriesFeatureKey
);

export const selectAllCountries = createSelector(
  selectCountriesState,
  CountryReducer.selectAll
);

export const selectCommonNames = createSelector(
  selectAllCountries,
  (countries) => countries.map((country) => country.name.common)
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

export const selectAlphaCodesToCountryNames = createSelector(
  selectAllCountries,
  (countries) => {
    const alpha3CodesToCountryNames: {
      [cca3: string]: { name: string; flagUrl: string };
    } = {};
    countries.forEach(
      (country) =>
        (alpha3CodesToCountryNames[country.cca3] = {
          name: country.name.common,
          flagUrl: country.flags.svg,
        })
    );
    return alpha3CodesToCountryNames;
  }
);
