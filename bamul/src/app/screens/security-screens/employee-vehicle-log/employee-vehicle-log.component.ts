import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormGroup, FormArray, NgForm } from '@angular/forms';
import { RouteService } from 'src/app/shared/service/route.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-vehicle-log',
  templateUrl: './employee-vehicle-log.component.html',
  styleUrls: ['./employee-vehicle-log.component.css']
})

export class EmployeeVehicleLogComponent implements OnInit {
  EmpDeatils: FormGroup;
  dateValue: string;
  shiftDispatch: string;
  listOfRandomCheck: Object;
  submitted = false;
  submittedempdetails = false;
  listArray: any = [];
  employeeList: any = [];
  currenytDate: any;
  currenytTm: any;
  timer: any;
  time = new Date();
  empLogs: any;
  employeeNumber: any;
  createEmployeeVeh: boolean = true;
  constructor(
    private datePipe: DatePipe,
    private routeService: RouteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.currenytDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
  }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
      this.currenytTm = this.datePipe.transform(this.time, 'HH:mm:ss ');
    }, 1000);
    this.EmpDeatils = this.formBuilder.group({
      empNo: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.EmpDeatils.controls; }

  valempvehlog(employeeNumber) {
    this.routeService.valempvehlog(employeeNumber, this.currenytDate,).subscribe(
      data => {
        if (data == true) {
          this.createEmployeeVeh = true;
          this.toastr.error(' One record for the Day already exist  ')
        } else if (data == false) {
          this.createEmployeeVeh =false ;
               }
      },
      error => {
      })
  }

  validateTextLength(e) {
    let arrayList;
    arrayList = (e.target.value)
    if (arrayList.length < 6) {
      this.submitted = true;
    } else {
      this.valempvehlog(e.target.value,)
      this.submitted = true;
      this.spinner.show();
      this.routeService.getEmployeeVehicleLogByEmpNo(e.target.value).subscribe(
        data => {
          this.spinner.hide();
          this.empLogs = data;
          this.submitted = false;
          this.employeeList.push(data);
        },
        error => {
          this.empLogs = "";
          this.spinner.hide();
          this.createEmployeeVeh = true;
          this.toastr.error(error.error.message)
        });
    }
  }

  createEmployeeVehicleLog() {
    let createEmployeeVehicle = {
      "empNo": this.empLogs.employeeNumber,
      "inDate": this.currenytDate,
      "inTime": this.currenytTm,
    }
    this.routeService.createEmployeeVehicleLog(createEmployeeVehicle).subscribe(
      data => {
        this.toastr.success(' Sucessfully created', '');
        this.empLogs = "";
        this.EmpDeatils.reset();
      },
      error => {
        this.toastr.error(' Something went wrong', '', {
          timeOut: 1000
        });
        this.empLogs = "";
      });
  }

}
