import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDispatchComponent } from './update-dispatch.component';

describe('UpdateDispatchComponent', () => {
  let component: UpdateDispatchComponent;
  let fixture: ComponentFixture<UpdateDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
