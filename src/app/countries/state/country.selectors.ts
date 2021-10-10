import { createFeatureSelector, createSelector } from '@ngrx/store';
import CountryDetailViewModel from '../country-detail/country-detail-view.model';
import * as CountryReducer from '../state/country.reducer';

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

export const selectCommonNameExists = (commonName: string) =>
  createSelector(selectCommonNames, (names) => names.includes(commonName));

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

export const selectCountryDetailViewModel = (commonName: string) =>
  createSelector(
    selectAllCountries,
    selectAlphaCodesToCountryNames,
    (countries, alpha3CodesToCountryNames) => {
      // find country
      const country = countries.find(({ name }) => name.common === commonName);
      if (country === undefined) {
        return undefined;
      }

      // currencies
      const currencyNamesAndSymbols: string[] = [];
      if (country.currencies) {
        Object.values(country.currencies).forEach((currency) => {
          currencyNamesAndSymbols.push(`${currency.name} (${currency.symbol})`);
        });
      }

      // borders
      const borderingCountries: { name: string; flagUrl: string }[] = [];
      country.borders?.forEach((alpha3Code) => {
        const borders = alpha3CodesToCountryNames[alpha3Code];
        borderingCountries.push(borders);
      });

      const countryDetail: CountryDetailViewModel = {
        flagUrl: country.flags.svg,
        name: country.name.common,
        nativeName: country.languages
          ? country.name.nativeName[Object.keys(country.languages)[0]].common
          : '',
        population: country.population,
        region: country.region,
        subRegion: country.subregion,
        capital: country.capital ? country.capital[0] : '',
        languageNames: country.languages
          ? Object.values(country.languages)
          : [],
        currencyNamesAndSymbols,
        callingCode: country.idd.root,
        alpha3Code: country.cca3,
        topLevelDomain: country.tld ? country.tld[0] : '',
        borderingCountries,
      };
      return countryDetail;
    }
  );
