import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighingBridgeScreenComponent } from './weighing-bridge-screen.component';

describe('WeighingBridgeScreenComponent', () => {
  let component: WeighingBridgeScreenComponent;
  let fixture: ComponentFixture<WeighingBridgeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighingBridgeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighingBridgeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
