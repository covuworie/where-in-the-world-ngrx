import { createSelector } from '@ngrx/store';
import HeaderViewModel from 'src/app/shared/header/header-view.model';
import * as WishListSelectors from './wish-list.selectors';
import * as UserSettingsSelectors from './user-settings.selectors';

export const selectHeaderViewModel = createSelector(
  UserSettingsSelectors.selectTheme,
  WishListSelectors.selectWishListCount,
  (theme, count) => {
    const headerViewModel: HeaderViewModel = {
      theme,
      wishListCount: count,
    };
    return headerViewModel;
  }
);
