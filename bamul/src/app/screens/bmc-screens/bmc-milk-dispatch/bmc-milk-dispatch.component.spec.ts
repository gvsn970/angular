import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcMilkDispatchComponent } from './bmc-milk-dispatch.component';

describe('BmcMilkDispatchComponent', () => {
  let component: BmcMilkDispatchComponent;
  let fixture: ComponentFixture<BmcMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
