import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WbSuperUserComponent } from './wb-super-user.component';

describe('WbSuperUserComponent', () => {
  let component: WbSuperUserComponent;
  let fixture: ComponentFixture<WbSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
