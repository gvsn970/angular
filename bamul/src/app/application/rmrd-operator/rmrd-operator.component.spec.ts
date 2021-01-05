import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdOperatorComponent } from './rmrd-operator.component';

describe('RmrdOperatorComponent', () => {
  let component: RmrdOperatorComponent;
  let fixture: ComponentFixture<RmrdOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
