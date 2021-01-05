import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterIndentComponent } from './create-master-indent.component';

describe('CreateMasterIndentComponent', () => {
  let component: CreateMasterIndentComponent;
  let fixture: ComponentFixture<CreateMasterIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMasterIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMasterIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
