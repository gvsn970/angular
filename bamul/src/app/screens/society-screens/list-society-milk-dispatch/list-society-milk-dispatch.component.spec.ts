import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSocietyMilkDispatchComponent } from './list-society-milk-dispatch.component';

describe('ListSocietyMilkDispatchComponent', () => {
  let component: ListSocietyMilkDispatchComponent;
  let fixture: ComponentFixture<ListSocietyMilkDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSocietyMilkDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSocietyMilkDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
