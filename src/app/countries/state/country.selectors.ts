import { createFeatureSelector, createSelector } from '@ngrx/store';
import CountrySummaryViewModel from 'src/app/shared/country-summary/country-summary-view.model';
import * as CountryReducer from '../state/country.reducer';
import * as WishListSelectors from '../../store/selectors/wish-list.selectors';

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
  WishListSelectors.selectWishList,
  (countries, wishList) => {
    const countrySummaries: CountrySummaryViewModel[] = [];
    countries.map((country) => {
      const summary: CountrySummaryViewModel = {
        name: country.name.common,
        flagUrl: country.flags.svg,
        population: country.population,
        region: country.region,
        capital: country.capital ? country.capital[0] : '',
        isOnWishList: country.name.common in wishList,
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
