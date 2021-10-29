import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import CountrySummaryViewModel from 'src/app/shared/country-summary/country-summary-view.model';
import * as CountrySummarySelectors from '../selectors/country-summary.selectors';

@Injectable({
  providedIn: 'root',
})
export class WishListFacadeService {
  // public properties
  countries$: Observable<CountrySummaryViewModel[]>;

  // public methods
  constructor(private store: Store) {
    this.countries$ = this.store.select(
      CountrySummarySelectors.selectCountrySummaryViewModelsByNames
    );
  }
}
