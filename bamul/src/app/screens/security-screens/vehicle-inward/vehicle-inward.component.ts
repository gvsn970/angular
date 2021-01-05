import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SecurityService } from '../../../shared/service/security.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RouteService } from '../../../shared/service/route.service';

@Component({
  selector: 'app-vehicle-inward',
  templateUrl: './vehicle-inward.component.html',
  styleUrls: ['./vehicle-inward.component.css']
})
export class VehicleInwardComponent implements OnInit {

  rowData: any;
  modalRef: BsModalRef;
  confirmModalRef: BsModalRef;
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
  transporterDetails: any;
  routesheetList: any;
  shipRemark: any;
  message: any;
  p:any = 1;
  pageSize: number = 4;
  routeListkeyword: any;
  routeNumber: any;
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
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.currHour = new Date().getHours();
    this.searchForm = this.fb.group({
      routeType: [null],
      routeNumber: [null],
      dispatchFrom: [null],
      shift: [null],
      status: [null]
    });
    this.filterForm = this.fb.group({
      filter: [null],
      vehicleType: [null],
      routeType: [null],
      status: [null]
    });
    this.getAllTransferRoutesOnLoad();
    this.getRouteType();
    this.getDropDownValuesForVehicleType();
    this.getShift();
    this.getTripeStatus();
    this.getLocationForDispatchFrom();
    this.routeListkeyword = 'routeNumber';
  }
  get sf() { return this.searchForm.controls; }
  get ff() { return this.filterForm.controls; }
  selectRouteType(routeType) {
    this.routyeNumber = [];
    this.spinnerService.show();
    this.routeService.getDistinctTripsbyRouteTypeLocAndDate(routeType ,this.userData.locationName,this.datePipe.transform(new Date(), 'dd-MM-yyyy')).subscribe(res => {
      this.allRoutes = res;
      this.spinnerService.hide();
    });
  }
  
  getAllTransferRoutesOnLoad(){
    this.spinnerService.show();
    if(this.userData.locationName){
      let currentDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      // currentDate='20-02-2020';
      this.securityService.getAllTransferRoutesInPage(this.p,this.pageSize,this.userData.locationName,currentDate).subscribe(res => {
        this.routeDetail = res;
        this.spinnerService.hide();
        // //console.log('this.routeDetail',this.routeDetail)
      });
    }
  }
  pagechange(value){
    this.p = (value);
    this.getAllTransferRoutesOnLoad();
  }
  getRouteType(){
    this.securityService.getDropDownValues().subscribe(res => {
      this.routeType = res;
      // //console.log('this.routeType',this.routeType)
    });
  }
  getDropDownValuesForVehicleType(){
    this.securityService.getDropDownValuesForVehicleType().subscribe(res => {
      this.vehicleType = res;
      // //console.log('this.vehicleType',this.vehicleType)
    });
  }
  getShift(){
    this.securityService.getShift().subscribe(res => {
      this.shift = res;
      // //console.log('this.shift',this.shift)
    });
  }
  getTripeStatus(){
    this.securityService.getTripeStatus().subscribe(res => {
      this.tripeStatus = res;
      // //console.log('this.tripeStatus',this.tripeStatus)
    });
  }
  getLocationForDispatchFrom(){
    this.securityService.getAllLocations().subscribe(res => {
      this.locationList = res;
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
  openConfirmModel(template: any, index, openFor){
    this.confirmModalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  openModal(template: any, index, openFor) {
    this.rowData = index;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    // //console.log('openFor',openFor)
    if(openFor=='route'){
      this.route=this.routeDetail.transDeliverySetIn[index]
    }
    if(openFor=='vehicle'){
      // console.log('this.routeDetail.transDeliverySetIn[index]',this.routeDetail.transDeliverySetIn[index]);
      this.getVehicleDetails(this.routeDetail.transDeliverySetIn[index].vehicleId);
      this.getDriverDetails(this.routeDetail.transDeliverySetIn[index].driverId);
      this.getVechicleInsurance(this.routeDetail.transDeliverySetIn[index].vehicleId);
      this.getVechicleFitness(this.routeDetail.transDeliverySetIn[index].vehicleId);
    }
    if(openFor=='seal'){
      this.getSealDetail(this.routeDetail.transDeliverySetIn[index].tripTransactionId);
    }
    if(openFor == 'tripe'){
      this.tripeList = this.routeDetail.transDeliverySetIn[index].tripPoints.sort((a, b) => a.routePointSequenceNo-b.routePointSequenceNo );
      // //console.log('this.tripeList',this.tripeList)
    }
    if(openFor == 'shipment'){
      // this.getSalesOrderShipmentDatail(this.routeDetail.transDeliverySetIn[index].tripTransactionId);
      // this.getMilkAndMaterialShipmentDatail(this.routeDetail.transDeliverySetIn[index].tripTransactionId);
      this.getShippingListByReportDateAndShipStatusAndRoute(this.routeDetail.transDeliverySetIn[index].routeNumber);
    }
  }
  getShippingListByReportDateAndShipStatusAndRoute(routeNumber){
    let currentDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.securityService.getShippingListByReportDateAndShipStatusAndRoute(currentDate,'N',routeNumber).subscribe(res => {
      this.routesheetList = res;
      // console.log(' this.routesheetList', this.routesheetList)
      if(this.routesheetList.length>0){
        this.routesheetList=this.routesheetList[0];
      } else {
        this.routesheetList.shift='';
      }
      // //console.log('this.salesOrderShipmentDatail',this.salesOrderShipmentDatail)
      this.spinnerService.hide();
    });
  }
  confirm(index, field): void {
    this.message = 'Confirmed!';
    this.confirmModalRef.hide();
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

    // this.routeService.sendSMS(this.routeNo).subscribe(res => {'dispatch
    // })
    this.spinnerService.show();
    this.routeService.updateShippingHeader(shippingDataUpadte).subscribe(data => {
    this.toastr.success('Route#' + this.routesheetList.routeNo + '\n Shipped Successfully.'); 
      this.shipRemark = '';
      this.modalRef.hide();
      this.spinnerService.hide();
    }, error => {
      this.toastr.error(' Somethingwent wrong', 'Shipping', {
        timeOut: 1000
      });
    });
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
  getSealDetail(tripTransactionId){
    this.securityService.getSealDetailsByTripTransactionId(tripTransactionId).subscribe(res => {
      this.sealDetail = res;
      // //console.log('this.sealDetail',this.sealDetail)
      this.spinnerService.hide();
    });
  }
  getVehicleDetails(vehicleId) {
    this.spinnerService.show();
    this.securityService.getVehicleDetail(vehicleId).subscribe(res => {
      this.vehicleDetail = res;
      if(this.vehicleDetail){
        // this.vehicleDetail.vehicleId=1111;
        this.getSuplierView(this.vehicleDetail.vehicleId);
        this.getTransporterDetails(this.routeDetail[0].transporterId);
        // //console.log('this.vehicleDetail',this.vehicleDetail)
      }
      this.spinnerService.hide();
    });
  }
  getTransporterDetails(transporterId){
    this.securityService.getTransporterDetails(transporterId).subscribe(res => {
      this.transporterDetails = res;
      if(this.transporterDetails.length>0){
        this.transporterDetails=this.transporterDetails[0];
      }
      // console.log('this.transporterDetails',this.transporterDetails);
      this.spinnerService.hide();
    });
  }
  getSuplierView(vendorId){
    this.securityService.supplierview(vendorId).subscribe(res => {
      this.supplierData = res;
      // console.log('this.supplierData',this.supplierData)
      this.spinnerService.hide();
    });
  }
  getDriverDetails(driverId){
    this.spinnerService.show();
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
  search(){
    this.submited=true;
    let currentDate=this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      // currentDate='20-02-2020';
      this.spinnerService.show();
    //currentDate,routeType, status, shift, vehicleType, routeNumber, DispatchFrom
    this.securityService.findAllInwardTransferRoutesByFilter(currentDate,
      this.filterForm.value.routeType,
      this.filterForm.value.status,
      this.searchForm.value.shift,
      this.filterForm.value.vehicleType,
      // this.searchForm.value.routeNumber,
      this.routeNumber,
      this.searchForm.value.dispatchFrom
      ).subscribe(res => {
      this.searchResult = res;
      if(this.searchResult.length>0){
        this.routeDetail.transDeliverySetIn = res;
        this.routeDetail.totalRecords = this.routeDetail.transDeliverySetIn.length;
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
  reload(){
    this.searchForm.patchValue({
      routeType: null,
      routeNumber: null,
      dispatchFrom: null,
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
  changeStatus(status, tripTransactionId,actualEndTime) {
    let postData={};
    let currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    let currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
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
    } if(status=='Complete') {
      postData = {
        "tripTransactionId": tripTransactionId,
        "routeStatus": "Complete",
        "actualEndTime": actualEndTime,
        "lastUpdateDate": currentDate,
        "lastUpdatedBy": userData.userId
      }
    }
      if(status=='New') {
        postData = {
          "tripTransactionId": tripTransactionId,
          "routeStatus": "Running",
          "actualEndTime": currentTime,
          "lastUpdateDate": currentDate,
          "lastUpdatedBy": userData.userId
        }
    }
    
    this.securityService.updateTripStatus(postData).subscribe(res => {
      this.updateResponse = res;
      this.toastr.success('Trip status updated successfully', '', {
        timeOut: 2000
      });
      this.getAllTransferRoutesOnLoad();
      this.spinnerService.hide();
    });
  }
  selectRouteEvent(item) {
    this.routeNumber=item.routeNumber;
  }
  onChangeSearchRoute(val) {
    // console.log('val', val)
  }
  onFocused(e) {
    // do something when input is focused
  }
}
