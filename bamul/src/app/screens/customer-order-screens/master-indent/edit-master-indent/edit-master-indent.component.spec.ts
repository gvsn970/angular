import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterIndentComponent } from './edit-master-indent.component';

describe('EditMasterIndentComponent', () => {
  let component: EditMasterIndentComponent;
  let fixture: ComponentFixture<EditMasterIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
