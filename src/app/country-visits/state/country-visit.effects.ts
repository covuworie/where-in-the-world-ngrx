import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  mergeMap,
  skipWhile,
  switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { CountryVisitsService } from '../shared/country-visits.service';
import * as CountryVisitActions from './country-visit.actions';
import * as CountryVisitSelectors from './country-visit.selectors';
import * as CountrySelectors from '../../store/selectors/country.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CountryVisitEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryVisitActions.add),
      mergeMap(({ countryVisit }) =>
        this.countryVisitsService.add(countryVisit).pipe(
          map(() => CountryVisitActions.addSuccess({ countryVisit })),
          catchError((error: unknown) =>
            of(
              CountryVisitActions.addFailure({
                error: error as HttpErrorResponse,
              })
            )
          )
        )
      )
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryVisitActions.load),
      // Don't load if already loaded
      concatLatestFrom(() =>
        this.store.select(CountryVisitSelectors.selectIsLoaded)
      ),
      filter(([_, isLoaded]) => !isLoaded),
      // The countries data must be loaded before the country visits data so
      // that the validation of countries works correctly in the country visits
      // component. So we follow the methodology described here:
      // https://dev.to/this-is-angular/manipulating-ngrx-effects-400d ...
      // Do not handle the action straight away, switch to another Observable
      // which selects country "total" data from the store. If the total is
      // zero meaning the countries data is not in the store the pipeline will
      // wait. But when the countries data is finally available then proceed
      // with loading the country visits data into the store.
      switchMap(() =>
        this.store.select(CountrySelectors.selectTotal).pipe(
          skipWhile((total) => total === 0),
          mergeMap(() =>
            this.countryVisitsService.getAll().pipe(
              map((countryVisits) =>
                CountryVisitActions.loadSuccess({ countryVisits })
              ),
              catchError((error: unknown) =>
                of(
                  CountryVisitActions.loadFailure({
                    error: error as HttpErrorResponse,
                  })
                )
              )
            )
          )
        )
      )
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryVisitActions.remove),
      mergeMap(({ id }) =>
        this.countryVisitsService.remove(id).pipe(
          map(() => CountryVisitActions.removeSuccess({ id })),
          catchError((error: unknown) =>
            of(
              CountryVisitActions.removeFailure({
                error: error as HttpErrorResponse,
              })
            )
          )
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryVisitActions.update),
      mergeMap(({ countryVisit }) =>
        this.countryVisitsService.update(countryVisit).pipe(
          map(() => CountryVisitActions.updateSuccess({ countryVisit })),
          catchError((error: unknown) =>
            of(
              CountryVisitActions.updateFailure({
                error: error as HttpErrorResponse,
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private countryVisitsService: CountryVisitsService,
    private store: Store
  ) {}
}
