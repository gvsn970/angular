import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { InvardVehicleComponent } from 'src/app/screens/security-screens/invard-vehicle/invard-vehicle.component';
import { RequestListComponent } from 'src/app/screens/security-screens/request-list/request-list.component';
import { WeighmentEntryComponent } from 'src/app/screens/security-screens/weighment-entry/weighment-entry.component';
import { ListDispatchSecurityComponent } from 'src/app/screens/security-screens/list-dispatch-security/list-dispatch-security.component';
import { MilkCansConfirmationComponent } from 'src/app/screens/security-screens/milk-cans-confirmation/milk-cans-confirmation.component';
import { EmployeeVehicleLogComponent } from 'src/app/screens/security-screens/employee-vehicle-log/employee-vehicle-log.component';
import { ShippingReturnComponent } from 'src/app/screens/shipping-return/shipping-return/shipping-return.component';
import { OtherSalesOrderDispatchListSecurityComponent } from 'src/app/screens/security-screens/other-sales-order-security/other-sales-order-dispatch-list-security/other-sales-order-dispatch-list-security.component';
import { OtherSalesOrderDispatchSecurityComponent } from 'src/app/screens/security-screens/other-sales-order-security/other-sales-order-dispatch-security/other-sales-order-dispatch-security.component';
import { CcSecurityComponent } from './cc-security.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { SecurityGlobalComponent } from 'src/app/screens/security-screens/security-global/security-global.component';
import { VehicleInwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-inward-security/vehicle-inward-security.component';
import { VehicleOutwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-outward-security/vehicle-outward-security.component';
import { VehicleInwardComponent } from 'src/app/screens/security-screens/vehicle-inward/vehicle-inward.component';
import { VehicleOutwardComponent } from 'src/app/screens/security-screens/vehicle-outward/vehicle-outward.component';


const routes: Routes = [{
  path: '', component: CcSecurityComponent,
  children: [
    { path: '', redirectTo: 'milk-cans-confirmation', pathMatch: 'full' },
    { path: 'inward-vehicle', component: InvardVehicleComponent},
    { path: 'milk-cans-confirmation', component: MilkCansConfirmationComponent},
    { path: 'order-dispatch-security', component: ListDispatchSecurityComponent },
    { path: 'shipping-returns', component: ShippingReturnComponent },
    { path: 'employee-vehicle-log', component: EmployeeVehicleLogComponent },
    { path: 'other-sales-order-security', component: OtherSalesOrderDispatchListSecurityComponent },
    { path: 'other-sales-order-dispatch-security', component: OtherSalesOrderDispatchSecurityComponent },
    { path: 'security/security-global', component: SecurityGlobalComponent },
    { path: 'security/global-inward', component: VehicleInwardSecurityComponent },
    { path: 'security/global-outward', component: VehicleOutwardSecurityComponent },
    { path: 'security/vehicle-inward', component: VehicleInwardComponent },
    { path: 'security/vehicle-outward', component: VehicleOutwardComponent },
    { path: 'contact', component: ContactComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcSecurityRoutingModule { }
