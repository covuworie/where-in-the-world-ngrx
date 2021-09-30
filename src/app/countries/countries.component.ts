import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountryActions from './state/country.actions';
import * as CountrySelectors from './state/country.selectors';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  // public properties
  vm$: Observable<CountrySummaryViewModel[]> = of([]);

  // private fields
  private isCountriesInStore$: Observable<boolean> = of(false);

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    this.isCountriesInStore$ = this.store.select(
      CountrySelectors.selectCountriesExists
    );

    this.vm$ = this.isCountriesInStore$.pipe(
      mergeMap((countriesExistsInStore) => {
        if (!countriesExistsInStore) {
          this.store.dispatch(CountryActions.loadCountries());
        }

        return this.store.select(
          CountrySelectors.selectCountrySummaryViewModels
        );
      })
    );
  }
}
