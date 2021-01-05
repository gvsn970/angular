import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdDashboardComponent } from './rmrd-dashboard.component';

describe('RmrdDashboardComponent', () => {
  let component: RmrdDashboardComponent;
  let fixture: ComponentFixture<RmrdDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
