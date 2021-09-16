import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import CountryVisitViewModel from './country-visit-view.model';

@Component({
  selector: 'app-country-visit',
  templateUrl: './country-visit.component.html',
  styleUrls: ['./country-visit.component.scss'],
})
export class CountryVisitComponent {
  // public properties
  @Input() countryVisit: CountryVisitViewModel = {
    year: 0,
    country: '',
    duration: 0,
  };
  visit = this.fb.group(this.countryVisit);

  // public methods
  constructor(private fb: FormBuilder) {}
}
