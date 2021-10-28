import { Component } from '@angular/core';
import { CountrySummaryFacadeService } from '../store/facades/country-summary-facade.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  // public methods
  constructor(public countrySummaryFacade: CountrySummaryFacadeService) {}
}
