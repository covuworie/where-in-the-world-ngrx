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

  on(WishListActions.addSuccess, (state, { name }): State => {
    return {
      ...state,
      names: [...state.names, name],
    };
  }),
  on(WishListActions.addFailure, (state, { error }): State => {
    return {
      ...state,
      error,
    };
  })
);
