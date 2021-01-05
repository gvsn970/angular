import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-route-insepector-hold',
  templateUrl: './route-insepector-hold.component.html',
  styleUrls: ['./route-insepector-hold.component.css']
})
export class RouteInsepectorHoldComponent implements OnInit {
  minDate: Date;
  releaseReason: FormGroup;
  submitted = false;
  OrderHoldsBylistRouteInspectorIdAndOrderTypeNam;
  message: string;
   public search: any = '';
   positionSelect: any[] = [{ shift: 'M' }, { shift: 'E' }];
  modalRef: BsModalRef;
  allReleaseReason: Object;
  rowData: any;
  selectedAll: boolean = false;
  disabledcheck: boolean = true;
  datePickerConfig: Partial<BsDatepickerConfig>;
  systemDate: string;
  data: any;
  listAllOrdersHolds: Object;
  createOrderReleaseReason: { routeInspectorId: any; headerId: any; orderNumber: any; releaseReasonCode: any; releaseReason: any; releaseComments: any; creationDate: string; createdBy: any; lastUpdateDate: string; lastUpdatedBy: any; lastUpdateLogin: any; };
  constructor(private formBuilder: FormBuilder,
    private routeService: RouteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinnerService: NgxSpinnerService, ) {
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
    this.getOrderHoldsByRouteInspectorIdAndOrderTypeName();
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
  globalSearch(selection) {
    this.search = selection;
  }


  confirm(index, field): void {
    this.submitted = true;
    let data = JSON.parse(localStorage.getItem('data'));
    let dateValue = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    if (this.releaseReason.invalid) {
      return;
    }
    this.message = 'Confirmed!';
    this.modalRef.hide();

    this.submitted = true;
    this.rowData;
    if (this.releaseReason.invalid) {
      return;
    }
    let listAllOrdersHolds = this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam
    if (this.disabledcheck == false) {
      for (let i = 0; i < this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam.length; i++) {
        this.createOrderReleaseReason = {
          routeInspectorId: this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam[i].routeInspectorId,
          headerId: this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam[i].headerId,
          orderNumber: this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam[i].orderNumber,
          releaseReasonCode: this.releaseReason.value.reason.reasonCode,
          releaseReason: this.releaseReason.value.reason.releaseReason,
          releaseComments: this.releaseReason.value.comments,
          creationDate: dateValue,
          createdBy: data.createdBy,
          lastUpdateDate: dateValue,
          lastUpdatedBy: data.createdBy,
          lastUpdateLogin: data.userId
        };
        this.spinnerService.show();
        this.routeService.createOrderReleaseReason(this.createOrderReleaseReason).subscribe(res => {
          this.toastr.success('Order Successfully Released');
          this.releaseReason.reset();
          this.spinnerService.hide();
          this.submitted = false;
          this.getOrderHoldsByRouteInspectorIdAndOrderTypeName();
        },
          error => {
            this.spinnerService.hide();
            this.toastr.error(' Something went wrong', 'Release On-hold Orders', {
              timeOut: 1000
            });
          });
      }

    } else {
      this.createOrderReleaseReason = {
        routeInspectorId: this.rowData.routeInspectorId,
        headerId: this.rowData.headerId,
        orderNumber: this.rowData.orderNumber,
        releaseReasonCode: this.releaseReason.value.reason.reasonCode,
        releaseReason: this.releaseReason.value.reason.releaseReason,
        releaseComments: this.releaseReason.value.comments,
        creationDate: dateValue,
        createdBy: data.createdBy,
        lastUpdateDate: dateValue,
        lastUpdatedBy: data.createdBy,
        lastUpdateLogin: data.userId
      };
    }

    this.routeService.createOrderReleaseReason(this.createOrderReleaseReason).subscribe(res => {
      this.toastr.success('Order# ' + this.rowData.orderNumber + ' Successfully Released');
      this.releaseReason.reset();
      this.submitted = false;
      this.getOrderHoldsByRouteInspectorIdAndOrderTypeName();
    },
      error => {
        this.spinnerService.hide();
        this.toastr.error(' Something went wrong', 'Release On-hold Orders', {
          timeOut: 1000
        });
      });
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  getOrderHoldsByRouteInspectorIdAndOrderTypeName() {
        this.spinnerService.show();
    this.data = JSON.parse(localStorage.getItem('data'));
    if (this.data.rolePath =="/mkt-dairy-manager/hold") {
        this.routeService.getOrdersOnHoldByLocationId(this.data.locationID).subscribe(res => {
        this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam = res
        this.spinnerService.hide();
      },error=>{
        this.spinnerService.hide();
      })
    } else {
        this.routeService.getOrderHoldsByRouteInspectorIdAndOrderTypeName(this.data.employeeId).subscribe(res => {
        this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam = res
        this.spinnerService.hide();
      },error=>{
        this.spinnerService.hide();
      })
    }
  }


  selectAll() {
    for (var i = 0; i < this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam.length; i++) {
      this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam[i].selected = this.selectedAll;
    }
    this.disabledcheck = false;
  }

  checkIfAllSelected() {
    this.selectedAll = this.OrderHoldsBylistRouteInspectorIdAndOrderTypeNam.every(function (item: any) {
      return item.selected == true;
    })
    this.disabledcheck = true;
  }

}

