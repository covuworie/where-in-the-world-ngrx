import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { CountryVisitsService } from '../shared/country-visits.service';
import * as CountryVisitActions from './country-visit.actions';
import * as CountryVisitSelectors from './country-visit.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CountryVisitEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountryVisitActions.add),
      mergeMap(({ countryVisit }) =>
        this.countryVisitsService.add(countryVisit).pipe(
          map(() => CountryVisitActions.addSuccess({ countryVisit })),
          catchError((error: HttpErrorResponse) =>
            of(CountryVisitActions.addFailure({ error }))
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
      mergeMap(() =>
        this.countryVisitsService.getAll().pipe(
          map((countryVisits) =>
            CountryVisitActions.loadSuccess({ countryVisits })
          ),
          catchError((error: HttpErrorResponse) =>
            of(CountryVisitActions.loadFailure({ error }))
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
          catchError((error: HttpErrorResponse) =>
            of(CountryVisitActions.removeFailure({ error }))
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
          catchError((error: HttpErrorResponse) =>
            of(CountryVisitActions.updateFailure({ error }))
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
