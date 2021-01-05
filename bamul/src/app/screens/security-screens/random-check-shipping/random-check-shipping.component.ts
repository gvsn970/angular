import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouteService } from 'src/app/shared/service/route.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-random-check-shipping',
  templateUrl: './random-check-shipping.component.html',
  styleUrls: ['./random-check-shipping.component.css']
})
export class RandomCheckShippingComponent implements OnInit {
  routeLst;
  currentDate: Date = new Date();
  filterList = [];
  randomRemark: any;
  positionSelect: any[] = [{ shift: 'Morning' }, { shift: 'Evening' }];
  dispatch = true;
  routesheetList: any;
  dateValue: string;
  modalRef: BsModalRef;
  message: string;
  shiftDispatch: string;
  randomCheckReq: any;

  constructor(
    private datePipe: DatePipe,
    private routeService: RouteService,
    private router: Router,
    private spinnerService: NgxSpinnerService ,
    private toastr: ToastrService,
    private modalService: BsModalService,

  ) {
    this.dateValue = datePipe.transform(this.currentDate, 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.routeService.getOptions().subscribe((data) => {
      this.dispatch = true;
    });
    this.getShippingListByShiftAndReportDateAndShipStatus();
  }


  openModal(template: any, index) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
navigateBack(){
     this.dispatch = true;
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
      shipStatus: this.routesheetList.shipStatus,
      randomCheckReq: this.routesheetList.randomCheckReq,
      randomCheckDone: "Y",
      randomCheckStatus: "Y",
      randomRemarks: this.randomRemark,
      seqNo: this.routesheetList.seqNo,
      totalCrates: this.routesheetList.totalCrates,
      returnedCrates: this.routesheetList.returnedCrates,
      returnStatus: this.routesheetList.returnStatus,
      dispRemarks: this.routesheetList.dispRemarks,
      disShipLine: this.routesheetList.disShipLine,
      // chkDispatchShipLines:   this.routesheetList.disShipLine,

    };
    // this.routeService.sendSMS(this.routeNo).subscribe(res => {
    // })
    this.spinnerService.show();
    this.routeService.updateRouteSheetStatusHeaderByRouteNoAndShiftAndDate(shippingDataUpadte).subscribe(data => {
      this.toastr.success('Route # ' + this.routesheetList.routeNo + '\n Random-Check done successfully.'); 
      this.getShippingListByShiftAndReportDateAndShipStatus();
      this.spinnerService.hide();
      this.randomRemark='';
      this.filterList = [];
    }, error => {
      this.toastr.error(' Somethingwent wrong', 'Random-Check', {
        timeOut: 1000
      });
      this.filterList = [];
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

  getShippingListByShiftAndReportDateAndShipStatus() {
    this.spinnerService.show();
    const timeNow: any = this.datePipe.transform(new Date(), 'HH');
    if (timeNow >= 6.00 && timeNow <= 12.30) {
      this.shiftDispatch = 'Evening';
    } else {
      this.shiftDispatch = 'Morning';
    }
    this.routeService.getShippingListByShiftAndReportDateAndShipStatus(this.shiftDispatch, this.dateValue).subscribe(res => {
      this.spinnerService.hide();
      this.routeLst = res;
      //console.log(res, 'getAllDispatchShip');
      for (let index = 0; index < this.routeLst.length; index++) {
        if (this.routeLst[index].randomCheckReq == "Y" && this.routeLst[index].randomCheckDone != "Y") {
          this.filterList.push(this.routeLst[index]);
        }
      }

    }, error => {
      //console.log(error);
    });
  }
}
