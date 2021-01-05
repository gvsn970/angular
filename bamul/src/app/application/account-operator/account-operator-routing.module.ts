import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountOperatorComponent } from './account-operator.component';
import { CustomerAccountComponent } from 'src/app/screens/customer-order-screens/account-screens/customer-account/customer-account.component';
import { RechargeAccountComponent } from 'src/app/screens/customer-order-screens/account-screens/recharge-account/recharge-account.component';

const routes: Routes = [{
  path: '', component: AccountOperatorComponent,
  children: [
    { path: '', redirectTo: 'customer-account', pathMatch: 'full' },
    { path: 'customer-account', component: CustomerAccountComponent },
    { path: 'recharge-account', component: RechargeAccountComponent },
    { path: '**', redirectTo: 'CustomerAccountComponent' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountOperatorRoutingModule { }
