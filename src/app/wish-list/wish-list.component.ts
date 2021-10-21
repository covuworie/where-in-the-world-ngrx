import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import CountrySummaryViewModel from '../shared/country-summary/country-summary-view.model';
import * as CountrySummarySelectors from '../store/selectors/country-summary.selectors';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  // public properties
  vm$: Observable<CountrySummaryViewModel[]> = of([]);

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    this.vm$ = this.store.select(
      CountrySummarySelectors.selectCountrySummaryViewModelsByNames
    );
  }
}
