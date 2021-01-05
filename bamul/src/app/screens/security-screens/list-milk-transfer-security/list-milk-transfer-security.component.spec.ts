import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMilkTransferSecurityComponent } from './list-milk-transfer-security.component';

describe('ListMilkTransferSecurityComponent', () => {
  let component: ListMilkTransferSecurityComponent;
  let fixture: ComponentFixture<ListMilkTransferSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMilkTransferSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMilkTransferSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
