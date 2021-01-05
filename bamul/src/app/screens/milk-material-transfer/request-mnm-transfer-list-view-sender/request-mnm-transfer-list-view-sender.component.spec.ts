import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMnmTransferListViewSenderComponent } from './request-mnm-transfer-list-view-sender.component';

describe('RequestMnmTransferListViewSenderComponent', () => {
  let component: RequestMnmTransferListViewSenderComponent;
  let fixture: ComponentFixture<RequestMnmTransferListViewSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMnmTransferListViewSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMnmTransferListViewSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
