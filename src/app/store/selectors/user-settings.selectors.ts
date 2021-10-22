import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserSettings from '../reducers/user-settings.reducer';

export const selectUserSettingsState =
  createFeatureSelector<fromUserSettings.State>(
    fromUserSettings.userSettingsFeatureKey
  );

export const selectUserSettings = createSelector(
  selectUserSettingsState,
  (settings) => settings
);

export const selectTheme = createSelector(
  selectUserSettingsState,
  (settings) => settings.theme
);
