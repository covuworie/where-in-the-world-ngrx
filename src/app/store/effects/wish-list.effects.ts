import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as WishListActions from '../actions/wish-list.actions';
import * as WishListSelectors from '../selectors/wish-list.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { WishListService } from 'src/app/wish-list/shared/wish-list.service';
import { Store } from '@ngrx/store';

@Injectable()
export class WishListEffects {
  add$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishListActions.add),
      mergeMap(({ name }) =>
        this.wishListService.add(name).pipe(
          map(() => WishListActions.addSuccess({ name })),
          catchError((error: HttpErrorResponse) =>
            of(WishListActions.addFailure({ error }))
          )
        )
      )
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishListActions.load),
      // Don't load if already loaded
      concatLatestFrom(() =>
        this.store.select(WishListSelectors.selectIsLoaded)
      ),
      filter(([_, isLoaded]) => !isLoaded),
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

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WishListActions.remove),
      mergeMap(({ name }) =>
        this.wishListService.remove(name).pipe(
          map(() => WishListActions.removeSuccess({ name })),
          catchError((error: HttpErrorResponse) =>
            of(WishListActions.removeFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private wishListService: WishListService
  ) {}
}
