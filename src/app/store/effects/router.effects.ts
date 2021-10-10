import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as CountryDetailActions from '../../countries/state/country-detail.actions';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  // public methods
  constructor(private actions$: Actions, private router: Router) {}

  navigateCountries$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CountryDetailActions.countryNotFoundInStore),
        // would need a separate module for not found component to redirect to not found page
        // redirect to countries instead for convenience
        tap(() => this.router.navigate(['/countries']))
      );
    },
    { dispatch: false }
  );
}
