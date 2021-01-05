import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKeyLogComponent } from './add-key-log.component';

describe('AddKeyLogComponent', () => {
  let component: AddKeyLogComponent;
  let fixture: ComponentFixture<AddKeyLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKeyLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKeyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
