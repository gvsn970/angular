import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPackingSupplierComponent } from './co-packing-supplier.component';

describe('CoPackingSupplierComponent', () => {
  let component: CoPackingSupplierComponent;
  let fixture: ComponentFixture<CoPackingSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoPackingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPackingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
