import { Component } from '@angular/core';
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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // public properties
  faBars = faBars;
  faHeart = faHeart;
  faMoon = faMoon;
  faSun = faSun;
  vm$: Observable<HeaderViewModel> = this.store.select(
    HeaderSelectors.selectHeaderViewModel
  );

  // public methods
  constructor(private store: Store) {}
}
