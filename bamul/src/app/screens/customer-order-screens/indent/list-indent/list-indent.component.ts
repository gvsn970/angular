import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { CreateIndentService } from '../../shared/components/services/create-indent.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/service/shared.service';
@Component({
  selector: 'app-list-indent',
  templateUrl: './list-indent.component.html',
  styleUrls: ['./list-indent.component.css']
})
export class ListIndentComponent implements OnInit {
  p = 1;
  indentLst: object;
  getIndentList: any;
  data: any;
  customerShippingDetails: any;
  status: any = "NEW";
  filterShift;
  filterDate = new Date();
  message: any;
  checkArray: any;


  constructor(
    private router: Router,
    private createIndentService: CreateIndentService,
    private spinner: NgxSpinnerService,
    private SharedService: SharedService
  ) { }


  ngOnInit() {
    this.getshift();
  }

  getshift() {

    this.createIndentService.getAllIndentShifts
      ().subscribe(res => {
        this.filterShift = res['shiftId'];
        this.getSalesOrderByAccountNumber();
      });
  }
  indentUpdate(i) {
    ////console.log(i, 'indentupdate');
    this.getIndentList = i;
    this.createIndentService.setIndentList(i);
    localStorage.setItem('update-indent', JSON.stringify(i));
    if (i.status == "SCHEDULED" || i.status == "NEW") {
      this.router.navigateByUrl('customer/indent/update-indent');
    } else {
      this.router.navigateByUrl('customer/indent/view-indent');
    }
  }

  getSalesOrderByAccountNumber() {
    this.spinner.show();
    this.data = JSON.parse(localStorage.getItem('data'));
    this.createIndentService.getSalesOrderByAccountNumberAndDeliveryDateAndShiftIdAndStatus
      (this.SharedService.getDate(), this.filterShift, this.status, this.data.accountNumber,
    ).subscribe(res => {
      this.spinner.hide();
      this.indentLst = res;
      this.checkArray = Array.isArray(this.indentLst)
      this.message = res['message'];

    });
  }


  // FILTERS Code


  onValueChange(value) {
    if (value) {
      let today: any = value;
      let dd: any = today.getDate();
      let mm: any = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = dd + '-' + mm + '-' + yyyy;
    }
  }
  filterData() {
    if (this.filterDate) {
      let today: any = this.filterDate;
      let dd: any = today.getDate();
      let mm: any = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      today = dd + '-' + mm + '-' + yyyy;
          this.spinner.show();
      this.createIndentService.getSalesOrderByAccountNumberAndDeliveryDateAndShiftIdAndStatus(today, this.filterShift, this.status, this.data.accountNumber,
      ).subscribe(res => {
        this.spinner.hide();
        this.indentLst = res;
        this.checkArray = Array.isArray(this.indentLst)
        this.message = res['message'];
        // this.filterData();
      }, error => {
      });

    }
  }

  reset() {
    //this.filterShift = this.SharedService.getShift();
    this.filterDate = new Date();
    this.status = "NEW";
    this.getshift();

  }



}


