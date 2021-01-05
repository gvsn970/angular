import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from 'src/app/shared/service/route.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { Router } from "@angular/router";
@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent {
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
  vehicleListkeyword: any;
  vendorListkeyword: any;
  driverListkeyword: any
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
  result: any;
  assignRouteNumberResponse: any;
  assignRouteNumber: any;
  enableAddPointsBtn: any = false;
  selectLabel: any = 'Select All';
  disabled: any = true;
  driverDisabled: any = true;
  vehicleregno = '';
  drivername = '';
  vehicleDriverinfo;
  unitOfMeasureList: any; //uom changes
  licenceNumber: string='';  // new changes 
  licenceType: string='';  // new changes 
  vendorType: string=''; // new changes 
  vendorCity: string=''; // new changes 
  isRouteAvailable: any;// new changes 
  vendorList: any=[];// new changes, 
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
    private RouteService: RouteService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService, private router: Router) {
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
    const formControls = this.Scheduleday.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.routeHeader = this.fb.group({
      routeType: ['', Validators.required],
      associateToDepartmentId: ['', Validators.required],
      routeNumber: ['', Validators.required],
      routeName: [''],
      startLocationList: ['', Validators.required],
      endLocationList: ['', Validators.required],
      // estimatedStartTime: ['', Validators.required],
      // estimatedEndTime: ['', Validators.required],
      routeDistInKm: [''],
      estimatedTotalQuantity: [''],
      paymentType: [''],
      paymentAmount: [''],
      ratePerKm: [''],
      routeDescription: [''],
      extraRate: [''],
      unitOfMeasure: ['', Validators.required], //uom changes
      accountType:['' , Validators.required],

    }
    );

    this.schduleList = this.fb.group({
      Scheduleday: new FormArray(formControls, this.minSelectedCheckboxes(1)),
      selectAll: selectAllControl,
      routeStartDate: ['', Validators.required],
      routeEndDate: ['', Validators.required],
      routeShift: ['', Validators.required],
      estimatedStartTime: ['', Validators.required],
      estimatedEndTime: ['', Validators.required],
    },
      {
        validator: StartDateAndEndDateValidation('routeStartDate', 'routeEndDate')
      });


    this.routeAssignmentList = this.fb.group({
      vehicleList: ['', Validators.required],
      driverList: ['', Validators.required],
      vehicleRegistered: 'register',
      driverRegistered: 'register',
      vendorName: ''
    });
    this.vehicleListkeyword = 'vehicleRegNumber';
    this.vendorListkeyword = 'vendorName';
    this.driverListkeyword = 'driverName';
    this.vehicleItemList = [];
    this.getVehicleMakeList();
    this.getAllDepartmentList();
    this.getShift();
    this.getPaymentType();
    this.onChanges();
    this.getSourceDestinationType();
    this.getUnitOfMeasure(); //uom changes
    this.getAccountType();
    this.vehicleStatus = 'Active';
    this.driverStatus = 'Active';
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

  get fa() {
    return this.schduleList.controls;
  }

  get fab() {
    return this.routeAssignmentList.controls;
  }

  routeRegister(radioValue) {
    if (radioValue === 'register') {
      this.disabled = true;
      this.vehicleregno='';
      this.vehicleType='';
      this.vehicleCapacity='';
      this.vehicleStatus='';
      this.drivername='';
    } if (radioValue === 'unregistered') {
      this.disabled = false;
      this.vehicleItemList=[];
    }
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

  onChanges(): void {
    this.schduleList.get('selectAll').valueChanges.subscribe(bool => {
      if (bool === true) {
        this.selectLabel = 'UnSelect All';
      }
      else {
        this.selectLabel = 'Select All';
      }
      this.schduleList.get('Scheduleday').patchValue(Array(this.Scheduleday.length).fill(bool), { emitEvent: false });
    });
    this.schduleList.get('Scheduleday').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (allSelected === false) {
        this.selectLabel = 'Select All';
      }
      else {
        this.selectLabel = 'UnSelect All';
      }
      if (this.schduleList.get('selectAll').value !== allSelected) {
        this.schduleList.get('selectAll').patchValue(allSelected, { emitEvent: false });
      }
    });
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

  getVehicleMakeList() {
    this.RouteService.getDropDownList('ALL', 'ALL', 'ROUTE_TYPE').subscribe(res => {
      this.routeTypeList = res;
    });
  }

  getShift() {
    this.RouteService.getDropDownList('ALL', 'ALL', 'SHIFT').subscribe(res => {
      this.shiftList = res;
    });
  }

  getPaymentType() {
    this.RouteService.getDropDownList('ALL', 'ALL', 'PAYMENT_TYPE').subscribe(res => {
      this.paymentTypeList = res;
    });
  }



  getAllDepartmentList() {
    this.RouteService.getAllDepartmentList().subscribe(res => {
      this.departmentList = res;
    });
  }

  getSourceDestinationType() {
    this.RouteService.getSourceDestinationType().subscribe(res => {
      this.typeList = res;
      console.log('this.typeList',this.typeList)
    });
  }

  sourceTypeVal(val) {
    this.RouteService.getLocationByType(val).subscribe(res => {
      this.startPointList = res;
    });
  }

  destinationTypeVal(val) {
    this.RouteService.getLocationByType(val).subscribe(res => {
      this.endPointList = res;
    });
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {
      // this.customerBlank = true;
    }
    if (val.length > 3) {
      this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
        if (response){
          this.vehicleItemList = response;
          this.vehicleAvailable = true;
        }
      });
    }
    else {
      this.vehicleItemList = [];
      this.vehicleType = '';
      this.vehicleCapacity = '';
      this.vehicleStatus = '';
      this.vehicleAvailable = false;
    }
  }

  selectEvent(item) {
    this.vehicleType = item.vehicleType;
    this.vehicleCapacity = item.capacity;
    this.vehicleStatus = item.status;
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

  toUpper(value) {
    this.routeHeader.patchValue({
      routeNumber: value.toUpperCase()
    })
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
  isValideDate(startTime, endTime) {
    return Date.parse(`01/01/2011 ${startTime}`) < Date.parse(`01/01/2011 ${endTime}`)
  }
  createRoute(routeHeader, schduleList, routeAssignmentList) {
    // console.log('schduleList',schduleList)
    var routeHeaderVal = routeHeader.form.value;
    var schduleListVal = schduleList.form.value;
    var routeAssignmentVal = routeAssignmentList.form.value;
    var estimatedStartTime = this.datePipe.transform(schduleListVal.estimatedStartTime, 'HH:mm:ss');
    var estimatedEndTime = this.datePipe.transform(schduleListVal.estimatedEndTime, 'HH:mm:ss');
    if ((schduleListVal.estimatedEndTime !== '' || schduleListVal.estimatedEndTime !== null) && (routeHeaderVal.estimatedStartTime !== '' && routeHeaderVal.estimatedStartTime !== null)) {
      var diff = (schduleListVal.estimatedEndTime.getTime() - schduleListVal.estimatedStartTime.getTime());
      var durationTime = Math.abs(Math.round(diff));
      this.timeConversion(durationTime);
    }

    var routeStartDate = this.datePipe.transform(schduleListVal.routeStartDate, 'dd-MM-yyyy');
    var routeEndDate = this.datePipe.transform(schduleListVal.routeEndDate, 'dd-MM-yyyy');

    var startLocationList = routeHeaderVal.startLocationList === null ? '' : routeHeaderVal.startLocationList.split("/");
    var endLocationList = routeHeaderVal.endLocationList === null ? '' : routeHeaderVal.endLocationList.split("/");
    this.result = this.isValideDate(estimatedStartTime, estimatedEndTime);

    if (routeAssignmentVal.vehicleList.vehicleRegNumber === undefined) {
      this.vehicleAvailable = false;
    }
    else {
      this.vehicleAvailable = true;
    }

    if (routeAssignmentVal.driverList.driverName === undefined) {
      this.driverAvailable = false;
    }
    else {
      this.driverAvailable = true;
    }
    this.submitted = true;
    if (this.routeHeader.invalid && this.schduleList.invalid && this.routeAssignmentList.invalid && !this.vehicleAvailable && !this.driverAvailable) {
      //this.submitted = false;
      return;
    }
    if (this.routeHeader.valid && this.schduleList.valid && this.routeAssignmentList.valid) {
      var departmentVal = routeHeaderVal.associateToDepartmentId.split('/');
      var depId = departmentVal[0];
      var depName = departmentVal[1];
      if (this.result == false) {
        this.toastr.error('End Time can not be before Start Time', 'Error', {
          timeOut: 4000
        });
        return;
      }
      var dataToSend =
      {
        // "routeId": 21,
        "routeNumber": routeHeaderVal.routeNumber,
        "routeName": routeHeaderVal.routeName,
        "routeType": routeHeaderVal.routeType,
        "associateToDepartmentId": depId,
        "associateToDepartmentName": depName,
        "routeDescription": routeHeaderVal.routeDescription,
        "vehicleId": this.vehicleregno!=''?'': routeAssignmentVal.vehicleList.vehicleId == null || routeAssignmentVal.vehicleList.vehicleId == undefined ? '' : routeAssignmentVal.vehicleList.vehicleId,
        "vehicleType": this.vehicleType!=''?this.vehicleType: routeAssignmentVal.vehicleList.vehicleType == null || routeAssignmentVal.vehicleList.vehicleType == undefined ? this.vehicleType : routeAssignmentVal.vehicleList.vehicleType,
        "vehicleNumber": this.vehicleregno!=''?this.vehicleregno: routeAssignmentVal.vehicleList.vehicleRegNumber == null || routeAssignmentVal.vehicleList.vehicleRegNumber == undefined ? this.vehicleregno : routeAssignmentVal.vehicleList.vehicleRegNumber,
        "driverId": this.drivername!=''?'': routeAssignmentVal.driverList.driverId == null || routeAssignmentVal.driverList.driverId == undefined ? '' : routeAssignmentVal.driverList.driverId,
        "driverName": this.drivername!=''?this.drivername: routeAssignmentVal.driverList.driverName == null || routeAssignmentVal.driverList.driverName == undefined ? this.drivername : routeAssignmentVal.driverList.driverName,
        "vehicleCapInKg": this.vehicleCapacity!=''?this.vehicleCapacity: routeAssignmentVal.vehicleList.capacityUnits == null || routeAssignmentVal.vehicleList.capacityUnits == undefined ? this.vehicleCapacity : routeAssignmentVal.vehicleList.capacityUnits,
        "transporterId": this.vendorNum,
        "transporterName": this.vendorName,
        "paymentType": routeHeaderVal.paymentType,
        "paymentAmount": routeHeaderVal.paymentAmount,
        "extraRate": this.routeHeader.value.extraRate,
        "ratePerKm": routeHeaderVal.ratePerKm,  
        "routeStartDate": routeStartDate,
        "routeEndDate": routeEndDate,
        "routeDistInKm": routeHeaderVal.routeDistInKm,
        "routTimeInHHMM": this.duration,
        "monday": schduleListVal.Scheduleday[0] === true ? 'Y' : 'N',
        "tuesday": schduleListVal.Scheduleday[1] === true ? 'Y' : 'N',
        "wednesday": schduleListVal.Scheduleday[2] === true ? 'Y' : 'N',
        "thursday": schduleListVal.Scheduleday[3] === true ? 'Y' : 'N',
        "friday": schduleListVal.Scheduleday[4] === true ? 'Y' : 'N',
        "saturday": schduleListVal.Scheduleday[5] === true ? 'Y' : 'N',
        "sunday": schduleListVal.Scheduleday[6] === true ? 'Y' : 'N',
        "startLocationId": startLocationList[1],
        "startLocationName": startLocationList[0],
        "estimatedStartTime": estimatedStartTime,
        "estimatedEndTime": estimatedEndTime,
        "endLocationId": endLocationList[1],
        "endLocationName": endLocationList[0],
        "routeStatus": "ACTIVE",
        "routeShift": schduleListVal.routeShift,
        "estimatedTotalQuantity": routeHeaderVal.estimatedTotalQuantity,
        "creationDate": this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
        "createdBy": JSON.parse(localStorage.getItem('data')).userId,
        "lastUpdateDate": this.datePipe.transform(new Date(), 'dd-MM-yyyy'),
        "lastUpdateBy": JSON.parse(localStorage.getItem('data')).userId,
        "lastUpdateLogin": JSON.parse(localStorage.getItem('data')).userId,
        "unitOfMeasure": routeHeaderVal.unitOfMeasure, //uom changes
        "accountType" : routeHeaderVal.accountType, //account type 
        "routePoint": [],
        "routeSchedule": {
          "routeNumber": routeHeaderVal.routeNumber,
          "routeStartDate": routeStartDate,
          "routeEndDate": routeEndDate,
          "shift": schduleListVal.routeShift,
          "monday": schduleListVal.Scheduleday[0] === true ? 'scheduled' : '',
          "tuesday": schduleListVal.Scheduleday[1] === true ? 'scheduled' : '',
          "wednesday": schduleListVal.Scheduleday[2] === true ? 'scheduled' : '',
          "thursday": schduleListVal.Scheduleday[3] === true ? 'scheduled' : '',
          "friday": schduleListVal.Scheduleday[4] === true ? 'scheduled' : '',
          "saturday": schduleListVal.Scheduleday[5] === true ? 'scheduled' : '',
          "sunday": schduleListVal.Scheduleday[6] === true ? 'scheduled' : '',
          "creationDate": "27-12-2019",
          "lastUpdatedDate": "27-12-2019",
          "createdBy": 3032,
          "lastUpdatedBy": "3032",
          "lastUpdateLogin": 3032
        }
      }
      // console.log(dataToSend); 
      this.RouteService.saveRoute(dataToSend).subscribe(res => {
        this.enableAddPointsBtn = true;
        this.assignRouteNumberResponse = res;
        this.assignRouteNumber = this.assignRouteNumberResponse.routeNumber;
        this.toastr.success('Sucessfully Created New Route', 'Create New Route');
        this.router.navigateByUrl('/transport/route/list-routes');
      },
        error => {
          this.toastr.error(error.error.message, 'Create New Route', {
            timeOut: 4000
          });
        }
      );
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
}
