import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { ScreensComponent } from './core/pages/screens/screens.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { CustomerRegistrationComponent } from './screens/abundant-screens/customer-registration/customer-registration.component';
import { ForgetPasswordComponent } from './core/pages/forget-password/forget-password.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'screen', component: ScreensComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'customer-registration', component: CustomerRegistrationComponent },
  // {
  //   path: 'bmc-manager',
  //   loadChildren: './roles/bmc-manager/bmc-manager.module#BmcManagerModule',
  //   canActivate: [AuthGuard],
  //   data: { role: 'BMC' }
  // },
  // {
  //   path: 'security-manager',
  //   loadChildren: './roles/security-manager/security-manager.module#SecurityManagerModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '110008' },
  // },

  // {
  //   path: 'transport-manager',
  //   loadChildren: './roles/transport-manager/transport-manager.module#TransportManagerModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '110006' },
  // },
  // {
  //   path: 'transport-operator',
  //   loadChildren: './roles/transport-operator/transport-operator.module#TransportOperatorModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '110007' },
  // },
  // {
  //   path: 'admin-new',
  //   loadChildren: './roles/admin/admin.module#AdminModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '103002' },
  // },
  // {
  //   path: 'customer',
  //   loadChildren: './roles/customer/customer.module#CustomerModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '109013' },
  // },
  // {
  //   path: 'call-desk',
  //   loadChildren: './roles/calldesk/calldesk.module#CalldeskModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '110012' },
  // },
  // {
  //   path: 'route-inspector',
  //   loadChildren: './roles/route-inspector/route-inspector.module#RouteInspectorModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '120120' },
  // },
  // {
  //   path: 'product-dispatch',
  //   loadChildren: './roles/product-dispatch-operator/product-dispatch-operator.module#ProductDispatchOperatorModule',
  //   canActivate: [AuthGuard],
  //   data: { role: '111001' },
  // },



  /************New Structure **********/
  {
    path: 'super-user',
    loadChildren: './application/super-user/super-user.module#SuperUserModule',
    canActivate: [AuthGuard],
    data: { role: '110002' },
  },
  {
    path: 'rmrd-operator',
    loadChildren: './application/rmrd-operator/rmrd-operator.module#RmrdOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '130008' },
  },
  {
    path: 'rmrd-lab-operator',
    loadChildren: './application/rmrd-lab-operator/rmrd-lab-operator.module#RmrdLabOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '130009' },
  },
  {
    path: 'rmrd-lab-manager',
    loadChildren: './application/rmrd-lab-manager/rmrd-lab-manager.module#RmrdLabManagerModule',
    canActivate: [AuthGuard],
    data: { role: '130010' },
  },
  {
    path: 'rmrd-manager',
    loadChildren: './application/cc-manager/cc-manager.module#CcManagerModule',
    canActivate: [AuthGuard],
    data: { role: '130011' },

  },
  {
    path: 'bmc-operator',
    loadChildren: './application/bmc/bmc.module#BmcModule',
    canActivate: [AuthGuard],
    data: { role: '120005' },
  },
  {
    path: 'dairy-wb',
    loadChildren: './application/dairy-wb-operator/dairy-wb-operator.module#DairyWbOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '140003' },
  },
  {
    path: 'dairy-lab',
    loadChildren: './application/bmc-lab-operator/bmc-lab-operator.module#BmcLabOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '120003' },
  },
  {
    path: 'super-admin',
    loadChildren: './application/admin-access/admin-access.module#AdminAccessModule',
    canActivate: [AuthGuard],
    data: { role: '110001' },
  },
  {
    path: 'sales-order',
    loadChildren: './application/call-desk-user/call-desk-user.module#CallDeskUserModule',
    canActivate: [AuthGuard],
    data: { role: '160004' },
  },
  {
    path: 'society-operator',
    loadChildren: './application/mpcs/mpcs.module#MpcsModule',
    canActivate: [AuthGuard],
    data: { role: '170002' },
  },
  {
    path: 'security-operator',
    loadChildren: './application/cc-security/cc-security.module#CcSecurityModule',
    canActivate: [AuthGuard],
    data: { role: '190003' },
  },
  {
    path: 'customer',
    loadChildren: './application/retailer/retailer.module#RetailerModule',
    canActivate: [AuthGuard],
    data: { role: '190005' },
  },
  {
    path: 'transport',
    loadChildren: './application/transport-manager/transport-manager.module#TransportManagerModule',
    canActivate: [AuthGuard],
    data: { role: '130006' },
  },
  {
    path: 'indent-super-user',
    loadChildren: './application/indent-super-user/indent-super-user.module#IndentSuperUserModule',
    canActivate: [AuthGuard],
    data: { role: '160001' },
  },
  {
    path: 'route-inspector',
    loadChildren: './application/route-inspector/route-inspector.module#RouteInspectorModule',
    canActivate: [AuthGuard],
    data: { role: '160003' },
  },
  {
    path: 'product-dispatch',
    loadChildren: './application/dispatcher/dispatcher.module#DispatcherModule',
    canActivate: [AuthGuard],
    data: { role: '160006' },
  },
  {
    path: 'employee',
    loadChildren: './application/employee/employee.module#EmployeeModule',
    canActivate: [AuthGuard],
    data: { role: '150001' },
  },
  {
    path: 'dairymanager',
    loadChildren: './application/bmc-manager/bmc-manager.module#BmcManagerModule',
    canActivate: [AuthGuard],
    data: { role: '120004' },
  },
  {
    path: 'data-upload',
    loadChildren: './application/data-upload-operator/data-upload-operator.module#DataUploadOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '200001' },
  },
  {
    path: 'mkt-dairy-manager',
    loadChildren: './application/mkt-dairy-manager/mkt-dairy-manager.module#MktDairyManagerModule',
    canActivate: [AuthGuard],
    data: { role: '160007' },
  },
  {
    path: 'account-operator',
    loadChildren: './application/account-operator/account-operator.module#AccountOperatorModule',
    canActivate: [AuthGuard],
    data: { role: '160009' },
  },
  {
    path: 'dairy-security',
    loadChildren: './application/dairy-security/dairy-security.module#DairySecurityModule',
    canActivate: [AuthGuard],
    data: { role: '190002' },
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
