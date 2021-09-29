import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '../shared/countries.service';
import * as CountryActions from './country.actions';
import * as CountryReducer from '../state/country.reducer';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { countriesFeatureKey } from './country.reducer';
import { of } from 'rxjs';

@Injectable()
export class CountryEffects {
  // public methods
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}

  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countriesService.getAll().pipe(
          map((countries) => {
            return CountryActions.loadCountriesSuccess({
              countries,
            });
          }),
          tap((countries) => {
            const iscountriesInLocalStorage =
              localStorage.getItem(CountryReducer.countriesFeatureKey) !== null;
            if (!iscountriesInLocalStorage) {
              LocalStorageService.setItemWithExpiry(
                countriesFeatureKey,
                JSON.stringify(countries),
                // 30 days time to live (TTL) as the countries data is updated on the order of months
                1000 * 60 * 60 * 24 * 30
              );
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        )
      )
    );
  });
}
