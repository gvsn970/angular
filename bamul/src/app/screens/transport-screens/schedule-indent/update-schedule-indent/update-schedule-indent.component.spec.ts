import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScheduleIndentComponent } from './update-schedule-indent.component';

describe('UpdateScheduleIndentComponent', () => {
  let component: UpdateScheduleIndentComponent;
  let fixture: ComponentFixture<UpdateScheduleIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateScheduleIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateScheduleIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
