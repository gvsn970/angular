import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductDispatchComponent } from './list-product-dispatch.component';

describe('ListProductDispatchComponent', () => {
  let component: ListProductDispatchComponent;
  let fixture: ComponentFixture<ListProductDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
