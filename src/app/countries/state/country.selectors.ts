import { createFeatureSelector, createSelector } from '@ngrx/store';
import CountrySummaryViewModel from 'src/app/shared/country-summary/country-summary-view.model';
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
        isOnWishList: false,
      };
      countrySummaries.push(summary);
    });
    return countrySummaries;
  }
);
