import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';
import * as WishListActions from '../../store/actions/wish-list.actions';

export const wishListFeatureKey = 'wishList';

export interface State {
  names: string[];
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  names: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(
    WishListActions.addFailure,
    WishListActions.loadFailure,
    WishListActions.removeFailure,
    (state, { error }): State => {
      return {
        ...state,
        error,
      };
    }
  ),
  on(WishListActions.addSuccess, (state, { name }): State => {
    if (state.names.indexOf(name) > -1) {
      return state;
    }
    return {
      ...state,
      names: [...state.names, name],
    };
  }),
  on(WishListActions.loadSuccess, (state, action): State => {
    const names = action.countries.map((country) => country.id);
    return {
      ...state,
      names: [...names],
    };
  }),
  on(WishListActions.removeSuccess, (state, { name }): State => {
    return {
      ...state,
      names: state.names.filter((countryName) => countryName !== name),
    };
  })
);
