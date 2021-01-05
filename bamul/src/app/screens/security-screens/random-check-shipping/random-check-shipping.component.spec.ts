import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCheckShippingComponent } from './random-check-shipping.component';

describe('RandomCheckShippingComponent', () => {
  let component: RandomCheckShippingComponent;
  let fixture: ComponentFixture<RandomCheckShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomCheckShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomCheckShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
