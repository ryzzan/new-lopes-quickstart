import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericAnalyticReportComponent } from './generic-analytic-report.component';

describe('GenericAnalyticReportComponent', () => {
  let component: GenericAnalyticReportComponent;
  let fixture: ComponentFixture<GenericAnalyticReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericAnalyticReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericAnalyticReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
