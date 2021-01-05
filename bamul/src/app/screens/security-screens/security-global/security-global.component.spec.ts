import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGlobalComponent } from './security-global.component';

describe('SecurityGlobalComponent', () => {
  let component: SecurityGlobalComponent;
  let fixture: ComponentFixture<SecurityGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
