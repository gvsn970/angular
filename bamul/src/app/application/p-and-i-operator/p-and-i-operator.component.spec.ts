import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAndIOperatorComponent } from './p-and-i-operator.component';

describe('PAndIOperatorComponent', () => {
  let component: PAndIOperatorComponent;
  let fixture: ComponentFixture<PAndIOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAndIOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAndIOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
