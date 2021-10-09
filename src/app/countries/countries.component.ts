import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountryAndWishListActions from '../store/actions/countries-and-wish-list.actions';
import * as CountrySelectors from './state/country.selectors';
import * as WishListSelectors from '../store/selectors/wish-list.selectors';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  // public properties
  vm$: Observable<CountrySummaryViewModel[]> = of([]);

  // private fields
  private wishList: string[] = [];

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    // load countries and wish list if not in store
    this.store
      .select(CountrySelectors.selectTotal)
      .pipe(
        filter((total) => total === 0),
        tap(() => this.store.dispatch(CountryAndWishListActions.load()))
      )
      .subscribe();

    // load view models
    this.vm$ = this.store.select(WishListSelectors.selectWishList).pipe(
      mergeMap((wishList) => {
        this.wishList = wishList;
        return this.store.select(
          CountrySelectors.selectCountrySummaryViewModels(this.wishList)
        );
      })
    );
  }

  onCountrySearchChange(partialName: string) {
    this.vm$ = this.store.select(
      CountrySelectors.selectCountrySummaryViewModelsByPartialName(
        this.wishList,
        partialName
      )
    );
  }

  onRegionChange(region: string) {
    this.vm$ = this.store.select(
      CountrySelectors.selectCountrySummaryViewModelsByRegion(
        this.wishList,
        region
      )
    );
  }
}
