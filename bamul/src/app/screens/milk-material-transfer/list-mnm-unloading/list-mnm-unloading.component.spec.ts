import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMnmUnloadingComponent } from './list-mnm-unloading.component';

describe('ListMnmUnloadingComponent', () => {
  let component: ListMnmUnloadingComponent;
  let fixture: ComponentFixture<ListMnmUnloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMnmUnloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMnmUnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
