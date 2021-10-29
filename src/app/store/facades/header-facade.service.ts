import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import HeaderViewModel from 'src/app/shared/header/header-view.model';
import * as HeaderSelectors from '../selectors/header.selectors';

@Injectable({
  providedIn: 'root',
})
export class HeaderFacadeService {
  // public properties
  vm$: Observable<HeaderViewModel>;

  // public methods
  constructor(private store: Store) {
    this.vm$ = this.store.select(HeaderSelectors.selectHeaderViewModel);
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
