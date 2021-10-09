import * as fromCountriesAndWishList from './countries-and-wish-list.actions';

describe('loadCountriesAndWishLists', () => {
  it('should return an action', () => {
    expect(fromCountriesAndWishList.load().type).toBe(
      '[CountriesAndWishList] Load CountriesAndWishLists'
    );
  });
});
