import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBmcMilkCollectionComponent } from './list-bmc-milk-collection.component';

describe('ListBmcMilkCollectionComponent', () => {
  let component: ListBmcMilkCollectionComponent;
  let fixture: ComponentFixture<ListBmcMilkCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBmcMilkCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBmcMilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
