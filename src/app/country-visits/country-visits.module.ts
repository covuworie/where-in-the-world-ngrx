import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesVisitedRoutingModule } from './country-visits-routing.module';
import { CountryVisitsComponent } from './country-visits.component';
import { CountryVisitComponent } from './country-visit/country-visit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CountryVisitsComponent, CountryVisitComponent],
  imports: [
    CommonModule,
    CountriesVisitedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CountriesVisitedModule {}
