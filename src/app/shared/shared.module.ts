import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySummaryComponent } from './country-summary/country-summary.component';
import { RouterModule } from '@angular/router';
import { HyphenateUriPipe } from './hypenate-uri.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryGridComponent } from './country-grid/country-grid.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    CountrySummaryComponent,
    HyphenateUriPipe,
    CountryGridComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [
    CountryGridComponent,
    HyphenateUriPipe,
    FontAwesomeModule,
    HeaderComponent,
  ],
})
export class SharedModule {}
