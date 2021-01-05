import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnhandQuantityComponent } from './onhand-quantity.component';

describe('OnhandQuantityComponent', () => {
  let component: OnhandQuantityComponent;
  let fixture: ComponentFixture<OnhandQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnhandQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnhandQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
