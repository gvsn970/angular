import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMasterIndentManagerComponent } from './list-master-indent-manager.component';

describe('ListMasterIndentManagerComponent', () => {
  let component: ListMasterIndentManagerComponent;
  let fixture: ComponentFixture<ListMasterIndentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMasterIndentManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMasterIndentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
