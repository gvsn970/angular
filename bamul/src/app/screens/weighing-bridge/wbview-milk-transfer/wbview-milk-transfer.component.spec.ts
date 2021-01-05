import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbviewMilkTransferComponent } from './wbview-milk-transfer.component';

describe('WbviewMilkTransferComponent', () => {
  let component: WbviewMilkTransferComponent;
  let fixture: ComponentFixture<WbviewMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbviewMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbviewMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
