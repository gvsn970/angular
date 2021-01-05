import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMasterIndentComponent } from './list-master-indent.component';

describe('ListMasterIndentComponent', () => {
  let component: ListMasterIndentComponent;
  let fixture: ComponentFixture<ListMasterIndentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMasterIndentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMasterIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
