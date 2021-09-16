import { Component, EventEmitter, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
})
export class CountrySearchComponent {
  // public properties
  @Output() inputChange = new EventEmitter<string>();
  faSearch = faSearch;

  // public methods
  constructor() {}
}
