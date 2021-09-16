import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesVisitedRoutingModule } from './countries-visited-routing.module';
import { CountriesVisitedComponent } from './countries-visited.component';
import { CountryVisitComponent } from './country-visit/country-visit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CountriesVisitedComponent, CountryVisitComponent],
  imports: [
    CommonModule,
    CountriesVisitedRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CountriesVisitedModule {}
