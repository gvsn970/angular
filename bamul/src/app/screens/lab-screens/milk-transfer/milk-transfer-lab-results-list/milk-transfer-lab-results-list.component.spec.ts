import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkTransferLabResultsListComponent } from './milk-transfer-lab-results-list.component';

describe('MilkTransferLabResultsListComponent', () => {
  let component: MilkTransferLabResultsListComponent;
  let fixture: ComponentFixture<MilkTransferLabResultsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkTransferLabResultsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkTransferLabResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
