import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadOperatorComponent } from './data-upload-operator.component';

describe('DataUploadOperatorComponent', () => {
  let component: DataUploadOperatorComponent;
  let fixture: ComponentFixture<DataUploadOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUploadOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUploadOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
