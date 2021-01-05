import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkCansConfirmationComponent } from './milk-cans-confirmation.component';

describe('MilkCansConfirmationComponent', () => {
  let component: MilkCansConfirmationComponent;
  let fixture: ComponentFixture<MilkCansConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkCansConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkCansConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
