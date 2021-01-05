import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIndentComponent } from './edit-indent.component';

describe('EditIndentComponent', () => {
  let component: EditIndentComponent;
  let fixture: ComponentFixture<EditIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
