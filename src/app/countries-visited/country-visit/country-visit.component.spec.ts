import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryVisitComponent } from './country-visit.component';

describe('CountryVisitComponent', () => {
  let component: CountryVisitComponent;
  let fixture: ComponentFixture<CountryVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryVisitComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
