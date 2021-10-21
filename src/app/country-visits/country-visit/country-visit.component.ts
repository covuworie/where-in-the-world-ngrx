import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { YearsService } from 'src/app/countries/shared/years.service';

@Component({
  selector: 'app-country-visit',
  templateUrl: './country-visit.component.html',
  styleUrls: ['./country-visit.component.scss'],
})
export class CountryVisitComponent {
  // public properties
  countriesAutoComplete: string[] = [];
  @Output() delete = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<void>();
  @Input() validCountryNames: string[] = [];
  @Input() visit = new FormGroup({});

  // public methods
  constructor() {}

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

  onCountrySearch(partialName: string) {
    this.countriesAutoComplete = this.validCountryNames.filter((name) =>
      name.toLowerCase().includes(partialName.toLowerCase())
    );
  }

  onCountrySelect(name: string) {
    this.visit.setValue({ ...this.visit.value, country: name });
    this.formChange.emit();
    this.countriesAutoComplete = [];
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
}
