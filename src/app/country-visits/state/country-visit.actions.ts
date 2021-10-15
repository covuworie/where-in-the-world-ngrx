import { createAction, props } from '@ngrx/store';
import CountryVisit from '../shared/country-visit.model';
import { HttpErrorResponse } from '@angular/common/http';

export const load = createAction('[Country Visits Component] Load');

export const loadFailure = createAction(
  '[Country Visits API] Load Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadSuccess = createAction(
  '[Country Visits API] Load Success',
  props<{ countryVisits: CountryVisit[] }>()
);

export const add = createAction(
  '[Country Visits Component] Add',
  props<{ countryVisit: CountryVisit }>()
);

export const addFailure = createAction(
  '[Country Visits API] Add Failure',
  props<{ error: HttpErrorResponse }>()
);

export const addSuccess = createAction(
  '[Country Visits API] Add Success',
  props<{ countryVisit: CountryVisit }>()
);

export const remove = createAction(
  '[Country Visits Component] Remove',
  props<{ id: string }>()
);

export const removeFailure = createAction(
  '[Country Visits API] Remove Failure',
  props<{ error: HttpErrorResponse }>()
);

export const removeSuccess = createAction(
  '[Country Visits API] Remove Success',
  props<{ id: string }>()
);

export const update = createAction(
  '[Country Visits Component] Update',
  props<{ countryVisit: CountryVisit }>()
);

export const updateFailure = createAction(
  '[Country Visits API] Update Failure',
  props<{ error: HttpErrorResponse }>()
);

export const updateSuccess = createAction(
  '[Country Visits API] Update Success',
  props<{ countryVisit: CountryVisit }>()
);
