import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../../user.service';

import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { DataService } from 'src/app/shared/service/data.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  getUserId: any;
  editUserListItem: any;
  date: Date = new Date();
  ngFormCreateUser: FormGroup;
  submitted = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  userDepartment: any;
  userRole: any;
  userData: any;
  minDate: any;
  maxDate: any;
  customerListItem: any;
  supplierListItem: any;
  contractorListItem: any;
  locationListItem: any;
  phoneValidate: any;
  keyword: any;
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
  employeeId: any = '';
  custStatus: any;
  validationTextCustomer: any = '';
  testemp: any = '';
  employeeSelected: any = false;
  supplierSelected: any = false;
  customerSelected: any = false;
  selDepartment: any;
  sysDate: any;
  statusVal: any;
  showEndDate: any;
  endDate: any;
  applicationListItem: any;
  departmentListItem: any;
  roleListItem: any;
  appName: any;
  role: any;
  customerBlank: any = false;
  employeeNumber : any = '';

  constructor(private userService: UserService, private dataService: DataService, private router: Router, private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeSelected = false;
    this.supplierSelected = false;
    this.customerSelected = false;
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.keyword = 'partyName';
    this.supplierKeyword = 'vendorName';
    this.employeeKeyword = 'empName';
    //Get list of customer
    //this.getCustomerList();
    //Get list of supplier
    //this.getSupplierList();
    //Get list of location
    this.getLocationList();
    this.getApplicationList();
    this.getUserId = this.dataService.getOption();
    if (this.getUserId.userId === undefined) {
      this.router.navigate(['../../user/list-user'])
    }
    else {
      this.userService.getUserByUserId(this.getUserId.userId).subscribe((response) => {
        if (response)
          this.editUserListItem = response;
        this.ngFormCreateUser.patchValue({
          userName: this.editUserListItem.userName,
          encryptUserPw: this.editUserListItem.encryptUserPw,
          status: this.editUserListItem.status,
          phoneNumber: this.editUserListItem.phoneNumber,
          startDate: this.editUserListItem.startDate,
          endDate: this.editUserListItem.endDate,
          employeeId: this.editUserListItem.employeeId,
          employeeName: this.editUserListItem.employeeName,
          role: this.editUserListItem.role,
          rolePath: this.editUserListItem.rolePath,
          locationID: this.editUserListItem.locationID + '/' + this.editUserListItem.locationName,
          emailAddress: this.editUserListItem.emailAddress,
          contractorId: this.editUserListItem.contractorId,
          customerId: this.editUserListItem.customer,
          supplierId: this.editUserListItem.supplierId,
          supplierName: this.editUserListItem.supplierName,
          customerName: this.editUserListItem.customerName,
          accountNumber: this.editUserListItem.accountNumber,
          appName: this.editUserListItem.appName
        })

        this.employeeId = this.editUserListItem.employeeId;
        this.employeeNumber = this.editUserListItem.employeeNum;
        this.accountNumber = this.editUserListItem.accountNumber;
        this.vendorNum = this.editUserListItem.vendorNum;
        this.sysDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.appName = this.editUserListItem.appName;
        this.role = this.editUserListItem.role;

        if (this.editUserListItem.endDate !== null) {
          if (this.sysDate > this.editUserListItem.endDate) {
            //this.editUserListItem.status = 'Inactive';
            this.ngFormCreateUser.patchValue({
              status: 'Inactive'
            });
            this.statusChange('Inactive');
          }
          else {
            this.statusChange(this.editUserListItem.status);
          }
        }
        else {
          this.statusChange(this.editUserListItem.status);
        }

        // if (this.editUserListItem.role === '22' || this.editUserListItem.role === '23') {
        //   this.selDepartment = 'Society';
        // }

        // else if (this.editUserListItem.role === '24' || this.editUserListItem.role === '25' || this.editUserListItem.role === '26') {
        //   this.selDepartment = 'Chilling Center';
        // }

        // else if (this.editUserListItem.role === '01' || this.editUserListItem.role === '02' || this.editUserListItem.role === '03' || this.editUserListItem.role === '04') {
        //   this.selDepartment = 'Sales';
        // }

        // else if (this.editUserListItem.role === '05' || this.editUserListItem.role === '06') {
        //   this.selDepartment = 'Finance';
        // }

        // else if (this.editUserListItem.role === '07' || this.editUserListItem.role === '08' || this.editUserListItem.role === '09' || this.editUserListItem.role === '10' || this.editUserListItem.role === '11' || this.editUserListItem.role === '12' || this.editUserListItem.role === '13' || this.editUserListItem.role === '14' || this.editUserListItem.role === '15') {
        //   this.selDepartment = 'Operations';
        // }

        // else if (this.editUserListItem.role === '16' || this.editUserListItem.role === '17' || this.editUserListItem.role === '18' || this.editUserListItem.role === '19') {
        //   this.selDepartment = 'Transport';
        // }

        // else if (this.editUserListItem.role === '20' || this.editUserListItem.role === '21') {
        //   this.selDepartment = 'Security';
        // }

        // else if (this.editUserListItem.role === '27' || this.editUserListItem.role === '28') {
        //   this.selDepartment = 'BMC';
        // }

        // else if (this.editUserListItem.role === '29' || this.editUserListItem.role === '30') {
        //   this.selDepartment = 'Material Supply';
        // }

        // else if (this.editUserListItem.role === '31') {
        //   this.selDepartment = 'Retail Sales';
        // }

        this.applicationChange(this.editUserListItem.appName);

      });
    }

    //this.ngFormCreateUser.patchValue

    // this.userType = [
    //   { value: 'employee', display: 'Employee' },
    //   { value: 'customer', display: 'Customer' },
    // ];

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
    this.ngFormCreateUser = this.formBuilder.group({
      userName: ['', Validators.required],
      encryptUserPw: ['', Validators.required],
      phoneNumber: [''],
      endDate: [''],
      role: [''],
      rolePath: [''],
      appName: [''],
      locationID: [''],
      emailAddress: ['', [Validators.email, Validators.pattern('^[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\\.[a-zA-Z]{2,10}$')]],
      contractorId: [''],
      customerId: [''],
      supplierId: [''],
      employeeName: [''],
      supplierName: [''],
      customerName: [''],
      status: ['']
    });
    this.getDropDownList();

  }

  get f() { return this.ngFormCreateUser.controls; }


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


  getDropDownList() {
    const application = 'ALL';
    const screenName = 'ALL';
    const dropDownName = 'VALIDITY_STATUS';
    this.userService.getDropDownList(application, screenName, dropDownName).subscribe((response) => {
      this.statusVal = response;
    });
  }

  statusChange(val, input = '') {
    if (input === 'fromView') {
      if (val === 'Inactive') {
        this.showEndDate = true;
        this.endDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
        this.ngFormCreateUser.controls['endDate'].disable();
        this.ngFormCreateUser.patchValue({
          endDate: this.endDate
        });
      }
      else {
        this.showEndDate = false;
        this.ngFormCreateUser.controls['endDate'].enable();
      }
    }
    else {
      if (val === 'Inactive') {
        this.showEndDate = true;
        this.ngFormCreateUser.controls['endDate'].disable();
      }
      else {
        this.showEndDate = false;
        this.ngFormCreateUser.controls['endDate'].enable();
      }
    }


  }

  getLocationList() {
    this.userService.getLocationList().subscribe((response) => {
      if (response)
        this.locationListItem = response;
    });
  }

  updateUser() {
    const objVal = this.ngFormCreateUser.value;
    objVal.createdBy = this.userData.userId;
    
    objVal.creationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

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


    //return false;
    if (this.editUserListItem.startDate != this.ngFormCreateUser.value.startDate) {
      objVal.startDate = this.datePipe.transform(this.ngFormCreateUser.value.startDate, "dd-MM-yyyy");
    }
    if (this.showEndDate === false) {
      if (this.editUserListItem.endDate != this.ngFormCreateUser.value.endDate) {
        objVal.endDate = this.datePipe.transform(this.ngFormCreateUser.value.endDate, "dd-MM-yyyy");
      }
    }
    else {
      //objVal.endDate = this.editUserListItem.endDate;
      objVal.endDate = this.ngFormCreateUser.controls.endDate.value;
    }



    objVal.userId = this.getUserId.userId;
    objVal.startDate = this.editUserListItem.startDate;
    if (this.showEndDate === true) {
      objVal.status = 'Inactive'
    }
    else {
      objVal.status = this.ngFormCreateUser.value.status;
    }

    objVal.encryptFoundaionPw = null;
    objVal.sessionNumber = null;
    objVal.createdBy = null;
    objVal.lastUpdateBy = null;
    objVal.lastLogonDate = null;
    objVal.passwordDate = null;
    objVal.passwordAccessLeft = null;
    objVal.passwordLifespanAccess = null;
    objVal.passwordLifespanDays = null;
    objVal.contactNumber = null;
    objVal.webPassword = null;
    objVal.personPartyId = null;
    objVal.lastUpdateLogin = null;
    objVal.locationID = locationName[0];
    objVal.locationName = locationName[1];
    objVal.employeeNum = this.employeeNumber;
    

    if (this.employeeSelected === true) {
      objVal.employeeName = this.employeeName;
      objVal.employeeId = this.employeeId;
    }
    else if (this.employeeSelected === false) {
      objVal.employeeName = this.editUserListItem.employeeName;
      objVal.employeeId = this.editUserListItem.employeeId;
    }


    if (this.supplierSelected === true) {
      objVal.supplierId = this.supplierId;
      objVal.supplierName = this.supplierName;
      objVal.vendorNum = this.vendorNum;
    }
    else if (this.supplierSelected === false) {

      objVal.supplierId = this.editUserListItem.supplierId;
      objVal.supplierName = this.editUserListItem.supplierName;
      objVal.vendorNum = this.editUserListItem.vendorNum;
    }

    if (this.customerSelected === true) {
      objVal.customerId = this.customerId;
      objVal.customerName = this.customerName;
      objVal.accountNumber = this.accountNumber;
      objVal.personPartyId = this.personPartyId;
    }
    else if (this.customerSelected === false) {
      objVal.customerId = this.editUserListItem.customerId;
      objVal.customerName = this.editUserListItem.customerName;
      objVal.accountNumber = this.editUserListItem.accountNumber;
      objVal.personPartyId = this.editUserListItem.personPartyId;
    }

    if (this.custStatus !== 'A' && this.customerSelected === true && this.customerBlank !== true) {
      this.custAvailable = true;
      this.validationTextCustomer = 'This customer is inactive, please add active user';
      return false;
    }

    if (this.custStatus === undefined) {
      this.validationTextCustomer = '';
    }

    this.submitted = true;
    if (this.ngFormCreateUser.invalid && this.phoneValidate === true) {
      return;
    }
    if (this.ngFormCreateUser.valid && this.phoneValidate === false) {
      this.userService.updateUser(objVal).subscribe((response) => {
        this.toastr.success('User Updated Sucessfully', 'User', {
          timeOut: 4000
        });
        this.router.navigate(['/super-user/user/list-user']);
      });

    }


  }


  selectEvent(item) {
    this.customerId = item.custAcctSiteId;
    this.customerName = item.partyName;
    this.accountNumber = item.accountNumber;
    this.personPartyId = item.partyId;
    this.custAvailable = false;
    this.custStatus = item.siteStatus;
    this.customerSelected = true;
  }

  selectSupplierEvent(item) {
    this.supplierId = item.vendorId;
    this.supplierName = item.vendorName;
    this.vendorNum = item.vendorNum;
    this.supplierSelected = true;
    this.supplierAvailable = false;
  }

  selectEmployeeEvent(item) {
    this.employeeSelected = true;
    this.employeeName = item.empName;
    this.employeeId = item.empId;
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
      });
    }
    else {
      this.customerListItem = [];
      this.customerId = '';
      this.customerName = '';
      this.accountNumber = '';
      this.personPartyId = '';
      this.custAvailable = true;
      this.customerSelected = true;
      //this.custAvailable = false;
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
      this.supplierSelected = true;
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
      this.employeeId = '';
      this.employeeAvailable = true;
      this.employeeSelected = true;
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

  onFocused(e) {
    // do something when input is focused
  }

}
