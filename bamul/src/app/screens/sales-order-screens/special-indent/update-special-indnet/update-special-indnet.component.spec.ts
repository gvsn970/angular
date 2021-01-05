import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialIndnetComponent } from './update-special-indnet.component';

describe('UpdateSpecialIndnetComponent', () => {
  let component: UpdateSpecialIndnetComponent;
  let fixture: ComponentFixture<UpdateSpecialIndnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSpecialIndnetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecialIndnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
