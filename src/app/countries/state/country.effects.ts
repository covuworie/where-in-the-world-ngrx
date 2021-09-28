import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestCountriesService } from '../shared/rest-countries.service';
import * as CountryActions from './country.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
