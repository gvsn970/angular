import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmcMilkCollectionComponent } from './bmc-milk-collection.component';

describe('BmcMilkCollectionComponent', () => {
  let component: BmcMilkCollectionComponent;
  let fixture: ComponentFixture<BmcMilkCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmcMilkCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmcMilkCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
