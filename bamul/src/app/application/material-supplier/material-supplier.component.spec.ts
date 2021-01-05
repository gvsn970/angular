import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSupplierComponent } from './material-supplier.component';

describe('MaterialSupplierComponent', () => {
  let component: MaterialSupplierComponent;
  let fixture: ComponentFixture<MaterialSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
