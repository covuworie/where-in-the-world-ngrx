import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CountriesService } from 'src/app/countries/shared/countries.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import * as CountryActions from '../../countries/state/country.actions';
import * as CountryAndWishListActions from '../actions/countries-and-wish-list.actions';
import * as CountryReducer from 'src/app/countries/state/country.reducer';
import * as WishListActions from '../actions/wish-list.actions';
import { WishListService } from 'src/app/wish-list/shared/wish-list.service';

@Injectable()
export class CountriesAndWishListEffects {
  // public methods
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService,
    private wishListService: WishListService
  ) {}
  loadWishList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryAndWishListActions.load),
      mergeMap(() =>
        this.wishListService.getAll().pipe(
          map((countries) => WishListActions.loadSuccess({ countries })),
          catchError((error: HttpErrorResponse) =>
            of(WishListActions.loadFailure({ error }))
          )
        )
      )
    );
  });

  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        CountryActions.load,
        WishListActions.loadFailure,
        WishListActions.loadSuccess
      ),
      mergeMap(() =>
        this.countriesService.getAll().pipe(
          map((countries) => {
            return CountryActions.loadSuccess({
              countries,
            });
          }),
          tap((countries) => {
            const iscountriesInLocalStorage =
              localStorage.getItem(CountryReducer.countriesFeatureKey) !==
              undefined;
            if (!iscountriesInLocalStorage) {
              LocalStorageService.setItemWithExpiry(
                CountryReducer.countriesFeatureKey,
                JSON.stringify(countries),
                // 30 days time to live (TTL) as the countries data is updated on the order of months
                1000 * 60 * 60 * 24 * 30
              );
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(CountryActions.loadFailure({ error }))
          )
        )
      )
    );
  });
}
