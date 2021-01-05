import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilkTransferComponent } from './view-milk-transfer.component';

describe('ViewMilkTransferComponent', () => {
  let component: ViewMilkTransferComponent;
  let fixture: ComponentFixture<ViewMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
