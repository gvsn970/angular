import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../user.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
// import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {



  date: Date = new Date();
  ngFormCreateUser: FormGroup;
  submitted = false;
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  appName: any;
  userDepartment: any;
  userRole: any;
  userData: any;
  customerListItem: any;
  supplierListItem: any;
  contractorListItem: any;
  locationListItem: any;
  sysDate: any;
  endDate: any;
  dateNow: any;
  userAvailable: any;
  phoneValidate: any;
  checked: any = false;
  keyword: any;
  data: any;
  customerId: any = '';
  customerName: any = '';
  accountNumber: any = '';
  personPartyId: any = '';
  custAvailable: any = false;
  supplierKeyword: any;
  employeeKeyword: any;
  supplierId: any = '';
  supplierName: any = '';
  vendorNum: any = '';
  supplierAvailable: any;
  employeeListItem: any;
  employeeAvailable: any;
  employeeName: any = '';
  employeeID: any = '';
  custStatus: any;
  statusVal: any;
  applicationListItem: any;
  departmentListItem: any;
  roleListItem: any;
  showEndDate: any = false;
  validationTextCustomer: any = '';
  customerBlank: any = false;
  status: any;
  employeeNumber : any = '';
  tempArr = [];
  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }



  ngOnInit() {


    this.keyword = 'partyName';
    this.supplierKeyword = 'vendorName';
    this.employeeKeyword = 'empName';
    this.customerListItem = [];

    this.userData = JSON.parse(localStorage.getItem('data'));

    this.getApplicationList();
    this.getLocationList();

    var date = new Date();
    date.setDate(date.getDate() + 1);
    //this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');




    this.datePickerConfig = Object.assign({},
      {

        // showWeekNumbers: true,
        minDate: new Date(),
        dateInputFormat: 'DD-MM-YYYY',
        // maxDate: new Date(),
        // containerClass: 'theme-dark-blue',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),

      });

    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    const datess = this.datePipe.transform(this.date, 'dd/MM/yyyy');
    this.sysDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    this.ngFormCreateUser = this.formBuilder.group({
      userName: ['', Validators.required],
      encryptUserPw: ['', Validators.required],
      phoneNumber: [''],
      endDate: [''],
      role: [''],
      rolePath: [''],
      appName: [''],
      locationID: [''],
      //emailAddress: ['', Validators.required],
      emailAddress: ['', [Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-zA-Z]{2,10}$')]],
      contractorId: [''],
      status: ['']
    });

    this.getDropDownList();


  }

  getDropDownList() {
    //this.status = 'Active;'
    this.ngFormCreateUser.patchValue({
      status: 'Active'
    })
    const application = 'ALL';
    const screenName = 'ALL';
    const dropDownName = 'VALIDITY_STATUS';
    this.userService.getDropDownList(application, screenName, dropDownName).subscribe((response) => {
      this.statusVal = response;
    });
  }

  get f() { return this.ngFormCreateUser.controls; }

  statusChange(val) {
    if (val === 'Inactive') {
      this.showEndDate = true;
      this.ngFormCreateUser.controls['endDate'].disable();
      this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      this.ngFormCreateUser.patchValue({
        endDate: this.endDate
      });

    }
    else {
      this.showEndDate = false;
      this.ngFormCreateUser.controls['endDate'].enable();
    }

  }

  checkUserExist() {
    this.checked = true;
    var userName = this.ngFormCreateUser.value.userName;
    if (userName.length !== 0) {
      this.userService.checkuserExist(userName).subscribe((response) => {
        if (response != null) {
          this.userAvailable = true;
          //this.submitted = true;
        }
        else {

          this.userAvailable = false;
          //this.submitted = false;
        }

      });
    }
    else {
      this.userAvailable = true;
      this.checked = false;
    }
  }

  checkPhoneNumber(event) {
    if (event.target.value.length > 8) {
      this.phoneValidate = false;
    }

    if (event.target.value.length > 9) {
      return false;
    }



    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57
  }

  getLocationList() {
    this.userService.getLocationList().subscribe((response) => {
      if (response)
        this.locationListItem = response;
    });
  }

  createUser() {
    const objVal = this.ngFormCreateUser.value;
    if (objVal.phoneNumber === null) {
      objVal.phoneNumber = '';
    }

    if (objVal.phoneNumber.toString().length < 10 && objVal.phoneNumber.toString().length > 0) {
      this.submitted = false;
      this.phoneValidate = true;
    }
    else {
      this.phoneValidate = false;
    }

    const locationName = objVal.locationID.split('/');

    if (locationName.length === 1) {
      objVal.locationName = '';
    }
    else {
      objVal.locationName = locationName[1];
    }



    this.validationTextCustomer = '';
    objVal.status = this.ngFormCreateUser.value.status;
    objVal.createdBy = this.userData.userId;
    objVal.creationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    objVal.startDate = this.sysDate;
    objVal.customerId = this.customerId;
    objVal.customerName = this.customerName;
    objVal.accountNumber = this.accountNumber;
    objVal.personPartyId = this.personPartyId;
    objVal.supplierId = this.supplierId;
    objVal.supplierName = this.supplierName;
    objVal.vendorNum = this.vendorNum;
    objVal.employeeName = this.employeeName;
    objVal.employeeId = this.employeeID;
    objVal.contractorName = this.ngFormCreateUser.value.contractorId;
    objVal.contactNumber = objVal.phoneNumber;
    objVal.locationID = locationName[0];
    objVal.rolePath = this.tempArr[0].rolePath;
    objVal.employeeNum = this.employeeNumber;
    //objVal.locationName = locationName[1];
    // if (this.showEndDate === true) {
    //   objVal.endDate = this.datePipe.transform(this.ngFormCreateUser.value.endDate, 'dd-MM-yyyy');
    // }

    // else {
    //   objVal.endDate = '';
    // }
    if (this.showEndDate === false) {
      //if (this.editUserListItem.endDate != this.ngFormCreateUser.value.endDate) {
      objVal.endDate = this.datePipe.transform(this.ngFormCreateUser.value.endDate, "dd-MM-yyyy");
      //}
    }
    else {
      //objVal.endDate = this.editUserListItem.endDate;
      //objVal.endDate = this.ngFormCreateUser.controls.endDate.value;
      objVal.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');


    }

    if (objVal.customerId === undefined || objVal.customerId === '') {
      this.custAvailable = true;
      this.validationTextCustomer = '';
    }
    else {
      this.custAvailable = false;
      this.validationTextCustomer = '';
    }

    if (objVal.supplierId === undefined || objVal.supplierId === '') {
      this.supplierAvailable = true;
    }
    else {
      this.supplierAvailable = false;
    }

    if (objVal.employeeId === undefined || objVal.employeeId === '') {
      this.employeeAvailable = true;
    }
    else {
      this.employeeAvailable = false;
    }

    if (this.custStatus !== 'A' && this.customerBlank !== true) {
      this.custAvailable = true;
      this.validationTextCustomer = 'This customer is inactive, please add active user';
    }

    if (this.custStatus === undefined) {
      this.validationTextCustomer = '';
    }

    this.checkUserExist();

    this.submitted = true;
    if (this.ngFormCreateUser.invalid && this.userAvailable === true) {
      return;
    }

    //return false;
    if (this.ngFormCreateUser.valid && this.userAvailable === false) {
      console.log(objVal);
      this.userService.createUser(objVal).subscribe((response) => {
        this.toastr.success('User Created Sucessfully', 'User', {
          timeOut: 4000
        });
        //this.submitted = true;
        this.router.navigate(['/super-user/user/list-user'])

      });
      //this.ngFormCreateUser.reset();
    }
  }

  getApplicationList() {
    this.userService.getApplicationList().subscribe((response) => {
      if (response)
        this.applicationListItem = response;
    });
  }

  applicationChange(selectedValue: string) {
    //this.roleListItem = [];
    this.userService.getRoleByAppName(selectedValue).subscribe((response) => {
      if (response)
        this.roleListItem = response;
    });
  }

  roleName(roleid) {
    this.tempArr = [];

    this.tempArr = this.roleListItem.filter((obj) => {
      return obj.roleId == roleid;
    });
    console.log(this.tempArr[0].rolePath);

  }


  // departmentChange(selectedValue: string) {
  //   this.userService.getRoleList(selectedValue).subscribe((response) => {
  //     if (response)
  //       this.roleListItem = response;
  //     console.log(this.roleListItem, 'roleListItem');
  //   });
  // }

  selectEvent(item) {
    this.customerId = item.custAcctSiteId;
    this.customerName = item.partyName;
    this.accountNumber = item.accountNumber;
    this.personPartyId = item.partyId;
    this.custAvailable = false;
    this.custStatus = item.siteStatus;
  }

  selectSupplierEvent(item) {
    this.supplierId = item.vendorId;
    this.supplierName = item.vendorName;
    this.vendorNum = item.vendorNum;
    this.supplierAvailable = false;
  }

  selectEmployeeEvent(item) {
    this.employeeName = item.empName;
    this.employeeID = item.empId;
    this.employeeNumber = item.employeeNumber;
    this.employeeAvailable = false;
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {
      this.customerBlank = true;
    }
    if (val.length > 3) {
      this.userService.getCustomerList(val).subscribe((response) => {
        if (response)
          this.customerListItem = response;
        console.log(this.customerListItem, 'customerListItem');
      });
    }
    else {
      this.customerListItem = [];
      this.customerId = '';
      this.customerName = '';
      this.accountNumber = '';
      this.personPartyId = '';
      this.custAvailable = true;
    }
  }

  onChangeSupplierSearch(val: string) {
    if (val.length > 3) {
      this.userService.getSupplierList(val).subscribe((response) => {
        if (response)
          this.supplierListItem = response;


      });
    }
    else {
      this.supplierListItem = [];
      this.supplierId = '';
      this.supplierName = '';
      this.vendorNum = '';
      this.supplierAvailable = true;
    }
  }

  onChangeEmployeeSearch(val: string) {
    if (val.length > 3) {
      this.userService.getEmployeeList(val).subscribe((response) => {
        if (response)
          this.employeeListItem = response;
      });
    }
    else {
      this.employeeListItem = [];
      this.employeeName = '';
      this.employeeID = '';
      this.employeeAvailable = true;
    }
  }

  onFocused(e) {
    // do something when input is focused
  }
}
