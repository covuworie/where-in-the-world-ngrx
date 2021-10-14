import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import CountryVisitViewModel from './country-visit/country-visit-view.model';
import * as CountrySelectors from '../countries/state/country.selectors';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-countries-visited',
  templateUrl: './country-visits.component.html',
  styleUrls: ['./country-visits.component.scss'],
})
export class CountryVisitsComponent implements OnInit {
  // public properties
  vm$: Observable<CountryVisitViewModel[]> = of([
    { year: 2000, country: 'France', duration: 15 },
    { year: 2010, country: 'Germany', duration: 10 },
  ]);
  faPlus = faPlus;
  validCountryNames: string[] = [];

  // public methods
  constructor(private store: Store) {}

  ngOnInit() {
    // make sure countries list is loaded
    this.store
      .select(CountrySelectors.selectCommonNames)
      .pipe(
        tap((validCountryNames) => (this.validCountryNames = validCountryNames))
      );
  }

  onAddVisit() {}
}
