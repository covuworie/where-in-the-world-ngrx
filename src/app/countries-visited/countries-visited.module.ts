import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesVisitedRoutingModule } from './countries-visited-routing.module';
import { CountriesVisitedComponent } from './countries-visited.component';

@NgModule({
  declarations: [CountriesVisitedComponent],
  imports: [CommonModule, CountriesVisitedRoutingModule],
})
export class CountriesVisitedModule {}
