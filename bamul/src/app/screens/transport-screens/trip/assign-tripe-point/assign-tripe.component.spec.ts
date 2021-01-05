import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTripePointComponent } from './assign-tripe-point.component';

describe('AssignTripePointComponent', () => {
  let component: AssignTripePointComponent;
  let fixture: ComponentFixture<AssignTripePointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTripePointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTripePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
