import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import * as CountryActions from '../actions/country.actions';
import * as WishListActions from '../actions/wish-list.actions';

@Injectable()
export class SpinnerEffects {
  spinnerOn$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CountryActions.load, WishListActions.load),
        tap(() => this.spinner.show())
      );
    },
    { dispatch: false }
  );

  spinnerOff$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          CountryActions.loadFailure,
          CountryActions.loadSuccess,
          WishListActions.loadFailure,
          WishListActions.loadSuccess
        ),
        tap(() => {
          this.spinner.hide();
        })
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private spinner: NgxSpinnerService) {}
}
