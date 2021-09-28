import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Country } from '../shared/country.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loadCountries = createAction(
  '[Countries Component] Load Countries'
);

export const loadCountriesFailure = createAction(
  '[Countries API] Load Countries Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadCountriesSuccess = createAction(
  '[Countries API] Load Countries Success',
  props<{ countries: Country[] }>()
);

export const addCountry = createAction(
  '[Country/API] Add Country',
  props<{ country: Country }>()
);

export const upsertCountry = createAction(
  '[Country/API] Upsert Country',
  props<{ country: Country }>()
);

export const addCountrys = createAction(
  '[Country/API] Add Countrys',
  props<{ countrys: Country[] }>()
);

export const upsertCountrys = createAction(
  '[Country/API] Upsert Countrys',
  props<{ countrys: Country[] }>()
);

export const updateCountry = createAction(
  '[Country/API] Update Country',
  props<{ country: Update<Country> }>()
);

export const updateCountrys = createAction(
  '[Country/API] Update Countrys',
  props<{ countrys: Update<Country>[] }>()
);

export const deleteCountry = createAction(
  '[Country/API] Delete Country',
  props<{ id: string }>()
);

export const deleteCountrys = createAction(
  '[Country/API] Delete Countrys',
  props<{ ids: string[] }>()
);

export const clearCountrys = createAction('[Country/API] Clear Countrys');
