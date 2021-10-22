import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as CountryVisitActions from './state/country-visit.actions';
import * as CountryVisitSelectors from './state/country-visit.selectors';
import * as CountrySelectors from '../store/selectors/country.selectors';
import { filter, map, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import CountryVisit from './shared/country-visit.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { forbiddenCountryValidator } from '../countries/shared/forbidden-country.directive';
import { forbiddenMaxDurationValidator } from '../countries/shared/max-duration.directive';
import { YearsService } from '../countries/shared/years.service';

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
    this.store.dispatch(CountryVisitActions.load());

    // set country names for validation
    this.store
      .select(CountrySelectors.selectCommonNames)
      .pipe(
        tap((validCountryNames) => (this.validCountryNames = validCountryNames))
      )
      .subscribe();

    // load view models
    this.vm$ = this.store.select(CountryVisitSelectors.selectAllCountryVisits);

    // set in form
    this.vm$
      .pipe(
        filter(() => this.visits.length === 0),
        map((countryVisits) =>
          countryVisits.forEach((countryVisit) =>
            this.setFormControls(countryVisit)
          )
        )
      )
      .subscribe();
  }

  onAdd() {
    this.setFormControls({
      id: uuidv4(),
      year: null,
      country: null,
      duration: null,
    });
  }

  onDelete(index: number) {
    if (this.visitGroups[index].valid) {
      const id = this.visitGroups[index].value.id;
      this.store.dispatch(CountryVisitActions.remove({ id }));
    }

    this.visits.removeAt(index);
  }

  onFormChange(index: number) {
    if (this.visitGroups[index].invalid) {
      return;
    }

    const countryVisit = this.visitGroups[index].value as CountryVisit;
    const id = this.visitGroups[index].value.id as string;

    this.store
      .select(CountryVisitSelectors.selectExistsInStore(id))
      .pipe(
        take(1),
        tap((idInStore) => {
          if (idInStore) {
            this.store.dispatch(CountryVisitActions.update({ countryVisit }));
          } else {
            this.store.dispatch(CountryVisitActions.add({ countryVisit }));
          }
        })
      )
      .subscribe();
  }

  get visitGroups() {
    return this.visits.controls as FormGroup[];
  }

  // private methods
  get currentYear() {
    return YearsService.currentYear;
  }

  private setFormControls(visit: CountryVisit) {
    const group = this.fb.group(
      {
        id: visit.id,
        year: [
          visit.year,
          [
            Validators.required,
            Validators.min(this.currentYear - 125),
            Validators.max(this.currentYear),
          ],
        ],
        country: [
          visit.country,
          [
            Validators.required,
            forbiddenCountryValidator(this.validCountryNames),
          ],
        ],
        duration: [visit.duration, [Validators.required, Validators.min(1)]],
      },
      { validators: [forbiddenMaxDurationValidator] }
    );

    this.visits.push(group);
  }
}
