import { Component, OnInit } from '@angular/core';
import * as CountryDetailActions from '../state/country-detail.actions';
import { ActivatedRoute } from '@angular/router';
import { CountryDetailFacadeService } from 'src/app/store/facades/country-detail.facade.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  // public methods
  constructor(
    private route: ActivatedRoute,
    public countryDetailFacade: CountryDetailFacadeService,
  ) { }

  ngOnInit() {
    // unsubscribes automatically when the component is destroyed
    // (no need to unsubscribe explicitly)
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const path = params.get('name')!;
          const commonName = path.replace(/-/g, ' ');

          this.countryDetailFacade.select(commonName);
          return this.countryDetailFacade.country$.pipe(
            filter((country) => country === undefined)
          );
        })
      )
      .subscribe(() =>
        this.countryDetailFacade.dispatch(
          CountryDetailActions.countryNotFoundInStore()
        )
      );
  }
}
