import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountrySelectors from '../countries/state/country.selectors';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent {
  // public properties
  // need to change to actual subset on wish list
  vm$: Observable<CountrySummaryViewModel[]> = this.store.select(
    CountrySelectors.selectCountrySummaryViewModels
  );

  // public methods
  constructor(private store: Store) {}
}
