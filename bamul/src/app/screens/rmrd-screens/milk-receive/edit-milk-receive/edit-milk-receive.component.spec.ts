import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMilkReceiveComponent } from './edit-milk-receive.component';

describe('EditMilkReceiveComponent', () => {
  let component: EditMilkReceiveComponent;
  let fixture: ComponentFixture<EditMilkReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMilkReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMilkReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
