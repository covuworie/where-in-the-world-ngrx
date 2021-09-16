import { Component } from '@angular/core';
import { faBars, faHeart, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

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

  // public methods
  constructor() {}
}
