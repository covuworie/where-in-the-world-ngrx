import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CountrySearchComponent } from './country-search/country-search.component';
import { RegionFilterComponent } from './region-filter/region-filter.component';
import { StoreModule } from '@ngrx/store';
import * as fromCountry from './state/country.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CountryEffects } from './state/country.effects';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryDetailComponent,
    CountrySearchComponent,
    RegionFilterComponent,
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      fromCountry.countriesFeatureKey,
      fromCountry.reducer
    ),
    EffectsModule.forFeature([CountryEffects]),
  ],
})
export class CountriesModule {}
