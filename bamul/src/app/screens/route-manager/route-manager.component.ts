import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-route-manager',
  templateUrl: './route-manager.component.html',
  styleUrls: ['./route-manager.component.css']
})
export class RouteManagerComponent implements OnInit {
  minDate: Date;
  releaseReason: FormGroup;
  submitted = false;
  shippingHeadersList;
  message: string;
  public search: any = '';
  isSelectAll = false;
  searchText: any = '';
  listItem = [];
  addMore = true;
  positionSelect: any[] = [{ shift: 'M' }, { shift: 'E' }];
  modalRef: BsModalRef;
  allReleaseReason: Object;
  rowData: any;
  selectedAll: boolean = false;
  disabledcheck: boolean = true;
  toDayDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  systemDate: string;
  constructor(private formBuilder: FormBuilder,
    private routeService: RouteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinnerService: Ng4LoadingSpinnerService, ) {
    this.systemDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        minDate: new Date(),
      });

  }

  ngOnInit() {
    this.releaseReason = this.formBuilder.group({
      reason: ['', Validators.required],
      comments: ''

    });
    this.getAllOrderHolds();
    this.getAllReleaseReason();
  }
  get f() { return this.releaseReason.controls; }
  getAllReleaseReason() {
    this.routeService.getAllReleaseReason().subscribe(res => {

      this.allReleaseReason = res
      
    })
  }


  openModal(template: any, index) {
    this.rowData = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }



  confirm(index, field): void {
    this.submitted = true;
    if (this.releaseReason.invalid) {
      return;
    }
    this.message = 'Confirmed!';
    this.modalRef.hide();
    let data = JSON.parse(localStorage.getItem('data'));
    let dateValue = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    this.submitted = true;
    this.rowData;
    if (this.releaseReason.invalid) {
      return;
    }
    let createOrderReleaseReason = {
      "routeInspectorId": this.rowData.routeInspectorId,
      "headerId": this.rowData.headerId,
      "orderNumber": this.rowData.orderNumber,
      "releaseReasonCode": this.releaseReason.value.reason.reasonCode,
      "releaseReason": this.releaseReason.value.reason.releaseReason,
      "releaseComments": this.releaseReason.value.comments,
      "creationDate": dateValue,
      "createdBy": data.createdBy,
      "lastUpdateDate": dateValue,
      "lastUpdatedBy": data.createdBy,
      "lastUpdateLogin": data.userId
    }
    this.routeService.createOrderReleaseReason(createOrderReleaseReason).subscribe(res => {
      this.toastr.success('Sucessfully createOrder ReleaseReason');
      this.releaseReason.reset();
      this.getAllOrderHolds();
    },
      error => {
        this.toastr.error(' Somethingwent wrong', 'Dispatch', {
          timeOut: 1000
        });
      });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  getAllOrderHolds() {
    this.spinnerService.show();
    this.routeService.getAllOrderHolds().subscribe(res => {
      this.spinnerService.hide();
      this.shippingHeadersList = res

    })
  }
  globalSearch(selection) {
    this.search = selection;
  }


selectAll() {
  
  for (var i = 0; i < this.shippingHeadersList.length; i++) {
    this.shippingHeadersList[i].selected = this.selectedAll;
  }
  this.disabledcheck=false;

    for (var i = 0; i < this.shippingHeadersList.length; i++) {
      this.shippingHeadersList[i].selected = this.selectedAll;
    }
    this.disabledcheck = false;

}
checkIfAllSelected() {
  
  this.selectedAll = this.shippingHeadersList.every(function(item:any) {
      return item.selected == true;
    })
    this.disabledcheck = true;
  }

}
