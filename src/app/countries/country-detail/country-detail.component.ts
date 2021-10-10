import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import CountryDetailViewModel from './country-detail-view.model';
import * as CountryDetailActions from '../state/country-detail.actions';
import * as CountrySelectors from '../state/country.selectors';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  // public properties
  vm$: Observable<CountryDetailViewModel | undefined> = of(undefined);

  // public methods
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    // load countries if not in store (i.e. direct navigation to the route)
    this.store
      .select(CountrySelectors.selectTotal)
      .pipe(
        filter((total) => total === 0),
        tap(() => this.store.dispatch(CountryDetailActions.load()))
      )
      .subscribe();

    const path = this.route.snapshot.paramMap.get('name')!;
    const commonName = path.replace(/-/g, ' ');

    this.store
      .select(CountrySelectors.selectCommonNameExists(commonName))
      .pipe(
        tap((nameExists) => {
          if (!nameExists) {
            this.store.dispatch(CountryDetailActions.countryNotFoundInStore());
          } else {
            this.vm$ = this.store.select(
              CountrySelectors.selectCountryDetailViewModel(commonName)
            );
          }
        })
      )
      .subscribe();
  }
}
