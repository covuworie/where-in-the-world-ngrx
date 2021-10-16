import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Country } from '../../countries/shared/country.model';
import * as CountryActions from '../actions/country.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const countriesFeatureKey = 'countries';

export interface State extends EntityState<Country> {
  // additional entities state properties
  error: HttpErrorResponse | undefined;
}

export function selectCCA3(a: Country): string {
  return a.cca3; // ccn3 would be a better choice but it's missing for Kosovo
}

export function sortByCommonName(a: Country, b: Country): number {
  return a.name.common.localeCompare(b.name.common);
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: selectCCA3,
  sortComparer: sortByCommonName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
});

export const reducer = createReducer(
  initialState,
  on(CountryActions.loadFailure, (state, action): State => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(CountryActions.loadSuccess, (state, action) =>
    adapter.setAll(action.countries, state)
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
