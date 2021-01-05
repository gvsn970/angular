import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountOperatorRoutingModule } from './account-operator-routing.module';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { CustomerAccountComponent } from 'src/app/screens/customer-order-screens/account-screens/customer-account/customer-account.component';
import { RechargeAccountComponent } from 'src/app/screens/customer-order-screens/account-screens/recharge-account/recharge-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountOperatorComponent } from './account-operator.component';


@NgModule({
  declarations: [AccountOperatorComponent , SidebarComponent  ,CustomerAccountComponent , RechargeAccountComponent],
  imports: [
    CommonModule,
    AccountOperatorRoutingModule,
    SharedModule,
  ],
  exports : [CustomerAccountComponent , RechargeAccountComponent ]
})
export class AccountOperatorModule { }
