import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/countries/shared/country.model';

export const load = createAction('[Countries API] Load');

export const loadFailure = createAction(
  '[Countries API] Load Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSuccess = createAction(
  '[Countries API] Load Success',
  props<{ countries: Country[] }>()
);
