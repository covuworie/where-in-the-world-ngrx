import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { CountriesService } from 'src/app/countries/shared/countries.service';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import * as CountryActions from '../actions/country.actions';
import * as CountryReducer from 'src/app/store/reducers/country.reducer';

@Injectable()
export class CountriesEffects {
  // public methods
  constructor(
    private actions$: Actions,
    private countriesService: CountriesService
  ) {}
  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.load),
      // loaded from ROOT_EFFECTS_INIT so only loaded once
      mergeMap(() =>
        this.countriesService.getAll().pipe(
          map((countries) => CountryActions.loadSuccess({ countries })),
          tap((countries) => {
            const isCountriesNotInLocalStorage =
              localStorage.getItem(CountryReducer.countriesFeatureKey) !==
              undefined;
            if (isCountriesNotInLocalStorage) {
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
