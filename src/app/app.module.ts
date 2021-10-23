import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { WishListEffects } from './store/effects/wish-list.effects';
import { CountriesEffects } from './store/effects/country.effects';
import { RouterEffects } from './store/effects/router.effects';
import { InitEffects } from './store/effects/init.effects';
import { UserSettingsEffects } from './store/effects/user-settings.effects';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerEffects } from './store/effects/spinner.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      CountriesEffects,
      InitEffects,
      RouterEffects,
      SpinnerEffects,
      UserSettingsEffects,
      WishListEffects,
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
