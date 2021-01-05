import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyRegisterComponent } from './key-register.component';

describe('KeyRegisterComponent', () => {
  let component: KeyRegisterComponent;
  let fixture: ComponentFixture<KeyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
