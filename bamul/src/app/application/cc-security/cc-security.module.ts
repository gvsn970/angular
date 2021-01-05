import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcSecurityRoutingModule } from './cc-security-routing.module';
import { CcSecurityComponent } from './cc-security.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { InvardVehicleComponent } from 'src/app/screens/security-screens/invard-vehicle/invard-vehicle.component';
import { RequestListComponent } from 'src/app/screens/security-screens/request-list/request-list.component';
import { WeighmentEntryComponent } from 'src/app/screens/security-screens/weighment-entry/weighment-entry.component';
import { ListDispatchSecurityComponent } from 'src/app/screens/security-screens/list-dispatch-security/list-dispatch-security.component';
import { MilkCansConfirmationComponent } from 'src/app/screens/security-screens/milk-cans-confirmation/milk-cans-confirmation.component';
import { EmployeeVehicleLogComponent } from 'src/app/screens/security-screens/employee-vehicle-log/employee-vehicle-log.component';
import { ShippingReturnComponent } from 'src/app/screens/shipping-return/shipping-return/shipping-return.component';
import { OtherSalesOrderDispatchListSecurityComponent } from 'src/app/screens/security-screens/other-sales-order-security/other-sales-order-dispatch-list-security/other-sales-order-dispatch-list-security.component';
import { OtherSalesOrderDispatchSecurityComponent } from 'src/app/screens/security-screens/other-sales-order-security/other-sales-order-dispatch-security/other-sales-order-dispatch-security.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SecurityGlobalComponent } from 'src/app/screens/security-screens/security-global/security-global.component';
import { VehicleInwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-inward-security/vehicle-inward-security.component';
import { VehicleOutwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-outward-security/vehicle-outward-security.component';
import { VehicleInwardComponent } from 'src/app/screens/security-screens/vehicle-inward/vehicle-inward.component';
import { VehicleOutwardComponent } from 'src/app/screens/security-screens/vehicle-outward/vehicle-outward.component';
@NgModule({
  declarations: [CcSecurityComponent, SidebarComponent , InvardVehicleComponent , ListDispatchSecurityComponent   , MilkCansConfirmationComponent , EmployeeVehicleLogComponent , ShippingReturnComponent , OtherSalesOrderDispatchListSecurityComponent , OtherSalesOrderDispatchSecurityComponent,SecurityGlobalComponent,VehicleInwardSecurityComponent,VehicleOutwardSecurityComponent,VehicleInwardComponent,VehicleOutwardComponent],
  imports: [
    SharedModule,
    CommonModule,
    CcSecurityRoutingModule
  ],
  exports :[InvardVehicleComponent , ListDispatchSecurityComponent   , MilkCansConfirmationComponent , EmployeeVehicleLogComponent , ShippingReturnComponent , OtherSalesOrderDispatchListSecurityComponent , OtherSalesOrderDispatchSecurityComponent,SecurityGlobalComponent,VehicleInwardSecurityComponent,VehicleOutwardSecurityComponent , VehicleInwardComponent,VehicleOutwardComponent]
})
export class CcSecurityModule { }
