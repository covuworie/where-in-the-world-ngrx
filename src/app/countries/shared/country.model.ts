export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: { [cca3: string]: { official: string; common: string } };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: { [code: string]: { name: string; symbol: string } };
  idd: { root: string; suffixes: string[] };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: { [cca3: string]: string };
  translations: { [cca3: string]: { official: string; common: string } };
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: { f: string; m: string };
    fra: { f: string; m: string };
  };
  flag: string;
  population: number;
  flags: { svg: string; png: string };
}
