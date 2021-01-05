import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDashboardComponent } from './system-dashboard.component';

describe('SystemDashboardComponent', () => {
  let component: SystemDashboardComponent;
  let fixture: ComponentFixture<SystemDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
