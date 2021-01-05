import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduleIndentComponent } from './create-schedule-indent.component';

describe('CreateScheduleIndentComponent', () => {
  let component: CreateScheduleIndentComponent;
  let fixture: ComponentFixture<CreateScheduleIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScheduleIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScheduleIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
