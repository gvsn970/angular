import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTempIndentsComponent } from './list-temp-indents.component';

describe('ListTempIndentsComponent', () => {
  let component: ListTempIndentsComponent;
  let fixture: ComponentFixture<ListTempIndentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTempIndentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTempIndentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
