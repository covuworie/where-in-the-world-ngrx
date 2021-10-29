import { createAction, props } from '@ngrx/store';
import { Theme } from 'src/app/shared/theme/theme.model';

export const loadUserSettings = createAction(
  '[Header Component] Load User Settings'
);

export const loadUserSettingsSuccess = createAction(
  '[Header Component] Load User Settings Success',
  props<{ theme: Theme }>()
);

export const changeTheme = createAction(
  '[Header Component] Change Theme',
  props<{ theme: Theme }>()
);

export const changeThemeSuccess = createAction(
  '[Header Component] Change Theme Success',
  props<{ theme: Theme }>()
);
