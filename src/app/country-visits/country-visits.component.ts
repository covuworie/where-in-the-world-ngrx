import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CountryVisitViewModel from './country-visit/country-visit-view.model';

@Component({
  selector: 'app-countries-visited',
  templateUrl: './country-visits.component.html',
  styleUrls: ['./country-visits.component.scss'],
})
export class CountryVisitsComponent {
  // public properties
  countryVisits: CountryVisitViewModel[] = [];
  faPlus = faPlus;

  // public methods
  constructor() {}
}
