import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouteService } from '../../../shared/service/route.service';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-dispatch-security',
  templateUrl: './list-dispatch-security.component.html',
  styleUrls: ['./list-dispatch-security.component.css']
})
export class ListDispatchSecurityComponent implements OnInit {
  routeLst: any;
  currentDate: Date = new Date();
  shipRemark: any;
  positionSelect: any[] = [{ shift: 'Morning' }, { shift: 'Evening' }];
  dispatch = true;
  routesheetList: any;
  dateValue: string;
  modalRef: BsModalRef;
  message: string;
  shiftDispatch: string;
  randomCheckReq: any;
  public search: any = '';
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private datePipe: DatePipe,
    private routeService: RouteService,
    private router: Router,
    private spinnerService:NgxSpinnerService  ,
    private toastr: ToastrService,
    private modalService: BsModalService,

  ) {
    this.dateValue = datePipe.transform(this.currentDate, 'dd-MM-yyyy');
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        // minDate: new Date(),
      });
  }

  ngOnInit() {
    this.routeService.getOptions().subscribe((data) => {
      this.dispatch = true;
    });
    this.getShippingListByShiftAndReportDateAndShipStatus();
  }
navigateBack(){
    this.dispatch = true; 
}

  openModal(template: any, index) {
    
    if (this.routesheetList.randomCheckReq === 'Y' && this.routesheetList.randomCheckDone !== 'Y') {
      this.toastr.error('Random Check to be done', 'Shipping', {
        timeOut: 1000
      });
    } else {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }
  }
  globalSearch(selection) {
    this.search = selection;
  }
  confirm(index, field): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    const shippingDataUpadte = {
      dsHdrId: this.routesheetList.dsHdrId,
      routeNo: this.routesheetList.routeNo,
      requestId: this.routesheetList.requestId,
      shift: this.routesheetList.shift,
      reportDate: this.routesheetList.reportDate,
      dispatchStatus: this.routesheetList.dispatchStatus,
      shipStatus: 'Y',
      shipRemarks: this.shipRemark,
      randomCheckDone: this.routesheetList.randomCheckDone,
      randomCheckStatus: this.routesheetList.randomCheckStatus,
      seqNo: this.routesheetList.seqNo,
      returnedCrates: this.routesheetList.returnedCrates,
      returnStatus: this.routesheetList.returnStatus,
      totalCrates: this.routesheetList.totalCrates,
      randomCheckReq: this.routesheetList.randomCheckReq,
      dispRemarks: this.routesheetList.dispRemarks,
      randomRemarks: this.routesheetList.randomRemarks,
      disShipLine: this.routesheetList.disShipLine,
      // chkDispatchShipLines:   this.routesheetList.disShipLine,
    };

    // this.routeService.sendSMS(this.routeNo).subscribe(res => {
    // })
    this.spinnerService.show();
    this.routeService.updateShippingHeader(shippingDataUpadte).subscribe(data => {
    this.toastr.success('Route#' + this.routesheetList.routeNo + '\n Shipped Successfully.'); 
      this.getShippingListByShiftAndReportDateAndShipStatus();
      this.shipRemark = '';
      this.spinnerService.hide();
    }, error => {
      this.toastr.error(' Somethingwent wrong', 'Shipping', {
        timeOut: 1000
      });
    });
    this.dispatch = true;
  }

  decline(): void {
         this.dispatch = true;
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  redirectTo(i) {
    this.dispatch = false;
    this.routesheetList = i;
  }
  dateChange(){
    this.dateValue = this.datePipe.transform(this.dateValue, 'dd-MM-yyyy');
    this.getShippingListByShiftAndReportDateAndShipStatus();
  }

  getShippingListByShiftAndReportDateAndShipStatus() {
    this.spinnerService.show();
    const timeNow: any = this.datePipe.transform(new Date(), 'HH');
    if (timeNow >= 6.00 && timeNow <= 13.00) {
      this.shiftDispatch = 'Evening';
    } else {
      this.shiftDispatch = 'Morning';
    }
    this.routeService.getShippingListByShiftAndReportDateAndShipStatus(this.shiftDispatch, this.dateValue).subscribe(res => {
      this.spinnerService.hide();
      //console.log(res, 'getAllDispatchShip');
      this.routeLst = res;

    }, error => {
      //console.log(error);
    });
  }
}
