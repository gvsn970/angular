import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  AppUser: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private route: Router) { }

  ngOnInit() {
    this.AppUser = this.formBuilder.group({
      userName: ['', Validators.required],
      encryptUserPw: ['', [Validators.required]]
    });
  }
  redirectTo(path: any) {
    this.route.navigateByUrl('/' + path);
  }
  get f() { return this.AppUser.controls; }
  login(event) {
    ////console.log('event', event)
    localStorage.clear();
    this.submitted = true;
    this.spinnerService.show();
    if (this.AppUser.invalid) {
      return;
    }
    this.loginService.validateUser(this.AppUser.value).subscribe(
      res => {
        if (res != null) {

        }
      
        localStorage.setItem('data', JSON.stringify(res));
        localStorage.setItem('coustomerNo', JSON.stringify(null));
        this.loginService.sendUserData(res);
        if (res === false || res == null) {
          this.toastr.error('User Login failed ', 'login', {
            timeOut: 3000
          });


        } else {
          this.toastr.success('User Logged-in Successfully', 'Login', {
            timeOut: 1000
          });
            this.route.navigateByUrl(res.rolePath);
          // if (res.role === '110009') {
          //   this.route.navigateByUrl('/security-operator');
          // } else if (res.role === '110006') {
          //   this.route.navigateByUrl('/transport-manager');
          // } else if (res.role === '110007') {
          //   this.route.navigateByUrl('/transport-operator');
          // } else if (res.role === '103001') {
          //   this.route.navigateByUrl('/super-admin/user/list-user');
          // } else if (res.role === '103002') {
          //   this.route.navigateByUrl('/admin-new');
          // } else if (res.role === '109013') {
          //   this.route.navigateByUrl('/customer');
          // } else if (res.role === '110012') {
          //   this.route.navigateByUrl('/call-desk');
          // } else if (res.role === '111001') {
          //   this.route.navigateByUrl('/product-dispatch');
          // } else if (res.role === '110017') {
          //   this.route.navigateByUrl('/sales-order/temp-indents');
          // } else if (res.role === '120120') {
          //   this.route.navigateByUrl('/route-inspector');
          // } else if (res.role === '110010') {
          //   this.route.navigateByUrl('/society-operator/create-dispatch');
          // } 
          // /****** NEW Structure*****/
          // else if (res.role === '123123') {
          //   this.route.navigateByUrl('/super-user/user/list-user');
          // }
          // else  if (res.role === '110005') {
          //   this.route.navigateByUrl('/rmrd-operator');
          // } 
          // else if (res.role === '111011') {
          //   this.route.navigateByUrl('/rmrd-lab-operator/lab/list-samples');
          // } 
          // else if (res.role === '111010') {
          //   this.route.navigateByUrl('/rmrd-lab-manager/lab/list-samples');
          // } 
          // else if (res.role === '110004') {
          //   this.route.navigateByUrl('/rmrd-manager/dashboard');
          // }
          // else if (res.role === '130002') {
          //   this.route.navigateByUrl('bmc-operator/milk-receive/bmccollection');
          // } 
          // else if (res.role === '110013') {
          //   this.route.navigateByUrl('dairy-wb/request-list');
          // } 
          // else if (res.role === '110021') {
          //   this.route.navigateByUrl('dairy-lab/lab/dairy-sample');
          // } 
          // else {
          //   this.route.navigateByUrl('/screen');
          // }
        }
      },

      error => {
        ////console.log(error);
        this.toastr.error('user failed    ', 'login', {
          timeOut: 3000
        });
      });
  }
}
