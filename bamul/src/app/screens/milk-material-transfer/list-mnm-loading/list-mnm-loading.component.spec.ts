import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMnmLoadingComponent } from './list-mnm-loading.component';

describe('ListMnmLoadingComponent', () => {
  let component: ListMnmLoadingComponent;
  let fixture: ComponentFixture<ListMnmLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMnmLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMnmLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
