import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMasterIndentManagerComponent } from './create-master-indent-manager.component';

describe('CreateMasterIndentManagerComponent', () => {
  let component: CreateMasterIndentManagerComponent;
  let fixture: ComponentFixture<CreateMasterIndentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMasterIndentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMasterIndentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
