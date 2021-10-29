import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeart,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import HeaderViewModel from './header-view.model';
import * as UserSettingsActions from '../../store/actions/user-settings.actions';
import * as WishListActions from '../../store/actions/wish-list.actions';
import { Theme } from '../theme/theme.model';
import { HeaderFacadeService } from 'src/app/store/facades/header-facade.service';

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
    this.headerFacade.dispatch(UserSettingsActions.changeTheme({ theme }));
  }

  constructor(public headerFacade: HeaderFacadeService) {}

  ngOnInit() {
    this.headerFacade.dispatch(WishListActions.load());
  }
}
