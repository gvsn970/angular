import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreateIndentService } from '../shared/components/services/create-indent.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef ,  BsModalService} from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  paymentDetailList: any = [];
  customer: any;
  customerBillingDetails: any;
  paymentDetails: any;
  modalRef: BsModalRef;
  paymentStatus: any;
  constructor(
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private CreateIndentService: CreateIndentService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getCustomerPaymentDetails();
    this.getCustomerBillingInformation();
  }
  getCustomerBillingInformation(){
    this.customer = JSON.parse(localStorage.getItem('data'));
    this.CreateIndentService.getCustBillingDetailsByAcctNo(this.customer.accountNumber).subscribe(res => {
      if(res){
        this.spinnerService.hide();
        this.customerBillingDetails=res;
        // console.log('this.customerBillingDetails',this.customerBillingDetails)
        // window.location.href = this.bankResponse.originalRequest;
      }
    }, error => {
      this.spinnerService.hide();
    });
  }
  getCustomerPaymentDetails(){
    this.customer= JSON.parse(localStorage.getItem('data'));
    // this.customer.accountNumber=152;
    this.CreateIndentService.getPaymenDetailsByCustCode(this.customer.accountNumber).subscribe(res => {
      if(res){
        this.spinnerService.hide();
        this.paymentDetailList=res;
        // window.location.href = this.bankResponse.originalRequest;
      }
    }, error => {
      this.spinnerService.hide();
      ////console.log(error);
      // this.toastr.error('Something went wrong', 'single row', {
      //   timeOut: 3000
      // });
    });
  }
  getStatus(referenceKey: string,template: TemplateRef<any>){
    // console.log('referenceKey',referenceKey)
    this.spinnerService.show();
    this.CreateIndentService.getUpdatedTransation(referenceKey).subscribe(res => {
      if(res){
        this.getCustomerPaymentDetails();
        this.spinnerService.hide();
        this.paymentStatus=res;
        this.paymentCheckStatusPopup(template);
        // this.customerBillingDetails=res;
        // console.log('this.customerBillingDetails',this.customerBillingDetails)
        // window.location.href = this.bankResponse.originalRequest;
      }
    }, error => {
      this.spinnerService.hide();
    });
  }
  onPrint(index){
    this.paymentDetails = this.paymentDetailList[index];
    if(this.paymentDetails)
    setTimeout(() => {
      window.print();
    }, 1000);
  }
  paymentCheckStatusPopup(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef.hide();
  }
}
