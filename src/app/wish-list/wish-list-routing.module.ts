import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeoService } from '../shared/seo.service';
import { WishListComponent } from './wish-list.component';

const routes: Routes = [
  {
    path: '',
    component: WishListComponent,
    data: {
      title: `${SeoService.appTitle} | Wish List`,
      description: 'A list of countries you would like to visit.',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishListRoutingModule {}
