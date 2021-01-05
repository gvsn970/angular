
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TripService } from 'src/app/shared/service/trip.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DatePipe } from '@angular/common';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { ActivatedRoute, Router } from "@angular/router";
import { SharedService } from 'src/app/shared/service/shared.service';
import { RouteService } from 'src/app/shared/service/route.service';
@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.css']
})
export class UpdateTripComponent implements OnInit {
  tripTransactionId: any;
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
  vehicleList: any;
  vehicleKeyword: any;
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
  tripStatus: any;
  startlocationName;
  endlocationName;
  result;
  userData;
  transporter: any;
  tripPoints: any=[];
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
  driverDisabled:any = true;
  Scheduleday = [
    { id: 'MONDAY', weekday: 'MONDAY' },
    { id: 'TUESDAY', weekday: 'TUESDAY' },
    { id: 'WEDNESDAY', weekday: 'WEDNESDAY' },
    { id: 'THURSDAY', weekday: 'THURSDAY' },
    { id: 'FRIDAY', weekday: 'FRIDAY' },
    { id: 'SATURDAY', weekday: 'SATURDAY' },
    { id: 'SUNDAY', weekday: 'SUNDAY' }
  ];
  vechicleTypeList: any;
  vendorNumber: any = '';
  transporterName: any = '';
  disabled: any = true;
  vehicleId: any;
  driverId: any;
  accountTypeResponse: any = []; // ACCOUNT TYPE
  vehicleregno = '';
  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private sharedService: SharedService,
    private RouteService: RouteService) {
    this.startTime = new Date();
    this.endTime = new Date();
    this.pointStartTime = new Date();
    this.PointEndTime = new Date();

    this.masterSelected = false;
    //this.masterIndentUp = this.masterIndentService.getOptions();


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
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.tripTransactionId = params['id'];
      }
    });

    this.getTripDetailsByTripTransactionId(this.tripTransactionId);
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
      estmQuantity: [''],
      paymentType: [''],
      paymentAmount: [''],
      ratePerKm: [''],
      routeDescription: [''],
      routeStatus: [''],
      // startLocationName: [''],
      // endLocationName: [''],
      scheduleDate: [],
      routeShift: [''],
      vehicleType: [''],
      capacityQuantity: [''],
      unitOfMeasure: ['', Validators.required], //uom changes
      accountType:['' , Validators.required ]
    }
    );

    this.schduleList = this.fb.group({
      selectAll: selectAllControl,
      routeStartDate: ['', Validators.required],
      routeEndDate: ['', Validators.required],
      routeShift: ['', Validators.required],
    },
      {
        validator: StartDateAndEndDateValidation('routeStartDate', 'routeEndDate')
      });


    this.routeAssignmentList = this.fb.group({
      vehicleNumber: [''],
      driverName: [''],
      driverList: [''],
      vendorId: [''],
      mobileNumber: [''],
      vehicleRegistered: 'register',
      vehicleList: [''],
      driverRegistered:'register',
      vendorName: '',
      vehicleId: '',
      driverId: ''
    });
    this.vehicleListkeyword = 'vehicleRegNumber';
    this.driverListkeyword = 'driverName';
    this.vehicleKeyword = 'vehicleRegNumber';
    this.vendorListkeyword = 'vendorName';
    this.vehicleItemList = [];
    this.getVehicleMakeList();
    this.getAllDepartmentList();
    this.getShift();
    this.getPaymentType();
    this.onChanges();
    this.getSourceDestinationType();
    this.getVechicleType();
    //this.receiveDriverDetails();
    this.getTripStatus();
    this.getUnitOfMeasure();//uom changes
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
  getTripStatus() {
    this.tripService.getNewTripStatus().subscribe(res => {
      this.tripStatus = res;
    });
  }
  getVechicleType() {
    this.tripService.getDropDownList('ALL', 'ALL', 'VEHICLE_TYPE').subscribe(res => {
      this.vechicleTypeList = res;
    })
  }


  toDate(dateStr) {
    var parts = dateStr.split("-")
    return new Date(parts[2], parts[1] - 1, parts[0])
  }

  isValideDate(startTime, endTime) {
    return Date.parse(`01/01/2011 ${startTime}`) < Date.parse(`01/01/2011 ${endTime}`)
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

  toUpper(value, type) {

    if (type === 'vehicleNumber') {
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

  getTripDetailsByTripTransactionId(tripTransactionId) {
    this.tripService.getTripByTripTransactionId(tripTransactionId).subscribe((response) => {
      if (response) {
        // console.log('response',response)
        this.routeDetails = response;
        this.transporterName = this.routeDetails.transporterName;
        this.vendorNumber = this.routeDetails.transporterId;
        this.startlocationName = this.routeDetails.startLocation;
        this.endlocationName = this.routeDetails.endLocation;
        this.vehicleId = this.routeDetails.vehicleId;
        this.driverId = this.routeDetails.driverId;
        this.tripPoints=this.routeDetails.tripPoints;
        // this.tripService.getbyvendornameornumber(this.transporterName).subscribe((response) => {
        //   if (response)
        //     this.vehicleItemList = response;

        // });
        //setting time to timepicker
        let estimatedEndHours;
        let estimatedEndMinutes;
        let estimatedStartHours;
        let estimatedStartMinutes;
        if(this.routeDetails.estimatedEndTime){
          let estimatedEndTime = this.routeDetails.estimatedEndTime.split(":");
          estimatedEndHours = estimatedEndTime[0];
          estimatedEndMinutes = estimatedEndTime[1];
        }
        if(this.routeDetails.estimatedStartTime){
          let estimatedStartTime = this.routeDetails.estimatedStartTime.split(":");
          estimatedStartHours = estimatedStartTime[0];
          estimatedStartMinutes = estimatedStartTime[1];
        }

        let estimatedEndTimeDate = new Date();
        estimatedEndTimeDate.setHours(estimatedEndHours);
        estimatedEndTimeDate.setMinutes(estimatedEndMinutes)

        let estimatedStartTimeDate = new Date();
        estimatedStartTimeDate.setHours(estimatedStartHours);
        estimatedStartTimeDate.setMinutes(estimatedStartMinutes)
        //this.requestTypeChange(this.milkTransferListItemByChallanNo.requestType);
        this.routeHeader.patchValue({
          routeType: this.routeDetails.routeType,
          associateToDepartmentId: this.routeDetails.associateToDepartmentId + '/' + this.routeDetails.associateToDepartmentName,
          routeNumber: this.routeDetails.routeNumber,
          routeName: this.routeDetails.routeName,
          estimatedStartTime: estimatedStartTimeDate,
          estimatedEndTime: estimatedEndTimeDate,
          routeDistInKm: this.routeDetails.routeDistanceInKm,
          estmQuantity: this.routeDetails.estimatedtotalQuantity,
          paymentType: this.routeDetails.paymentType,
          paymentAmount: this.routeDetails.paymentAmount,
          ratePerKm: this.routeDetails.routeDistInKm,
          routeDescription: this.routeDetails.remarks,
          startLocationList: this.routeDetails.startLocationName + '/' + this.routeDetails.startLocationId,
          endLocationList: this.routeDetails.endLocationName + '/' + this.routeDetails.endLocationId,
          // startLocationName: this.routeDetails.startLocation,
          // endLocationName: this.routeDetails.endLocation,
          scheduleDate: this.toDate(this.routeDetails.scheduleDate),
          routeShift: this.routeDetails.routeShift,
          routeStatus: this.routeDetails.routeStatus,
          vehicleType: this.routeDetails.vehicleType,
          capacityQuantity: this.routeDetails.capacityQuantity,
          unitOfMeasure: this.routeDetails.unitOfMeasure,
          accountType:this.routeDetails.accountType,
        });



        // this.schduleList.patchValue({
        //   // Scheduleday: this.routeDetails.routeType,
        //   routeStartDate: this.routeDetails.routeStartDate,
        //   routeEndDate: this.routeDetails.routeEndDate,
        //   routeShift: this.routeDetails.routeShift,

        // });

        this.routeAssignmentList.patchValue({
          // Scheduleday: this.routeDetails.routeType,
          vehicleNumber: this.routeDetails.vehicleNumber,
          driverName: this.routeDetails.driverName,
          vehicleStatus: this.routeDetails.vehicleStatus ? this.routeDetails.vehicleStatus : '',
          vendorId: this.routeDetails.transporterName,
          mobileNumber: this.routeDetails.mobileNumber,
          vehicleList: this.routeDetails.vehicleNumber,
          driverList: this.routeDetails.driverName,
          vehicleType: this.routeDetails.vehicleType,
          vehicleCapacity: this.routeDetails.vehicleCapInKg,
          vendorName: this.routeDetails.transporterName
        });
        this.getVehicalDetials(this.routeDetails.vehicleNumber);
        this.getDriverDetails(this.routeDetails.driverName);
        // var sendVehicleData = {
        //   status: this.routeDetails.vehicleStatus,
        //   capacity: this.routeDetails.vehicleCapInKg,
        //   vehicleType: this.routeDetails.vehicleType,
        // }

        // this.selectEvent(sendVehicleData);

        this.checklist = [
          { id: 1, value: 'MONDAY', isSelected: this.routeDetails.monday === 'yes' },
          { id: 2, value: 'TUESDAY', isSelected: this.routeDetails.tuesday === "yes" },
          { id: 3, value: 'WEDNESDAY', isSelected: this.routeDetails.wednesday === "yes" },
          { id: 4, value: 'THURSDAY', isSelected: this.routeDetails.thursday === "yes" },
          { id: 5, value: 'FRIDAY', isSelected: this.routeDetails.friday === "yes" },
          { id: 6, value: 'SATURDAY', isSelected: this.routeDetails.saturday === "yes" },
          { id: 7, value: 'SUNDAY', isSelected: this.routeDetails.sunday === "yes" },
        ];
        this.getCheckedItemList();
        // this.vehicleSel(this.routeDetails.vehicleNumber);
        // this.driverSel(this.routeDetails.driverName);
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
    // this.schduleList.get('selectAll').valueChanges.subscribe(bool => {
    //   this.schduleList.get('Scheduleday').patchValue(Array(this.Scheduleday.length).fill(bool), { emitEvent: false });
    // });
    // this.schduleList.get('Scheduleday').valueChanges.subscribe(val => {
    //   const allSelected = val.every(bool => bool);
    //   if (this.schduleList.get('selectAll').value !== allSelected) {
    //     this.schduleList.get('selectAll').patchValue(allSelected, { emitEvent: false });
    //   }
    // });
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
    this.tripService.saveRoute(this.TransportRoute.value).subscribe(res => {
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
      // this.endPointList = [{
      //   'locationCode': 'Bengalore Dairy',
      //   'locationId': '163',
      // }]
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

  selectEvent(item) {
    this.vendorNumber = item.vendorNum;
    this.transporterName = item.vendorName;
    this.vehicleType = item.vehicleType;
    this.vehicleCapacity = item.capacity;
    this.vehicleStatus = item.status;
    this.routeAssignmentList.patchValue({
      vehicleId: item.vehicleId
    });
  }
  selectVehicleEvent(item) {
    this.vehicleId = item.vehicleId;
    this.RouteService.getAssignmentsByVehicleId(this.vehicleId).subscribe((resp) => {
      this.transporter = resp;
      if (this.transporter.length != 0) {
        this.routeAssignmentList.patchValue({
          vendorId: this.transporter[0].vehicleDescription,
          driverName: this.transporter[0].driverName
        });
        this.vendorNumber = this.transporter[0].vendorId;
        this.transporterName=this.transporter[0].vehicleDescription;
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
  // onChangeVehicleSearch(val: string) {
  //   if (val.length === 0) {
  //     // this.customerBlank = true;
  //   }
  //   if (val.length > 3) {
  //     this.RouteService.getVehicleDetailsByRegistrationNumber(val.toUpperCase()).subscribe((response) => {
  //       if (response)
  //         this.vehicleList = response;
  //       if (this.vehicleList.length == 0) {
  //         this.routeAssignmentList.patchValue({
  //           vehicleNumber: ''
  //         });
  //       } else {
  //         this.RouteService.getAssignmentsByVehicleId(this.vehicleList[0].vehicleId).subscribe((resp) => {
  //           this.transporter = resp;
  //           if (this.transporter.length != 0) {
  //             this.routeAssignmentList.patchValue({
  //               vendorId: this.transporter[0].vehicleDescription,
  //               driverName: this.transporter[0].driverName
  //             });
  //             this.vendorNumber = this.transporter[0].vendorId;
  //             this.transporterName=this.transporter[0].vehicleDescription;
  //           } else {
  //             this.routeAssignmentList.patchValue({
  //               vendorId: '',
  //               driverName: ''
  //             });
  //             this.vendorNumber = '';
  //             this.transporterName='';
  //           }

  //         });
  //       }
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
      // this.driverItemList = [];
      // this.driverStatus = '';
      // this.driverMobNumber = '';
      // this.vendorName = '';
      // this.vendorNum = '';
      // this.driverAvailable = false;
      // this.licenceNumber = ''; // new changes 
      // this.licenceType = ''; // new changes
    }
  }
  selectDriverEvent(item) {
    // console.log('item',item)
    this.driverStatus = item.status;
    this.driverMobNumber = item.mobileNumber;
    this.licenceNumber = item.licenceNumber; // new changes 
    this.licenceType = item.licenceType; // new changes 
    this.routeAssignmentList.patchValue({
      driverId: item.driverId
    });
    this.driverId= item.driverId;
    if (item.driverAssignmentsList !== undefined) {
      const vendorId = item.driverAssignmentsList[0].vendorId;
      // console.log('this.driverId',this.driverId)
      this.tripService.getVendorDetailsByVendorId(vendorId).subscribe((response) => {
        if (response) {
          this.vendorDetails = response;
          this.vendorName = this.vendorDetails.vendorName;
          this.vendorNum = this.vendorDetails.vendorNum;
        }
      });
    }
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
  routeRegister(radioValue) {
    if (radioValue === 'register') {
      this.disabled = true;
    } if (radioValue === 'unregistered') {
      this.disabled = false;
      this.routeAssignmentList.patchValue({
        vehicleNumber: '',
        driverName: '',
        vendorId: '',
      });
      this.vehicleId = '';
      this.driverId = '';
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
      var durationTime = Math.abs(Math.round(diff));
      this.timeConversion(durationTime);
    }

    var scheduleDate;
    if (routeHeaderVal.scheduleDate != this.routeDetails.scheduleDate) {
      scheduleDate = this.datePipe.transform(routeHeaderVal.scheduleDate, 'dd-MM-yyyy');
    }
    else {
      scheduleDate = this.routeDetails.scheduleDate;
    }

    var startLocationList = routeHeaderVal.startLocationList === null ? '' : routeHeaderVal.startLocationList.split("/");
    var endLocationList = routeHeaderVal.endLocationList === null ? '' : routeHeaderVal.endLocationList.split("/");

    this.submitted = true;
    if (this.routeHeader.invalid && this.routeAssignmentList.invalid) {
      //this.submitted = false;
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
        "tripTransactionId": this.routeDetails.tripTransactionId,
        "routeId": 1111,
        "routeNumber": routeHeaderVal.routeNumber,
        "routeName": routeHeaderVal.routeName,
        "routeType": routeHeaderVal.routeType,
        "associateToDepartmentId": depId,
        "associateToDepartmentName": depName,
        "vehicleId": routeAssignmentVal.vehicleId ? routeAssignmentVal.vehicleId : this.vehicleId,
        "driverId": routeAssignmentVal.driverId ? routeAssignmentVal.driverId: this.driverId,
        "transporterId": this.vendorNumber,
        "scheduleDate": scheduleDate,
        "paymentAmount": routeHeaderVal.paymentAmount,
        "routeStatus": routeHeaderVal.routeStatus,
        "estimatedKm": null,
        "actualKm": null,
        "routeShift": routeHeaderVal.routeShift,
        "estimatedtotalQuantity": routeHeaderVal.estmQuantity,
        "capacityQuantity": routeHeaderVal.capacityQuantity,
        "actualTotalQuantity": null,
        "quantityKgs": null,
        "startLocation": startLocationList[0] != 'undefined' ? startLocationList[0] : this.startlocationName,
        "estimatedStartTime": estimatedStartTime,
        "actualStartTime": null,
        "estimatedEndTime": estimatedEndTime,
        "actualEndTime": null,
        "remarks": routeHeaderVal.routeDescription,
        "creationDate": this.sharedService.getDate(),
        "endLocation": endLocationList[0] != 'undefined' ? endLocationList[0] : this.endlocationName,
        "creationBy": this.userData.userId,
        "lastUpdateDate": this.sharedService.getDate(),
        "lastUpdatedBy": this.userData.userId,
        "lastUpdateLogin": 3463,
        "receivedQty": null,
        "returnQuantity": null,
        "vehicleNumber":routeAssignmentVal.vehicleList == null || routeAssignmentVal.vehicleList == undefined ? this.vehicleregno : routeAssignmentVal.vehicleList.vehicleRegNumber?routeAssignmentVal.vehicleList.vehicleRegNumber:routeAssignmentVal.vehicleList,
        "vehicleType": routeAssignmentVal.vehicleType == null || routeAssignmentVal.vehicleType == undefined ? this.vehicleType : routeAssignmentVal.vehicleType,
        "transporterName": this.transporterName,
        "driverName": this.vehicleId == null || routeAssignmentVal.driverList == undefined ? this.driverName : routeAssignmentVal.driverList.driverName?routeAssignmentVal.driverList.driverName:routeAssignmentVal.driverList,
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
        "tripPoints": this.tripPoints
      }
      // console.log('dataToSend',dataToSend)
      this.tripService.updateTrip(dataToSend).subscribe(res => {
        this.toastr.success('Sucessfully Updated', 'Trip');
        this.router.navigateByUrl('/transport/route/list-trip');
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
    this.transporterName= item.vendorName;
    this.transporterName= item.vendorName;
    this.vendorNumber = item.vendorId;
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
    } if(radioValue ==='unregistered') {
        this.driverDisabled = false;
    }
  }
}

