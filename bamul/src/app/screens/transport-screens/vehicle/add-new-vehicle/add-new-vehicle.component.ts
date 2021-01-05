import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/shared/model/vehicle';
import { Router } from '@angular/router';
import { VehicleAssignment } from '../../../../shared/model/VehicleAssignment'
import { VehicleDocuments } from '../../../../shared/model/VehicleDocuments ';
import { TabsetComponent, BsDatepickerConfig } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { RouteService } from 'src/app/shared/service/route.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrls: ['./add-new-vehicle.component.css']
})
export class AddNewVehicleComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  allStCodeList: any[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana',
    'Tripura', ' Uttar Pradesh', 'Uttarakhand', ' West Bengal',];

  statesMap = new Map([['AP', 'Andhra Pradesh'], ['AR', 'Arunachal Pradesh'], ['AS', 'Assam'], ['BR', 'Bihar'],
  ['CG', 'Chattisgarh'], ['GA', 'Goa'], ['GJ', 'Gujarat'], ['HR', 'Haryana'], ['HP', 'Himachal Pradesh'],
  ['JK', 'Jammu and Kashmir'], ['JH', 'Jharkhand'], ['KA', 'Karnataka'], ['KL', 'Kerala'], ['MP', 'Madhya Pradesh'],
  ['MH', 'Maharashtra'], ['MN', 'Manipur'], ['ML', 'Meghalaya'], ['MZ', 'Mizoram'], ['NL', 'Nagaland'],
  ['OD', 'Odisha'], ['PB', 'Punjab'], ['RJ', 'Rajasthan'], ['SK', 'Sikkim'], ['TN', 'Tamilnadu'], ['TR', 'Tripura'],
  ['UP', 'Uttar Pradesh'], ['UK', 'Uttarakhanad'], ['WB', 'West Bengal'], ['TS', 'Telangana']]);

  allFuelList: any[] = ['Diesel', 'Petrol'];
  vehicleTyp: any[] = ['Van', 'Ambulance', 'Motorcycle', 'Tractor', 'Car', 'Cab', 'Truck', 'Carriage', 'Container'];

  doctypes: any[] = ['Insurance', 'Fitness', 'PUC', 'Road Tax', 'Others'];

  statu: any[] = ['Active', "In-Active"];
  ownerShp: any[] = [' bamul-own', 'other'];
  depTag: any[] = ['Procurement &Input ', 'Marketing', 'Engineering']

  save = false;
  submittedassign: boolean = false;
  addNewRow: boolean = true;
  Vehicle: FormGroup;
  submitted: boolean = false;
  submittedDoc: boolean = false;
  vechicleAssignmentButton: boolean = true;
  VehicleAssignment: FormGroup;
  VehicleDocuments: FormGroup;
  vehicleId: any;
  data: any;
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  creationDate: string;
  vechicleTypeList: Object;
  fuelTypeList: Object;
  departments: any;
  documentTypeList: Object;
  vehicleMakeList: any;
  capacityUnitsList: any;
  vehicleOwnershipList: any;
  docFormData: FormData;
  driverItemList: any[];
  driverAvailable: boolean;
  vehicleListkeyword: any;
  vehicleItemList: any;
  driverListkeyword: any;
  vendorDetails: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private RouteService: RouteService,
    private spinnerService: NgxSpinnerService
  ) {
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        minDate: new Date(),
        maxDate: new Date(),
      });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.minDate.getDate() - 1);
    this.creationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.vehicleListkeyword = 'vendorName';
    this.data = JSON.parse(localStorage.getItem('data'));
    this.Vehicle = this.formBuilder.group({
      vehicleRegNumber: ['', Validators.required],
      registrationState: ['', Validators.required],
      registrationDate: ['', [Validators.required,]],
      // ownership: ['', [Validators.required,]],
      regPeriodTo: ['', [Validators.required,]],
      status: 'Active',
      make: [''],
      model: [''],
      vehicleType: [''],
      vehicleSubType: [''],
      capacity: [''],
      fuelType: [''],
      modelYear: [''],
      capacityUnits: [''],
      materialType: [''],
      creationDate: '',
      createdBy: '',
      lastUpdateDate: null,
      lastUpdatedBy: null,
      lastUpdateLogin: null,

    }, {
        validator: StartDateAndEndDateValidation('registrationDate', 'regPeriodTo')
      }
    );

    //StartDateAndEndDateValidation  this one common fuctionality across all components
    this.VehicleDocuments = this.formBuilder.group({
      users: this.formBuilder.array([])
    });

    this.VehicleAssignment = this.formBuilder.group({
      ownership: [''],
      departmentTagging: [''],
      tenderRate: [''],
      extraKMRate: [''],
      tenderDieselPrice: [''],
      gPSDeviceNumber: [''],
      driverName: [''],
      assignmentFromDate: [''],
      assignmenToDate: [''],
      vendorId: [''],
      creationDate: '',
      createdBy: '',
      lastUpdateDate: null,
      lastUpdatedBy: null,
      lastUpdateLogin: null,
      vehicleId: '',
      vehicleDescription: ''
    }, {
        validator: StartDateAndEndDateValidation('assignmentFromDate', 'assignmenToDate')
      })
    this.Vehicle.patchValue({
      creationDate: this.creationDate,
      createdBy: this.data.userId
    })
    this.VehicleAssignment.patchValue({
      creationDate: this.creationDate,
      createdBy: this.data.userId
    });
    this.getVehicleMakeList();
    this.getCapacityUnits();
    this.vechicleType();
    this.getAllDepartmentDetails();
    this.fuelType();
    this.documentType();
    this.getVehicleOwnerShipList();
    this.driverListkeyword = 'driverName';
  }

  initiateForm(): FormGroup {
    return this.formBuilder.group({
      documentProviderName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      docValidateFrom: ['', Validators.required],
      docValidateTo: ['', Validators.required],
      documentType: ['', Validators.required],
      fileUpload: ['', Validators.required],
      creationDate: this.creationDate,
      createdBy: this.data.userId,
      lastUpdateDate: null,
      lastUpdatedBy: null,
      lastUpdateLogin: null,
      saveDocument: false,
      vehicle: this.formBuilder.group({
        vehicleId: this.vehicleId.vehicleId
      })
    }, {
        validator: StartDateAndEndDateValidation('docValidateFrom', 'docValidateTo')
      })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //console.log(charCode, 'charCode');
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  decimalOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    //console.log(charCode, 'charCode');
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
  cambiaUpper(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }
  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

  addUser() {
    const control = <FormArray>this.VehicleDocuments.get('users');
    control.push(this.initiateForm());
    this.addNewRow = true;
  }

  remove(index: number) {
    const control = <FormArray>this.VehicleDocuments.get('users');
    control.removeAt(index);
    this.addNewRow = false;
    this.toastr.error('At least One Documents ', 'Single row', {
      timeOut: 3000
    });
  }

  get f() { return this.Vehicle.controls; }
  get g() { return this.VehicleAssignment.controls; }



  saveVehicleInfo() {
    this.submitted = true;
    if (this.Vehicle.invalid) {
      return;
    }
    this.Vehicle.patchValue({
      registrationDate: this.datePipe.transform(this.Vehicle.value.registrationDate, 'dd-MM-yyyy'),
      regPeriodTo: this.datePipe.transform(this.Vehicle.value.regPeriodTo, 'dd-MM-yyyy'),
      status: 'Active'
    })
    this.spinnerService.show();
    this.vehicleService.saveVehicleDetail(this.Vehicle.value)
      .subscribe(
        data => {
          this.Vehicle.reset();
          this.vehicleId = data;
          localStorage.setItem('vehicleId', JSON.stringify(this.vehicleId));
          this.spinnerService.hide();
          this.staticTabs.tabs[1].active = true;
          this.vechicleAssignmentButton = false;
          this.toastr.success('Sucessfully Vehicle Inforamtion  Is Saved');
          this.addUser();

          this.submitted = false;
        },
        error => {
          this.toastr.error('Something Went Wrong ', 'Vehicle Inforamtion', {
            timeOut: 3000
          });
        })
  }

  saveVehicleAssignment() {
    this.submittedassign = true;
    this.vehicleId = JSON.parse(localStorage.getItem('vehicleId'));
    if (this.VehicleAssignment.invalid) {
      return;
    }
    this.VehicleAssignment.patchValue({
      vehicleId: this.vehicleId.vehicleId
    });
    this.VehicleAssignment.patchValue({
      assignmentFromDate: this.datePipe.transform(this.VehicleAssignment.value.assignmentFromDate, 'dd-MM-yyyy'),
      assignmenToDate: this.datePipe.transform(this.VehicleAssignment.value.assignmenToDate, 'dd-MM-yyyy'),

    })
    this.spinnerService.show();


    if (this.vehicleItemList !== undefined && this.vehicleItemList.length > 0) {
      this.VehicleAssignment.patchValue({
        vendorId: this.vehicleItemList[0].vendorId
      });
    }
    this.vehicleService.saveVehicleAssignment(this.VehicleAssignment.value)
      .subscribe(
        data => {
          this.spinnerService.hide();
          this.VehicleAssignment.reset();
          this.submittedassign = false;
          this.vechicleAssignmentButton = true;
          this.staticTabs.tabs[2].active = true;
          this.toastr.success('Sucessfully Vehicle Assignemnt !', 'Vehicle Assignemnt !');
        },
        error => {
          this.toastr.error('Something Went Wrong ', 'Vehicle Assignemnt ', {
            timeOut: 3000
          });
        });
  }
  upload(files: File[], index, value) {
    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('myFile', f),
    );
    formData.append('refId', this.vehicleId.vehicleId),
      formData.append('reference', 'vehicle'),
      formData.append('documentType', value.value.documentType),
      formData.append('docProviderName', value.value.documentProviderName)
    formData.append('docNumber', value.value.documentNumber),
      formData.append('docValidityFrom', this.datePipe.transform(value.value.docValidateFrom, 'dd-MM-yyyy')),
      formData.append('docValidityTo', this.datePipe.transform(value.value.docValidateTo, 'dd-MM-yyyy')),
      formData.append('creationDate', this.creationDate),
      formData.append('creationBy', this.data.userId),
      formData.append('lastUpdateDate', this.creationDate),
      formData.append('lastUpdateBy', this.data.userId),
      this.docFormData = formData;
  }

  saveDoc(i, control) {
    this.submittedDoc = true;
    if (control.value.fileUpload == "") {
      this.toastr.error('please upload document', 'File Upload!', {
        timeOut: 3000
      });
    }
    if (this.VehicleDocuments.invalid) {
      return;
    }
    this.spinnerService.show();
    this.vehicleService.uploaddocumentanddetails(this.docFormData)
      .subscribe(
        data => {
          this.addNewRow = false;
          (<FormGroup>this.VehicleDocuments.controls.users).controls[i].patchValue({ "saveDocument": true });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[i].disable();
          this.spinnerService.hide();
          this.submittedDoc = false;
          this.toastr.success('Save Vehicle Documents!', 'VehicleDocuments!');
        },
        error => {
          this.toastr.error('Something Went Wrong', 'VehicleDocuments!', {
            timeOut: 3000
          });
        });
  }

  saveVehicleInfoCancel() {
    this.Vehicle.reset();
  }
  saveVehicleAssignmentCancel() {
    this.VehicleAssignment.reset();
  }
  saveDocCancel() {
    this.VehicleDocuments.reset();
  }
  // VEHICLE_TYPE	
  // this.vehicleService.get
  vechicleType() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'VEHICLE_TYPE').subscribe(res => {
      this.vechicleTypeList = res;
    })
  }
  fuelType() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'FUEL_TYPE').subscribe(res => {
      this.fuelTypeList = res;
    })
  }
  getAllDepartmentDetails() {
    this.vehicleService.getAllDepartmentDetails().subscribe(
      data => {
        this.departments = data;
      });
  }
  documentType() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'DOCUMENT_TYPE').subscribe(
      data => {

        this.documentTypeList = data;
      });
  }

  getVehicleMakeList() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'VEHICLE_MAKE').subscribe(res => {
      this.vehicleMakeList = res;
    });
  }

  getCapacityUnits() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'CAPACITY_UNITS').subscribe(res => {
      this.capacityUnitsList = res;
    });
  }

  getVehicleOwnerShipList() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'VEHICLE_OWNERSHIP').subscribe(res => {
      this.vehicleOwnershipList = res;
    });
  }


  selectEvent(item) {
    this.VehicleAssignment.patchValue({
      vehicleDescription: item.vendorName
    });
  }

  onFocused(e) {

  }
  onChangeSearch(val: string) {

    if (val.length === 0) {

    }
    if (val.length > 3) {
      this.vehicleService.getbyvendornameornumber(val).subscribe((response) => {
        if (response)
          this.vehicleItemList = response;

      });
    }
    else {
      this.vehicleItemList = [];
    }
  }
  toUpper(value) {
    this.Vehicle.patchValue({
      vehicleRegNumber: value.toUpperCase()
    })
  }
  selectDriverEvent(item) {
    if (item.driverAssignmentsList !== undefined) {
      const vendorId = item.driverAssignmentsList[0].vendorId;
      this.RouteService.getVendorDetailsByVendorId(vendorId).subscribe((response) => {
        if (response) {
          this.vendorDetails = response;
        }
      });
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
      });
      this.driverAvailable = true;
    }
    else {
      this.driverItemList = [];
      this.driverAvailable = false;
    }
  }
}