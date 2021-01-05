import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  AppUser: FormGroup;
  otpForm: FormGroup;
  changePasswordForm: FormGroup;
  userVerify = false;
  otpVerify = false;
  passwordConfirmVerify = false;
  stepOne: boolean=true;
  stepTwo: boolean=false;
  stepThree: boolean=false;
  userData: any;
  otpResponse: any;
  smsResponse: any;
  saveToServerResponse: any;
  passwordMatch: boolean=true;
  verifyDisable: boolean=true;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.AppUser = this.formBuilder.group({
      userName: ['', Validators.required]
    });
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() { return this.AppUser.controls; }
  get o() { return this.otpForm.controls; }
  get cp() { return this.changePasswordForm.controls; }
  doUserVerification(event) {
    ////console.log('event', event)
    localStorage.clear();
    this.userVerify = true;
    this.spinnerService.show();
    if (this.AppUser.invalid) {
      return;
    } 
    this.loginService.verifyUser(this.AppUser.value.userName).subscribe(
      res => {
        if (res != null) {
          this.userData=res;
          if(this.userData.phoneNumber!=null && this.userData.phoneNumber!=''){
            this.stepOne=false;
            this.stepTwo=true;
            this.generateOtp(this.userData.phoneNumber);
          } else {
            this.toastr.error('No contact number found', 'forget Password', {
              timeOut: 5000
            });
          }
        } else {
          this.toastr.error('Invalid Username', 'forget Password', {
            timeOut: 5000
          });
        }
      },
      error => {
        ////console.log(error);
        this.toastr.error('Invalid Username', 'forget Password', {
          timeOut: 5000
        });
      });
  }
  generateOtp(phoneNumber){
    this.loginService.generateOtp().subscribe(
      res => {
        if (res != null) {
          this.otpResponse=res;
          // console.log('this.otpResponse',this.otpResponse)
          let message=this.otpResponse+' OTP for Reset Password';
          this.sendSmsToUser(phoneNumber,message);
        }
      },
      error => {
        ////console.log(error);
        this.toastr.error('Otp not generated', 'forget Password', {
          timeOut: 5000
        });
      });
  }
  sendSmsToUser(phoneNumber,message){
    this.loginService.sendSms(phoneNumber,message).subscribe(
      res => {
        if (res != null) {
          this.smsResponse=res;
          // console.log('this.smsResponse',this.smsResponse)
          this.saveOtoToServer();
        }
      },
      error => {
        ////console.log(error);
        this.toastr.error('Sms not sent', 'forget password', {
          timeOut: 5000
        });
      });
  }
  saveOtoToServer(){
    var date = new Date();
    let currentDate = this.datePipe.transform(date, 'dd-MM-yyyy');
    let currentTime = this.datePipe.transform(date, 'HH:MM:SS');
    let postData={
        "userName":this.AppUser.value.userName,
        "otpNum":this.otpResponse,
        "genDate":currentDate,
        "genTime":currentTime
    }
    this.loginService.saveOtpToServer(postData).subscribe(
      res => {
        if (res != null) {
          this.saveToServerResponse=res;
          // console.log('this.saveToServerResponse',this.saveToServerResponse)
        }
      },
      error => {
        ////console.log(error);
        this.toastr.error('user failed    ', 'login', {
          timeOut: 5000
        });
      });
  }
  ValidateOtp(event) {
    ////console.log('event', event)
    this.otpVerify = true;
    this.spinnerService.show();
    if (this.otpForm.invalid) {
      return;
    } 
    if(this.otpResponse==this.otpForm.value.otp){
      // console.log('otp matched');
      this.stepOne=false;
      this.stepTwo=false;
      this.stepThree=true;
    }
  }
  comparePassword(){
    // console.log('this.changePasswordForm',this.changePasswordForm.value);
    if(this.changePasswordForm.value.password!=this.changePasswordForm.value.confirmPassword){
      this.passwordMatch=false;
      this.verifyDisable=true;
    } else {
      this.passwordMatch=true;
      this.verifyDisable=false;
    }
  }
  changePassword(){
    this.passwordConfirmVerify=true;
    if (this.changePasswordForm.invalid) {
      return;
    } 
    let postData={
      "userName":this.AppUser.value.userName,
      "encryptUserPw":this.changePasswordForm.value.password
    }
    this.loginService.changePassword(postData).subscribe(
      res => {
        if (res != null) {
          // console.log('res',res)
          this.toastr.success('Password successfully changed', 'forget password', {
            timeOut: 5000
          });
        }
      },
      error => {
        ////console.log(error);
        this.toastr.error('Something went wrong!', 'forget password', {
          timeOut: 5000
        });
      });
  }
  redirectTo(path: any) {
    this.route.navigateByUrl('/' + path);
  }
}
