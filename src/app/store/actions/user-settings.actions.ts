import { createAction, props } from '@ngrx/store';
import { Theme } from 'src/app/shared/theme/theme.model';

export const load = createAction('[User Settings] Load');

export const loadSuccess = createAction(
  '[User Settings] Load Success',
  props<{ theme: Theme }>()
);

export const changeTheme = createAction(
  '[User Settings] Change Theme',
  props<{ theme: Theme }>()
);

export const changeThemeSuccess = createAction(
  '[User Settings] Change Theme Success',
  props<{ theme: Theme }>()
);
