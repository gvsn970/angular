import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdLabOperatorComponent } from './rmrd-lab-operator.component';

describe('RmrdLabOperatorComponent', () => {
  let component: RmrdLabOperatorComponent;
  let fixture: ComponentFixture<RmrdLabOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdLabOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdLabOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
