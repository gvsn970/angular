import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  private allowedRoles: string[];
  private allowedType;
  private UserData;
  private allowed: boolean;
  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const data = localStorage.getItem('data');
    this.UserData = JSON.parse(data);
    ////console.log(this.UserData);
    this.allowedRoles = route.data.role;
    if (this.allowedRoles === this.UserData.role) {
      this.allowed = true;
    } else {
      ////console.log(this.UserData);
      this.router.navigateByUrl(this.UserData.rolePath);
      // if (this.UserData.role === '110005') {
      //   this.router.navigateByUrl('/rmrd-operator/milk-receive/collection');
      // } else if (this.UserData.role === '110004') {
      //   this.router.navigateByUrl('/rmrd-manager/dashboard');
      // } else if (this.UserData.role === '111010') {
      //   this.router.navigateByUrl('/rmrd-lab-manager/lab/list-samples');
      // } else if (this.UserData.role === '110008') {
      //   this.router.navigateByUrl('/security-manager');
      // } else if (this.UserData.role === '110009') {
      //   this.router.navigateByUrl('/security-operator');
      // } else if (this.UserData.role === '110006') {
      //   this.router.navigateByUrl('/transport-manager');
      // } else if (this.UserData.role === '110007') {
      //   this.router.navigateByUrl('/transport-operator');
      // } else if (this.UserData.role === '110005') {
      //   this.router.navigateByUrl('/rmrd-operator');
      // } else if (this.UserData.role === '110004') {
      //   this.router.navigateByUrl('/rmrd-manager');
      // } else if (this.UserData.role === '120120') {
      //   this.router.navigateByUrl('/route-inspector');
      // } else if (this.UserData.role === '111011') {
      //   this.router.navigateByUrl('/rmrd-lab-operator/lab/list-samples');
      // } else if (this.UserData.role === '111010') {
      //   this.router.navigateByUrl('/rmrd-lab-manager');
      // } else if (this.UserData.role === '103001') {
      //   this.router.navigateByUrl('/super-admin/user/list-user');
      // } else if (this.UserData.role === '103002') {
      //   this.router.navigateByUrl('/admin-new');
      // } else if (this.UserData.role === '103003') {
      //   this.router.navigateByUrl('/manager');
      // } else if (this.UserData.role === '109013') {
      //   this.router.navigateByUrl('/customer');
      // } else if (this.UserData.role === '110012') {
      //   this.router.navigateByUrl('/call-desk');
      // } else if (this.UserData.role === '110017') {
      //   this.router.navigateByUrl('/sales-order/temp-indents');
      // } else if (this.UserData.role === '111001') {
      //   this.router.navigateByUrl('/product-dispatch');
      // } else if (this.UserData.role === '110010') {
      //   this.router.navigateByUrl('/society-operator/create-dispatch');
      // } else if (this.UserData.role === '130002') {
      //   this.router.navigateByUrl('bmc-operator/milk-receive/bmccollection');
      // } else if (this.UserData.role === '123123') {
      //   this.router.navigateByUrl('/super-user/user/list-user');
      // } else if (this.UserData.role === '110021') {
      //   this.router.navigateByUrl('dairy-lab/lab/dairy-sample');
      // }
      // else if (this.UserData.role === '110013') {
      //   this.router.navigateByUrl('dairy-wb/request-list');
      // }  
      // else {
      //   this.router.navigateByUrl('/screen');
      // }
      this.toastr.error('Authorization Failed  ', 'Authorization Failed ', {
        timeOut: 5000
      });
    }
    // this.loginService.getUserData().subscribe((data) => {
    //   this.UserData = data;
    //   this.allowedRoles = route.data["role"];
    //   if (this.allowedRoles === this.UserData.role) {
    //     this.allowed = true;
    //   } else {
    //     this.toastr.error('Authorization Failed  ', 'Authorization Failed ', {
    //       timeOut: 5000
    //     });
    //   }
    //   });
    return this.allowed;

  }
}
