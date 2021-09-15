import { Component } from '@angular/core';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent {
  // public properties
  countries: CountrySummaryViewModel[] = [];

  // public methods
  constructor() {}
}
