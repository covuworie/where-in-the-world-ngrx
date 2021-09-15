import { Component, Input } from '@angular/core';

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
