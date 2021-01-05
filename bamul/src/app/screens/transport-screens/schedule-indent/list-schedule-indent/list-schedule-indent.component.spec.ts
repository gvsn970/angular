import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleIndentComponent } from './list-schedule-indent.component';

describe('ListScheduleIndentComponent', () => {
  let component: ListScheduleIndentComponent;
  let fixture: ComponentFixture<ListScheduleIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListScheduleIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScheduleIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
