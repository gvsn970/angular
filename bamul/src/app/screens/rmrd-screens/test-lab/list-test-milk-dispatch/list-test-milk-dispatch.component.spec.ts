import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestMilkDispatchComponent } from './list-test-milk-dispatch.component';

describe('ListTestMilkDispatchComponent', () => {
  let component: ListTestMilkDispatchComponent;
  let fixture: ComponentFixture<ListTestMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTestMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
