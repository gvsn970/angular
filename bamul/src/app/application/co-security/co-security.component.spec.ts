import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoSecurityComponent } from './co-security.component';

describe('CoSecurityComponent', () => {
  let component: CoSecurityComponent;
  let fixture: ComponentFixture<CoSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
