import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestCountriesService } from '../shared/rest-countries.service';
import * as CountryActions from './country.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable()
export class CountryEffects {
  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.restCountriesService.getAll().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          tap((countries) =>
            LocalStorageService.setItemWithExpiry(
              'countries',
              JSON.stringify(countries),
              // 30 days time to live (TTL) as the countries data is updated on the order of months
              1000 * 60 * 60 * 24 * 30
            )
          ),
          catchError((error: HttpErrorResponse) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private restCountriesService: RestCountriesService
  ) {}
}
