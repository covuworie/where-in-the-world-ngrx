import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import CountrySummaryViewModel from './country-summary-view.model';
import * as WishListActions from '../../store/actions/wish-list.actions';

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

  // public methods
  constructor(private store: Store) {}

  onToggleWishList(name: string) {
    if (!this.country.isOnWishList) {
      this.store.dispatch(WishListActions.add({ name }));
    }
    // else remove
  }
}
