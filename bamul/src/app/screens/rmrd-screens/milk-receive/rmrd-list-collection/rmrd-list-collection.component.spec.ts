import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmrdListCollectionComponent } from './rmrd-list-collection.component';

describe('RmrdListCollectionComponent', () => {
  let component: RmrdListCollectionComponent;
  let fixture: ComponentFixture<RmrdListCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmrdListCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmrdListCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
