import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcManagerComponent } from './cc-manager.component';

describe('CcManagerComponent', () => {
  let component: CcManagerComponent;
  let fixture: ComponentFixture<CcManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
