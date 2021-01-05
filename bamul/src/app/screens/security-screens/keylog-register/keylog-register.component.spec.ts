import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeylogRegisterComponent } from './keylog-register.component';

describe('KeylogRegisterComponent', () => {
  let component: KeylogRegisterComponent;
  let fixture: ComponentFixture<KeylogRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeylogRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeylogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
