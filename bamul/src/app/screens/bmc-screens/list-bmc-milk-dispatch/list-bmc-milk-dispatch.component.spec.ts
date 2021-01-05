import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBmcMilkDispatchComponent } from './list-bmc-milk-dispatch.component';

describe('ListBmcMilkDispatchComponent', () => {
  let component: ListBmcMilkDispatchComponent;
  let fixture: ComponentFixture<ListBmcMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBmcMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBmcMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
