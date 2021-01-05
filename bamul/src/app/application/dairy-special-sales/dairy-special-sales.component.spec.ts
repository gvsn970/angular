import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairySpecialSalesComponent } from './dairy-special-sales.component';

describe('DairySpecialSalesComponent', () => {
  let component: DairySpecialSalesComponent;
  let fixture: ComponentFixture<DairySpecialSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairySpecialSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairySpecialSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
