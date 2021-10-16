import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import CountryDetailViewModel from './country-detail-view.model';
import * as CountrySelectors from '../../store/selectors/country.selectors';
import { ActivatedRoute } from '@angular/router';

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
    const path = this.route.snapshot.paramMap.get('name')!;
    const commonName = path.replace(/-/g, ' ');

    this.vm$ = this.store.select(
      CountrySelectors.selectCountryDetailViewModel(commonName)
    );
  }
}
