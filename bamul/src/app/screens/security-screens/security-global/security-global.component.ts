import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SecurityService } from '../../../shared/service/security.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RouteService } from '../../../shared/service/route.service';
@Component({
  selector: 'app-security-global',
  templateUrl: './security-global.component.html',
  styleUrls: ['./security-global.component.css']
})
export class SecurityGlobalComponent implements OnInit {
  rowData: any;
  modalRef: BsModalRef;
  routeDetail: any = [];
  userData: any;
  searchForm: FormGroup;
  filterForm: FormGroup;
  status = false;
  routyeNumber: any = [];
  allRoutes: any = [];
  submited: boolean = false;
  route: any;
  vehicleDetail: any;
  driverDetail: any;
  routeType: any = [];
  vehicleType: any = [];
  shift: any = [];
  tripeStatus: any = [];
  locationList: any = [];
  sealDetail: any;
  searchResult: any = [];
  updateResponse: any;
  vechicleInsurance: any;
  vechileFitness: any;
  tripeList: any;
  supplierData: any;
  salesOrderShipmentDatail: any;
  milkAndMaterialShipmentDatail: any;
  currHour: number;
  constructor(
    private modalService: BsModalService,
    private securityService: SecurityService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinnerService: Ng4LoadingSpinnerService,
    private routeService: RouteService
  ) { }
  ngOnInit() {
    this.currHour = new Date().getHours();
    this.searchForm = this.fb.group({
      routeType: [null],
      routeNumber: [null],
      dispatchFrom: [null],
      dispatchTo: [null],
      shift: [null],
      status: [null]
    });
    this.filterForm = this.fb.group({
      status: [null],
      vehicleType: [null],
      routeType: [null]
    });
    this.getAllTransferRoutesOnLoad();
    this.getRouteType();
    this.getDropDownValuesForVehicleType();
    this.getShift();
    this.getTripeStatus();
    this.getLocationForDispatchFrom();
  }
  get sf() { return this.searchForm.controls; }
  get ff() { return this.filterForm.controls; }
  selectRouteType(routeType) {
    this.routyeNumber = [];
    this.spinnerService.show();
    this.routeService.getDistinctTripRoutesbyRouteType(routeType).subscribe(res => {
      this.allRoutes = res;
      this.spinnerService.hide();
    });
  }

  getAllTransferRoutesOnLoad() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    if (this.userData.locationID) {
      this.spinnerService.show();
      this.userData.locationID = 222;
      let currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      // currentDate = '20-02-2020';
      this.securityService.getAllTransferRoutes(currentDate).subscribe(res => {
        this.routeDetail = res;
        this.spinnerService.hide();
      });
    }
  }
  getRouteType() {
    this.securityService.getDropDownValues().subscribe(res => {
      this.routeType = res;
      // //console.log('this.routeType',this.routeType)
    });
  }
  getDropDownValuesForVehicleType() {
    this.securityService.getDropDownValuesForVehicleType().subscribe(res => {
      this.vehicleType = res;
      // //console.log('this.vehicleType',this.vehicleType)
    });
  }
  getShift() {
    this.securityService.getShift().subscribe(res => {
      this.shift = res;
      // //console.log('this.shift',this.shift)
    });
  }
  getTripeStatus() {
    this.securityService.getTripeStatus().subscribe(res => {
      this.tripeStatus = res;
      // //console.log('this.tripeStatus',this.tripeStatus)
    });
  }
  getLocationForDispatchFrom() {
    this.securityService.getAllLocations().subscribe(res => {
      this.locationList = res;
      // //console.log('this.locationList',this.locationList)
    });
  }
  toogleFullScreen() {
    this.status = !this.status;
    if (this.status) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  openModal(template: any, index, openFor) {
    this.rowData = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    // //console.log('openFor',openFor)
    if (openFor == 'route') {
      this.route = this.routeDetail[index]
    }
    if (openFor == 'vehicle') {
      console.log('this.routeDetail[index]',this.routeDetail[index])
      this.getVehicleDetails(this.routeDetail[index].vehicleId,this.routeDetail[index].transporterId);
      this.getDriverDetails(this.routeDetail[index].driverId);
      this.getVechicleInsurance(this.routeDetail[index].vehicleId);
      this.getVechicleFitness(this.routeDetail[index].vehicleId);
    }
    if (openFor == 'seal') {
      this.getSealDetail(this.routeDetail[index].tripTransactionId);
    }
    if(openFor == 'tripe'){
      this.tripeList = this.routeDetail[index].tripPoints;
      // //console.log('this.tripeList',this.tripeList)
    }
    if(openFor == 'shipment'){
      this.getSalesOrderShipmentDatail(this.routeDetail[index].tripTransactionId);
      this.getMilkAndMaterialShipmentDatail(this.routeDetail[index].tripTransactionId);
    }
  }
  getSalesOrderShipmentDatail(tripTransactionId) {
    // tripTransactionId=3;
    this.securityService.getTripShipmentDetailsSalesOrdersByTransactionId(tripTransactionId).subscribe(res => {
      this.salesOrderShipmentDatail = res;
      // //console.log('this.salesOrderShipmentDatail',this.salesOrderShipmentDatail)
      this.spinnerService.hide();
    });
  }
  getMilkAndMaterialShipmentDatail(tripTransactionId) {
    // tripTransactionId=3;
    this.securityService.getMilkTransferByTripTransactionId(tripTransactionId).subscribe(res => {
      this.milkAndMaterialShipmentDatail = res;
      // //console.log('this.milkAndMaterialShipmentDatail',this.milkAndMaterialShipmentDatail)
      this.spinnerService.hide();
    });
  }
  getSealDetail(tripTransactionId) {
    this.securityService.getSealDetailsByTripTransactionId(tripTransactionId).subscribe(res => {
      this.sealDetail = res;
      // //console.log('this.sealDetail',this.sealDetail)
      this.spinnerService.hide();
    });
  }
  getVehicleDetails(vehicleId,transporterId) {
    this.spinnerService.show();
    this.securityService.getVehicleDetail(vehicleId).subscribe(res => {
      this.vehicleDetail = res;
      if(this.vehicleDetail){
        // this.vehicleDetail.vehicleId=1111;
        this.getSuplierView(transporterId);
        // //console.log('this.vehicleDetail',this.vehicleDetail)
      }
      this.spinnerService.hide();
    });
  }
  getSuplierView(vendorId){
    this.securityService.supplierview(vendorId).subscribe(res => {
      this.supplierData = res;
      if(this.supplierData.length>0)
      this.supplierData=this.supplierData[0];
      // console.log('this.supplierData',this.supplierData)
      this.spinnerService.hide();
    });
  }
  getDriverDetails(driverId) {
    this.spinnerService.show();
    // driverId=8;
    this.securityService.getDriverDetails(driverId).subscribe(res => {
      this.driverDetail = res;
      // //console.log('this.driverDetail',this.driverDetail)
      this.spinnerService.hide();
    });
  }
  getVechicleInsurance(vehicleId){
    this.spinnerService.show();
    this.securityService.getInsuranceValidity(vehicleId).subscribe(res => {
      this.vechicleInsurance = res;
      if(this.vechicleInsurance.length>0)
      this.vechicleInsurance=this.vechicleInsurance[0];
      // //console.log('this.vechicleInsurance',this.vechicleInsurance)
      this.spinnerService.hide();
    });
  }
  getVechicleFitness(vehicleId){
    this.spinnerService.show();
    this.securityService.getFitnessValidity(vehicleId).subscribe(res => {
      this.vechileFitness = res;
      if(this.vechileFitness.length>0)
      this.vechileFitness=this.vechileFitness[0];
      // //console.log('this.vechileFitness',this.vechileFitness)
      this.spinnerService.hide();
    });
  }
  search() {
    this.submited = true;
    let currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    // currentDate = '20-02-2020';
    this.spinnerService.show();
    //currentDate,routeType, status, shift, vehicleType, routeNumber, DispatchFrom
    this.securityService.findAllGlobalTransferRoutesByFilter(currentDate,
      this.filterForm.value.routeType,
      this.filterForm.value.status,
      this.searchForm.value.shift,
      this.filterForm.value.vehicleType,
      this.searchForm.value.routeNumber,
      this.searchForm.value.dispatchFrom,
      this.searchForm.value.dispatchTo,
    ).subscribe(res => {
      this.searchResult = res;
      if (this.searchResult.length > 0) {
        this.routeDetail = res;
        // //console.log('routeDetail',this.routeDetail)
      } else {
        this.routeDetail = [];
        this.toastr.warning('Trip information not found', 'Record Not Found', {
          timeOut: 2000
        });
      }
      // //console.log('this.searchResult',this.searchResult)
      this.spinnerService.hide();
    });
  }
  reload() {
    this.searchForm.patchValue({
      routeType: null,
      routeNumber: null,
      dispatchFrom: null,
      dispatchTo: null,
      shift: null,
      status: null
    });
    this.filterForm.patchValue({
      status: null,
      vehicleType: null,
      routeType: null
    });
    this.getAllTransferRoutesOnLoad();
  }
  changeStatus(status, tripTransactionId) {
    let postData={};
    let currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    let currentTime = this.datePipe.transform(new Date(), 'hh:mm:ss');
    let userData = JSON.parse(localStorage.getItem('data'));
    // //console.log('status',status)
    if(status=='Running'){
      postData = {
        "tripTransactionId": tripTransactionId,
        "routeStatus": "Arrived",
        "actualEndTime": currentTime,
        "lastUpdateDate": currentDate,
        "lastUpdatedBy": userData.userId
      }
    } else {
      postData = {
        "tripTransactionId": tripTransactionId,
        "routeStatus": "Complete",
        "actualEndTime": currentTime,
        "lastUpdateDate": currentDate,
        "lastUpdatedBy": userData.userId
      }
    }
    
    this.securityService.updateTripStatus(postData).subscribe(res => {
      this.updateResponse = res;
      this.toastr.success('tripe status updated successfully', '', {
        timeOut: 2000
      });
      this.getAllTransferRoutesOnLoad();
      this.spinnerService.hide();
    });
  }
}
