import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeoService } from '../shared/seo.service';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    data: {
      title: `${SeoService.appTitle} | Countries`,
      description: 'A list of countries in the world.',
    },
  },
  {
    path: ':name',
    component: CountryDetailComponent,
    data: {
      title: `${SeoService.appTitle} | {{ country }}`,
      description: `Detailed information about {{ country }}.`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
