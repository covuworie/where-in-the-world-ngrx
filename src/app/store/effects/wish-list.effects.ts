import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as WishListActions from '../../store/actions/wish-list.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { WishListService } from 'src/app/wish-list/shared/wish-list.service';

@Injectable()
export class WishListEffects {
  addCountryName$ = createEffect(() => {
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

  constructor(
    private actions$: Actions,
    private wishListService: WishListService
  ) {}
}
