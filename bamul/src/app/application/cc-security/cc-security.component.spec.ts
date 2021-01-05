import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSecurityComponent } from './cc-security.component';

describe('CcSecurityComponent', () => {
  let component: CcSecurityComponent;
  let fixture: ComponentFixture<CcSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
