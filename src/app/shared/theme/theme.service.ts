import { Injectable } from '@angular/core';
import { Theme } from './theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // public methods
  constructor() { }

  public get Theme() {
    return (localStorage.getItem('theme') as Theme) || 'theme-light';
  }

  public set Theme(theme: Theme) {
    localStorage.setItem('theme', theme);
  }
}
