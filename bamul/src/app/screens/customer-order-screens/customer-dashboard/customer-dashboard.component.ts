import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CreateIndentService } from '../shared/components/services/create-indent.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  customer:any;
  customerBillingDetails: any;
  todayOrderCount: any;
  orderAmount: number = 0;
  public constructor(
    private titleService: Title,
    private CreateIndentService: CreateIndentService,
    private spinnerService: Ng4LoadingSpinnerService,
    private datePipe: DatePipe,
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit() {
    this.setTitle('Customer-Dashboard');
    this.getCustomerBillingInformation();
    this.getTodayOrdersCount();
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
  getCustomerBillingInformation(){
    this.customer = JSON.parse(localStorage.getItem('data'));
    this.CreateIndentService.getCustBillingDetailsByAcctNo(this.customer.accountNumber).subscribe(res => {
      if(res){
        this.spinnerService.hide();
        this.customerBillingDetails=res;
      }
    }, error => {
      this.spinnerService.hide();
    });
  }
}
