import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentSuperUserComponent } from './indent-super-user.component';

describe('IndentSuperUserComponent', () => {
  let component: IndentSuperUserComponent;
  let fixture: ComponentFixture<IndentSuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndentSuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentSuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
