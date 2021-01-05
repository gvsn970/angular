import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentOperatorComponent } from './indent-operator.component';

describe('IndentOperatorComponent', () => {
  let component: IndentOperatorComponent;
  let fixture: ComponentFixture<IndentOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
