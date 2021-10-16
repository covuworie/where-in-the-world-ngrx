import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import * as CountryReducer from '../../store/reducers/country.reducer';
import { Country } from './country.model';
import { RestCountriesService } from './rest-countries.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  // public methods
  constructor(private restCountriesService: RestCountriesService) {}

  public getAll() {
    // Get from local storage
    const countriesData: { countries: Country[] } | undefined =
      LocalStorageService.getOrRemoveExpiredItem(
        CountryReducer.countriesFeatureKey
      );
    if (countriesData !== undefined) {
      return of(countriesData.countries);
    }

    // Get from API call
    return this.restCountriesService.getAll();
  }
}
