import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdSuperUserComponent } from './rmrd-super-user.component';

describe('RmrdSuperUserComponent', () => {
  let component: RmrdSuperUserComponent;
  let fixture: ComponentFixture<RmrdSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
