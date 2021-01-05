import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkTransferDispatchComponent } from './milk-transfer-dispatch.component';

describe('MilkTransferDispatchComponent', () => {
  let component: MilkTransferDispatchComponent;
  let fixture: ComponentFixture<MilkTransferDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkTransferDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkTransferDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
