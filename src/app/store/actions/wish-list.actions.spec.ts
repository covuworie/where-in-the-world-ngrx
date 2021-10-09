import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WishListEffects } from '../effects/wish-list.effects';

describe('WishListEffects', () => {
  let actions$: Observable<any>;
  let effects: WishListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishListEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(WishListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
