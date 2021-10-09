import { createSelector } from '@ngrx/store';
import CountrySummaryViewModel from 'src/app/shared/country-summary/country-summary-view.model';
import * as CountrySelectors from '../../countries/state/country.selectors';
import * as WishListSelectors from './wish-list.selectors';

// View Models
export const selectCountrySummaryViewModels = () =>
  createSelector(
    CountrySelectors.selectAllCountries,
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
          onWishList: wishList.includes(country.name.common),
        };
        countrySummaries.push(summary);
      });
      return countrySummaries;
    }
  );

export const selectCountrySummaryViewModelsByRegion = (region: string) =>
  createSelector(selectCountrySummaryViewModels(), (countries) =>
    region !== 'All Regions'
      ? countries.filter((country) => country.region === region)
      : countries
  );

export const selectCountrySummaryViewModelsByPartialName = (
  partialName: string
) =>
  createSelector(
    selectCountrySummaryViewModels(),
    CountrySelectors.selectCommonToOfficialName,
    (countrySummaryViewModels, commonToOfficialName) =>
      countrySummaryViewModels.filter(
        (country) =>
          country.name.toLowerCase().includes(partialName.toLowerCase()) ||
          commonToOfficialName[country.name]
            .toLowerCase()
            .includes(partialName.toLowerCase())
      )
  );

export const selectCountrySummaryViewModelsByNames = () =>
  createSelector(
    selectCountrySummaryViewModels(),
    WishListSelectors.selectWishList,
    (countrySummaryViewModels, wishList) => {
      return countrySummaryViewModels.filter((country) =>
        wishList.includes(country.name)
      );
    }
  );
