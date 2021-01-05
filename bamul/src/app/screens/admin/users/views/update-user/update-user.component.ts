import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../../user.service';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
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
  userType: any;
  userDepartment: any;
  userRole: any;
  userData: any;
  minDate: any;
  maxDate: any;

  constructor(private userService: UserService, private dataService: DataService, private router: Router, private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.getUserId = this.dataService.getOption();
    if (this.getUserId.userId === undefined) {
      this.router.navigate(['/admin/user/list-user'])
    }
    else {
      this.userService.getUserByUserId(this.getUserId.userId).subscribe((response) => {
        if (response)
          this.editUserListItem = response;
        this.ngFormCreateUser.patchValue({
          userName: this.editUserListItem.userName,
          encryptUserPw: this.editUserListItem.encryptUserPw,
          status: this.editUserListItem.status,
          employeeName: this.editUserListItem.employeeName,
          phoneNumber: this.editUserListItem.phoneNumber,
          startDate: this.editUserListItem.startDate,
          endDate: this.editUserListItem.endDate,
          employeeId: this.editUserListItem.employeeId,
          role: this.editUserListItem.role,
          rolePath: this.editUserListItem.rolePath,
          userType: this.editUserListItem.userType,
          description: this.editUserListItem.description,
          locationID: this.editUserListItem.locationID,
          locationName: this.editUserListItem.locationName,
          emailAddress: this.editUserListItem.emailAddress
        })
        ////console.log(this.editUserListItem, 'userList');
        this.typeChange(this.editUserListItem.userType);
      });
    }

    //this.ngFormCreateUser.patchValue

    this.userType = [
      { value: 'employee', display: 'Employee' },
      { value: 'customer', display: 'Customer' },
    ];

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
      status: ['', Validators.required],
      employeeName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employeeId: ['', Validators.required],
      role: ['', Validators.required],
      rolePath: ['', Validators.required],
      userType: ['', Validators.required],
      description: ['', Validators.required],
      locationID: ['', Validators.required],
      locationName: ['', Validators.required],
      emailAddress: ['', Validators.required]
    });


  }

  get f() { return this.ngFormCreateUser.controls; }

  updateUser() {
    const objVal = this.ngFormCreateUser.value;
    objVal.createdBy = this.userData.userId;
    objVal.creationDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

    if (this.editUserListItem.startDate != this.ngFormCreateUser.value.startDate) {
      objVal.startDate = this.datePipe.transform(this.ngFormCreateUser.value.startDate, "dd-MM-yyyy");
    }

    if (this.editUserListItem.endDate != this.ngFormCreateUser.value.endDate) {
      objVal.endDate = this.datePipe.transform(this.ngFormCreateUser.value.endDate, "dd-MM-yyyy");
    }

    //objVal.endDate = this.datePipe.transform(this.ngFormCreateUser.value.endDate, 'dd-MM-yyyy');
    ////console.log(objVal, 'objVal');

    //return false;

    objVal.userId = this.getUserId.userId;
    objVal.encryptFoundaionPw = null,
      objVal.sessionNumber = null,
      objVal.createdBy = null,
      objVal.lastUpdateBy = null,
      objVal.lastLogonDate = null,
      objVal.passwordDate = null,
      objVal.passwordAccessLeft = null,
      objVal.passwordLifespanAccess = null,
      objVal.passwordLifespanDays = null,
      objVal.contactNumber = null,
      objVal.webPassword = null,
      objVal.personPartyId = null,
      objVal.lastUpdateLogin = null,
      this.submitted = true;
    if (this.ngFormCreateUser.invalid) {
      return;
    }
    if (this.ngFormCreateUser.valid) {
      this.userService.updateUser(objVal).subscribe((response) => {
        this.toastr.success('User Updated Sucessfully', 'User', {
          timeOut: 4000
        });
        this.router.navigate(['/admin/user/list-user']);
      });

    }


  }


  typeChange(selectedValue: string) {
    this.userRole = [];
    if (selectedValue === 'employee') {
      this.userDepartment = [
        { value: 'sales', display: 'Sales' },
        { value: 'finance', display: 'Finance' },
        { value: 'operations', display: 'Operations' },
        { value: 'transport', display: 'Transport' },
        { value: 'security', display: 'Security' },
      ];
    }
    else if (selectedValue === 'customer') {
      this.userDepartment = [
        { value: 'society', display: 'Society' },
        { value: 'chillingCenter', display: 'Chilling Center' },
        { value: 'bmc', display: 'BMC' },
        { value: 'materialSupply', display: 'Material Supply' },
        { value: 'retailsales', display: 'Retail Sales' },
      ];
    }
  }


  departmentChange(selectedValue: string) {
    if (selectedValue === 'sales') {
      this.userRole = [
        { value: '01', display: 'Admin Sales' },
        { value: '02', display: 'Sales Operator' },
        { value: '03', display: 'Call Desk Sales Operator' },
        { value: '04', display: 'Counter Sales Operator' }
      ];
    }
    else if (selectedValue === 'finance') {
      this.userRole = [
        { value: '05', display: 'Admin Finance' },
        { value: '06', display: 'Finance Operator' }
      ];
    }
    else if (selectedValue === 'operations') {
      this.userRole = [
        { value: '07', display: 'Admin Operations' },
        { value: '08', display: 'Weihing Bridge Operator' },
        { value: '09', display: 'Weihing Bridge Operator' },
        { value: '10', display: 'RMRD Operator' },
        { value: '11', display: 'RMRD Manager' },
        { value: '12', display: 'Lab Operator' },
        { value: '13', display: 'Lab Manager' },
        { value: '14', display: 'Dispatch Manager' },
        { value: '15', display: 'Dispatch Operator' },
      ];
    }
    else if (selectedValue === 'transport') {
      this.userRole = [
        { value: '16', display: 'Admin Transport' },
        { value: '17', display: 'Transport Operator' },
        { value: '18', display: 'Transport Manager' },
        { value: '19', display: 'Driver' },
      ];
    }
    else if (selectedValue === 'security') {
      this.userRole = [
        { value: '20', display: 'Security Operator' },
        { value: '21', display: 'Security Manager' }
      ];
    }

    else if (selectedValue === 'society') {
      this.userRole = [
        { value: '22', display: 'MPCS Manager' },
        { value: '23', display: 'MPCS Operator' }
      ];
    }
    else if (selectedValue === 'chillingCenter') {
      this.userRole = [
        { value: '24', display: 'CC Manager' },
        { value: '25', display: 'CC Operator' },
        { value: '26', display: 'CC Security Operator' },
      ];
    }
    else if (selectedValue === 'bmc') {
      this.userRole = [
        { value: '27', display: 'BMC Manager' },
        { value: '130002', display: 'BMC Operator' }
      ];
    }
    else if (selectedValue === 'materialSupply') {
      this.userRole = [
        { value: '29', display: 'Supply Manager' },
        { value: '30', display: 'Supply Operator' }
      ];
    }
    else if (selectedValue === 'retailsales') {
      this.userRole = [
        { value: '31', display: 'Customer' }
      ];
    }
  }

}
