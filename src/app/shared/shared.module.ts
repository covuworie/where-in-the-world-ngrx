import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySummaryComponent } from './country-summary/country-summary.component';
import { RouterModule } from '@angular/router';
import { HyphenateUriPipe } from './hypenate-uri.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CountrySummaryComponent, HyphenateUriPipe],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class SharedModule {}
