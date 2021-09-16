import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CountryVisitViewModel from './country-visit/country-visit-view.model';

@Component({
  selector: 'app-countries-visited',
  templateUrl: './countries-visited.component.html',
  styleUrls: ['./countries-visited.component.scss'],
})
export class CountriesVisitedComponent {
  // public properties
  countryVisits: CountryVisitViewModel[] = [];
  faPlus = faPlus;

  // public methods
  constructor() {}
}
