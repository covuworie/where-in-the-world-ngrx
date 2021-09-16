import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryVisitsComponent } from './country-visits.component';

const routes: Routes = [{ path: '', component: CountryVisitsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesVisitedRoutingModule {}
