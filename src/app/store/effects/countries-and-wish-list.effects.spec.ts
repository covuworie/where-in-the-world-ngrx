import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CountriesAndWishListEffects } from './countries-and-wish-list.effects';

describe('CountriesAndWishListEffects', () => {
  let actions$: Observable<any>;
  let effects: CountriesAndWishListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesAndWishListEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(CountriesAndWishListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
