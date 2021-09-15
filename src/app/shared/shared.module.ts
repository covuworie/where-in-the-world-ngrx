import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySummaryComponent } from './country-summary/country-summary.component';
import { RouterModule } from '@angular/router';
import { HyphenateUriPipe } from './hypenate-uri.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryGridComponent } from './country-grid/country-grid.component';

@NgModule({
  declarations: [CountrySummaryComponent, HyphenateUriPipe, CountryGridComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class SharedModule {}
