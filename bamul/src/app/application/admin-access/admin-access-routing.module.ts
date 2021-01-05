import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ListUsersComponent } from 'src/app/screens/super-admin/users/views/list-users/list-users.component';
import { CreateUserComponent } from 'src/app/screens/super-admin/users/views/create-user/create-user.component';
import { UpdateUserComponent } from 'src/app/screens/super-admin/users/views/update-user/update-user.component';
import { UserComponent } from 'src/app/screens/super-admin/report/views/user/user.component';
import { UpdateRouteSheetComponent } from 'src/app/screens/rmrd-screens/route-sheet/update-route-sheet/update-route-sheet.component';
import { RmrdDashboardComponent } from 'src/app/screens/rmrd-screens/rmrd-dashboard/rmrd-dashboard.component';
import { ListCollectionComponent } from 'src/app/screens/rmrd-screens/milk-receive/list-collection/list-collection.component';
import { WasteMilkRecordsComponent } from 'src/app/screens/rmrd-screens/milk-receive/waste-milk-records/waste-milk-records.component';
import { CollectionComponent } from 'src/app/screens/rmrd-screens/milk-receive/collection/collection.component';
import { ListSamplesComponent } from 'src/app/screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { LabReportComponent } from 'src/app/screens/rmrd-screens/test-lab/lab-report/lab-report.component';
import { UpdateSampleComponent } from 'src/app/screens/rmrd-screens/test-lab/update-sample/update-sample.component';
import { ListRouteSheetComponent } from 'src/app/screens/rmrd-screens/route-sheet/list-route-sheet/list-route-sheet.component';
import { ViewRouteSheetComponent } from 'src/app/screens/rmrd-screens/route-sheet/view-route-sheet/view-route-sheet.component';
import { ViewCollectionComponent } from 'src/app/screens/rmrd-screens/route-sheet/view-collection/view-collection.component';
import { ReportsComponent } from 'src/app/screens/rmrd-screens/reports/reports/reports.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';

import { CreateIndentComponent } from 'src/app/screens/customer-order-screens/indent/create-indent/create-indent.component';
import { UpdateIndentComponent } from 'src/app/screens/transport-screens/indent/update-indent/update-indent.component';
import { ListIndentComponent } from 'src/app/screens/customer-order-screens/indent/list-indent/list-indent.component';











import { ListInvardVehiclesComponent } from 'src/app/screens/security-screens/list-invard-vehicles/list-invard-vehicles.component';
import { IssueInwardComponent } from 'src/app/screens/security-screens/issue-inward/issue-inward.component';
import { InvardVehicleComponent } from 'src/app/screens/security-screens/invard-vehicle/invard-vehicle.component';
import { NewMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/new-milk-transfer/new-milk-transfer.component';
import { ListMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/list-milk-transfer/list-milk-transfer.component';
import { ViewMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/view-milk-transfer/view-milk-transfer.component';

import { KeylogRegisterComponent } from 'src/app/screens/security-screens/keylog-register/keylog-register.component';
import { ListKeylogRegisterComponent } from 'src/app/screens/security-screens/list-keylog-register/list-keylog-register.component';
import { ViewKeylogRegisterComponent } from 'src/app/screens/security-screens/view-keylog-register/view-keylog-register.component';
import { MilkTransferSecurityComponent } from 'src/app/screens/security-screens/milk-transfer-security/milk-transfer-security.component';
import { ListMilkTransferSecurityComponent } from 'src/app/screens/security-screens/list-milk-transfer-security/list-milk-transfer-security.component';
import { VisitorRegisterComponent } from 'src/app/screens/security-screens/visitor-register/visitor-register.component';
import { ListVisitorRegisterComponent } from 'src/app/screens/security-screens/list-visitor-register/list-visitor-register.component';
import { ViewVisitorRegisterComponent } from 'src/app/screens/security-screens/view-visitor-register/view-visitor-register.component';

import { CreateDispatchComponent } from 'src/app/screens/society-screens/create-dispatch/create-dispatch.component';
import { ListDispatchComponent } from 'src/app/screens/society-screens/list-dispatch/list-dispatch.component';
import { CreateGatePassComponent } from 'src/app/screens/security-screens/create-gate-pass/create-gate-pass.component';
import { ListGatePassComponent } from 'src/app/screens/security-screens/list-gate-pass/list-gate-pass.component';
import { ViewGatePassComponent } from 'src/app/screens/security-screens/view-gate-pass/view-gate-pass.component';
import { UpdateGatepassComponent } from 'src/app/screens/security-screens/update-gatepass/update-gatepass.component';
import { BmcMilkDispatchComponent } from 'src/app/screens/bmc-screens/bmc-milk-dispatch/bmc-milk-dispatch.component';
import { ListBmcMilkDispatchComponent } from 'src/app/screens/bmc-screens/list-bmc-milk-dispatch/list-bmc-milk-dispatch.component';
import { ViewBmcMilkDispatchComponent } from 'src/app/screens/bmc-screens/view-bmc-milk-dispatch/view-bmc-milk-dispatch.component';
import { BmcMilkCollectionComponent } from 'src/app/screens/bmc-screens/bmc-milk-collection/bmc-milk-collection.component';
import { ListBmcMilkCollectionComponent } from 'src/app/screens/bmc-screens/list-bmc-milk-collection/list-bmc-milk-collection.component';
import { ViewBmcMilkCollectionComponent } from 'src/app/screens/bmc-screens/view-bmc-milk-collection/view-bmc-milk-collection.component';
import { MilkTransferDispatchComponent } from 'src/app/screens/cc-dispatch/milk-transfer-dispatch/milk-transfer-dispatch.component';
import { ListMilkTransferDispatchComponent } from 'src/app/screens/cc-dispatch/list-milk-transfer-dispatch/list-milk-transfer-dispatch.component';
import { ViewMilkTransferDispatchComponent } from 'src/app/screens/cc-dispatch/view-milk-transfer-dispatch/view-milk-transfer-dispatch.component';
import { SocietyMilkDispatchComponent } from 'src/app/screens/society-screens/society-milk-dispatch/society-milk-dispatch.component';
import { ListSocietyMilkDispatchComponent } from 'src/app/screens/society-screens/list-society-milk-dispatch/list-society-milk-dispatch.component';
import { ViewSocietyMilkDispatchComponent } from 'src/app/screens/society-screens/view-society-milk-dispatch/view-society-milk-dispatch.component';
import { AddKeyLogComponent } from 'src/app/screens/security-screens/add-key-log/add-key-log.component';
import { ListKeylogComponent } from 'src/app/screens/security-screens/list-keylog/list-keylog.component';
import { WbviewMilkTransferComponent } from 'src/app/screens/weighing-bridge/wbview-milk-transfer/wbview-milk-transfer.component';
import { WbListMilkTransferComponent } from 'src/app/screens/weighing-bridge/wb-list-milk-transfer/wb-list-milk-transfer.component';
import { WbMilkTransferComponent } from 'src/app/screens/weighing-bridge/wb-milk-transfer/wb-milk-transfer.component';
import { MilkTransferLabResultsListComponent } from 'src/app/screens/lab-screens/milk-transfer/milk-transfer-lab-results-list/milk-transfer-lab-results-list.component';
import { MilkTransferLabResultviewComponent } from 'src/app/screens/lab-screens/milk-transfer/milk-transfer-lab-resultview/milk-transfer-lab-resultview.component';
import { ListTempIndentsComponent } from 'src/app/screens/sales-order-screens/temporary-indent/list-temp-indents/list-temp-indents.component';
import { TempIndentComponent } from 'src/app/screens/sales-order-screens/temporary-indent/temp-indent/temp-indent.component';
import { SpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/special-indent.component';
import { ListSpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/list-special-indent/list-special-indent.component';
import { UpdateSpecialIndnetComponent } from 'src/app/screens/sales-order-screens/special-indent/update-special-indnet/update-special-indnet.component';
import { PrintReceiptComponent } from 'src/app/screens/sales-order-screens/special-indent/print-receipt/print-receipt.component';
import { ReceiptFormComponent } from 'src/app/screens/sales-order-screens/special-indent/receipt-form/receipt-form.component';
import { ChallanComponent } from 'src/app/screens/sales-order-screens/special-indent/challan/challan.component';
import { RouteInsepectorHoldComponent } from 'src/app/screens/rmrd-screens/route-insepector-hold/route-insepector-hold.component';

import { MnmWeighingBridgeListDairyOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-list-dairy-operator/mnm-weighing-bridge-list-dairy-operator.component';
import { MnmWeighingBridgeListCcCampOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-list-cc-camp-operator/mnm-weighing-bridge-list-cc-camp-operator.component';
import { MnmWeighingBridgeCcCampOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-cc-camp-operator/mnm-weighing-bridge-cc-camp-operator.component';
import { MnmLoadingScreenComponent } from 'src/app/screens/milk-material-transfer/mnm-loading-screen/mnm-loading-screen.component';
import { MnmUnloadingScreenComponent } from 'src/app/screens/milk-material-transfer/mnm-unloading-screen/mnm-unloading-screen.component';
import { VehicleInwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-inward-security/vehicle-inward-security.component';
import { VehicleOutwardSecurityComponent } from 'src/app/screens/security-screens/vehicle-outward-security/vehicle-outward-security.component';

import { ListMnmUnloadingComponent } from 'src/app/screens/milk-material-transfer/list-mnm-unloading/list-mnm-unloading.component';
import { ListMnmLoadingComponent } from 'src/app/screens/milk-material-transfer/list-mnm-loading/list-mnm-loading.component';
import { MnmDispatchQualityComponent } from 'src/app/screens/milk-material-transfer/mnm-dispatch-quality/mnm-dispatch-quality.component';
import { MnmReceiveQualityComponent } from 'src/app/screens/milk-material-transfer/mnm-receive-quality/mnm-receive-quality.component';
import { ShippingReturnComponent } from 'src/app/screens/shipping-return/shipping-return/shipping-return.component';
import { RouteManagerComponent } from 'src/app/screens/route-manager/route-manager.component';
import { OrdersReleasedComponent } from 'src/app/screens/sales-order-screens/orders-released/orders-released.component';
import { OnhandQuantityComponent } from 'src/app/screens/sales-order-screens/onhand-quantity/onhand-quantity.component';
import { ListDispatchSecurityComponent } from 'src/app/screens/security-screens/list-dispatch-security/list-dispatch-security.component';
import { SecurityGlobalComponent } from 'src/app/screens/security-screens/security-global/security-global.component';
import { AdminAccessComponent } from './admin-access.component';



const routes: Routes = [{
  path: '', component: AdminAccessComponent,
  children: [
    { path: '', redirectTo: 'RmrdDashboardComponent', pathMatch: 'full' },
    { path: 'dashboard', component: RmrdDashboardComponent },

    { path: 'customer/indent/update-indent', component: UpdateIndentComponent },
    { path: 'customer/indent/list-indent', component: ListIndentComponent },

    { path: 'rmrd/milk-receive/list-collection', component: ListCollectionComponent },
    { path: 'rmrd/milk-receive/collection', component: CollectionComponent },
    { path: 'rmrd/milk-receive/waste-milk', component: WasteMilkRecordsComponent },
    { path: 'rmrd/lab/list-samples', component: ListSamplesComponent },
    { path: 'rmrd/lab/lab-report', component: LabReportComponent },
    { path: 'rmrd/lab/update-sample', component: UpdateSampleComponent },
    { path: 'rmrd/route-sheet/list-route-sheet', component: ListRouteSheetComponent },
    { path: 'rmrd/route-sheet/update-route-sheet', component: UpdateRouteSheetComponent },
    { path: 'rmrd/route-sheet/view-route-sheet', component: ViewRouteSheetComponent },
    { path: 'rmrd/route-sheet/view-collection', component: ViewCollectionComponent },
    { path: 'return-shipping', component: ShippingReturnComponent },
    // { path: 'route-manager', component: RouteManagerComponent },
    // { path: 'order-release', component: OrdersReleasedComponent },
    { path: 'on-hand-quantity', component: OnhandQuantityComponent },
    { path: 'list-dispatch-security', component: ListDispatchSecurityComponent },

    // { path: 'mnm/weighing-bridge/:id', component: MnmWeighingBridgeCcCampOperatorComponent },
    // { path: 'mnm/list-weighing-bridge-dairy', component: MnmWeighingBridgeListDairyOperatorComponent },
    // { path: 'mnm/list-weighing-bridge-cc-camp', component: MnmWeighingBridgeListCcCampOperatorComponent },
    // { path: 'mnm/mnm-loading/:id', component: MnmLoadingScreenComponent },
    // { path: 'mnm/mnm-loading-list', component: ListMnmLoadingComponent },
    // { path: 'mnm/mnm-unloading-list', component: ListMnmUnloadingComponent },
    // { path: 'mnm/mnm-unloading', component: MnmUnloadingScreenComponent },

    // { path: 'mnm/quality-dispatch', component: MnmDispatchQualityComponent },
    // { path: 'mnm/quality-dispatch-list', component: MnmDispatchQualityComponent },
    // { path: 'mnm/quality-receive', component: MnmReceiveQualityComponent },
    // { path: 'mnm/quality-receive-list', component: MnmReceiveQualityComponent },

    { path: 'report', component: ReportsComponent },
    { path: 'contact', component: ContactComponent },

    { path: 'user/list-user', component: ListUsersComponent },
    { path: 'user/create-user', component: CreateUserComponent },
    { path: 'user/update-user', component: UpdateUserComponent },
    { path: 'reports/user', component: UserComponent },

    { path: 'milk-transfer/new-milk-transfer', component: NewMilkTransferComponent },
    { path: 'milk-transfer/list-milk-transfer', component: ListMilkTransferComponent },
    { path: 'milk-transfer/view-milk-transfer', component: ViewMilkTransferComponent },
    { path: 'milk-transfer/lab/list-samples', component: MilkTransferLabResultsListComponent },
    { path: 'milk-transfer/lab/lab-report', component: MilkTransferLabResultviewComponent },




    { path: 'weighing-bridge/list-milk-transfer-wb', component: WbListMilkTransferComponent },
    { path: 'weighing-bridge/view-milk-transfer-wb', component: WbviewMilkTransferComponent },
    { path: 'weighing-bridge/add-milk-transfer-wb', component: WbMilkTransferComponent },

    { path: 'cc/cc-milk-dispatch', component: MilkTransferDispatchComponent },
    { path: 'cc/list-cc-milk-dispatch', component: ListMilkTransferDispatchComponent },
    { path: 'cc/view-cc-milk-dispatch', component: ViewMilkTransferDispatchComponent },

    { path: 'security/key-register', component: KeylogRegisterComponent },
    { path: 'security/list-key-register', component: ListKeylogRegisterComponent },
    { path: 'security/create-new-keylog', component: AddKeyLogComponent },
    { path: 'security/list-keylogs', component: ListKeylogComponent },

    { path: 'security/security-global', component: SecurityGlobalComponent },
    { path: 'security/global-inward', component: VehicleInwardSecurityComponent },
    { path: 'security/global-outward', component: VehicleOutwardSecurityComponent },

    { path: 'security/view-key-register', component: ViewKeylogRegisterComponent },
    { path: 'security/milk-transfer', component: MilkTransferSecurityComponent },
    { path: 'security/list-milk-transfer', component: ListMilkTransferSecurityComponent },
    { path: 'security/visitor-register', component: VisitorRegisterComponent },
    { path: 'security/list-visitor-register', component: ListVisitorRegisterComponent },
    { path: 'security/view-visitor-register', component: ViewVisitorRegisterComponent },
    { path: 'security/inward-vehicle', component: InvardVehicleComponent },
    { path: 'security/list-inward-vehicle', component: ListInvardVehiclesComponent },
    { path: 'security/issue-inward', component: IssueInwardComponent },
    { path: 'security/create-gatepass', component: CreateGatePassComponent },
    { path: 'security/list-gatepass', component: ListGatePassComponent },
    { path: 'security/view-gatepass', component: ViewGatePassComponent },
    { path: 'security/update-gatepass', component: UpdateGatepassComponent },

    { path: 'society/mpcs-create-dispath', component: SocietyMilkDispatchComponent },
    { path: 'society/mpcs-list-dispatch', component: ListSocietyMilkDispatchComponent },
    { path: 'society/mpcs-view-dispatch', component: ViewSocietyMilkDispatchComponent },

    { path: 'bmc/bmc-milk-dispatch', component: BmcMilkDispatchComponent },
    { path: 'bmc/list-bmc-dispatch', component: ListBmcMilkDispatchComponent },
    { path: 'bmc/view-bmc-dispatch', component: ViewBmcMilkDispatchComponent },
    { path: 'bmc/bmc-milk-collection', component: BmcMilkCollectionComponent },
    { path: 'bmc/list-bmc-milk-collection', component: ListBmcMilkCollectionComponent },
    { path: 'bmc/view-bmc-milk-collection', component: ViewBmcMilkCollectionComponent },

    { path: 'sales-order/calldesk', component: TempIndentComponent },
    { path: 'sales-order/list-calldesk-indents', component: ListTempIndentsComponent },

    { path: 'sales-order/cs/counter-sales', component: SpecialIndentComponent },
    { path: 'sales-order/cs/list-counter-sales', component: ListSpecialIndentComponent },
    { path: 'sales-order/cs/update-counter-sales', component: UpdateSpecialIndnetComponent },
    { path: 'sales-order/cs/print-receipt', component: PrintReceiptComponent },
    { path: 'sales-order/cs/receipt-form', component: ReceiptFormComponent },
    { path: 'sales-order/cs/challan', component: ChallanComponent },

    { path: '**', redirectTo: 'RmrdDashboardComponent' }
  ]
}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAccessRoutingModule { }
