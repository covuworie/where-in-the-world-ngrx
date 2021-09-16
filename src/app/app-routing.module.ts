import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
