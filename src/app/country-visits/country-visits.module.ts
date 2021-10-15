import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesVisitedRoutingModule } from './country-visits-routing.module';
import { CountryVisitsComponent } from './country-visits.component';
import { CountryVisitComponent } from './country-visit/country-visit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromCountryVisit from '../country-visits/state/country-visit.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountryVisitEffects } from './state/country-visit.effects';

@NgModule({
  declarations: [CountryVisitsComponent, CountryVisitComponent],
  imports: [
    CommonModule,
    CountriesVisitedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(
      fromCountryVisit.countryVisitsFeatureKey,
      fromCountryVisit.reducer
    ),
    EffectsModule.forFeature([CountryVisitEffects]),
  ],
})
export class CountriesVisitedModule {}
