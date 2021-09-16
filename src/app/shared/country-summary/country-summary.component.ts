import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CountrySummaryViewModel from './country-summary-view.model';

@Component({
  selector: 'app-country-summary',
  templateUrl: './country-summary.component.html',
  styleUrls: ['./country-summary.component.scss'],
})
export class CountrySummaryComponent {
  // public properties
  @Input() country: CountrySummaryViewModel = {
    name: '',
    flagUrl: '',
    population: 0,
    region: '',
    capital: '',
    isOnWishList: false,
  };
  faHeart = faHeart;
  @Output() toggleWishList = new EventEmitter<boolean>();

  // public methods
  constructor() {}
}
