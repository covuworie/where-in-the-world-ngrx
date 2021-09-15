import { Component } from '@angular/core';
import CountryDetailViewModel from './country-detail-view.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent {
  // public properties
  country!: CountryDetailViewModel;

  // public methods
  constructor() {}
}
