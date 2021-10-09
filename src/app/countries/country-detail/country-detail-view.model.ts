export default interface CountryDetailViewModel {
  flagUrl: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  languageNames: string[];
  currencyNamesAndSymbols: string[];
  callingCode: string;
  alpha3Code: string;
  topLevelDomain: string;
  borderingCountries: { name: string; flagUrl: string }[];
}
