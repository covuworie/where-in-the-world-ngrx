import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesVisitedComponent } from './countries-visited.component';

const routes: Routes = [{ path: '', component: CountriesVisitedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesVisitedRoutingModule {}
