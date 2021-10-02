import { createFeatureSelector, createSelector } from '@ngrx/store';
import CountrySummaryViewModel from 'src/app/shared/country-summary/country-summary-view.model';
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

export const selectCountriesExists = createSelector(
  selectTotal,
  (total) => total > 0
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

// View Models
export const selectCountrySummaryViewModels = createSelector(
  selectAllCountries,
  (countries) => {
    const countrySummaries: CountrySummaryViewModel[] = [];
    countries.map((country) => {
      const summary: CountrySummaryViewModel = {
        name: country.name.common,
        flagUrl: country.flags.svg,
        population: country.population,
        region: country.region,
        capital: country.capital ? country.capital[0] : '',
      };
      countrySummaries.push(summary);
    });
    return countrySummaries;
  }
);

export const selectCountrySummaryViewModelsByRegion = (region: string) =>
  createSelector(selectCountrySummaryViewModels, (countries) =>
    region !== 'All Regions'
      ? countries.filter((country) => country.region === region)
      : countries
  );

export const selectCountrySummaryViewModelsByPartialName = (
  partialName: string
) =>
  createSelector(
    selectCountrySummaryViewModels,
    selectCommonToOfficialName,
    (countrySummaryViewModels, commonToOfficialName) =>
      countrySummaryViewModels.filter(
        (country) =>
          country.name.toLowerCase().includes(partialName.toLowerCase()) ||
          commonToOfficialName[country.name]
            .toLowerCase()
            .includes(partialName.toLowerCase())
      )
  );

export const selectCountrySummaryViewModelsByNames = (names: string[]) =>
  createSelector(selectCountrySummaryViewModels, (countrySummaryViewModels) => {
    return countrySummaryViewModels.filter((country) =>
      names.includes(country.name)
    );
  });
