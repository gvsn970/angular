import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMilkTransferDispatchComponent } from './list-milk-transfer-dispatch.component';

describe('ListMilkTransferDispatchComponent', () => {
  let component: ListMilkTransferDispatchComponent;
  let fixture: ComponentFixture<ListMilkTransferDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMilkTransferDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMilkTransferDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
