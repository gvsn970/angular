import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbMilkTransferComponent } from './wb-milk-transfer.component';

describe('WbMilkTransferComponent', () => {
  let component: WbMilkTransferComponent;
  let fixture: ComponentFixture<WbMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
