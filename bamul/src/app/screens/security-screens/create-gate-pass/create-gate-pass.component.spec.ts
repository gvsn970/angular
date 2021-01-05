import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatePassComponent } from './create-gate-pass.component';

describe('CreateGatePassComponent', () => {
  let component: CreateGatePassComponent;
  let fixture: ComponentFixture<CreateGatePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGatePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGatePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
