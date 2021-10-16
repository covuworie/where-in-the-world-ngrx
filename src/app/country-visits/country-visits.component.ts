import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as CountryVisitActions from './state/country-visit.actions';
import * as CountryVisitSelectors from './state/country-visit.selectors';
import * as CountrySelectors from '../store/selectors/country.selectors';
import { filter, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import CountryVisit from './shared/country-visit.model';
import { FormBuilder } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-countries-visited',
  templateUrl: './country-visits.component.html',
  styleUrls: ['./country-visits.component.scss'],
})
export class CountryVisitsComponent implements OnInit {
  // public properties
  faPlus = faPlus;
  validCountryNames: string[] = [];
  visits = this.fb.array([]);
  vm$: Observable<CountryVisit[]> = of([]);

  // public methods
  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    // load country visits if not in store
    this.store
      .select(CountryVisitSelectors.selectTotal)
      .pipe(
        filter((total) => total === 0),
        tap(() => this.store.dispatch(CountryVisitActions.load()))
      )
      .subscribe();

    // set country names for validation
    this.store
      .select(CountrySelectors.selectCommonNames)
      .pipe(
        tap((validCountryNames) => (this.validCountryNames = validCountryNames))
      )
      .subscribe();

    // load view models
    this.vm$ = this.store.select(CountryVisitSelectors.selectAllCountryVisits);
  }

  onAddVisit() {
    this.store.dispatch(
      CountryVisitActions.add({
        countryVisit: {
          id: uuidv4(),
          year: null,
          country: null,
          duration: null,
        },
      })
    );
  }

  onDelete(id: string) {
    this.store.dispatch(CountryVisitActions.remove({ id }));
  }

  onFormChange(countryVisit: CountryVisit) {
    this.store.dispatch(CountryVisitActions.update({ countryVisit }));
  }
}
