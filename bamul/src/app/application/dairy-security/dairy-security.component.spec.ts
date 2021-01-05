import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DairySecurityComponent } from './dairy-security.component';

describe('DairySecurityComponent', () => {
  let component: DairySecurityComponent;
  let fixture: ComponentFixture<DairySecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DairySecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DairySecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
