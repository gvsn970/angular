import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMnmTransferListViewReceiverComponent } from './request-mnm-transfer-list-view-receiver.component';

describe('RequestMnmTransferListViewReceiverComponent', () => {
  let component: RequestMnmTransferListViewReceiverComponent;
  let fixture: ComponentFixture<RequestMnmTransferListViewReceiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMnmTransferListViewReceiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMnmTransferListViewReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
