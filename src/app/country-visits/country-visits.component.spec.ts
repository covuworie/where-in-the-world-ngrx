import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryVisitsComponent } from './country-visits.component';

describe('CountriesVisitedComponent', () => {
  let component: CountryVisitsComponent;
  let fixture: ComponentFixture<CountryVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryVisitsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
