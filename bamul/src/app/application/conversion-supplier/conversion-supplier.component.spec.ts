import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionSupplierComponent } from './conversion-supplier.component';

describe('ConversionSupplierComponent', () => {
  let component: ConversionSupplierComponent;
  let fixture: ComponentFixture<ConversionSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversionSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
