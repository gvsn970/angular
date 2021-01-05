import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCansSummaryComponent } from './milk-cans-summary.component';

describe('MilkCansSummaryComponent', () => {
  let component: MilkCansSummaryComponent;
  let fixture: ComponentFixture<MilkCansSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkCansSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCansSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
