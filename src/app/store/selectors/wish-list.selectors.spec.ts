import * as fromWishList from '../reducers/wish-list.reducer';
import { selectWishListState } from './wish-list.selectors';

describe('WishList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectWishListState({
      [fromWishList.wishListFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
