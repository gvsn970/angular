import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMilkTransferComponent } from './new-milk-transfer.component';

describe('NewMilkTransferComponent', () => {
  let component: NewMilkTransferComponent;
  let fixture: ComponentFixture<NewMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
