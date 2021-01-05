import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySuperUserComponent } from './security-super-user.component';

describe('SecuritySuperUserComponent', () => {
  let component: SecuritySuperUserComponent;
  let fixture: ComponentFixture<SecuritySuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecuritySuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuritySuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
