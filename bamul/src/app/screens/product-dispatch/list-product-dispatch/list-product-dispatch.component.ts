import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouteService } from '../../../shared/service/route.service';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-list-product-dispatch',
  templateUrl: './list-product-dispatch.component.html',
  styleUrls: ['./list-product-dispatch.component.css']
})
export class ListProductDispatchComponent implements OnInit {
  routeLst: any;
  currentDate: Date = new Date();
  searchText: any = '';
  dispRemark: any;
  positionSelect: any[] = [{ shift: 'Morning' }, { shift: 'Evening' }];
  dispatch = true;
  routesheetList: any;
  shiftDispatch: any;
  todayDate: any;
  modalRef: BsModalRef;
  message: string;
  randomChecklist: any;
  public search: any = '';
  datePickerConfig: Partial<BsDatepickerConfig>;
  constructor(private datePipe: DatePipe,
    private routeService: RouteService,
    private spinnerService: NgxSpinnerService , 
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {
    this.todayDate = datePipe.transform(this.currentDate, 'dd-MM-yyyy');
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
  }

  ngOnInit() {
    
    this.routeService.getOptions().subscribe((data) => {
      this.dispatch = true;
    });
    this.getTodaysDispatchListByShiftAndReportDate();
  }

  openModal(template: any, index) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
navigateBack(){
    this.dispatch = true;
}
  globalSearch(selection) {
    this.search = selection;
  }

  confirm(index, field): void {
    let tempRCValue = 'N';
    if (this.randomChecklist != null) {
      tempRCValue = this.randomChecklist.randomCheckReq
    }
    
    this.message = 'Confirmed!';
    this.modalRef.hide();
    const saveDispatched = {
      routeNo: this.routesheetList.routeNo,
      requestId: this.routesheetList.requestId,
      shift: this.routesheetList.shift,
      reportDate: this.routesheetList.reportDate,
      dispatchStatus: 'Y',
      shipStatus: 'N',
      returnedCrates: 0,
      returnStatus: "N",
      randomCheckReq: tempRCValue,
      seqNo: this.routesheetList.seqNo,
      dispRemarks: this.dispRemark,
      disShipLine: this.routesheetList.routeSheetLine,
      totalCrates: this.routesheetList.totalCrates,
      // chkDispatchShipLines: saveRouteSheetStatus.routeSheetLine,
    };
    
    this.routeService.saveDispatchShip(saveDispatched).subscribe(data => {
      this.toastr.success('Route#' + this.routesheetList.routeNo + '\n Dispatched Successfully.');
      this.getTodaysDispatchListByShiftAndReportDate();
      this.dispRemark = '';
    },
      error => {
        this.toastr.error(' Somethingwent wrong', 'Dispatch', {
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
    this.routeService.getRandomCheckByRouteNoAndShiftAndDate(
      this.routesheetList.routeNo, this.routesheetList.shift, this.routesheetList.reportDate)
      .subscribe(data => {
        this.randomChecklist = data;
      })
  }
  dateChange(){
    this.todayDate = this.datePipe.transform(this.todayDate, 'dd-MM-yyyy');
    this.getTodaysDispatchListByShiftAndReportDate();
  }

  getTodaysDispatchListByShiftAndReportDate() {
    this.spinnerService.show();
    const timeNow: any = this.datePipe.transform(new Date(), 'HH');
    if (timeNow >= 6.00 && timeNow <= 12.30) {
      this.shiftDispatch = 'Evening';
    } else {
      this.shiftDispatch = 'Morning';
    }
    this.routeService.getTodaysDispatchListByShiftAndReportDate(this.shiftDispatch, this.todayDate).subscribe(res => {
      //console.log(res, 'getTodaysDispatchListByShiftAndReportDate list');
      this.routeLst = res;
      this.spinnerService.hide();
      localStorage.setItem('getAllRouteSheets', JSON.stringify(this.routeLst));
    }, error => {
      //console.log(error);
    });
  }

}
