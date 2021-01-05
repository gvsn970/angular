import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighingBridgeScreenCcViewUpdateComponent } from './weighing-bridge-screen-cc-view-update.component';

describe('WeighingBridgeScreenCcViewUpdateComponent', () => {
  let component: WeighingBridgeScreenCcViewUpdateComponent;
  let fixture: ComponentFixture<WeighingBridgeScreenCcViewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighingBridgeScreenCcViewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighingBridgeScreenCcViewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
