import { Component } from '@angular/core';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  // public properties
  countries: CountrySummaryViewModel[] = [];

  // public methods
  constructor() {}
}
