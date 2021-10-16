import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountrySummarySelectors from '../store/selectors/country-summary.selectors';
import * as WishListActions from '../store/actions/wish-list.actions';
import * as WishListSelectors from '../store/selectors/wish-list.selectors';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  // public properties
  vm$: Observable<CountrySummaryViewModel[]> = of([]);

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    // load wish list if not in store
    this.store
      .select(WishListSelectors.selectIsLoaded)
      .pipe(
        tap((isLoaded) => {
          if (!isLoaded) {
            this.store.dispatch(WishListActions.load());
          }
        })
      )
      .subscribe();

    // load view models
    this.vm$ = this.store.select(
      CountrySummarySelectors.selectCountrySummaryViewModelsByNames()
    );
  }
}
