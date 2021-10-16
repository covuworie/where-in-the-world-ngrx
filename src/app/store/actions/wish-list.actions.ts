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

export const load = createAction('[Header Component] Load Wish List');

export const loadFailure = createAction(
  '[Wish List API] Load Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSuccess = createAction(
  '[Wish List API] Load Success',
  props<{ countries: { id: string }[] }>()
);

export const remove = createAction(
  '[Country Summary Component] Remove From Wish List',
  props<{ name: string }>()
);

export const removeSuccess = createAction(
  '[Wish List API] Remove Success',
  props<{ name: string }>()
);

export const removeFailure = createAction(
  '[Wish List API] Remove Failure',
  props<{ error: HttpErrorResponse }>()
);
