import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountryAndWishListActions from '../store/actions/countries-and-wish-list.actions';
import * as CountrySelectors from '../countries/state/country.selectors';
import * as WishListSelectors from '../store/selectors/wish-list.selectors';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  // public properties
  vm$: Observable<CountrySummaryViewModel[]> = of([]);

  // private fields
  private wishList$ = this.store.select(WishListSelectors.selectWishList);

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    // load wish list if not in store
    this.store
      .select(WishListSelectors.selectIsLoaded)
      .pipe(
        tap((isLoaded) => {
          if (!isLoaded) {
            this.store.dispatch(
              CountryAndWishListActions.load()
            );
          }
        })
      )
      .subscribe();

    // load view models
    this.wishList$ = this.store.select(WishListSelectors.selectWishList);
    this.vm$ = this.wishList$.pipe(
      mergeMap((wishList) => {
        return this.store.select(
          CountrySelectors.selectCountrySummaryViewModelsByNames(wishList)
        );
      })
    );
  }
}
