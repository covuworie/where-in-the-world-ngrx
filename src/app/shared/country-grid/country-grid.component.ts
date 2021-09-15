import { Component, Input } from '@angular/core';
import CountrySummaryViewModel from '../country-summary/country-summary-view.model';

@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.scss'],
})
export class CountryGridComponent {
  // public properties
  @Input() countries: CountrySummaryViewModel[] = [];

  // public methods
  constructor() {}
}
