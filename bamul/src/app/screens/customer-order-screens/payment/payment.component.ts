import { Component, OnInit, TemplateRef, ViewChild   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { CreateIndentService } from '../shared/components/services/create-indent.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef ,  BsModalService} from 'ngx-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  customerPaymentForm: FormGroup;
  customer:any;
  bankResponse: any;
  queryParam: string;
  modalRef: BsModalRef;
  submitted: boolean=false;
  paymentPostData: string;
  billDeskPaymentUrl: string = 'https://pgi.billdesk.com/pgidsk/PGIMerchantPayment';
  paymentTransactionId: string='';
  paymentDate: string='';
  paymentAmount: string='';
  paymentMessage: string='';
  isModalShown = false;
  customerBillingDetails: any;
  todayOrderCount: any;
  orderAmount: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private CreateIndentService: CreateIndentService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.customerPaymentForm = this.formBuilder.group({
      customercode: [''],
      customername: [''],
      mobilenumber: [''],
      emailid: [''],
      ordernumber: ['', Validators.required],
      amount: ['', Validators.required],
      terms: ['', Validators.required]
    });
    this.getCustomerDetails();
    this.route.queryParams.subscribe(params => {
      // this.queryParam = params['msg'];
      if (params['txnId']) {
        this.paymentTransactionId = params['txnId'];
        this.paymentDate = params['txnDate'];
        this.paymentAmount = params['txnAmount'];
        this.paymentMessage = params['statusMsg'];
        this.showModal();
      }
      // console.log('this.queryParam',this.queryParam)
    });
    this.getCustomerBillingInformation();
    this.getTodayOrdersCount();
  }
  showModal(): void {
    this.isModalShown = true;
  }
  hideModal(): void {
    this.autoShownModal.hide();
  }
  onHidden(): void {
    this.isModalShown = false;
  }
  getTodayOrdersCount(){
    this.customer = JSON.parse(localStorage.getItem('data'));
    let currentDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.CreateIndentService.getOrderAmountByAccNumberAndOrderDate(this.customer.accountNumber, currentDate).subscribe(res => {
      if(res){
        this.spinnerService.hide();
        this.todayOrderCount=res;
        for(let i=0; i<this.todayOrderCount.length; i++){
          this.orderAmount+=this.todayOrderCount[i].orderAmount;
        }
      }
    }, error => {
      this.spinnerService.hide();
    });
  }
  getCustomerDetails(){
    this.customer= JSON.parse(localStorage.getItem('data'));
    this.customerPaymentForm.patchValue({
      customercode: this.customer.accountNumber?this.customer.accountNumber:'',
      customername: this.customer.userName?this.customer.userName:'',
      mobilenumber: this.customer.contactNumber?this.customer.contactNumber:'',
      emailid: this.customer.emailAddress?this.customer.emailAddress:'',
      amount: 1
    });
    this.doDisableCutomerForm();
  }
  get f() { return this.customerPaymentForm.controls; }
  doDisableCutomerForm(){
    this.customerPaymentForm.controls['customercode'].disable();
    this.customerPaymentForm.controls['customername'].disable();
    this.customerPaymentForm.controls['mobilenumber'].disable();
    this.customerPaymentForm.controls['emailid'].disable();
  }
  getCustomerBillingInformation(){
    this.customer = JSON.parse(localStorage.getItem('data'));
    this.CreateIndentService.getCustBillingDetailsByAcctNo(this.customer.accountNumber).subscribe(res => {
      if(res){
        this.spinnerService.hide();
        this.customerBillingDetails=res;
        // window.location.href = this.bankResponse.originalRequest;
      }
    }, error => {
      this.spinnerService.hide();
    });
  }
  makePayment(template: TemplateRef<any>){
    this.submitted=true;
    if(this.customerPaymentForm.value.terms==true){
      if(this.customerPaymentForm.invalid){
        this.toastr.error('Please insert required values', 'Required!');
      } else {
        if(this.customerPaymentForm.value.amount>0){
          // this.toastr.success('ready to go');
          this.customer= JSON.parse(localStorage.getItem('data'));
          var dateNow: any = this.datePipe.transform(new Date(), "dd-MM-yyyy hh:mm:ss");
          // //console.log('dateNow',dateNow)
          let paymentForm={
              "customerCode": this.customer.accountNumber?this.customer.accountNumber:'',
              "customerName": this.customer.userName?this.customer.userName:'',
              "emailAddress": this.customer.emailAddress?this.customer.emailAddress:'',
              "mobileNumber": this.customer.contactNumber?this.customer.contactNumber:'',
              "amout": this.customerPaymentForm.value.amount,
              "orderNumber" : this.customerPaymentForm.value.ordernumber,
              "processDate": dateNow
          }
          // //console.log('paymentForm',paymentForm)
          this.spinnerService.show();
          this.CreateIndentService.getPaymentUrl(paymentForm).subscribe(res => {
            if(res){
              this.spinnerService.hide();
              this.bankResponse=res;
              this.paymentPostData = this.bankResponse.originalRequest;
              this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
              // this.openPaymentModal();
            }
          }, error => {
            this.spinnerService.hide();
            ////console.log(error);
            this.toastr.error('Something went wrong', 'single row', {
              timeOut: 3000
            });
          });
        }
        else{
          this.toastr.error('Amount should be greater then zero', 'Incorrect amount!');
        }
      }
    } else {
      this.toastr.error('Please accept terms and conditions', 'Required!');
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  paymentResponsePopup(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  decline(): void {
    this.modalRef.hide();
  }
  redirectTo(path: any) {
    this.router.navigateByUrl(`/${path}`);
  }
}
