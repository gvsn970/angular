import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TripService } from 'src/app/shared/service/trip.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { Router } from "@angular/router";
import { RouteService } from 'src/app/shared/service/route.service';
@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  startTime: Date;
  endTime: Date;
  pointStartTime: Date;
  PointEndTime: Date;
  TransportRoute: FormGroup;
  routeHeader: FormGroup;
  submitted = false;
  routeType: any[] = ['Route Type', 'Multi-Point'];
  status: any[] = ['Draft', 'Active', 'Inactive'];
  shift: any[] = ['Morning', 'Evening', 'Both'];
  typeList: any;
  routeTypeList: any;
  shiftList: any;
  paymentTypeList: any;
  departmentList: any;
  startPointList: any;
  endPointList: any;
  schduleList: FormGroup;
  routeAssignmentList: FormGroup;
  vehicleItemList: any;
  vehicleList: any;
  vehicleListkeyword: any;
  driverListkeyword: any;
  vendorListkeyword: any;
  vehicleKeyword: any;
  vehicleType: any = '';
  vehicleStatus: any = '';
  vehicleCapacity: any = '';
  driverStatus: any = '';
  driverMobNumber: any = '';
  driverItemList: any;
  vendorDetails: any = '';
  vendorName: any = '';
  vendorNum: any = '';
  vehicleAvailable: any;
  driverAvailable: any;
  duration: any;
  assignRouteNumberResponse: any;
  assignRouteNumber: any;
  enableAddPointsBtn: any = false;
  selectLabel: any = 'Select All';
  vechicleTypeList: any;
  vendorNumber: any = '';
  transporterName: any = '';
  userData: any;
  result;
  disabled:any = true;
  vehicleId: any;
  driverId: any;
  transporter: any;
  unitOfMeasureList: any; //uom changes
  licenceNumber: string='';  // new changes 
  licenceType: string='';  // new changes 
  vendorType: string=''; // new changes 
  vendorCity: string=''; // new changes 
  isRouteAvailable: any;// new changes 
  vendorList: any=[];// new changes, 
  driverDisabled: any = true;// new changes, 
  vehicleregno = '';// new changes, 
  drivername = '';// new changes, 
  accountTypeResponse: any = []; // ACCOUNT TYPE
  Scheduleday = [
    { id: 'MONDAY', weekday: 'MONDAY' },
    { id: 'TUESDAY', weekday: 'TUESDAY' },
    { id: 'WEDNESDAY', weekday: 'WEDNESDAY' },
    { id: 'THURSDAY', weekday: 'THURSDAY' },
    { id: 'FRIDAY', weekday: 'FRIDAY' },
    { id: 'SATURDAY', weekday: 'SATURDAY' },
    { id: 'SUNDAY', weekday: 'SUNDAY' }
  ];
  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    private tripService: TripService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService, private router: Router,
    private RouteService: RouteService) {
    this.startTime = new Date();
    this.endTime = new Date();
    this.pointStartTime = new Date();
    this.PointEndTime = new Date();

    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        minDate: new Date(),
      });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.minDate.getDate() - 1);
  }


  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    const formControls = this.Scheduleday.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.routeHeader = this.fb.group({
      routeType: ['', Validators.required],
      associateToDepartmentId: ['', Validators.required],
      routeNumber: ['', Validators.required],
      routeName: [''],
      startLocationList: ['', Validators.required],
      endLocationList: ['', Validators.required],
      estimatedStartTime: ['', Validators.required],
      estimatedEndTime: ['', Validators.required],
      routeDistInKm: [''],
      estimatedTotalQuantity: [''],
      paymentType: [''],
      paymentAmount: [''],
      ratePerKm: [''],
      routeDescription: [''],
      scheduleDate: [new Date(), Validators.required],
      routeShift: ['', Validators.required],
      vehicleType: [],
      capacityQuantity: [''],
      unitOfMeasure: ['', Validators.required], //uom changes
      accountType:['', Validators.required],
    }
    );

    this.routeAssignmentList = this.fb.group({
      vehicleList: [''],
      driverList: [''],
      // vehicleNumber: ['', Validators.required],
      // driverName: ['', Validators.required],
      vendorId: [''],
      mobileNumber: [''],
      vehicleRegistered: 'register',
      driverRegistered: 'register',
      vendorName: ''
    });
    this.vehicleListkeyword = 'vehicleRegNumber';
    this.driverListkeyword = 'driverName';
    this.vehicleKeyword = 'vehicleRegNumber';
    this.vendorListkeyword = 'vendorName';
    this.vehicleItemList = [];
    this.vehicleList = [];
    this.getVehicleMakeList();
    this.getAllDepartmentList();
    this.getShift();
    this.getPaymentType();
    this.onChanges();
    this.getSourceDestinationType();
    this.getVechicleType();
    this.getUnitOfMeasure(); //uom changes
    this.getAccountType();
  }

//uom changes
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

  get f() {
    return this.routeHeader.controls;
  }

  isValideDate(startTime, endTime) {
    return Date.parse(`01/01/2011 ${startTime}`) < Date.parse(`01/01/2011 ${endTime}`)
  }

  get fab() {
    return this.routeAssignmentList.controls;
  }

  onChanges(): void {
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  getVechicleType() {
    this.tripService.getDropDownList('ALL', 'ALL', 'VEHICLE_TYPE').subscribe(res => {
      this.vechicleTypeList = res;
    })
  }

  getVehicleMakeList() {
    this.tripService.getDropDownList('ALL', 'ALL', 'ROUTE_TYPE').subscribe(res => {
      this.routeTypeList = res;
    });
  }

  getShift() {
    this.tripService.getDropDownList('ALL', 'ALL', 'SHIFT').subscribe(res => {
      this.shiftList = res;
    });
  }

  getPaymentType() {
    this.tripService.getDropDownList('ALL', 'ALL', 'PAYMENT_TYPE').subscribe(res => {
      this.paymentTypeList = res;
    });
  }



  getAllDepartmentList() {
    this.tripService.getAllDepartmentList().subscribe(res => {
      this.departmentList = res;
    });
  }

  getSourceDestinationType() {
    this.tripService.getSourceDestinationType().subscribe(res => {
      this.typeList = res;
    });
  }

  sourceTypeVal(val) {
    this.tripService.getLocationByType(val).subscribe(res => {
      this.startPointList = res;
    });
  }

  destinationTypeVal(val) {
    this.tripService.getLocationByType(val).subscribe(res => {
      this.endPointList = res;
    });
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {

    }
    if (val.length > 3) {
      this.tripService.getbyvendornameornumberTransporter(val).subscribe((response) => {
        if (response)
          this.vehicleItemList = response;

      });
    }
    else {
      this.vehicleItemList = [];
    }
  }
  // onChangeVehicleSearch(val: string) {
  //   if (val.length === 0) {
  //     // this.customerBlank = true;
  //   }
  //   if (val.length > 3) {
  //     this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
  //       if (response)
  //         this.vehicleList = response;
  //         if(this.vehicleList.length==0){
  //           this.routeAssignmentList.patchValue({
  //             vehicleNumber: ''
  //           });
  //         } else {
  //           this.RouteService.getAssignmentsByVehicleId(this.vehicleList[0].vehicleId).subscribe((resp) => {
  //             this.transporter=resp;
  //             if(this.transporter.length!=0){
  //               this.routeAssignmentList.patchValue({
  //                 vendorId: this.transporter[0].vehicleDescription,
  //                 driverName: this.transporter[0].driverName
  //               });
  //               this.vendorNumber = this.transporter[0].vendorId;
  //               this.transporterName=this.transporter[0].vehicleDescription;
  //             } else {
  //               this.routeAssignmentList.patchValue({
  //                 vendorId: '',
  //                 driverName: ''
  //               });
  //               this.vendorNumber = '';
  //               this.transporterName = '';
  //             }
              
  //           });
  //         }
  //     });
  //     this.vehicleAvailable = true;
  //   }
  //   else {
  //     this.vehicleList = [];
  //     this.vehicleType = '';
  //     this.vehicleCapacity = '';
  //     this.vehicleStatus = '';
  //     this.vehicleAvailable = false;
  //   }
  // }
  onChangeVehicleSearch(val: string) {
    if (val.length === 0) {
      // this.customerBlank = true;
    }
    if (val.length > 3) {
      this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
        if (response)
          this.vehicleItemList = response;
      });
      this.vehicleAvailable = true;
    }
    else {
      this.vehicleItemList = [];
      this.vehicleType = '';
      this.vehicleCapacity = '';
      this.vehicleStatus = '';
      this.vehicleAvailable = false;
    }
  }
  onChangeSearchDriver(val) {
    if (val.length === 0) {
      // this.customerBlank = true;
    }
    if (val.length > 3) {
      this.RouteService.getDriverDetialsByLicenceNumberOrDriverName(val).subscribe((response) => {
        if (response)
          this.driverItemList = response;
        // if (this.driverItemList.length == 0) {
        //   console.log('called');
        //   this.routeAssignmentList.patchValue({
        //     vehicleList: ''
        //   })
        // }
      });
      this.driverAvailable = true;

    }
    else {
      this.driverItemList = [];
      this.driverStatus = '';
      this.driverMobNumber = '';
      this.vendorName = '';
      this.vendorNum = '';
      this.driverAvailable = false;
      this.licenceNumber = ''; // new changes 
      this.licenceType = ''; // new changes
    }
  }
  selectEvent(item) {
    this.vendorNumber = item.vendorNum;
    this.transporterName = item.vendorName;
    this.vehicleType = item.vehicleType;
    this.vehicleCapacity = item.capacity;
    this.vehicleStatus = item.status;
  }
  selectDriverEvent(item) {
    this.driverStatus = item.status;
    this.driverMobNumber = item.mobileNumber;
    this.licenceNumber = item.licenceNumber; // new changes 
    this.licenceType = item.licenceType; // new changes 
    if (item.driverAssignmentsList !== undefined) {
      const vendorId = item.driverAssignmentsList[0].vendorId;
      this.RouteService.getVendorDetailsByVendorId(vendorId).subscribe((response) => {
        if (response) {
          this.vendorDetails = response;
          this.vendorName = this.vendorDetails.vendorName;
          this.vendorNum = this.vendorDetails.vendorNum;
        }
      });
    }

  }
  selectVehicleEvent(item){
    this.vehicleId = item.vehicleId;
    this.RouteService.getAssignmentsByVehicleId(this.vehicleId).subscribe((resp) => {
      this.transporter=resp;
      if(this.transporter.length!=0){
        this.routeAssignmentList.patchValue({
          vendorId: this.transporter[0].vehicleDescription,
          driverName: this.transporter[0].driverName
        });
        this.transporterName=this.transporter[0].vehicleDescription;
        this.vendorNumber = this.transporter[0].vendorId;
      } else {
        this.routeAssignmentList.patchValue({
          vendorId: '',
          driverName: ''
        });
        this.vendorNumber = '';
        this.transporterName='';
      }
    });
  }
  // onChangeSearchDriver(val) {
  //   if (val.length === 0) {
  //     // this.customerBlank = true;
  //   }
  //   if (val.length > 3) {
  //     this.tripService.getDriverDetialsByLicenceNumberOrDriverName(val).subscribe((response) => {
  //       if (response)
  //         this.driverItemList = response;
  //     });
  //     this.driverAvailable = true;

  //   }
  //   else {
  //     this.driverItemList = [];
  //     this.driverStatus = '';
  //     this.driverMobNumber = '';
  //     this.vendorName = '';
  //     this.vendorNum = '';
  //     this.driverAvailable = false;
  //   }
  // }

  // selectDriverEvent(item) {
  //   // console.log('item',item);
  //   this.driverId=item.driverId;
  //   this.driverStatus = item.status;
  // }

  onFocused(e) {
    // do something when input is focused
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    return true;
  }


  alphanumbericOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (!(charCode > 47 && charCode < 58) && // numeric (0-9)
      !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
      !(charCode > 96 && charCode < 123)) { // lower alpha (a-z)
      return false;
    }
    return true;
  }

  toUpper(value, type) {
    if (type === 'routeNumber') {
      this.routeHeader.patchValue({
        routeNumber: value.toUpperCase(),
      });
    }
    else if (type === 'vehicleNumber') {
      this.routeAssignmentList.patchValue({
        vehicleNumber: value.toUpperCase(),

      });
    }
    else if (type === 'driverName') {
      this.routeAssignmentList.patchValue({
        driverName: value.toUpperCase(),
      });

    }

  }

  timeConversion(millisec) {

    var hours = millisec / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    this.duration = h + ':' + m + ':' + s;
  }

  resetRouteVal() {
    this.routeHeader.reset();
    this.schduleList.reset();
    this.routeAssignmentList.reset();
  }
  routeRegister(radioValue) {
    if (radioValue === 'register') {
        this.disabled = true;
    } if(radioValue ==='unregistered') {
        this.disabled = false;
        this.routeAssignmentList.patchValue({
          vehicleNumber: '',
          driverName: '',
          vendorId: '',
        });
        this.vehicleId='';
        this.driverId='';
        this.vendorNumber = '';
        this.transporterName = '';
    }
  }


  createRoute(routeHeader, schduleList, routeAssignmentList) {
    var routeHeaderVal = routeHeader.form.value;
    var routeAssignmentVal = routeAssignmentList.form.value;
    var estimatedStartTime = this.datePipe.transform(routeHeaderVal.estimatedStartTime, 'HH:mm:ss');
    var estimatedEndTime = this.datePipe.transform(routeHeaderVal.estimatedEndTime, 'HH:mm:ss');

    if ((routeHeaderVal.estimatedEndTime !== '' || routeHeaderVal.estimatedEndTime !== null) && (routeHeaderVal.estimatedStartTime !== '' && routeHeaderVal.estimatedStartTime !== null)) {
      var diff = (routeHeaderVal.estimatedEndTime.getTime() - routeHeaderVal.estimatedStartTime.getTime());
      //diff /= 60;
      var durationTime = Math.abs(Math.round(diff));
      this.timeConversion(durationTime);
    }
    var scheduleDate = this.datePipe.transform(routeHeaderVal.scheduleDate, 'dd-MM-yyyy');
    var startLocationList = routeHeaderVal.startLocationList === null ? '' : routeHeaderVal.startLocationList.split("/");
    var endLocationList = routeHeaderVal.endLocationList === null ? '' : routeHeaderVal.endLocationList.split("/");

    this.submitted = true;
    if (this.routeHeader.invalid && this.routeAssignmentList.invalid) {
      return;
    }
    this.result = this.isValideDate(estimatedStartTime, estimatedEndTime);
    if (this.result == false) {
      this.toastr.error('End Time can not be before Start Time', 'Error', {
        timeOut: 4000
      });
      return;
    }
    if (this.routeHeader.valid && this.routeAssignmentList.valid) {
      var departmentVal = routeHeaderVal.associateToDepartmentId.split('/');
      var depId = departmentVal[0];
      var depName = departmentVal[1];
      var dataToSend =
      {
        "routeId": 1111,
        "routeNumber": routeHeaderVal.routeNumber,
        "routeName": routeHeaderVal.routeName,
        "routeType": routeHeaderVal.routeType,
        "associateToDepartmentId": depId,
        "associateToDepartmentName": depName,
        "vehicleId": this.vehicleregno!=''?'': routeAssignmentVal.vehicleList.vehicleId == null || routeAssignmentVal.vehicleList.vehicleId == undefined ? '' : routeAssignmentVal.vehicleList.vehicleId,
        "driverId": this.drivername!=''?'': routeAssignmentVal.driverList.driverId == null || routeAssignmentVal.driverList.driverId == undefined ? '' : routeAssignmentVal.driverList.driverId,
        "transporterId": this.vendorNum,
        "scheduleDate": scheduleDate,
        "paymentAmount": routeHeaderVal.paymentAmount,
        "routeStatus": "SCHEDULED",
        "estimatedKm": null,
        "actualKm": null,
        "routeShift": routeHeaderVal.routeShift,
        "estimatedtotalQuantity": routeHeaderVal.estimatedTotalQuantity,
        "capacityQuantity": routeHeaderVal.capacityQuantity,
        "actualTotalQuantity": null,
        "quantityKgs": null,
        "startLocation": startLocationList[0],
        "estimatedStartTime": estimatedStartTime,
        "actualStartTime": null,
        "estimatedEndTime": estimatedEndTime,
        "actualEndTime": null,
        "remarks": null,
        "creationDate": this.sharedService.getDate(),
        "endLocation": endLocationList[0],
        "creationBy": this.userData.userId,
        "lastUpdateDate": null,
        "lastUpdatedBy": this.userData.userId,
        "lastUpdateLogin": null,
        "receivedQty": null,
        "returnQuantity": null,
        "vehicleNumber": this.vehicleregno!=''?this.vehicleregno: routeAssignmentVal.vehicleList.vehicleRegNumber == null || routeAssignmentVal.vehicleList.vehicleRegNumber == undefined ? this.vehicleregno : routeAssignmentVal.vehicleList.vehicleRegNumber,
        "vehicleType": this.vehicleType!=''?this.vehicleType: routeAssignmentVal.vehicleList.vehicleType == null || routeAssignmentVal.vehicleList.vehicleType == undefined ? this.vehicleType : routeAssignmentVal.vehicleList.vehicleType,
        "transporterName": this.vendorName,
        "driverName": this.drivername!=''?this.drivername: routeAssignmentVal.driverList.driverName == null || routeAssignmentVal.driverList.driverName == undefined ? this.drivername : routeAssignmentVal.driverList.driverName,
        "routeDistanceInKm": routeHeaderVal.routeDistInKm,
        "routeDistanceInTime": null,
        "endLocationId": endLocationList[1],
        "startLocationId": startLocationList[1],
        "totalCrates": null,
        "returnCrates": null,
        "randomChecked": null,
        "mobileNumber": routeAssignmentVal.mobileNumber,
        "unitOfMeasure": routeHeaderVal.unitOfMeasure, //uom changes
        "accountType" : routeHeaderVal.accountType,
        "tripPoints": []
      }
      // this.routeHeader.patchValue({
      //   scheduleDate: this.datePipe.transform(routeHeader.form.value.scheduleDate, 'dd-MM-yyyy'),

      // });
      // console.log('dataToSend',dataToSend)
      this.tripService.saveTrip(dataToSend).subscribe(res => {
        this.enableAddPointsBtn = true;
        this.assignRouteNumberResponse = res;
        //this.assignRouteNumber = this.assignRouteNumberResponse.tripTransactionId;
        this.toastr.success('Sucessfully Created', 'Create New Trip');
        this.router.navigateByUrl('/transport/route/list-trip');
      },
        error => {
          this.toastr.error(error.error.message, 'Create New Trip', {
            timeOut: 4000
          });
        });
    }
  }
  onChangeVendorSearch(val: string) {
    // console.log('val.length',val.length)
    if (val.length > 3) {
      this.RouteService.getbyvendornameornumberTransporter(val).subscribe((response) => {
        if (response)
          this.vendorList = response;
      });
    }
    else {
      this.vendorList = [];
    }
  }
  selectVendorEvent(item) {
    // console.log('item',item)
    this.vendorNum = item.vendorNumber;
    this.vendorCity = item.city;
    this.vendorType = item.vendorType;
    this.vendorName = item.vendorName;
  }
  searchVendor(selection) {
    if(selection.length>3){
      this.routeNumberCheck(selection);
    } else if(selection.length==0){
      this.routeNumberCheck(selection);
    }   
  }
  routeNumberCheck(routeNumber){
    this.RouteService.routeCheck(routeNumber).subscribe((response) => {
        this.isRouteAvailable = response;
        if(this.isRouteAvailable==true){
          this.isRouteAvailable=true;
        } else {
          this.isRouteAvailable=false;
        }
    });
  }
  driverRegister(radioValue) {
    if (radioValue === 'register') {
      this.driverDisabled = true;
      this.vehicleregno='';
      this.vehicleType='';
      this.vehicleCapacity='';
      this.vehicleStatus='';
      this.drivername='';
    } if (radioValue === 'unregistered') {
      this.driverDisabled = false;
      this.driverItemList=[];
    }
  }
}
