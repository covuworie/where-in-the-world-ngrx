import { createReducer, on } from '@ngrx/store';
import { Theme } from 'src/app/shared/theme/theme.model';
import * as UserSettingsActions from '../../store/actions/user-settings.actions';

export const userSettingsFeatureKey = 'userSettings';

export interface State {
  theme: Theme;
}

export const initialState: State = {
  theme: 'theme-light',
};

export const reducer = createReducer(
  initialState,

  on(
    UserSettingsActions.changeThemeSuccess,
    UserSettingsActions.loadSuccess,
    (state, { theme }): State => {
      return {
        ...state,
        theme,
      };
    }
  )
);
