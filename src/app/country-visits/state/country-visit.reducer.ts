import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import CountryVisit from '../shared/country-visit.model';
import * as CountryVisitActions from './country-visit.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const countryVisitsFeatureKey = 'countryVisits';

export interface State extends EntityState<CountryVisit> {
  // additional entities state properties
  isLoaded: boolean;
  error: HttpErrorResponse | undefined;
}

export const adapter: EntityAdapter<CountryVisit> =
  createEntityAdapter<CountryVisit>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoaded: false,
  error: undefined,
});

export const reducer = createReducer(
  initialState,
  on(
    CountryVisitActions.addFailure,
    CountryVisitActions.loadFailure,
    CountryVisitActions.removeFailure,
    CountryVisitActions.updateFailure,
    (state, action): State => {
      return {
        ...state,
        isLoaded: false,
        error: action.error,
      };
    }
  ),
  on(CountryVisitActions.addSuccess, (state, action) =>
    adapter.addOne(action.countryVisit, state)
  ),
  on(CountryVisitActions.updateSuccess, (state, action) =>
    adapter.upsertOne(action.countryVisit, state)
  ),
  on(CountryVisitActions.removeSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(CountryVisitActions.loadSuccess, (state, action) =>
    adapter.setAll(action.countryVisits, { ...state, isLoaded: true })
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
