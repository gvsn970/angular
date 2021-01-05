import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAndISuperUserComponent } from './p-and-i-super-user.component';

describe('PAndISuperUserComponent', () => {
  let component: PAndISuperUserComponent;
  let fixture: ComponentFixture<PAndISuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAndISuperUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAndISuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
