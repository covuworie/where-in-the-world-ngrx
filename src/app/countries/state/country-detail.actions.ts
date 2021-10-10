import { createAction } from '@ngrx/store';

export const load = createAction('[Country Detail Component] Load');

export const countryNotFoundInStore = createAction(
  '[Country Detail Component] Country Not Found In Store'
);
