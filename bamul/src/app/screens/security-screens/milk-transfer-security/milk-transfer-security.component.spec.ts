import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkTransferSecurityComponent } from './milk-transfer-security.component';

describe('MilkTransferSecurityComponent', () => {
  let component: MilkTransferSecurityComponent;
  let fixture: ComponentFixture<MilkTransferSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkTransferSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkTransferSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
