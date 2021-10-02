import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import CountrySummaryViewModel from './country-summary-view.model';
import * as WishListActions from '../../store/actions/wish-list.actions';
import * as WishListSelectors from '../../store/selectors/wish-list.selectors';
import { Observable } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-country-summary',
  templateUrl: './country-summary.component.html',
  styleUrls: ['./country-summary.component.scss'],
})
export class CountrySummaryComponent implements OnInit {
  // public properties
  @Input() country: CountrySummaryViewModel = {
    name: '',
    flagUrl: '',
    population: 0,
    region: '',
    capital: '',
  };
  faHeart = faHeart;
  @ViewChild(FaIconComponent, { static: true })
  heartComponent!: FaIconComponent;

  // private fields
  private isOnWishList: boolean = false;
  private wishList$: Observable<string[]> = this.store.select(
    WishListSelectors.selectWishList
  );
  private readonly wishListHeartOff = {
    position: 'absolute',
    bottom: '12rem',
    right: '12rem',
    stroke: '#ff0000',
    color: '#faa0a0',
  };
  private wishListHeartOn = { ...this.wishListHeartOff, color: '#ff0000' };

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    this.wishList$.subscribe((wishList) => {
      this.isOnWishList = wishList.includes(this.country.name);
    });

    this.isOnWishList
      ? (this.heartComponent.styles = this.wishListHeartOn)
      : (this.heartComponent.styles = this.wishListHeartOff);
  }

  onToggleWishList(name: string) {
    if (this.isOnWishList) {
      this.store.dispatch(WishListActions.remove({ name }));
      this.heartComponent.styles = this.wishListHeartOff;
      this.isOnWishList = false;
    } else {
      this.store.dispatch(WishListActions.add({ name }));
      this.heartComponent.styles = this.wishListHeartOn;
      this.isOnWishList = true;
    }

    this.heartComponent.render();
  }
}
