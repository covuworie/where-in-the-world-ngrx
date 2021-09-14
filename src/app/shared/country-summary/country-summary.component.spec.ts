import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySummaryComponent } from './country-summary.component';

describe('CountrySummaryComponent', () => {
  let component: CountrySummaryComponent;
  let fixture: ComponentFixture<CountrySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountrySummaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
