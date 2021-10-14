import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenCountryValidator } from 'src/app/countries/shared/forbidden-country.directive';
import { forbiddenMaxDurationValidator } from 'src/app/countries/shared/max-duration.directive';
import { YearsService } from 'src/app/countries/shared/years.service';
import CountryVisitViewModel from './country-visit-view.model';

@Component({
  selector: 'app-country-visit',
  templateUrl: './country-visit.component.html',
  styleUrls: ['./country-visit.component.scss'],
})
export class CountryVisitComponent implements OnInit {
  // public properties
  @Input() countryVisit: CountryVisitViewModel = {
    year: 0,
    country: '',
    duration: 0,
  };
  @Input() validCountryNames: string[] = [];
  visit = this.fb.group(this.countryVisit);

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

  ngOnInit() {
    this.setFormControls(this.countryVisit);
  }

  // private methods
  private setFormControls(visit: CountryVisitViewModel) {
    this.visit = this.fb.group(
      {
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
