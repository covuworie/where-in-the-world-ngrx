import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SeoService } from './shared/seo.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
    data: {
      title: SeoService.appTitle,
      description:
        'An application to view details on countries, maintain a list of visited countries and to maintain a wish list of countries you would like to visit.',
    },
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  {
    path: 'country-visits',
    loadChildren: () =>
      import('./country-visits/country-visits.module').then(
        (m) => m.CountriesVisitedModule
      ),
  },
  {
    path: 'wish-list',
    loadChildren: () =>
      import('./wish-list/wish-list.module').then((m) => m.WishListModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
