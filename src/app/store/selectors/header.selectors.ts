import { createSelector } from '@ngrx/store';
import HeaderViewModel from 'src/app/shared/header/header-view.model';
import * as WishListSelectors from './wish-list.selectors';

export const selectHeaderViewModel = createSelector(
  WishListSelectors.selectWishListCount,
  (count) => {
    const headerViewModel: HeaderViewModel = {
      wishListCount: count,
    };
    return headerViewModel;
  }
);
