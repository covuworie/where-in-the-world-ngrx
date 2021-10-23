import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeoService } from '../shared/seo.service';
import { CountryVisitsComponent } from './country-visits.component';

const routes: Routes = [
  {
    path: '',
    component: CountryVisitsComponent,
    data: {
      title: `${SeoService.appTitle} | Countries Visited`,
      description: 'A list of countries you have visited.',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesVisitedRoutingModule {}
