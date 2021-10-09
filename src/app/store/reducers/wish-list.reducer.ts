import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import * as WishListActions from '../../store/actions/wish-list.actions';

export const wishListFeatureKey = 'wishList';

export interface State {
  isLoaded: boolean;
  names: string[];
  error: HttpErrorResponse | undefined;
}

export const initialState: State = {
  isLoaded: false,
  names: [],
  error: undefined,
};

export const reducer = createReducer(
  initialState,

  on(
    WishListActions.addFailure,
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
  on(WishListActions.loadFailure, (state, { error }): State => {
    return {
      ...state,
      isLoaded: false,
      error,
    };
  }),
  on(WishListActions.loadSuccess, (state, action): State => {
    const names = action.countries.map((country) => country.id);
    return {
      ...state,
      isLoaded: true,
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
