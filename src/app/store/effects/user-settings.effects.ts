import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Theme } from 'src/app/shared/theme/theme.model';
import { ThemeService } from 'src/app/shared/theme/theme.service';
import * as UserSettingsActions from '../actions/user-settings.actions';

@Injectable()
export class UserSettingsEffects {
  // private fields
  private renderer: Renderer2;

  // public methods
  constructor(
    private actions$: Actions,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2,
    private themeService: ThemeService
  ) {
    // Based on https://stackoverflow.com/questions/44989666/service-no-provider-for-renderer2
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  changeTheme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserSettingsActions.changeTheme),
      tap(({ theme }) => this.renderThemeChange(theme)),
      map(({ theme }) => (this.themeService.Theme = theme)),
      map((theme) => UserSettingsActions.changeThemeSuccess({ theme }))
    );
  });

  loadTheme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserSettingsActions.loadUserSettings),
      map(() => this.themeService.Theme),
      tap((theme) => this.renderThemeChange(theme)),
      map((theme) => UserSettingsActions.loadUserSettingsSuccess({ theme }))
    );
  });

  // private methods
  private renderThemeChange(theme: Theme) {
    // Based on https://stackoverflow.com/questions/48346873/how-to-add-class-to-body-in-angular-universal
    const previousTheme: Theme =
      theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    this.renderer.removeClass(this.document.body, previousTheme);
    this.renderer.addClass(this.document.body, theme);
  }
}
