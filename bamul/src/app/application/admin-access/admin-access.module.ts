import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAccessRoutingModule } from './admin-access-routing.module';
import { AdminAccessComponent } from './admin-access.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
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
import { TransportDashboardComponent } from 'src/app/screens/transport-screens/transport-dashboard/transport-dashboard.component';
import { CreateIndentComponent } from 'src/app/screens/customer-order-screens/indent/create-indent/create-indent.component';
import { UpdateIndentComponent } from 'src/app/screens/transport-screens/indent/update-indent/update-indent.component';
import { ListIndentComponent } from 'src/app/screens/customer-order-screens/indent/list-indent/list-indent.component';
import { CreateScheduleIndentComponent } from 'src/app/screens/transport-screens/schedule-indent/create-schedule-indent/create-schedule-indent.component';
import { CreateRouteComponent } from 'src/app/screens/transport-screens/route/create-route/create-route.component';
import { ListScheduleIndentComponent } from 'src/app/screens/transport-screens/schedule-indent/list-schedule-indent/list-schedule-indent.component';
import { UpdateRouteComponent } from 'src/app/screens/transport-screens/route/update-route/update-route.component';
import { ListRoutesComponent } from 'src/app/screens/transport-screens/route/list-routes/list-routes.component';
import { AssignRoutePointComponent } from 'src/app/screens/transport-screens/route/assign-route-point/assign-route-point.component';
import { ViewDriverComponent } from 'src/app/screens/transport-screens/driver/view-driver/view-driver.component';
import { ListDriverComponent } from 'src/app/screens/transport-screens/driver/list-driver/list-driver.component';
import { AddDriverComponent } from 'src/app/screens/transport-screens/driver/add-driver/add-driver.component';
import { UpdateDriverComponent } from 'src/app/screens/transport-screens/driver/update-driver/update-driver.component';
import { CreateRoutePointComponent } from 'src/app/screens/transport-screens/route-point/create-route-point/create-route-point.component';
import { ListRoutesPointsComponent } from 'src/app/screens/transport-screens/route-point/list-routes-points/list-routes-points.component';
import { UpdateRoutePointComponent } from 'src/app/screens/transport-screens/route-point/update-route-point/update-route-point.component';
import { AddNewVehicleComponent } from 'src/app/screens/transport-screens/vehicle/add-new-vehicle/add-new-vehicle.component';
import { ViewVehicleComponent } from 'src/app/screens/transport-screens/vehicle/view-vehicle/view-vehicle.component';
import { UpdateVehicleComponent } from 'src/app/screens/transport-screens/vehicle/update-vehicle/update-vehicle.component';
import { ListVehiclesComponent } from 'src/app/screens/transport-screens/vehicle/list-vehicles/list-vehicles.component';
import { ListInvardVehiclesComponent } from 'src/app/screens/security-screens/list-invard-vehicles/list-invard-vehicles.component';
import { IssueInwardComponent } from 'src/app/screens/security-screens/issue-inward/issue-inward.component';
import { InvardVehicleComponent } from 'src/app/screens/security-screens/invard-vehicle/invard-vehicle.component';
import { NewMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/new-milk-transfer/new-milk-transfer.component';
import { ListMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/list-milk-transfer/list-milk-transfer.component';
import { ViewMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/view-milk-transfer/view-milk-transfer.component';
import { AssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/assign-vehicle-milk-transfer/assign-vehicle-milk-transfer.component';
import { ListAssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/list-assign-vehicle-milk-transfer/list-assign-vehicle-milk-transfer.component';
import { KeylogRegisterComponent } from 'src/app/screens/security-screens/keylog-register/keylog-register.component';
import { ListKeylogRegisterComponent } from 'src/app/screens/security-screens/list-keylog-register/list-keylog-register.component';
import { ViewKeylogRegisterComponent } from 'src/app/screens/security-screens/view-keylog-register/view-keylog-register.component';
import { MilkTransferSecurityComponent } from 'src/app/screens/security-screens/milk-transfer-security/milk-transfer-security.component';
import { ListMilkTransferSecurityComponent } from 'src/app/screens/security-screens/list-milk-transfer-security/list-milk-transfer-security.component';
import { VisitorRegisterComponent } from 'src/app/screens/security-screens/visitor-register/visitor-register.component';
import { ListVisitorRegisterComponent } from 'src/app/screens/security-screens/list-visitor-register/list-visitor-register.component';
import { ViewVisitorRegisterComponent } from 'src/app/screens/security-screens/view-visitor-register/view-visitor-register.component';
import { ViewAssignVehicleMilkTransferComponent } from 'src/app/screens/transport-screens/milk-transfer/view-assign-vehicle-milk-transfer/view-assign-vehicle-milk-transfer.component';
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
import { RandomCheckShippingComponent } from 'src/app/screens/security-screens/random-check-shipping/random-check-shipping.component';
import { ShippingReturnComponent } from 'src/app/screens/shipping-return/shipping-return/shipping-return.component';
import { RouteManagerComponent } from 'src/app/screens/route-manager/route-manager.component';
import { OrdersReleasedComponent } from 'src/app/screens/sales-order-screens/orders-released/orders-released.component';
import { OnhandQuantityComponent } from 'src/app/screens/sales-order-screens/onhand-quantity/onhand-quantity.component';
import { ListDispatchSecurityComponent } from 'src/app/screens/security-screens/list-dispatch-security/list-dispatch-security.component';
import { SecurityGlobalComponent } from 'src/app/screens/security-screens/security-global/security-global.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/directives/restrict-digit-decimal-number.directive';
import { RmrdOperatorModule } from '../rmrd-operator/rmrd-operator.module';
import { SuperUserModule } from '../super-user/super-user.module';
import { RmrdLabManagerModule } from '../rmrd-lab-manager/rmrd-lab-manager.module';
import { CcManagerModule } from '../cc-manager/cc-manager.module';
import { CallDeskUserModule } from '../call-desk-user/call-desk-user.module';
import { CcSecurityModule } from '../cc-security/cc-security.module';
import { RetailerModule } from '../retailer/retailer.module';
import { TransportManagerModule } from '../transport-manager/transport-manager.module';
import { IndentSuperUserModule } from '../indent-super-user/indent-super-user.module';

@NgModule({
  declarations: [AdminAccessComponent, SidebarComponent,
    //RmrdDashboardComponent ,
    UpdateIndentComponent,
    // ListIndentComponent ,
    // ListCollectionComponent , 
    // CollectionComponent ,
    // WasteMilkRecordsComponent ,
    // ListSamplesComponent ,
    // LabReportComponent ,
    // UpdateSampleComponent ,
    // ListRouteSheetComponent ,
    // UpdateRouteSheetComponent ,
    // ViewRouteSheetComponent ,
    // ViewCollectionComponent ,
    // RouteInsepectorHoldComponent,
    //ShippingReturnComponent ,
    // RouteManagerComponent,
    // OrdersReleasedComponent,
    //OnhandQuantityComponent ,
    //ListDispatchSecurityComponent ,
    // MnmWeighingBridgeCcCampOperatorComponent,
    // MnmWeighingBridgeListDairyOperatorComponent,
    // MnmWeighingBridgeListCcCampOperatorComponent,
    // MnmLoadingScreenComponent,
    // ListMnmLoadingComponent,
    // ListMnmUnloadingComponent,
    // MnmUnloadingScreenComponent,
    // MnmDispatchQualityComponent,
    // MnmDispatchQualityComponent,
    // MnmReceiveQualityComponent,
    // MnmReceiveQualityComponent,

    //ReportsComponent ,
    // ListUsersComponent ,
    // CreateUserComponent ,
    // UpdateUserComponent ,
    UserComponent,
    NewMilkTransferComponent,
    ListMilkTransferComponent,
    ViewMilkTransferComponent,
    MilkTransferLabResultsListComponent,
    MilkTransferLabResultviewComponent,
    //  TransportDashboardComponent ,
    //    CreateScheduleIndentComponent,
    //   ListScheduleIndentComponent ,
    //   CreateRouteComponent ,
    //    UpdateRouteComponent ,
    //    ListRoutesComponent ,
    //  AssignRoutePointComponent ,
    //   CreateRoutePointComponent ,
    //   ListRoutesPointsComponent ,
    //    UpdateRoutePointComponent ,
    //    AddDriverComponent ,
    //    ViewDriverComponent ,
    //   ListDriverComponent ,
    //    UpdateDriverComponent ,
    //    AddNewVehicleComponent ,
    //    ViewVehicleComponent ,
    //    ListVehiclesComponent ,
    //    UpdateVehicleComponent ,
    //    AssignVehicleMilkTransferComponent ,
    //    ListAssignVehicleMilkTransferComponent ,
    //    ViewAssignVehicleMilkTransferComponent ,
    WbListMilkTransferComponent,
    WbviewMilkTransferComponent,
    WbMilkTransferComponent,
    MilkTransferDispatchComponent,
    ListMilkTransferDispatchComponent,
    ViewMilkTransferDispatchComponent,
    KeylogRegisterComponent,
    ListKeylogRegisterComponent,
    AddKeyLogComponent,
    ListKeylogComponent,
    // SecurityGlobalComponent ,
    //  VehicleInwardSecurityComponent ,
    //  VehicleOutwardSecurityComponent ,
    ViewKeylogRegisterComponent,
    MilkTransferSecurityComponent,
    ListMilkTransferSecurityComponent,
    VisitorRegisterComponent,
    ListVisitorRegisterComponent,
    ViewVisitorRegisterComponent,
    //InvardVehicleComponent ,
    ListInvardVehiclesComponent,
    IssueInwardComponent,
    CreateGatePassComponent,
    ListGatePassComponent,
    ViewGatePassComponent,
    UpdateGatepassComponent,
    SocietyMilkDispatchComponent,
    ListSocietyMilkDispatchComponent,
    ViewSocietyMilkDispatchComponent,
    BmcMilkDispatchComponent,
    ListBmcMilkDispatchComponent,
    ViewBmcMilkDispatchComponent,
    BmcMilkCollectionComponent,
    ListBmcMilkCollectionComponent,
    ViewBmcMilkCollectionComponent,

    //   TempIndentComponent ,
    //    ListTempIndentsComponent ,

    //    SpecialIndentComponent ,
    //    ListSpecialIndentComponent ,
    //    UpdateSpecialIndnetComponent,
    // PrintReceiptComponent ,
    //   ReceiptFormComponent ,
    // ChallanComponent
  ],
  imports: [
    CommonModule,
    AdminAccessRoutingModule,
    SharedModule,
    RmrdOperatorModule,
    SuperUserModule,
    RmrdLabManagerModule,
    CcManagerModule,
    CallDeskUserModule,
    CcSecurityModule,
    RetailerModule,
    TransportManagerModule,
    IndentSuperUserModule
  ],
  exports: [
    SidebarComponent,
    RmrdDashboardComponent,
    UpdateIndentComponent,
    // ListIndentComponent ,
    // ListCollectionComponent , 
    // CollectionComponent ,
    // WasteMilkRecordsComponent ,
    // ListSamplesComponent ,
    // LabReportComponent ,
    // UpdateSampleComponent ,
    // ListRouteSheetComponent ,
    // UpdateRouteSheetComponent ,
    // ViewRouteSheetComponent ,
    ViewCollectionComponent,
    // RouteInsepectorHoldComponent,
    //RandomCheckShippingComponent ,
    //ShippingReturnComponent ,
    // RouteManagerComponent,
    // OrdersReleasedComponent,
    //OnhandQuantityComponent ,
    //ListDispatchSecurityComponent ,
    // MnmWeighingBridgeCcCampOperatorComponent,
    // MnmWeighingBridgeListDairyOperatorComponent,
    // MnmWeighingBridgeListCcCampOperatorComponent,
    // MnmLoadingScreenComponent,
    // ListMnmLoadingComponent,
    // ListMnmUnloadingComponent,
    // MnmUnloadingScreenComponent,
    // MnmDispatchQualityComponent,
    // MnmDispatchQualityComponent,
    // MnmReceiveQualityComponent,
    // MnmReceiveQualityComponent,
    //ReportsComponent ,
    // ListUsersComponent ,
    // CreateUserComponent ,
    // UpdateUserComponent ,
    UserComponent,
    NewMilkTransferComponent,
    ListMilkTransferComponent,
    ViewMilkTransferComponent,
    MilkTransferLabResultsListComponent,
    MilkTransferLabResultviewComponent,
    //    TransportDashboardComponent ,
    //    CreateScheduleIndentComponent,
    //   ListScheduleIndentComponent ,
    //   CreateRouteComponent ,
    //    UpdateRouteComponent ,
    //    ListRoutesComponent ,
    //  AssignRoutePointComponent ,
    //   CreateRoutePointComponent ,
    //   ListRoutesPointsComponent ,
    //    UpdateRoutePointComponent ,
    //    AddDriverComponent ,
    //    ViewDriverComponent ,
    //   ListDriverComponent ,
    //    UpdateDriverComponent ,
    //    AddNewVehicleComponent ,
    //    ViewVehicleComponent ,
    //    ListVehiclesComponent ,
    //    UpdateVehicleComponent ,
    //    AssignVehicleMilkTransferComponent ,
    //    ListAssignVehicleMilkTransferComponent ,
    //    ViewAssignVehicleMilkTransferComponent ,
    WbListMilkTransferComponent,
    WbviewMilkTransferComponent,
    WbMilkTransferComponent,
    MilkTransferDispatchComponent,
    ListMilkTransferDispatchComponent,
    ViewMilkTransferDispatchComponent,
    KeylogRegisterComponent,
    ListKeylogRegisterComponent,
    AddKeyLogComponent,
    ListKeylogComponent,
    // SecurityGlobalComponent ,
    //  VehicleInwardSecurityComponent ,
    //  VehicleOutwardSecurityComponent ,
    ViewKeylogRegisterComponent,
    MilkTransferSecurityComponent,
    ListMilkTransferSecurityComponent,
    VisitorRegisterComponent,
    ListVisitorRegisterComponent,
    ViewVisitorRegisterComponent,
    //InvardVehicleComponent ,
    ListInvardVehiclesComponent,
    IssueInwardComponent,
    CreateGatePassComponent,
    ListGatePassComponent,
    ViewGatePassComponent,
    UpdateGatepassComponent,
    SocietyMilkDispatchComponent,
    ListSocietyMilkDispatchComponent,
    ViewSocietyMilkDispatchComponent,
    BmcMilkDispatchComponent,
    ListBmcMilkDispatchComponent,
    ViewBmcMilkDispatchComponent,
    BmcMilkCollectionComponent,
    ListBmcMilkCollectionComponent,
    ViewBmcMilkCollectionComponent,
    //   TempIndentComponent ,
    //    ListTempIndentsComponent ,
    //    SpecialIndentComponent ,
    //    ListSpecialIndentComponent ,
    //    UpdateSpecialIndnetComponent,
    // PrintReceiptComponent ,
    //   ReceiptFormComponent ,
    // ChallanComponent,
  ]
})
export class AdminAccessModule { }
