import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountrySelectors from '../countries/state/country.selectors';
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

  // private fields
  private wishList$ = this.store.select(WishListSelectors.selectWishList);

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(WishListActions.load());
    this.vm$ = this.wishList$.pipe(
      mergeMap((wishList) => {
        return this.store.select(
          CountrySelectors.selectCountrySummaryViewModelsByNames(wishList)
        );
      })
    );
  }
}
