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
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {


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
  vehicleInfodateValidatiion: boolean = false;
  vehicleAssignmentdateValidatiion: boolean = false;
  statu: any[] = ['Active', "InActive"];
  ownerShp: any[] = [' bamul-own', 'other'];
  depTag: any[] = ['Proc &Input ', 'Marketing', 'Eng']
  subscription: Subscription;
  messages: any;
  submittedassign: boolean = false;
  Vehicle: FormGroup;
  submitted: boolean = false;
  submittedDoc: boolean = false;
  VehicleAssignment: FormGroup;
  VehicleDocuments: FormGroup;
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  vehicleGet: any;
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
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
      vendorId: 90,
      creationDate: '',
      createdBy: '',
      lastUpdateDate: null,
      lastUpdatedBy: null,
      lastUpdateLogin: null,
      vehicle: this.formBuilder.group({
        vehicleId: ''
      })

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
      lastUpdateDate: null,
      lastUpdatedBy: null,
      lastUpdateLogin: null,
    });
    
    this.addUser();
    this.subscription = this.vehicleService.getMessage().subscribe(res => {
      //console.log(res);
      // this.messages=res;
    });
    this.getVechilInfo();
    this.getVehicleAssignment();
    this.vechicleType();
    this.getAllDepartmentDetails();
    this.fuelType();
    this.documentType();
    this.byrefidandreference();
    this.getVehicleMakeList();
    this.getCapacityUnits();
this.getVehicleOwnerShipList();
  }


  getVehicleAssignment() {
    if (this.messages.vehicleAssignmentList[0]) {
      this.VehicleAssignment.disable();
      this.VehicleAssignment.patchValue({
        vehicleAssignmentId: this.messages.vehicleAssignmentList[0].vehicleAssignmentId,
        ownership: this.messages.vehicleAssignmentList[0].ownership,
        departmentTagging: this.messages.vehicleAssignmentList[0].departmentTagging,
        tenderRate: this.messages.vehicleAssignmentList[0].tenderRate,
        extraKMRate: this.messages.vehicleAssignmentList[0].extraKMRate,
        tenderDieselPrice: this.messages.vehicleAssignmentList[0].tenderDieselPrice,
        gPSDeviceNumber: this.messages.vehicleAssignmentList[0].gPSDeviceNumber,
        driverName: this.messages.vehicleAssignmentList[0].driverName,
        assignmentFromDate: this.messages.vehicleAssignmentList[0].assignmentFromDate,
        assignmenToDate: this.messages.vehicleAssignmentList[0].assignmenToDate,
        vendorId: this.messages.vehicleAssignmentList[0].vendorId,
        recordCreationDate: this.messages.vehicleAssignmentList[0].recordCreationDate,
        recordCreationBy: this.messages.vehicleAssignmentList[0].recordCreationBy,
        lastUpdateDate: this.lastUpdateDate,
        lastUpdateBy: this.data.userId,
        vehicle: this.formBuilder.group({
          vehicleId: this.messages.vehicleId
        })
      })
    }
  }
  getVechilInfo() {
    this.Vehicle.disable();
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
      recordCreationDate: this.messages.recordCreationDate,
      recordCreationBy: this.messages.recordCreationBy,
      lastUpdateDate: this.lastUpdateDate,
      lastUpdateBy: this.data.userId

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
      recordCreationDate: '',
      recordCreationBy: '',
      lastUpdateDate: this.lastUpdateDate,
      lastUpdateBy: this.data.userId,
      saveDocument: false,
      docId: '',
      vehicle: {
        vehicleId: this.messages.vehicleId
      }
    });
  }


  addUser() {
    const control = this.VehicleDocuments.get('users') as FormArray;
    control.push(this.initiatForm());
  }

  viewDocumets() {
    this.router.navigateByUrl('super-admin/transport/vehicle/list-vehicles' );
  }

  get f() { return this.Vehicle.controls; }
  get g() { return this.VehicleAssignment.controls; }

  viewVehicleInfo() {
    this.staticTabs.tabs[1].active = true;
  }

viewVehicleAssignment() {
    this.staticTabs.tabs[2].active = true;
  }

  byrefidandreference() {
    this.spinnerService.show();
    this.vehicleService.byrefidandreference(this.messages.vehicleId).subscribe(res => {
      this.vehicleDocumentsList = res;
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
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "recordCreationDate": this.vehicleDocumentsList[index].creationDate });
          (<FormGroup>this.VehicleDocuments.controls.users).controls[index].patchValue({ "recordCreationBy": this.vehicleDocumentsList[index].creationBy });
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
      },
      error => {

      });
  }
  documentType() {
    this.vehicleService.getDropDownList('ALL', 'ALL', 'DOCUMENT_TYPE').subscribe(
      data => {

        this.documentTypeList = data;
      },
      error => {
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
}