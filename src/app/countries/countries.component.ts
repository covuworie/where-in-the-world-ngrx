import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountryActions from './state/country.actions';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  // public properties
  countries: CountrySummaryViewModel[] = [];

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(CountryActions.loadCountries());
  }
}
