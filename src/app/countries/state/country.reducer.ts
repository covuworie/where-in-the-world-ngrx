import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Country } from './country.model';
import * as CountryActions from './country.actions';

export const countriesFeatureKey = 'countries';

export interface State extends EntityState<Country> {
  // additional entities state properties
}

export function selectCCN3(a: Country): string {
  return a.ccn3;
}

export function sortByCommonName(a: Country, b: Country): number {
  return a.name.common.localeCompare(b.name.common);
}

export const adapter: EntityAdapter<Country> = createEntityAdapter<Country>({
  selectId: selectCCN3,
  sortComparer: sortByCommonName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(CountryActions.addCountry, (state, action) =>
    adapter.addOne(action.country, state)
  ),
  on(CountryActions.upsertCountry, (state, action) =>
    adapter.upsertOne(action.country, state)
  ),
  on(CountryActions.addCountrys, (state, action) =>
    adapter.addMany(action.countrys, state)
  ),
  on(CountryActions.upsertCountrys, (state, action) =>
    adapter.upsertMany(action.countrys, state)
  ),
  on(CountryActions.updateCountry, (state, action) =>
    adapter.updateOne(action.country, state)
  ),
  on(CountryActions.updateCountrys, (state, action) =>
    adapter.updateMany(action.countrys, state)
  ),
  on(CountryActions.deleteCountry, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(CountryActions.deleteCountrys, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(CountryActions.loadCountrys, (state, action) =>
    adapter.setAll(action.countrys, state)
  ),
  on(CountryActions.clearCountrys, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
