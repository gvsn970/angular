import { DriverService } from 'src/app/shared/service/driver.service';
import { ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Driver } from 'src/app/shared/model/driver';
import { DriverAssignments } from 'src/app/shared/model/driver-assignmets';
import { DriverDocuments } from 'src/app/shared/model/driver-documents';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})

export class AddDriverComponent implements OnInit {
  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  allStCodeList: any[] = ['Karnataka', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', ' Uttar Pradesh', 'Uttarakhand', ' West Bengal'];
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  Driver: FormGroup;
  DriverAssignments: FormGroup;
  Driverdocuments: FormGroup;
  addNewRow: boolean = true;
  submitted = false;
  submittedassignment = false;
  driverassignmentButton: boolean = true;
  submittedDoc = false;
  departments = ['departments1', "departments2"];
  doctypes: any[] = ['Insurance', 'Fitness', 'PUC', 'Road Tax', 'Others'];
  selectedState: number;
  selectedCity: number;
  country = ['india']
  cities: any[] = ['Kolkata', 'Mumbai'];
  states: any;
  creationDate: any;
  data: any;
  driverId: any;
  genderList: any;
  nomineeList: any;
  validateSatusList: Object;
  licenceTypeList: Object;
  documentTypeList: Object;
  docFormData: FormData;
  vehicleListkeyword: any;
  vehicleItemList: any;
  alredeyExitDriver: boolean=true;
  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private vehicleService: VehicleService,
    private driverService: DriverService) {
    this.states = this.sharedService.getStates();
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
    this.creationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit() {
    this.vehicleListkeyword = 'vendorName';
    this.Driverdocuments = this.formBuilder.group({
      users: this.formBuilder.array([])
    });
    this.DriverAssignments = this.formBuilder.group({
      vendorId: [''],
      department: [''],
      startDate: [''],
      endDate: [''],
      creationDate: '',
      createdBy: '',
      lastUpdateDate: '',
      lastUpdatedBy: '',
      driverId: '',
      vendorName: ''
    }, {
        validator: StartDateAndEndDateValidation('startDate', 'endDate')
      })

    this.Driver = this.formBuilder.group({
      driverName: ['', Validators.required],
      gender: ['', Validators.required],
      driverDateofBirth: ['', Validators.required],
      mobileNumber: ['', [Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]],
      licenceNumber: ['', Validators.required],
      licenceExpDate: [''],
      status: 'Active',
      state: [''],
      city: [''],
      nomineeName: [''],
      nomineeRelation: [''],
      nomineeDateoFBirth: [''],
      licenceType: [''],
      address: [''],
      country: [''],
      creationDate: this.creationDate,
      createdBy: this.data.userId,
      lastUpdateDate: '',
      lastUpdatedBy: ''
    });

    // this.addFieldValue();
    this.Driver.patchValue({
      creationDate: this.creationDate,
      createdBy: this.data.userId,
      country: "india"
    })
    this.DriverAssignments.patchValue({
      creationDate: this.creationDate,
      createdBy: this.data.userId,
    })

    this.gender();
    this.getAllDepartmentDetails();
    this.nominee();
    this.validityStatus();
    this.licenceType();
    this.DocumentType();
  }


  onSelectState(stateId: number) {
    this.selectedState = stateId;
    this.selectedCity = 0;
    this.cities = this.sharedService.getCity().filter((item) => {
      return item.stateId === Number(stateId);
    });

  }

  initiatForm(): FormGroup {
    return this.formBuilder.group({
      // driverDocumentId:['', Validators.required],
      documentProviderName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      docStartDate: ['', Validators.required],
      docEndDate: ['', Validators.required],
      documentType: ['', Validators.required],
      fileUpload: ['', Validators.required],
      creationDate: this.creationDate,
      createdBy: this.data.userId,
      // documentImage:"",
      // myFile:"",
      saveDocument: false,
      lastUpdateDate: '',
      lastUpdatedBy: '',
      driver:
      {
        driverId: this.driverId.driverId
      }
    }, {
        validator: StartDateAndEndDateValidation('docStartDate', 'docEndDate')
      })
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


  addDriverDoc() {
    const control = this.Driverdocuments.get('users') as FormArray;
    control.push(this.initiatForm());
    this.addNewRow = true;
  }

  remove(index: number) {
    const control = this.Driverdocuments.get('users') as FormArray;
    control.removeAt(index);
    this.addNewRow = false;
    this.toastr.error('At least One Documents ', 'Single row', {
      timeOut: 3000
    });
  }

  get f() { return this.Driver.controls; }
  get g() { return this.DriverAssignments.controls; }


  Create() {
    this.submitted = true;
    var today = new Date();
    var birthDate = new Date(this.Driver.value.driverDateofBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      this.toastr.error('DOB should be less than 18', '"DOB not valid"', {
        timeOut: 3000
      });
    } else {

      if (this.Driver.invalid) {
        return;
      }
      if(!this.alredeyExitDriver){
        this.Driver.patchValue({
          driverDateofBirth: this.datePipe.transform(this.Driver.value.driverDateofBirth, 'dd-MM-yyyy'),
          licenceExpDate: this.datePipe.transform(this.Driver.value.licenceExpDate, 'dd-MM-yyyy'),
          nomineeDateoFBirth: this.datePipe.transform(this.Driver.value.nomineeDateoFBirth, 'dd-MM-yyyy'),
        })
      }
           this.spinner.show();
      this.driverService.createDriver(this.Driver.value)
        .subscribe(
          data => {
            this.Driver.reset();
            this.spinner.hide();
            this.driverId = data;
            this.submitted = false;
            this.driverassignmentButton = false;
            this.staticTabs.tabs[1].active = true;
            // this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
            this.toastr.success(' Sucessfully Driver created', 'Driver', {
              timeOut: 1000
            });
          },
          error => {
            this.toastr.error(error.error.message, 'Driver', {
              timeOut: 3000
            });
            this.alredeyExitDriver=false;
            this.spinner.hide();
          });
    }

  }

  diverAssign() {
    this.submittedassignment = true;
    if (this.DriverAssignments.invalid) {
      return;
    }
    // //console.log(this.vehicleItemList[0], 'this.vehicleItemList[0]');
    if (this.vehicleItemList !== undefined && this.vehicleItemList.length > 0) {
      this.DriverAssignments.patchValue({
        vendorId: this.vehicleItemList[0].vendorId
      });
    }
    this.DriverAssignments.patchValue({
      startDate: this.datePipe.transform(this.DriverAssignments.value.startDate, 'dd-MM-yyyy'),
      endDate: this.datePipe.transform(this.DriverAssignments.value.endDate, 'dd-MM-yyyy'),
      driverId: this.driverId.driverId
    });
    this.spinner.show();
    this.driverService.saveDriverAssignments(this.DriverAssignments.value).subscribe(
      data => {
        this.addDriverDoc();
        this.spinner.hide();
        this.DriverAssignments.reset();
        this.submittedassignment = false;
        this.driverassignmentButton = true;
        this.staticTabs.tabs[2].active = true;
        this.toastr.success(' Sucessfully created', 'Assignment', {
          timeOut: 1000
        });
      },
      error => {
        this.toastr.error(' Somethingwent wrong', 'Assignment', {
          timeOut: 1000
        });
      });
  }

  saveDoc(i, control) {
    if (control.value.fileUpload == "") {
      this.toastr.error('please upload document', 'File Upload!', {
        timeOut: 3000
      });
    }
    this.submittedDoc = true;
    if (this.Driverdocuments.invalid) {
      return;
    }
    this.spinner.show();
    this.driverService.uploaddocumentanddetails(this.docFormData).subscribe(
      data => {
        (<FormGroup>this.Driverdocuments.controls.users).controls[i].patchValue({ "saveDocument": true });
        (<FormGroup>this.Driverdocuments.controls.users).controls[i].disable();
        this.submittedDoc = false;
        this.addNewRow = false;
        this.spinner.hide();
        this.toastr.success(' Sucessfully created', 'Documents', {
          timeOut: 1000
        });
      },
      error => {
        this.toastr.error(' Somethingwent wrong', 'Documents', {
          timeOut: 1000
        });
      });
  }

  getAllDepartmentDetails() {
    this.driverService.getAllDepartmentDetails().subscribe(
      data => {
        this.departments = data;
      });
  }

  gender() {
    this.driverService.getDropDownList('ALL', 'ALL', 'GENDER').subscribe(
      data => {
        this.genderList = data;
      });
  }

  nominee() {
    this.driverService.getDropDownList('ALL', 'ALL', 'NOMINEE').subscribe(
      data => {

        this.nomineeList = data;
      });
  }

  validityStatus() {
    this.driverService.getDropDownList('ALL', 'ALL', 'VALIDITY_STATUS').subscribe(
      data => {
        this.validateSatusList = data;
      });
  }

  licenceType() {
    this.driverService.getDropDownList('ALL', 'ALL', 'LICENCE_TYPE').subscribe(
      data => {
        this.licenceTypeList = data;
      });
  }

  DocumentType() {
    this.driverService.getDropDownList('ALL', 'ALL', 'DOCUMENT_TYPE').subscribe(
      data => {
        this.documentTypeList = data;
      });
  }

  upload(files: File[], index, value) {
    //console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('myFile', f),
    );
    formData.append('refId', this.driverId.driverId),
      formData.append('reference', 'Driver'),
      formData.append('documentType', value.value.documentType),
      formData.append('docProviderName', value.value.documentProviderName)
    formData.append('docNumber', value.value.documentNumber),
      formData.append('docValidityFrom', this.datePipe.transform(value.value.docStartDate, 'dd-MM-yyyy')),
      formData.append('docValidityTo', this.datePipe.transform(value.value.docEndDate, 'dd-MM-yyyy')),
      formData.append('creationDate', this.creationDate),
      formData.append('creationBy', this.data.userId),
      formData.append('lastUpdateDate', value.value.lastUpdateDate),
      formData.append('lastUpdateBy', value.value.lastUpdatedBy),
      this.docFormData = formData;

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  toUpper(value) {
    this.Driver.patchValue({
      driverName: value.toUpperCase()
    })
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
  selectEvent(item) {
    this.DriverAssignments.patchValue({
      vendorName: item.vendorName
    });
  }
}
