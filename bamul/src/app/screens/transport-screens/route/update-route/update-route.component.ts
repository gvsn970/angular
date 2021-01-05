
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouteService } from 'src/app/shared/service/route.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit {
  routeID: any;
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
  routeDetails: any;
  shiftList: any;
  paymentTypeList: any;
  departmentList: any;
  startPointList: any;
  endPointList: any;
  schduleList: FormGroup;
  routeAssignmentList: FormGroup;
  vehicleItemList: any;
  vehicleListkeyword: any;
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
  showPointUpdate: any = false;
  vehicleNumber: any;
  vehicleID: any;
  driverName: any;
  driverID;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  daysSelected: any;
  selectLabel: any;
  result: any;
  tripStatus;
  disabled:any = true;
  driverDisabled:any = true;
  vehicleregno = '';
  drivername = '';
  unitOfMeasureList: any;//uom changes
  licenceNumber: string='';  // new changes 
  licenceType: string='';  // new changes 
  vendorType: string=''; // new changes 
  vendorCity: string=''; // new changes 
  isRouteAvailable: any;// new changes 
  vendorList: any=[];// new changes 
  vendorResponse: any;
  driverResponse: any;
  vehicleResponse: any;
  vendorListkeyword: any;
  vehicleId:any;
  driverId: any;
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
  routePoint;

  constructor(private activatedRoute: ActivatedRoute, private RouteService: RouteService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService, private router: Router) {
    this.startTime = new Date();
    this.endTime = new Date();
    this.pointStartTime = new Date();
    this.PointEndTime = new Date();
    this.masterSelected = false;
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
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.routeID = params['id'];
      }
    });

    this.getRouteDetailsByRouteId(this.routeID);
    const formControls = this.Scheduleday.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.routeHeader = this.fb.group({
      routeType: ['', Validators.required],
      associateToDepartmentId: ['', Validators.required],
      routeNumber: ['', Validators.required],
      routeName: [''],
      startLocationList: ['', Validators.required],
      endLocationList: ['', Validators.required],
      routeDistInKm: [''],
      estimatedTotalQuantity: [''],
      paymentType: [''],
      paymentAmount: [''],
      ratePerKm: [''],
      routeDescription: [''],
      startLocationName: [''],
      endLocationName: [''],
      routeStatus: [''],
      extraRate: [''],
      unitOfMeasure: ['', Validators.required], //uom changes
      accountType : ['', Validators.required],
    });
    this.schduleList = this.fb.group({
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
      vehicleList: [''],
      driverList: [''],
      vehicleType: [],
      vehicleCapacity: [],
      vehicleStatus: [],
      vehicleRegistered: 'register',
      driverRegistered:'register',
      vendorName: '',
      vehicleId: '',
      driverId: ''
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
    this.getTripStatus();
    this.getUnitOfMeasure();//uom changes
    this.getAccountType();
    this.routeAssignmentList.controls['vehicleType'].disable();
    this.routeAssignmentList.controls['vehicleCapacity'].disable();
    this.vehicleStatus = 'Active';
    this.driverStatus ='Active';
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
  getTripStatus() {
    this.RouteService.getNewRouteStatus().subscribe(res => {
      this.tripStatus = res;
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

  checkUncheckAll() {
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  routeRegister(radioValue) {
    if (radioValue === 'register') {
        this.disabled = true;
        this.routeAssignmentList.controls['vehicleType'].disable();
        this.routeAssignmentList.controls['vehicleCapacity'].disable();
        
    } if(radioValue ==='unregistered') {
        this.disabled = false;
        this.routeAssignmentList.controls['vehicleType'].enable();
        this.routeAssignmentList.controls['vehicleCapacity'].enable();
        
    }
  }

  driverRegister(radioValue) {
    if (radioValue === 'register') {
        this.driverDisabled = true;
    } if(radioValue ==='unregistered') {
        this.driverDisabled = false;
    }
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }
    if (this.checkedList.length === 7) {
      this.masterSelected = true;
      this.selectLabel = 'UnSelect All';
    }
    else {
      this.selectLabel = 'Select All';
    }
  }

  getRouteDetailsByRouteId(routeId) {
    this.RouteService.getRouteByRouteID(routeId).subscribe((response) => {
      if (response) {
        this.routeDetails = response;
        this.routePoint = this.routeDetails.routePoint;
        // console.log('this.routeDetails',this.routeDetails)
        //setting time to timepicker
        let estimatedEndTimeDate = new Date();
        if(this.routeDetails.estimatedEndTime!=null){
          let estimatedEndTime = this.routeDetails.estimatedEndTime.split(":");
          let estimatedEndHours = estimatedEndTime[0];
          let estimatedEndMinutes = estimatedEndTime[1];
          estimatedEndTimeDate.setHours(estimatedEndHours);
          estimatedEndTimeDate.setMinutes(estimatedEndMinutes)
        }
        let estimatedStartTimeDate = new Date();
        if(this.routeDetails.estimatedStartTime!=null){
          let estimatedStartTime = this.routeDetails.estimatedStartTime.split(":");
          let estimatedStartHours = estimatedStartTime[0];
          let estimatedStartMinutes = estimatedStartTime[1];
          estimatedStartTimeDate.setHours(estimatedStartHours);
          estimatedStartTimeDate.setMinutes(estimatedStartMinutes);
        }
        //this.requestTypeChange(this.milkTransferListItemByChallanNo.requestType);
        this.routeHeader.patchValue({
          routeType: this.routeDetails.routeType,
          associateToDepartmentId: this.routeDetails.associateToDepartmentId + '/' + this.routeDetails.associateToDepartmentName,
          routeNumber: this.routeDetails.routeNumber,
          routeName: this.routeDetails.routeName,
          routeDistInKm: this.routeDetails.routeDistInKm,
          estimatedTotalQuantity: this.routeDetails.estimatedTotalQuantity,
          paymentType: this.routeDetails.paymentType,
          paymentAmount: this.routeDetails.paymentAmount,
          ratePerKm: this.routeDetails.routeDistInKm,
          routeDescription: this.routeDetails.routeDescription,
          startLocationList: this.routeDetails.startLocationName + '/' + this.routeDetails.startLocationId,
          endLocationList: this.routeDetails.endLocationName + '/' + this.routeDetails.endLocationId,
          startLocationName: this.routeDetails.startLocationName,
          endLocationName: this.routeDetails.endLocationName,
          routeStatus: this.routeDetails.routeStatus,
          unitOfMeasure: this.routeDetails.unitOfMeasure,
          accountType: this.routeDetails.accountType,
          extraRate: this.routeDetails.extraRate
        });

        this.schduleList.patchValue({
          // Scheduleday: this.routeDetails.routeType,
          routeStartDate: this.routeDetails.routeStartDate,
          routeEndDate: this.routeDetails.routeEndDate,
          routeShift: this.routeDetails.routeShift,
          estimatedEndTime: estimatedEndTimeDate,
          estimatedStartTime: estimatedStartTimeDate,
        });

        this.routeAssignmentList.patchValue({
          // Scheduleday: this.routeDetails.routeType,
          vehicleList: this.routeDetails.vehicleNumber,
          driverList: this.routeDetails.driverName,
          vehicleType: this.routeDetails.vehicleType,
          vehicleCapacity: this.routeDetails.vehicleCapInKg,
          vehicleStatus: this.routeDetails.vehicleStatus,
          vendorName: this.routeDetails.transporterName
        });
        this.getVehicalDetials(this.routeDetails.vehicleNumber);
        this.getDriverDetails(this.routeDetails.driverName);
        this.checklist = [
          { id: 1, value: 'MONDAY', isSelected: this.routeDetails.monday === 'Y' },
          { id: 2, value: 'TUESDAY', isSelected: this.routeDetails.tuesday === "Y" },
          { id: 3, value: 'WEDNESDAY', isSelected: this.routeDetails.wednesday === "Y" },
          { id: 4, value: 'THURSDAY', isSelected: this.routeDetails.thursday === "Y" },
          { id: 5, value: 'FRIDAY', isSelected: this.routeDetails.friday === "Y" },
          { id: 6, value: 'SATURDAY', isSelected: this.routeDetails.saturday === "Y" },
          { id: 7, value: 'SUNDAY', isSelected: this.routeDetails.sunday === "Y" },
        ];
        this.getCheckedItemList();
        this.vehicleSel(this.routeDetails.vehicleNumber);
        this.driverSel(this.routeDetails.driverName);
        this.getVendorDetails(this.routeDetails.transporterName);
      }
    });
  }
  getVehicalDetials(val: string) {
      this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
        if (response){
          this.vehicleResponse = response;
          this.vehicleType = this.vehicleResponse[0].vehicleType;
          this.vehicleCapacity = this.vehicleResponse[0].capacity;
          this.vehicleStatus = this.vehicleResponse[0].status;
          this.vehicleId = this.vehicleResponse[0].vehicleId;
        }
      });
  }
  getDriverDetails(val) {
    this.RouteService.getDriverDetialsByLicenceNumberOrDriverName(val).subscribe((response) => {
      if (response.length > 0) {
        this.driverResponse = response;
        // console.log('this.driverResponse',this.driverResponse)
        this.licenceNumber = this.driverResponse[0].licenceNumber;
        this.driverMobNumber = this.driverResponse[0].mobileNumber;
        this.driverStatus = this.driverResponse[0].status;
        this.driverId = this.driverResponse[0].driverId;
      }
    });
  }
  getVendorDetails(val: string) {
    // console.log('val.length',val.length)
    if (val.length > 3) {
      this.RouteService.getbyvendornameornumberTransporter(val).subscribe((response) => {
        if (response)
          this.vendorResponse = response;
          // console.log('this.vendorResponse',this.vendorResponse)
          this.vendorNum=this.vendorResponse[0].vendorNumber;
          this.vendorType=this.vendorResponse[0].vendorType;
          this.vendorCity=this.vendorResponse[0].city;
          this.vendorName=this.vendorResponse[0].vendorName;
      });
    }
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

  createRouteSave() {
    this.TransportRoute.value.startTime = this.TransportRoute.value.startTime + ':00';
    this.TransportRoute.value.endTime = this.TransportRoute.value.endTime + ':00';
    this.submitted = true;
    if (this.TransportRoute.invalid) {
      return;
    }
    this.RouteService.saveRoute(this.TransportRoute.value).subscribe(res => {
      this.toastr.success('Sucessfully Create New Route', 'Create New Route');
    },
      error => {
        this.toastr.error('something Went Wrong', 'Create New Route', {
          timeOut: 3000
        });
      }
    );
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

  vehicleSel(val: string) {
    this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
      if (response)
      var vehicleList = response[0];
      if(vehicleList!=undefined){
        this.routeAssignmentList.patchValue({
          vehicleType: vehicleList.vehicleType,
          vehicleCapacity: vehicleList.capacity,
          vehicleStatus: vehicleList.status
        });
  
        this.vehicleNumber = vehicleList.vehicleRegNumber;
        this.vehicleID = vehicleList.vehicleId;
      }
      this.vehicleAvailable = true;
    });
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {
      // this.customerBlank = true;
    }
    if (val.length > 3) {
      this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
        if (response)
          this.vehicleItemList = response;
        this.vehicleNumber = this.vehicleItemList.vehicleRegNumber;
        this.vehicleID = this.vehicleItemList.vehicleId;
      });

      this.vehicleAvailable = true;
    }
    else {
      this.vehicleItemList = [];
    }
  }

  selectEvent(item) {
    this.routeAssignmentList.patchValue({
      vehicleType: item.vehicleType,
      vehicleCapacity: item.capacity,
      vehicleStatus: item.status,
      vehicleId: item.vehicleId
    });
    this.vehicleNumber = item.vehicleRegNumber;
    this.vehicleID = item.vehicleId;
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
        if (response.length > 0) {
          this.driverItemList = response;
          this.driverAvailable = true;
          // this.drivername = this.driverItemList[0].driverName;
          // this.licenceNumber = this.driverItemList[0].licenceNumber;
          // this.driverMobNumber = this.driverItemList[0].mobileNumber;
          // this.driverStatus = this.driverItemList[0].status;
        }
      });

    }
    else {
      // this.driverItemList = [];
      // this.driverAvailable = false;
    }
  }

  driverSel(val: string) {
    this.RouteService.getDriverDetialsByLicenceNumberOrDriverName(val).subscribe((response) => {
      if (response)
      var driverList = response[0];
      if(driverList!=undefined){
         // console.log('driverList',driverList)
          this.driverStatus = driverList.status;
          this.driverMobNumber = driverList.mobileNumber;
          this.driverName = driverList.driverName;
          this.driverID = driverList.driverId;
          if (driverList.driverAssignmentsList !== undefined) {
            const vendorId = driverList.driverAssignmentsList[0].vendorId;
            this.RouteService.getVendorDetailsByVendorId(vendorId).subscribe((response) => {
              if (response) {
                this.vendorDetails = response;
                this.vendorName = this.vendorDetails.vendorName;
                this.vendorNum = this.vendorDetails.vendorNum;
              }
            });
          }
          this.driverAvailable = true;
      }
    });
  }

  selectDriverEvent(item) {
    this.driverStatus = item.status;
    this.driverMobNumber = item.mobileNumber;
    this.driverName = item.driverName;
    this.driverID = item.driverId;

    this.drivername = item.driverName;
    this.licenceNumber = item.licenceNumber;
    this.driverMobNumber = item.mobileNumber;
    this.driverStatus = item.status;
    // if (item.driverAssignmentsList !== undefined) {
    //   const vendorId = item.driverAssignmentsList[0].vendorId;
    //   this.RouteService.getVendorDetailsByVendorId(vendorId).subscribe((response) => {
    //     if (response) {
    //       this.vendorDetails = response;
    //       this.vendorName = this.vendorDetails.vendorName;
    //       this.vendorNum = this.vendorDetails.vendorNum;
    //     }
    //   });
    // }
    this.routeAssignmentList.patchValue({
      driverId: item.driverId
    });
    this.driverAvailable = true;
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

  showPointUpdateRow() {
    //this.showPointUpdate = true;
    this.showPointUpdate = !this.showPointUpdate;
  }

  isValideDate(startTime, endTime) {
    return Date.parse(`01/01/2011 ${startTime}`) < Date.parse(`01/01/2011 ${endTime}`)
  }

  createRoute(routeHeader, schduleList, routeAssignmentList) {
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

    var routeStartDate;
    var routeEndDate;
    if (schduleListVal.routeStartDate != this.routeDetails.routeStartDate) {
      routeStartDate = this.datePipe.transform(schduleListVal.routeStartDate, 'dd-MM-yyyy');
    }
    else {
      routeStartDate = this.routeDetails.routeStartDate;
    }

    if (schduleListVal.routeEndDate != this.routeDetails.routeEndDate) {
      routeEndDate = this.datePipe.transform(schduleListVal.routeEndDate, 'dd-MM-yyyy');
    }
    else {
      routeEndDate = this.routeDetails.routeEndDate;
    }

    //var routeStartDate = this.datePipe.transform(schduleListVal.routeStartDate, 'dd-MM-yyyy');
    //var routeEndDate = this.datePipe.transform(schduleListVal.routeEndDate, 'dd-MM-yyyy');

    var startLocationList = routeHeaderVal.startLocationList === null ||  routeHeaderVal.startLocationList==undefined? '' : routeHeaderVal.startLocationList.split("/");
    var endLocationList = routeHeaderVal.endLocationList === null || routeHeaderVal.endLocationList === undefined? '' : routeHeaderVal.endLocationList.split("/");
    this.result = this.isValideDate(estimatedStartTime, estimatedEndTime);


    for (let i = 0; i < this.checkedList.length; ++i) {
      this.checkedList[i].value ? 'MONDAY' : null;

      switch (this.checkedList[i].id) {
        case 1:
          this.monday = this.checkedList[i].value === 'MONDAY' ? 'Y' : 'N';

          break;
        case 2:
          this.tuesday = this.checkedList[i].value === 'TUESDAY' ? 'Y' : 'N';

          break;
        case 3:
          this.wednesday = this.checkedList[i].value === 'WEDNESDAY' ? 'Y' : 'N';
          break;
        case 4:
          this.thursday = this.checkedList[i].value === 'THURSDAY' ? 'Y' : 'N';
          break;
        case 5:
          this.friday = this.checkedList[i].value === 'FRIDAY' ? 'Y' : 'N';
          break;
        case 6:
          this.saturday = this.checkedList[i].value === 'SATURDAY' ? 'Y' : 'N';
          break;
        case 7:
          this.sunday = this.checkedList[i].value === 'SUNDAY' ? 'Y' : 'N';
          break;
        default:
          break;
      }
    }


    if (this.checkedList.length === 0) {
      this.daysSelected = false;
    }
    else {
      this.daysSelected = true;

    }


    this.submitted = true;
    //if (this.routeHeader.invalid && this.schduleList.invalid && this.routeAssignmentList.invalid && !this.vehicleAvailable && !this.driverAvailable) {
    if (!this.vehicleAvailable && !this.driverAvailable && !this.daysSelected) {
      //this.submitted = false;
      return;
    }
    // console.log('this.vehicleAvailable',this.vehicleAvailable)
    // console.log('this.driverAvailable',this.driverAvailable)
    // console.log('this.daysSelected',this.daysSelected)
    
    //if (!this.routeHeader.valid && !this.schduleList.valid && this.routeAssignmentList.valid && this.vehicleAvailable && this.driverAvailable) {
    if (this.vehicleAvailable && this.driverAvailable && this.daysSelected) {
      var departmentVal = routeHeaderVal.associateToDepartmentId.split('/');
      var depId = departmentVal[0];
      var depName = departmentVal[1];
      if (this.result == false) {
        this.toastr.error('End Time can not be before Start Time', 'Error', {
          timeOut: 4000
        });
        return;
      }
      routeAssignmentVal.driverList=routeAssignmentVal.driverList.driverName?routeAssignmentVal.driverList.driverName : routeAssignmentVal.driverList;
      // console.log('this.vehicleId',this.vehicleId)
      // console.log('routeHeaderVal',routeHeaderVal)
      var dataToSend =
      {
        "routeId": this.routeID,
        "routeNumber": routeHeaderVal.routeNumber,
        "routeName": routeHeaderVal.routeName,
        "routeType": routeHeaderVal.routeType,
        "associateToDepartmentId": depId,
        "associateToDepartmentName": depName,
        "routeDescription": routeHeaderVal.routeDescription,
        "vehicleId": routeAssignmentVal.vehicleId ? routeAssignmentVal.vehicleId : this.vehicleId,
        "vehicleType": routeAssignmentVal.vehicleType == null || routeAssignmentVal.vehicleType == undefined ? this.vehicleType : routeAssignmentVal.vehicleType, 
        "vehicleNumber": routeAssignmentVal.vehicleList == null || routeAssignmentVal.vehicleList == undefined ? this.vehicleregno : routeAssignmentVal.vehicleList.vehicleRegNumber?routeAssignmentVal.vehicleList.vehicleRegNumber:routeAssignmentVal.vehicleList,
        "driverId": routeAssignmentVal.driverId ? routeAssignmentVal.driverId: this.driverId,
        "driverName": this.vehicleId == null || routeAssignmentVal.driverList == undefined ? this.drivername : routeAssignmentVal.driverList,
        "vehicleCapInKg": routeAssignmentVal.capacity ==null || routeAssignmentVal.capacity == undefined  ? this.vehicleCapacity : routeAssignmentVal.capacity,
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
        "monday": this.monday === 'Y' ? 'Y' : 'N',
        "tuesday": this.tuesday === 'Y' ? 'Y' : 'N',
        "wednesday": this.wednesday === 'Y' ? 'Y' : 'N',
        "thursday": this.thursday === 'Y' ? 'Y' : 'N',
        "friday": this.friday === 'Y' ? 'Y' : 'N',
        "saturday": this.saturday === 'Y' ? 'Y' : 'N',
        "sunday": this.sunday === 'Y' ? 'Y' : 'N',
        "startLocationId": (startLocationList[1]!=null)?startLocationList[1]:this.routeDetails.startLocationId,
        "startLocationName": (startLocationList[0]!=null)?startLocationList[0]:this.routeDetails.startLocationName,
        "estimatedStartTime": estimatedStartTime,
        "estimatedEndTime": estimatedEndTime,
        "endLocationId": (endLocationList[1]!=null)?endLocationList[1]:this.routeDetails.endLocationId,
        "endLocationName": (endLocationList[0]!=null)?endLocationList[0]:this.routeDetails.endLocationName,
        "routeStatus": routeHeaderVal.routeStatus,
        "routeShift": schduleListVal.routeShift,
        "estimatedTotalQuantity": routeHeaderVal.estimatedTotalQuantity,
        "creationDate": this.routeDetails.creationDate,
        "createdBy": this.routeDetails.createdBy,
        "lastUpdateDate": this.routeDetails.lastUpdateDate,
        "lastUpdateBy": JSON.parse(localStorage.getItem('data')).userId,
        "lastUpdateLogin": JSON.parse(localStorage.getItem('data')).userId,
        "unitOfMeasure": routeHeaderVal.unitOfMeasure, //uom changes
        "accountType":routeHeaderVal.accountType,
        "routePoint":this.routePoint,
        // "routeSchedule": {}
        "routeSchedule": {
          "routeNumber": routeHeaderVal.routeNumber,
          "routeStartDate": routeStartDate,
          "routeEndDate": routeEndDate,
          "shift": schduleListVal.routeShift,
          "monday": this.monday === 'yes' ? 'scheduled' : '',
          "tuesday": this.tuesday === 'yes' ? 'scheduled' : '',
          "wednesday": this.wednesday === 'yes' ? 'scheduled' : '',
          "thursday": this.thursday === 'yes' ? 'scheduled' : '',
          "friday": this.friday === 'yes' ? 'scheduled' : '',
          "saturday": this.saturday === 'yes' ? 'scheduled' : '',
          "sunday": this.sunday === 'yes' ? 'scheduled' : '',
          "creationDate": "27-12-2019",
          "lastUpdatedDate": "27-12-2019",
          "createdBy": 3032,
          "lastUpdatedBy": "3032",
          "lastUpdateLogin": 3032
        }
      }
      // console.log('dataToSend',dataToSend)
      this.RouteService.updateRoute(dataToSend).subscribe(res => {
        this.toastr.success('Sucessfully Updated Route', 'Update  Route');
        this.router.navigateByUrl('/transport/route/list-routes');
      },
        error => {
          this.toastr.error(error.error.message, 'Update Route', {
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
    this.vendorNum = item.vendorId;
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

