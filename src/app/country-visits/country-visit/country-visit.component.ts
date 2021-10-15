import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenCountryValidator } from 'src/app/countries/shared/forbidden-country.directive';
import { forbiddenMaxDurationValidator } from 'src/app/countries/shared/max-duration.directive';
import { YearsService } from 'src/app/countries/shared/years.service';
import CountryVisit from '../shared/country-visit.model';

@Component({
  selector: 'app-country-visit',
  templateUrl: './country-visit.component.html',
  styleUrls: ['./country-visit.component.scss'],
})
export class CountryVisitComponent implements OnInit {
  // public properties
  @Input() countryVisit: CountryVisit = {
    id: '',
    year: null,
    country: null,
    duration: null,
  };
  @Output() delete = new EventEmitter<string>();
  @Output() formChange = new EventEmitter<CountryVisit>();
  @Input() validCountryNames: string[] = [];
  visit = this.fb.group(this.countryVisit);

  // private properties
  countriesAutoComplete: string[] = [];

  // public methods
  constructor(private fb: FormBuilder) {}

  get currentYear() {
    return YearsService.currentYear;
  }

  getMaxDuration(year: number) {
    return YearsService.maxDays(year);
  }

  get minYear() {
    return YearsService.minYear;
  }

  isTouchedAndInvalid(controlName: string) {
    return (
      this.visit.get(controlName)!.touched &&
      !this.visit.get(controlName)!.valid
    );
  }

  ngOnInit() {
    this.setFormControls(this.countryVisit);
    // this hack to retrigger validation is not good
    this.visit.markAllAsTouched();
  }

  onCountrySearch(partialName: string) {
    this.countriesAutoComplete = this.validCountryNames.filter((name) =>
      name.toLowerCase().includes(partialName.toLowerCase())
    );
  }

  onCountrySelect(name: string) {
    this.visit.patchValue({ country: name });
    this.countriesAutoComplete = [];
    this.formChange.emit(this.visit.value);
  }

  toggleYearDurationValidity() {
    if (this.visit.errors === null) {
      if (this.visit.get('year')!.hasError('forbiddenMaxDuration')) {
        this.visit.get('year')!.setErrors(null);
      }

      if (this.visit.get('duration')!.hasError('forbiddenMaxDuration')) {
        this.visit.get('duration')!.setErrors(null);
      }

      return;
    }

    const errors = this.visit.errors as {};
    if (!errors.hasOwnProperty('forbiddenMaxDuration')) {
      return;
    }

    this.visit.get('year')!.setErrors(errors);
    this.visit.get('duration')!.setErrors(errors);
  }

  // private methods
  private setFormControls(visit: CountryVisit) {
    this.visit = this.fb.group(
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
  }
}
