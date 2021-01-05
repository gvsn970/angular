import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMilkTransferComponent } from './list-milk-transfer.component';

describe('ListMilkTransferComponent', () => {
  let component: ListMilkTransferComponent;
  let fixture: ComponentFixture<ListMilkTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMilkTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMilkTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
