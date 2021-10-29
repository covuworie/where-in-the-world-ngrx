import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import CountrySummaryViewModel from './country-summary-view.model';
import * as WishListActions from '../../store/actions/wish-list.actions';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CountrySummaryFacadeService } from 'src/app/store/facades/country-summary-facade.service';

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
    onWishList: false,
  };
  faHeart = faHeart;
  @ViewChild(FaIconComponent, { static: true })
  heartComponent!: FaIconComponent;

  // private fields
  private readonly wishListHeartOff = {
    position: 'absolute',
    bottom: '12rem',
    right: '12rem',
    stroke: '#ff0000',
    color: '#faa0a0',
  };
  private wishListHeartOn = { ...this.wishListHeartOff, color: '#ff0000' };

  // public methods
  constructor(private countrySummaryFacade: CountrySummaryFacadeService) {}

  ngOnInit() {
    this.country.onWishList
      ? (this.heartComponent.styles = this.wishListHeartOn)
      : (this.heartComponent.styles = this.wishListHeartOff);
  }

  onToggleWishList(name: string) {
    if (this.country.onWishList) {
      this.countrySummaryFacade.dispatch(WishListActions.remove({ name }));
      this.heartComponent.styles = this.wishListHeartOff;
      this.country.onWishList = false;
    } else {
      this.countrySummaryFacade.dispatch(WishListActions.add({ name }));
      this.heartComponent.styles = this.wishListHeartOn;
      this.country.onWishList = true;
    }

    this.heartComponent.render();
  }
}
