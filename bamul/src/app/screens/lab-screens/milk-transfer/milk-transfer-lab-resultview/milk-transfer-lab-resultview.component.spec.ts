import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkTransferLabResultviewComponent } from './milk-transfer-lab-resultview.component';

describe('MilkTransferLabResultviewComponent', () => {
  let component: MilkTransferLabResultviewComponent;
  let fixture: ComponentFixture<MilkTransferLabResultviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkTransferLabResultviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkTransferLabResultviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
