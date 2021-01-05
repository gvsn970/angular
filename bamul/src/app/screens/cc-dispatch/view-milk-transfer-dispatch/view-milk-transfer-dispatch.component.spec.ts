import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilkTransferDispatchComponent } from './view-milk-transfer-dispatch.component';

describe('ViewMilkTransferDispatchComponent', () => {
  let component: ViewMilkTransferDispatchComponent;
  let fixture: ComponentFixture<ViewMilkTransferDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMilkTransferDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilkTransferDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
