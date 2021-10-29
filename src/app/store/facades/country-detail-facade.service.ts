import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import CountryDetailViewModel from 'src/app/countries/country-detail/country-detail-view.model';
import * as CountryDetailSelectors from '../selectors/country-detail-selectors';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailFacadeService {
  // public properties
  country$: Observable<CountryDetailViewModel | undefined> = of(undefined);

  // public methods
  constructor(private store: Store) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  select(commonName: string) {
    this.country$ = this.store.select(
      CountryDetailSelectors.selectCountryDetailViewModel(commonName)
    );
  }
}
