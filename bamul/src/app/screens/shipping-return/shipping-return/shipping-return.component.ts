import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouteService } from '../../../shared/service/route.service';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shipping-return',
  templateUrl: './shipping-return.component.html',
  styleUrls: ['./shipping-return.component.css']
})
export class ShippingReturnComponent implements OnInit {
  routeLst: any;
  filterList = [];
  currentDate: Date = new Date();
  positionSelect: any[] = [{ shift: 'Morning' }, { shift: 'Evening' }];
  dispatch = true;
  routesheetList: any;
  shiftDispatch: any;
  todayDate: any;
  returnCrates: any = '';
  modalRef: BsModalRef;
  message: string;
  dispRemark: any = '';
  difference: any;
 public search: any = '';
 datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private datePipe: DatePipe,
    private routeService: RouteService, 
    private router: Router,
    private spinnerService: NgxSpinnerService , 
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {
   
    // this.todayDate = "29-02-2020";
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        // minDate: new Date(),
      });
      this.todayDate = datePipe.transform(this.currentDate, 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.getTodaysDispatchListByShiftAndReportDate();
  }

  openModal(template: any, i) {
    this.routesheetList = i;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  confirm(index, field): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    const saveDispatched = {
      dsHdrId: this.routesheetList.dsHdrId,
      returnedCrates: this.returnCrates,
      returnRemarks: this.dispRemark,
      routeNo: this.routesheetList.routeNo,
      requestId: this.routesheetList.requestId,
      shift: this.routesheetList.shift,
      reportDate: this.routesheetList.reportDate,
      dispatchStatus: this.routesheetList.dispatchStatus,
      shipStatus: this.routesheetList.shipStatus,
      randomCheckReq: this.routesheetList.randomCheckReq,
      randomCheckDone: this.routesheetList.randomCheckDone,
      seqNo: this.routesheetList.seqNo,
      dispRemarks: this.routesheetList.dispRemarks,
      shipRemarks: this.routesheetList.shipRemarks,
      randomRemarks: this.routesheetList.randomRemarks,
      randomCheckStatus: this.routesheetList.randomCheckStatus,
      returnStatus: "Y",
      disShipLine: this.routesheetList.disShipLine,
      totalCrates: this.routesheetList.totalCrates,
      //  chkDispatchShipLines:this.routesheetList.disShipLine,
    };
    this.routeService.saveDispatchShip(saveDispatched).subscribe(data => {
 
      this.toastr.success('Route No: ' + this.routesheetList.routeNo + '\n Shipping Return done successfully.'); 
      this.getTodaysDispatchListByShiftAndReportDate();
      this.dispRemark = '';
      this.returnCrates = '';
      this.filterList = [];
    },
      error => {
        this.toastr.error(' Somethingwent Wrong', 'Shipping Return ', {
          timeOut: 1000
        });
      });
    this.dispatch = true;
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  globalSearch(selection) {
    this.search = selection;
  }
  dateChange(){
    this.todayDate = this.datePipe.transform(this.todayDate, 'dd-MM-yyyy');
    this.getTodaysDispatchListByShiftAndReportDate();
  }
  returnedCrates(){
    this.returnCrates
    let returnCratesList = (this.returnCrates %100);
    if (returnCratesList != 0) {

    }
  }

  getTodaysDispatchListByShiftAndReportDate() {
    this.spinnerService.show();
    const timeNow: any = this.datePipe.transform(new Date(), 'HH');
    if (timeNow >= 6.00 && timeNow <= 12.30) {
      this.shiftDispatch = 'Evening';
    } else {
      this.shiftDispatch = 'Morning';
    }
    this.routeService.getShippingListByShiftAndReportDateAndShipStatusreturn(this.shiftDispatch, this.todayDate).subscribe(res => {
    //console.log(res, 'getTodaysDispatchListByShiftAndReportDate list');
      this.routeLst = res;
      for (let index = 0; index < this.routeLst.length; index++) {
        if (this.routeLst[index].returnStatus != "Y") {
          this.filterList.push(this.routeLst[index]);
        }
      }
      this.spinnerService.hide();
      localStorage.setItem('getAllRouteSheets', JSON.stringify(this.filterList));
    }, error => {
      //console.log(error);
    });
  }
  calculateDifference(totalCrates){
    this.difference=this.returnCrates-totalCrates;
  }
}