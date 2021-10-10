import { createAction, props } from '@ngrx/store';

import { Country } from '../shared/country.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loadFailure = createAction(
  '[Countries API] Load Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSuccess = createAction(
  '[Countries API] Load Success',
  props<{ countries: Country[] }>()
);
