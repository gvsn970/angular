import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterIndentManagerComponent } from './edit-master-indent-manager.component';

describe('EditMasterIndentManagerComponent', () => {
  let component: EditMasterIndentManagerComponent;
  let fixture: ComponentFixture<EditMasterIndentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterIndentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterIndentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
