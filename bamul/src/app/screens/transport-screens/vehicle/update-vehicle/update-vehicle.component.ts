import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Vehicle } from 'src/app/shared/model/vehicle'
import { Router } from '@angular/router';
import { VehicleAssignment } from '../../../../shared/model/VehicleAssignment'
import { VehicleDocuments } from '../../../../shared/model/VehicleDocuments ';
import { TabsetComponent, BsDatepickerConfig } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/app/shared/service/vehicle.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { RouteService } from 'src/app/shared/service/route.service';
@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  allStCodeList: any[] = ['Karanataka', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', ' Uttar Pradesh', 'Uttarakhand', ' West Bengal'];

  statesMap = new Map([['AP', 'Andhra Pradesh'], ['AR', 'Arunachal Pradesh'], ['AS', 'Assam'], ['BR', 'Bihar'],
  ['CG', 'Chattisgarh'], ['GA', 'Goa'], ['GJ', 'Gujarat'], ['HR', 'Haryana'], ['HP', 'Himachal Pradesh'],
  ['JK', 'Jammu and Kashmir'], ['JH', 'Jharkhand'], ['KA', 'Karnataka'], ['KL', 'Kerala'], ['MP', 'Madhya Pradesh'],
  ['MH', 'Maharashtra'], ['MN', 'Manipur'], ['ML', 'Meghalaya'], ['MZ', 'Mizoram'], ['NL', 'Nagaland'],
  ['OD', 'Odisha'], ['PB', 'Punjab'], ['RJ', 'Rajasthan'], ['SK', 'Sikkim'], ['TN', 'Tamilnadu'], ['TR', 'Tripura'],
  ['UP', 'Uttar Pradesh'], ['UK', 'Uttarakhanad'], ['WB', 'West Bengal'], ['TS', 'Telangana']]);

  allFuelList: any[] = ['Diesel', 'Petrol'];
  vehicleTyp: any[] = ['Van', 'Ambulance', 'Motorcycle', 'Tractor', 'Truck', 'Carriage', 'Container']
  doctypes: any[] = ['Insurance', 'Fitness', 'PUC', 'Road Tax', 'Others'];

  statu: any[] = ['Active', "InActive"];
  ownerShp: any[] = [' bamul-own', 'other'];
  depTag: any[] = ['Proc &Input ', 'Marketing', 'Eng']
  subscription: Subscription;
  messages: any;
  addNewRow: boolean = true;
  submittedassign: boolean = false;
  Vehicle: FormGroup;
  submitted: boolean = false;
  submittedDoc: boolean = false;
  VehicleAssignment: FormGroup;
  VehicleDocuments: FormGroup;
  lastUpdateDate: any;
  data: any;
  vehicleId: any;
  recordCreationDate: string;
  vechicleTypeList: Object;
  departments: any;
  fuelTypeList: Object;
  documentTypeList: Object;
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  vehicleDocumentsList: any;
  docFormData: FormData;
  vehicleMakeList: Object;
  capacityUnitsList: Object;
  vehicleOwnershipList: Object;
  vehicleAssignmentList: any;
  vendorDetails: any = '';
  driverItemList: any[];
  driverAvailable: boolean;
  driverListkeyword: any;
  vehicleListkeyword: any;
  vehicleItemList: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinnerService: NgxSpinnerService,
    private RouteService: RouteService,
  ) {
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
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.lastUpdateDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

  }
  ngOnInit() {
    this.messages = JSON.parse(localStorage.getItem('vehicleList'));
    this.data = JSON.parse(localStorage.getItem('data'));
    this.recordCreationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.VehicleDocuments = this.formBuilder.group({
      users: this.formBuilder.array([])
    });


    this.VehicleAssignment = this.formBuilder.group({
      vehicleAssignmentId: '',
      ownership: [''],
      departmentTagging: [''],
      tenderRate: [''],
      extraKMRate: [''],
      tenderDieselPrice: [''],
      gPSDeviceNumber: [''],
      driverName: [''],
      assignmentFromDate: [''],
      assignmenToDate: [''],
      vendorId: '',
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



    this.Vehicle = this.formBuilder.group({
      vehicleId: '',
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
      lastUpdateDate: '',
      lastUpdatedBy: '',
      lastUpdateLogin: null,

    }, {
        validator: StartDateAndEndDateValidation('registrationDate', 'regPeriodTo')
      });

    this.addUser();
    this.subscription = this.vehicleService.getMessage().subscribe(res => {
      //console.log(res);
      // this.messages=res;
    });
    this.vehicleassignmentsList();
    this.getVechilInfo();
    this.vechicleType();
    this.getAllDepartmentDetails();
    this.fuelType();
    this.documentType();
    this.byrefidandreference();
    this.getVehicleMakeList();
    this.getCapacityUnits();
    this.getVehicleOwnerShipList();
    this.driverListkeyword = 'driverName';
    this.vehicleListkeyword = 'vendorName';
  }




  getVechilInfo() {
    this.Vehicle.patchValue({
      vehicleId: this.messages.vehicleId,
      vehicleRegNumber: this.messages.vehicleRegNumber,
      registrationState: this.messages.registrationState,
      registrationDate: this.messages.registrationDate,
      regPeriodFrom: this.messages.regPeriodFrom,
      // ownership: ['', [Validators.required,]],
      regPeriodTo: this.messages.regPeriodTo,
      status: this.messages.status,
      make: this.messages.make,
      model: this.messages.model,
      vehicleType: this.messages.vehicleType,
      vehicleSubType: this.messages.vehicleSubType,
      capacity: this.messages.capacity,
      fuelType: this.messages.fuelType,
      modelYear: this.messages.modelYear,
      capacityUnits: this.messages.capacityUnits,
      materialType: this.messages.materialType,
      creationDate: this.messages.creationDate,
      createdBy: this.messages.createdBy,
      lastUpdateDate: this.lastUpdateDate,
      lastUpdatedBy: this.data.userId

    })

  }

  initiatForm(): FormGroup {
    return this.formBuilder.group({
      documentId: "",
      documentProviderName: ['', Validators.required],
      documentNumber: ['', Validators.required],
      docValidateFrom: ['', Validators.required],
      docValidateTo: ['', Validators.required],
      documentType: ['', Validators.required],
      fileUpload: ['', Validators.required],
      creationDate: '',
      creationBy: '',
      lastUpdateDate: this.lastUpdateDate,
      lastUpdatedBy: this.data.userId,
      saveDocument: false,
      docId: '',
      vehicle: this.formBuilder.group({
        vehicleId: this.messages.vehicleId,
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


  addUser() {
    const control = this.VehicleDocuments.get('users') as FormArray;
    control.push(this.initiatForm());
    this.addNewRow = true;
  }

  remove(index: number, docId) {
    const control = this.VehicleDocuments.get('users') as FormArray;
    if (docId.value.docId) {
      this.vehicleService.deletedocument(docId.value.docId).subscribe(res => {
        this.addNewRow = false;
        control.removeAt(index);
      })
    } else {
      this.addNewRow = false;
      control.removeAt(index);
    }
  }

  get f() { return this.Vehicle.controls; }
  get g() { return this.VehicleAssignment.controls; }


  updateVehicleInfo() {

    if (this.messages.regPeriodTo != this.Vehicle.value.regPeriodTo) {
      this.Vehicle.patchValue({ regPeriodTo: this.datePipe.transform(this.Vehicle.value.regPeriodTo, "dd-MM-yyyy") })
    }
    if (this.messages.registrationDate != this.Vehicle.value.registrationDate) {
      this.Vehicle.patchValue({ registrationDate: this.datePipe.transform(this.Vehicle.value.registrationDate, "dd-MM-yyyy") })
    }

    if (this.Vehicle.invalid) {
      return;
    }
    this.submitted = true;
    this.messages = '';
    this.spinnerService.show();
    this.vehicleService.updateVehicleDetail(this.Vehicle.value)
      .subscribe(
        data => {
          this.messages = data;
          this.getVechilInfo();
          this.staticTabs.tabs[1].active = true;
          this.spinnerService.hide();
          this.toastr.success('Sucessfully   Updated Vehicle Inforamtion  Is Saved');
        },
        error => {
          this.toastr.error('Something Went Wrong ', 'Vehicle Inforamtion', {
            timeOut: 3000
          });
        });
  }
  createAssignment() {
    this.VehicleAssignment.patchValue({
      assignmentFromDate: this.datePipe.transform(this.VehicleAssignment.value.assignmentFromDate, 'dd-MM-yyyy'),
      assignmenToDate: this.datePipe.transform(this.VehicleAssignment.value.assignmenToDate, 'dd-MM-yyyy'),
    })
    let createAssignment = {
      ownership: this.VehicleAssignment.value.ownership,
      departmentTagging: this.VehicleAssignment.value.departmentTagging,
      tenderRate: this.VehicleAssignment.value.tenderRate,
      extraKMRate: this.VehicleAssignment.value.extraKMRate,
      tenderDieselPrice: this.VehicleAssignment.value.tenderDieselPrice,
      gPSDeviceNumber: this.VehicleAssignment.value.gPSDeviceNumber,
      driverName: this.VehicleAssignment.value.driverName.driverName ? this.VehicleAssignment.value.driverName.driverName: this.VehicleAssignment.value.driverName,
      assignmentFromDate: this.VehicleAssignment.value.assignmentFromDate,
      assignmenToDate: this.VehicleAssignment.value.assignmenToDate,
      vendorId: this.VehicleAssignment.value.vendorId.vendorId ? this.VehicleAssignment.value.vendorId.vendorId : this.VehicleAssignment.value.vendorId,
      vehicleDescription: this.VehicleAssignment.value.vendorId.vendorName ? this.VehicleAssignment.value.vendorId.vendorName : this.VehicleAssignment.value.vendorName,
      creationDate: this.VehicleAssignment.value.creationDate,
      createdBy: this.data.userId,
      lastUpdateDate: this.lastUpdateDate,
      lastUpdatedBy: null,
      lastUpdateLogin: null,
      vehicleId: this.messages.vehicleId
    }

    this.spinnerService.show();
    this.vehicleAssignmentList = '';
    this.vehicleService.saveVehicleAssignment(createAssignment)
      .subscribe(
        data => {
          this.vehicleAssignmentList = data;
          this.vehicleassignmentsList();
          this.spinnerService.hide();
          this.VehicleAssignment.reset();
          this.staticTabs.tabs[2].active = true;
          this.toastr.success('Sucessfully Vehicle Assignemnt !', 'Vehicle Assignemnt !');
        },
        error => {
          this.toastr.error('Something Went Wrong ', 'Vehicle Assignemnt ', {
            timeOut: 3000
          });
        });
  }
  updateVehicleAssignment() {
    if (this.VehicleAssignment.value.vehicleAssignmentId == "") {
      this.createAssignment();
    }
    else {
      // if(this.vehicleAssignmentList.length==0){
      //   this.VehicleAssignment.patchValue({ assignmentFromDate: this.datePipe.transform(this.VehicleAssignment.value.assignmentFromDate, "dd-MM-yyyy") })
      //    }else{
      if (this.vehicleAssignmentList[0].assignmentFromDate != this.VehicleAssignment.value.assignmentFromDate) {
        this.VehicleAssignment.patchValue({ assignmentFromDate: this.datePipe.transform(this.VehicleAssignment.value.assignmentFromDate, "dd-MM-yyyy") })
      }
      // }
      // if(this.vehicleAssignmentList.length==0){
      //   this.VehicleAssignment.patchValue({ assignmenToDate: this.datePipe.transform(this.VehicleAssignment.value.assignmenToDate, "dd-MM-yyyy") })
      //   } else{
      if (this.vehicleAssignmentList[0].assignmenToDate != this.VehicleAssignment.value.assignmenToDate) {
        this.VehicleAssignment.patchValue({ assignmenToDate: this.datePipe.transform(this.VehicleAssignment.value.assignmenToDate, "dd-MM-yyyy") })
      }
      // }

      this.submittedassign = true;
      if (this.VehicleAssignment.invalid) {
        return;
      }

      this.spinnerService.show();
      // //console.log('this.vehicleAssignmentList',this.vehicleAssignmentList)
      if (this.vehicleItemList) {
        this.VehicleAssignment.patchValue({
          vendorId: this.vehicleItemList[0].vendorId,
        });
      } else {
        this.VehicleAssignment.patchValue({
          vendorId: this.vehicleAssignmentList[0].vendorId
        });
        this.VehicleAssignment.patchValue({
          vehicleDescription: this.vehicleAssignmentList[0].vehicleDescription
        });
      }
      
      this.vehicleAssignmentList = '';
      this.VehicleAssignment.value.driverName=this.VehicleAssignment.value.driverName.driverName ? this.VehicleAssignment.value.driverName.driverName : this.VehicleAssignment.value.driverName;
      this.VehicleAssignment.value.vendorId=this.VehicleAssignment.value.vendorId.vendorId ? this.VehicleAssignment.value.vendorId.vendorId : this.VehicleAssignment.value.vendorId;
      // //console.log('this.VehicleAssignment.value',this.VehicleAssignment.value)
      this.vehicleService.updateVehicleAssignment(this.VehicleAssignment.value)
        .subscribe(
          res => {
            this.vehicleAssignmentList = res;
            this.vehicleassignmentsList();
            this.spinnerService.hide();
            this.staticTabs.tabs[2].active = true;
            this.toastr.success('Sucessfully  Updated Vehicle Assignemnt !', 'Vehicle Assignemnt !');
          },
          error => {
            this.toastr.error('Something Went Wrong ', 'Vehicle Assignemnt ', {
              timeOut: 3000
            });
          });

    }
  }
  upload(files: File[], index, value) {
    var formData = new FormData();
    Array.from(files).forEach(f =>
      formData.append('myFile', f),
    );
    formData.append('refId', this.messages.vehicleId),
      formData.append('reference', 'vehicle'),
      formData.append('documentType', value.value.documentType),
      formData.append('docProviderName', value.value.documentProviderName)
    formData.append('docNumber', value.value.documentNumber),
      formData.append('docValidityFrom', this.datePipe.transform(value.value.docValidateFrom, 'dd-MM-yyyy')),
      formData.append('docValidityTo', this.datePipe.transform(value.value.docValidateTo, 'dd-MM-yyyy')),
      formData.append('creationDate', this.lastUpdateDate),
      formData.append('creationBy', this.data.userId),
      formData.append('lastUpdateDate', this.lastUpdateDate),
      formData.append('lastUpdateBy', this.data.userId),
      this.docFormData = formData;
  }
  ;

  saveDoc(i, control) {
    if (control.value.fileUpload == "") {
      this.toastr.error('please upload document', 'File Upload!', {
        timeOut: 3000
      });
    }
    this.submittedDoc = true;
    if (this.VehicleDocuments.invalid) {
      return;
    }
    this.spinnerService.show();
    this.vehicleService.uploaddocumentanddetails(this.docFormData)
      .subscribe(
        data => {
          this.submittedDoc = false;
          this.addNewRow = false;
          (<FormGroup>this.VehicleDocuments.controls.users).controls[i].patchValue({ "saveDocument": true });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[i].disable();
          this.spinnerService.hide();
          this.toastr.success('Updated Vehicle Documents!', 'VehicleDocuments!');
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


  addDriverDoc() {
    const control = this.VehicleDocuments.get('users') as FormArray;
    control.push(this.initiatForm());
  }
  vehicleassignmentsList() {
    this.vehicleService.vehicleassignments(this.messages.vehicleId).subscribe(res => {
      this.vehicleAssignmentList = res;
      if (this.vehicleAssignmentList[0]) {
        this.VehicleAssignment.patchValue({
          vehicleAssignmentId: this.vehicleAssignmentList[0].vehicleAssignmentId,
          ownership: this.vehicleAssignmentList[0].ownership,
          departmentTagging: this.vehicleAssignmentList[0].departmentTagging,
          tenderRate: this.vehicleAssignmentList[0].tenderRate,
          extraKMRate: this.vehicleAssignmentList[0].extraKMRate,
          tenderDieselPrice: this.vehicleAssignmentList[0].tenderDieselPrice,
          gPSDeviceNumber: this.vehicleAssignmentList[0].gPSDeviceNumber,
          driverName: this.vehicleAssignmentList[0].driverName,
          assignmentFromDate: this.vehicleAssignmentList[0].assignmentFromDate,
          assignmenToDate: this.vehicleAssignmentList[0].assignmenToDate,
          vendorId: this.vehicleAssignmentList[0].vehicleDescription,
          creationDate: this.vehicleAssignmentList[0].creationDate,
          createdBy: this.vehicleAssignmentList[0].createdBy,
          lastUpdateDate: this.lastUpdateDate,
          lastUpdatedBy: this.data.userId,
          vehicleId: this.messages.vehicleId
        })
      }

    })
  }
  byrefidandreference() {
    this.spinnerService.show();
    this.vehicleService.byrefidandreference(this.messages.vehicleId).subscribe(res => {
      this.vehicleDocumentsList = res;
      this.addNewRow = false;
      this.spinnerService.hide();
      if (this.vehicleDocumentsList.length > 0) {
        const control = this.VehicleDocuments.get('users') as FormArray;
        control.removeAt(0);
        for (let index = 0; index < this.vehicleDocumentsList.length; index++) {
          const vechileDocument = this.VehicleDocuments.get('users') as FormArray;
          vechileDocument.push(this.initiatForm());
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "saveDocument": true });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "documentNumber": this.vehicleDocumentsList[index].docNumber });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].disable();
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "documentType": this.vehicleDocumentsList[index].documentType });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "documentProviderName": this.vehicleDocumentsList[index].docProviderName });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "docValidateFrom": this.vehicleDocumentsList[index].docValidityFrom });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "docValidateTo": this.vehicleDocumentsList[index].docValidityTo });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "docId": this.vehicleDocumentsList[index].docId });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "refId": this.vehicleDocumentsList[index].refId });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "creationDate": this.vehicleDocumentsList[index].creationDate });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "creationBy": this.vehicleDocumentsList[index].creationBy });

        }
      }
    },
      error => {
      }
    )
  }


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
  onChangeSearch(val: string) {
    // if (val.length === 0) {

    // }
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
  onFocused(e) {

  }
  selectEvent(item) {
    this.VehicleAssignment.patchValue({
      vehicleDescription: item.vendorName
    });
  }
}

