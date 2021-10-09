import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromWishList from '../reducers/wish-list.reducer';

export const selectWishListState = createFeatureSelector<fromWishList.State>(
  fromWishList.wishListFeatureKey
);

export const selectIsLoaded = createSelector(
  selectWishListState,
  (wishList) => wishList.isLoaded
);

export const selectWishList = createSelector(
  selectWishListState,
  (wishList) => wishList.names
);

export const selectWishListCount = createSelector(
  selectWishList,
  (wishList) => wishList.length
);
