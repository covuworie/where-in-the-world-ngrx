import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CountriesComponent, CountryDetailComponent],
  imports: [CommonModule, CountriesRoutingModule, SharedModule],
})
export class CountriesModule {}
