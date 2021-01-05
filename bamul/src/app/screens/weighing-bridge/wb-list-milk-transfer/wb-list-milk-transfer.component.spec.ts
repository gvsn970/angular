import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbListMilkTransferComponent } from './wb-list-milk-transfer.component';

describe('WbListMilkTransferComponent', () => {
  let component: WbListMilkTransferComponent;
  let fixture: ComponentFixture<WbListMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbListMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbListMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
