import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[Country Summary Component] Add To Wish List',
  props<{ name: string }>()
);

export const addSuccess = createAction(
  '[Wish List API] Add Success',
  props<{ name: string }>()
);

export const addFailure = createAction(
  '[Wish List API] Add Failure',
  props<{ error: HttpErrorResponse }>()
);
