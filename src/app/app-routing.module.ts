import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
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
