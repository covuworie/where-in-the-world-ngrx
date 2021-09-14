import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesVisitedComponent } from './countries-visited.component';

describe('CountriesVisitedComponent', () => {
  let component: CountriesVisitedComponent;
  let fixture: ComponentFixture<CountriesVisitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountriesVisitedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
