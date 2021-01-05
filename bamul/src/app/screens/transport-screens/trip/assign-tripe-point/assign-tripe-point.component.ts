import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from "@angular/router";
import { TripService } from 'src/app/shared/service/trip.service';
@Component({
  selector: 'app-assign-tripe-point',
  templateUrl: './assign-tripe-point.component.html',
  styleUrls: ['./assign-tripe-point.component.css']
})
export class AssignTripePointComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private RouteService: RouteService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private tripService: TripService) { }
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }
  // tslint:disable-next-line:max-line-length
  routePointTypeList: any;
  accountType: string = 'CUSTOMER';
  accountTypeResponse: any = [];
  CreateIndentLineItem: FormGroup;
  routeDetailsForHeader: any;
  routeHeader: FormGroup;
  searchkeyword: any;
  searchkeywordForAccountNumber: any;
  searchkeywordForVendorNumber: any;
  searchResponse: any;
  resultFound: boolean;
  routePointList: any = [];
  shippingAddress: any = [];
  shippingDetails: any;
  siteAddress: any = [];
  itemArray: any = [];
  submited: boolean = false;
  routeNumber: any;
  vendorDetail: any;
  isDropDownDone: boolean = false;
  estimatedTotalQuantity: number = 0;
  tripeTransactionId: any;
  submitButtonLabel: string='Submit';
  unitOfMeasureList: any; //uom changes
  drop(event: CdkDragDrop<string[]>) {
    this.isDropDownDone=true;
    moveItemInArray(this.itemArray, event.previousIndex, event.currentIndex);
    if(event.previousIndex>event.currentIndex){
      for(let i = event.currentIndex; i<=event.previousIndex;i++){
        this.itemArray[i].routePointSequenceNo=i;
      }
    } 
    if(event.previousIndex<event.currentIndex){
      for(let i = event.currentIndex; i>=event.previousIndex;i--){
        this.itemArray[i].routePointSequenceNo=i;
      }
    }
  }
   ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.tripeTransactionId = params['id'];
      }
    })
    this.getRoutePoint();
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initItemRows()])
    });
    this.routeHeader = this.fb.group({
      routeNumber: ['', Validators.required],
      routeName: [''],
      routeType: ['', Validators.required],
      accountype: ['', Validators.required],
      department: ['', Validators.required],
      unitOfMeasure: ['', Validators.required], //uom changes
      routeShift: [''] //uom changes
    })
    this.routeHeaderFormDisable();
    this.getAccountType();
    this.searchkeyword = 'partyName';
    this.searchkeywordForAccountNumber = 'accountNumber';
    this.searchkeywordForVendorNumber = 'vendorNum';
    this.getUnitOfMeasure();
  }
  routeHeaderFormDisable() {
    this.routeHeader.controls['routeNumber'].disable();
    this.routeHeader.controls['routeName'].disable();
    this.routeHeader.controls['routeType'].disable();
    this.routeHeader.controls['accountype'].disable();
    this.routeHeader.controls['department'].disable();
    this.routeHeader.controls.routeShift.disable(); //uom changes
  }
  initItemRows() {
    return this.fb.group({
      pointType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      recieverName: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
      estimatedQuantity: ['', Validators.required],
      shipmentId: [''],
      partyNumber: [''],
      shippingAddressText: [''],
      routePointContactName: [''],
      routePointContactNo: [''],
      shipToSiteUseId:[''],
      unitOfMeasure: [''] //uom changes
    });
  }
  addNewRow() {
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
  }
  getRoutePoint() {
    this.spinnerService.show();
    this.RouteService.getDropDownList('ALL', 'ALL', 'PAYMENT_TYPE').subscribe(res => {
      this.routePointTypeList = res;
      this.spinnerService.hide();
    });
    this.getTripDetailsByTripTransactionId();
  }
  getTripDetailsByTripTransactionId() {
    let tripeTransactionId = this.tripeTransactionId;
    this.spinnerService.show();
    this.tripService.getTripByTripTransactionId(tripeTransactionId).subscribe(res => {
      this.routeDetailsForHeader = res;
      this.accountType = this.routeDetailsForHeader.accountType;
      this.routeHeader.patchValue({
        routeNumber: this.routeDetailsForHeader.routeNumber,
        routeName: this.routeDetailsForHeader.routeName,
        routeType: this.routeDetailsForHeader.routeType,
        accountype: this.routeDetailsForHeader.accountType,
        department: this.routeDetailsForHeader.associateToDepartmentName,
        unitOfMeasure: this.routeDetailsForHeader.unitOfMeasure,
        routeShift: this.routeDetailsForHeader.routeShift //uom changes

      })
      if (this.routeDetailsForHeader.tripPoints.length > 0) {
        this.submitButtonLabel='Update';
        // this.routeHeader.controls['accountype'].disable();
      this.routeDetailsForHeader.tripPoints = this.routeDetailsForHeader.tripPoints.sort((a, b) =>a.routePointSequenceNo-b.routePointSequenceNo );
        for (let i = 0; i < this.routeDetailsForHeader.tripPoints.length; i++) {
          if (i > 0) {
            this.addNewRow();
          }
          this.itemArray.push(this.routeDetailsForHeader.tripPoints[i]);
          if (this.routeDetailsForHeader.tripPoints[i].customerType == 'SUPPLIER') {
            let address = [];
            address.push({
              address: this.routeDetailsForHeader.tripPoints[i].shippingAddress,
              custAcctSiteId: this.routeDetailsForHeader.tripPoints[i].partyShipId
            });
            this.siteAddress[i] = address;
            this.routeHeader.patchValue({
              accountype: 'SUPPLIER'
            })
            this.accountType='SUPPLIER';
            this.routeHeader.controls['accountype'].disable();
          } else {
            this.getShippingAddress(i, this.routeDetailsForHeader.tripPoints[i].routePointCode);
            this.routeHeader.controls['accountype'].disable();
          }
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ recieverName: this.routeDetailsForHeader.tripPoints[i].routePointName });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ shipmentId: this.routeDetailsForHeader.tripPoints[i].partyShipId });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ partyNumber: this.routeDetailsForHeader.tripPoints[i].partyNumber });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ accountNumber: this.routeDetailsForHeader.tripPoints[i].routePointCode });
          let estimatedStartTimeDate = new Date();
          if(this.routeDetailsForHeader.tripPoints[i].expectedArrivalTime!=null){
            let estimatedStartTime = this.routeDetailsForHeader.tripPoints[i].expectedArrivalTime.split(":");
            let estimatedStartHours = estimatedStartTime[0];
            let estimatedStartMinutes = estimatedStartTime[1];
            estimatedStartTimeDate.setHours(estimatedStartHours);
            estimatedStartTimeDate.setMinutes(estimatedStartMinutes);
          }
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ arrival: estimatedStartTimeDate });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ estimatedQuantity: this.routeDetailsForHeader.tripPoints[i].estimatedquantity });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ shippingAddress: this.routeDetailsForHeader.tripPoints[i].partyShipId });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ shippingAddressText: this.routeDetailsForHeader.tripPoints[i].shippingAddress });
        }
      }
      this.spinnerService.hide();
    });

  }

  getUnitOfMeasure(){
    this.RouteService.getUnitOfMeasure().subscribe(res => {
      this.unitOfMeasureList = res;
    });
  }
  getAccountType() {
    this.RouteService.getAccountType().subscribe(res => {
      this.accountTypeResponse = res;
    });

  }
  setAccountType(accountType) {
    // this.formArr.removeAt(0);
    if (this.formArr.length >= 1) {
      this.formArr.clear();
      this.itemArray = [];
    }
    this.accountType = this.routeHeader.value.accountype;
    if (this.routeHeader.value.accountype == 'SUPPLIER') {
      this.searchkeyword = 'vendorName';
    } else {
      this.searchkeyword = 'partyName';
    }
  }
  selectEvent(item, index) {
    // //console.log(item, 'item');
    this.spinnerService.show();
    if (this.routeHeader.value.accountype == "CUSTOMER") {
      this.RouteService.getCustDetailsByName(item.partyName.toUpperCase()).subscribe((response) => {
        if (response) {
          this.routePointList = response;
          if (this.routePointList) {
            let address = [];
            for (let i = 0; i < this.routePointList.length; i++) {
              address.push({
                address: this.routePointList[i].siteAddress,
                // siteAddress change to partyAddress
                custAcctSiteId: this.routePointList[i].custAcctSiteId,
                shipToSiteUseId:this.routePointList[i].siteUseId,
              });
              this.siteAddress[index] = address;
            }
            //(this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipToSiteUseId: this.routePointList[0].siteUseId});
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddressText: this.routePointList[0].partyAddress });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress: this.routePointList[0].custAcctSiteId  });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName: item.partyName });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipmentId: item.custAcctSiteId });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: item.partyNumber });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ accountNumber: this.routePointList[0].accountNumber });
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipmentId: this.routePointList[0].partyId });
            // (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: item.contactNumber });
          } else {
            this.toastr.warning('Customer not found', 'Assign Trip Point', {
              timeOut: 3000
            });
          }
          this.spinnerService.hide();
        }
      });
    } else {
      // //console.log('item', item);
      let address = [];
      address.push({
        address: item.addressLine1,
        custAcctSiteId: item.vendorSiteId
      });
      this.siteAddress[index] = address;
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName: item.vendorName });
      // (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress: item.vendorSiteId });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: item.contactName });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ accountNumber: item.vendorNum });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ routePointContactName: item.contactName });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ routePointContactNo: item.contactNumber });
      this.spinnerService.hide();
    }
  }
  selectEventForAccountNumer(item, index) {
    if (item) {
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName: item.partyName });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipmentId: item.custAcctSiteId });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: item.partyNumber });
      // (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ accountNumber: item.accountNumber });
      this.getShippingAddress(index, item.accountNumber);
    }
  }
  getShippingAddress(index, accountNumber) {
    this.spinnerService.show();
    this.RouteService.getCustShippingDetailsByAcctNo(accountNumber).subscribe((response) => {
      if (response){
        this.shippingDetails = response;
        // //console.log('this.shippingDetails', this.shippingDetails)
        let address = [];
        for (let i = 0; i < this.shippingDetails.length; i++) {
          address.push({
            address: this.shippingDetails[i].siteAddress,
            custAcctSiteId: this.shippingDetails[i].custAcctSiteId,
            shipToSiteUseId:this.shippingDetails[i].siteUseId,
          });
          this.siteAddress[index] = address;
        }
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddressText:(this.shippingDetails[0])? this.shippingDetails[0].partyAddress:'' });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress:(this.shippingDetails[0])? this.shippingDetails[0].custAcctSiteId:""  });
        
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName:(this.shippingDetails[0])? this.shippingDetails[0].partyName:"" });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipmentId:(this.shippingDetails[0])? this.shippingDetails[0].custAcctSiteId:"" });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: (this.shippingDetails[0])? this.shippingDetails[0].partyNumber:"" });
        //(this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipToSiteUseId: this.shippingDetails[0].siteUseId});
        this.spinnerService.hide();
      }
    });
  }
  onFocused(e) {
    // do something when input is focused
  }
  onChangeSearch(val: string) {
    if (this.routeHeader.value.accountype == '') {
      this.toastr.error('Please select account type', 'Assign Trip Point', {
        timeOut: 3000
      });
    }
    if (val.length > 3) {
      this.spinnerService.show();
      if (this.routeHeader.value.accountype == "CUSTOMER") {
        this.RouteService.getCustDetailsByName(val.toUpperCase()).subscribe((response) => {
          if (response) {
            this.searchResponse = response;
            this.spinnerService.hide();
          } else {
            this.toastr.warning('customer not found', 'Assign Trip Point', {
              timeOut: 3000
            });
          }
        });
      } else {
        this.RouteService.getSupplierByName(val.toUpperCase()).subscribe((response) => {
          if (response) {
            this.searchResponse = response;
            this.spinnerService.hide();
          } else {
            this.toastr.warning('vendor not found', 'Assign Trip Point', {
              timeOut: 3000
            });
          }
        });
      }
      this.resultFound = true;
    } else {
      this.searchResponse = [];
    }
  }
  onChangeSearchForAccountNumber(val: string) {
    if (val.length > 3) {
      this.spinnerService.show();
      this.RouteService.getCustShippingDetailsByAcctNo(val).subscribe((response) => {
        if (response) {
          this.shippingDetails = response;
          var obj = {};
          for ( var i=0, len=this.shippingDetails.length; i < len; i++ )
          obj[this.shippingDetails[i]['accountNumber']] = this.shippingDetails[i];
          this.shippingDetails = new Array();
          for ( var key in obj )
          this.shippingDetails.push(obj[key]);
          this.spinnerService.hide();
          // //console.log('this.shippingDetails',this.shippingDetails)
        }
      });
      this.resultFound = true;
    } else {
      this.shippingDetails = [];
    }
  }
  getShipingDetails(accountNumber, index) {
    this.spinnerService.show();
    this.RouteService.getCustShippingDetailsByAcctNo(accountNumber).subscribe((response) => {
      if (response) {
        this.shippingDetails = response;
        // //console.log('this.shippingDetails', this.shippingDetails)
        if (this.shippingDetails.length > 0) {
          let address = [];
          for (let i = 0; i < this.shippingDetails.length; i++) {
            address.push({
              address: this.shippingDetails[i].partyAddress,
              custAcctSiteId: this.shippingDetails[i].custAcctSiteId
            });
            this.siteAddress[index] = address;
          }
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName: this.shippingDetails[0].partyName });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipmentId: this.shippingDetails[0].custAcctSiteId });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: this.shippingDetails[0].partyNumber });
          // (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress: this.shippingDetails[0].partyShipId });
        }
        this.spinnerService.hide();
      }
    });
  }
  addToList(index) {
    this.routeHeader.controls['accountype'].enable();
    let routePointCode = "";
    let sequenceNumber = 0;
    let routePointContactName = "";
    let routePointContactNo = "";
    this.routeHeader.controls['accountype'].enable();
    // //console.log('this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddressText',this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddressText)
    if (this.routeHeader.value.accountype === 'CUSTOMER') {
      routePointCode = this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.accountNumber ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.accountNumber : this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber;
    } else {
      routePointCode = this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.vendorNum ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.vendorNum : this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber;
    }
    if (this.itemArray[index] == undefined) {
      sequenceNumber=this.itemArray.length;
      this.itemArray.push({
        "tripTransactionId": this.routeDetailsForHeader.tripTransactionId,
        "customerType": this.routeHeader.value.accountype,
        "routePointCode": routePointCode,
        "routePointName": this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName : this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName,
        "routePointId": this.routeDetailsForHeader.routeId,
        "routePointSequenceNo": sequenceNumber,
        "routeNumber": this.routeDetailsForHeader.routeNumber,
        "partyShipId": this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddress,
        "estimatedquantity": this.CreateIndentLineItem.controls.newIndtLItem.value[index].estimatedQuantity,
        "routePointContactName": this.CreateIndentLineItem.controls.newIndtLItem.value[index].partyNumber,
        "shippingAddress": this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddressText,
        // "routePointContactNo": "",
        "expectedArrivalTime": this.datePipe.transform(this.CreateIndentLineItem.controls.newIndtLItem.value[index].arrival, 'HH:mm:ss'),
        "expectedReachTime": "",
        "creationDate": this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
        "creationBy": 123,
        "lastUpdateDate": this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
        "lastUpdateBy": JSON.parse(localStorage.getItem('data')).userId,
        "lastUpdateLogin": 123,
        "routePointContactNo": this.CreateIndentLineItem.controls.newIndtLItem.value[index].routePointContactNo,
        "index": index,
        "shipToSiteUseId" : this.CreateIndentLineItem.controls.newIndtLItem.value[index].shipToSiteUseId,
        "unitOfMeasure": this.routeHeader.value.unitOfMeasure, //uom changes
        
      });
    } else {
      if(this.isDropDownDone==false){
        sequenceNumber=this.itemArray.length;
        this.itemArray[index].shipToSiteUseId = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shipToSiteUseId;
        this.itemArray[index].tripTransactionId = this.routeDetailsForHeader.tripTransactionId;
        this.itemArray[index].routePointId = this.routeDetailsForHeader.routeId;
        this.itemArray[index].customerType = this.routeHeader.value.accountype;
        this.itemArray[index].routeNumber = this.routeDetailsForHeader.routeNumber;
        this.itemArray[index].routePointCode = routePointCode;
        this.itemArray[index].routePointName = this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName : this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName;
        this.itemArray[index].routeId = this.routeDetailsForHeader.routeId;
        this.itemArray[index].routePointSequenceNo = sequenceNumber;
        this.itemArray[index].partyShipId = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddress;
        this.itemArray[index].estimatedquantity = this.CreateIndentLineItem.controls.newIndtLItem.value[index].estimatedQuantity;
        this.itemArray[index].routePointContactName = this.CreateIndentLineItem.controls.newIndtLItem.value[index].partyNumber;
        this.itemArray[index].shippingAddress = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddressText;
        this.itemArray[index].expectedArrivalTime = this.datePipe.transform(this.CreateIndentLineItem.controls.newIndtLItem.value[index].arrival, 'HH:mm:ss');
        this.itemArray[index].routePointContactNo = this.CreateIndentLineItem.controls.newIndtLItem.value[index].routePointContactNo;
        this.itemArray[index].index = index;
        this.itemArray[index].unitOfMeasure = this.routeHeader.value.unitOfMeasure; //uom changes
      } else {
        let ind=0;
        for (var i = 0; i < this.itemArray.length; i++) {
          if (this.itemArray[i].index == index) {
            ind=i;
          }
        }
        this.itemArray[ind].tripTransactionId = this.routeDetailsForHeader.tripTransactionId;
        this.itemArray[ind].routePointId = this.routeDetailsForHeader.routeId;
        this.itemArray[ind].customerType = this.routeHeader.value.accountype;
        this.itemArray[ind].routeNumber = this.routeDetailsForHeader.routeNumber;

        this.itemArray[ind].routePointCode = routePointCode;
        this.itemArray[ind].shipToSiteUseId = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shipToSiteUseId;
        this.itemArray[ind].routePointName = this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName.vendorName : this.CreateIndentLineItem.controls.newIndtLItem.value[index].recieverName;
        this.itemArray[ind].routeId = this.routeDetailsForHeader.routeId;
        this.itemArray[ind].routePointSequenceNo = sequenceNumber;
        this.itemArray[ind].partyShipId = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddress;
        this.itemArray[ind].estimatedquantity = this.CreateIndentLineItem.controls.newIndtLItem.value[index].estimatedQuantity;
        this.itemArray[ind].routePointContactName = this.CreateIndentLineItem.controls.newIndtLItem.value[index].partyNumber;
        this.itemArray[ind].shippingAddress = this.CreateIndentLineItem.controls.newIndtLItem.value[index].shippingAddressText;
        this.itemArray[ind].expectedArrivalTime = this.datePipe.transform(this.CreateIndentLineItem.controls.newIndtLItem.value[index].arrival, 'HH:mm:ss');
        this.itemArray[ind].routePointContactNo = this.CreateIndentLineItem.controls.newIndtLItem.value[index].routePointContactNo;
        this.itemArray[index].unitOfMeasure = this.routeHeader.value.unitOfMeasure; //uom changes
        // this.itemArray[index].index = index;
        // //console.log('ind',ind);
      }
    }
    // //console.log('this.itemArray', this.itemArray)
    this.toastr.success('Added To The List', 'Assign Trip Point', {
      timeOut: 3000
    });
    this.routeHeader.controls['accountype'].disable();
  }
  createTripePoint() {
    // //console.log('this.itemArray', this.itemArray)
    // this.estimatedTotalQuantity;
    this.routeHeader.controls['accountype'].enable();//uom changes
    if (this.routeHeader.value.accountype) {
      this.spinnerService.show();
      for (var i = 0; i < this.itemArray.length; i++) {
        this.estimatedTotalQuantity+=parseInt(this.itemArray[i].estimatedquantity);
        this.itemArray[i].unitOfMeasure = this.routeHeader.value.unitOfMeasure; // uom changes
      }
      this.routeDetailsForHeader.estimatedtotalQuantity=this.estimatedTotalQuantity;
      // this.routeDetailsForHeader.unitOfMeasure = this.routeHeader.value.unitOfMeasure;
      this.routeDetailsForHeader.tripPoints=this.itemArray;
      this.tripService.updateTripDetial(this.routeDetailsForHeader).subscribe((response) => {
        // //console.log('response',response);
        if (response){
          this.toastr.success('Trip point created successfully', 'Assign Trip Point', {
            timeOut: 3000
          });
          this.spinnerService.hide();
        }
      },
      error => {
        // //console.log(error);
        if(error.error.status==500){
          this.toastr.error(error.error.message, 'Assign Trip Point', {
            timeOut: 3000
          });
        }
        this.spinnerService.hide();
      });
      this.routeHeader.controls['accountype'].disable();//uom changes
    } else {
      this.routeHeader.controls['accountype'].enable();
      this.toastr.error('Please select account type', 'Assign Trip Point', {
        timeOut: 3000
      });
    }
  }
  search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].custAcctSiteId === nameKey) {
        return myArray[i];
      }
    }
  }
  addressSelected(value, itemArray, index) {
    const resultObject = this.search(value, itemArray);
    let accountNumber=this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.accountNumber ? this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber.accountNumber : this.CreateIndentLineItem.controls.newIndtLItem.value[index].accountNumber;
    if(this.CreateIndentLineItem.controls.newIndtLItem.value.length>1){
      for (let i = 0; i < this.CreateIndentLineItem.controls.newIndtLItem.value.length; i++) {
        let testAccountNumber=this.CreateIndentLineItem.controls.newIndtLItem.value[i].accountNumber.accountNumber ? this.CreateIndentLineItem.controls.newIndtLItem.value[i].accountNumber.accountNumber : this.CreateIndentLineItem.controls.newIndtLItem.value[i].accountNumber;
        let testShippingAddress=this.CreateIndentLineItem.controls.newIndtLItem.value[i].shippingAddress;
        if(testAccountNumber==accountNumber&&testShippingAddress==value&&i!=index){
          this.toastr.error('Please select different shipping address', 'Assign Route Point', {
            timeOut: 3000
          });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress: '' });
        } else {
          for (let j = 0; j < itemArray.length; j++) {
            if (itemArray[j].custAcctSiteId == value) {
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddressText: itemArray[j].address });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipToSiteUseId: itemArray[j].shipToSiteUseId});
            }
          }
        }
      }
    } else {
      for (let j = 0; j < itemArray.length; j++) {
        if (itemArray[j].custAcctSiteId == value) {
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddressText: itemArray[j].address });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shipToSiteUseId: itemArray[j].shipToSiteUseId});
        }
      }
    }
  }
  onChangeSearchForVendorNumber(val: string) {
    if (val.length > 3) {
      this.spinnerService.show();
      this.RouteService.getVendorByVendorNumber(val).subscribe((response) => {
        if (response) {
          this.vendorDetail=response;
          this.spinnerService.hide();
          // //console.log('this.vendorDetail', this.vendorDetail)
        }
      });
      this.resultFound = true;
    } 
  }
  selectEventForVendorNumber(item, index) {
    // //console.log('item',item);
    // //console.log('index',index);
    if (item) {
      const address = [];
      address.push({
        address: item.addressLine1,
        custAcctSiteId: item.vendorSiteId
      });
      this.siteAddress[index] = address;
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ recieverName: item.vendorName });
      // (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ shippingAddress: item.vendorSiteId });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ partyNumber: item.contactName });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ accountNumber: item.vendorNum });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ routePointContactName: item.contactName });
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ routePointContactNo: item.contactNumber });
    }
  }
  remove(index){
    let ind=0;
    if(this.isDropDownDone==false){
      this.itemArray.splice(index, 1);
    } else {
      for (var i = 0; i < this.itemArray.length; i++) {
        if (this.itemArray[i].index == index) {
          ind=i;
        }
      }
      // //console.log('ind',ind)
      this.itemArray.splice(ind, 1);
    }
    if (this.formArr.length >= 1) {
      this.formArr.removeAt(index);
    }
    this.toastr.error('Trip point removed', 'Assign Trip Point', {
      timeOut: 3000
    });
    // //console.log('this.itemArray',this.itemArray)
  }
  navigateToList(){
    this.router.navigate(['/transport/route/list-trip']);
  }
}
