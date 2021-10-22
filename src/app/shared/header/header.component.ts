import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeart,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import HeaderViewModel from './header-view.model';
import * as HeaderSelectors from '../../store/selectors/header.selectors';
import * as UserSettingsActions from '../../store/actions/user-settings.actions';
import * as WishListActions from '../../store/actions/wish-list.actions';
import { Theme } from '../theme/theme.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // public properties
  faBars = faBars;
  faHeart = faHeart;
  faMoon = faMoon;
  faSun = faSun;
  vm$: Observable<HeaderViewModel> = new Observable();

  // public methods
  changeTheme(theme: Theme) {
    this.store.dispatch(UserSettingsActions.changeTheme({ theme }));
  }

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(WishListActions.load());
    this.vm$ = this.store.select(HeaderSelectors.selectHeaderViewModel);
  }
}
