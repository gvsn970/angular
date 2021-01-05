import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcManagerRoutingModule } from './cc-manager-routing.module';
import { CcManagerComponent } from './cc-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { RmrdDashboardComponent } from '../../screens/rmrd-screens/rmrd-dashboard/rmrd-dashboard.component';
import { ListCollectionComponent } from '../../screens/rmrd-screens/milk-receive/list-collection/list-collection.component';
import { WasteMilkRecordsComponent } from '../../screens/rmrd-screens/milk-receive/waste-milk-records/waste-milk-records.component';
import { ListSamplesComponent } from '../../screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { LabReportComponent } from '../../screens/rmrd-screens/test-lab/lab-report/lab-report.component';
import { UpdateSampleComponent } from '../../screens/rmrd-screens/test-lab/update-sample/update-sample.component';
import { ListRouteSheetComponent } from '../../screens/rmrd-screens/route-sheet/list-route-sheet/list-route-sheet.component';
import { UpdateRouteSheetComponent } from '../../screens/rmrd-screens/route-sheet/update-route-sheet/update-route-sheet.component';
import { ViewRouteSheetComponent } from '../../screens/rmrd-screens/route-sheet/view-route-sheet/view-route-sheet.component';
import { ViewCollectionComponent } from '../../screens/rmrd-screens/route-sheet/view-collection/view-collection.component';
import { ReportsComponent } from '../../screens/rmrd-screens/reports/reports/reports.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { RmrdListCollectionComponent } from '../../screens/rmrd-screens/milk-receive/rmrd-list-collection/rmrd-list-collection.component';
import { SharedModule } from '../../shared/shared.module';
import { TwoDigitDecimaNumberDirective } from '../../shared/directives/restrict-digit-decimal-number.directive';
import { CollectionComponent } from '../../screens/rmrd-screens/milk-receive/collection/collection.component';
import { RmrdLabManagerModule } from '../rmrd-lab-manager/rmrd-lab-manager.module';
import { RmrdOperatorModule } from '../rmrd-operator/rmrd-operator.module';
import { TransferRequestFormComponent } from 'src/app/screens/milk-material-transfer/transfer-request-form/transfer-request-form.component';
import { RequestMnmTransferListViewSenderComponent } from 'src/app/screens/milk-material-transfer/request-mnm-transfer-list-view-sender/request-mnm-transfer-list-view-sender.component';
import { RequestMnmTransferListViewReceiverComponent } from 'src/app/screens/milk-material-transfer/request-mnm-transfer-list-view-receiver/request-mnm-transfer-list-view-receiver.component';
import { TransferRequestFormViewUpdateComponent } from 'src/app/screens/milk-material-transfer/transfer-request-form-view-update/transfer-request-form-view-update.component';
import { MnmWeighingBridgeCcCampOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-cc-camp-operator/mnm-weighing-bridge-cc-camp-operator.component';
import { MnmWeighingBridgeListDairyOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-list-dairy-operator/mnm-weighing-bridge-list-dairy-operator.component';
import { MnmWeighingBridgeListCcCampOperatorComponent } from 'src/app/screens/milk-material-transfer/mnm-weighing-bridge-list-cc-camp-operator/mnm-weighing-bridge-list-cc-camp-operator.component';
import { MnmLoadingScreenComponent } from 'src/app/screens/milk-material-transfer/mnm-loading-screen/mnm-loading-screen.component';
import { ListMnmLoadingComponent } from 'src/app/screens/milk-material-transfer/list-mnm-loading/list-mnm-loading.component';
import { ListMnmUnloadingComponent } from 'src/app/screens/milk-material-transfer/list-mnm-unloading/list-mnm-unloading.component';
import { MnmUnloadingScreenComponent } from 'src/app/screens/milk-material-transfer/mnm-unloading-screen/mnm-unloading-screen.component';
import { MnmDispatchQualityComponent } from 'src/app/screens/milk-material-transfer/mnm-dispatch-quality/mnm-dispatch-quality.component';
import { MnmReceiveQualityComponent } from 'src/app/screens/milk-material-transfer/mnm-receive-quality/mnm-receive-quality.component';
import { EditCollectionComponent } from '../../screens/rmrd-screens/milk-receive/edit-collection/edit-collection.component';

@NgModule({
  declarations: [CcManagerComponent, SidebarComponent, RmrdDashboardComponent, ListRouteSheetComponent, UpdateRouteSheetComponent, ViewRouteSheetComponent, ViewCollectionComponent, ReportsComponent, RmrdListCollectionComponent, TransferRequestFormComponent, RequestMnmTransferListViewReceiverComponent, RequestMnmTransferListViewSenderComponent, TransferRequestFormViewUpdateComponent,MnmWeighingBridgeCcCampOperatorComponent,MnmWeighingBridgeListDairyOperatorComponent,MnmWeighingBridgeListCcCampOperatorComponent,MnmLoadingScreenComponent,ListMnmLoadingComponent,ListMnmUnloadingComponent,MnmUnloadingScreenComponent,MnmDispatchQualityComponent,MnmReceiveQualityComponent],
  imports: [
    SharedModule,
    CommonModule,
    CcManagerRoutingModule,
    RmrdLabManagerModule,
    RmrdOperatorModule
  ],
  exports: [
    RmrdDashboardComponent, ListRouteSheetComponent, UpdateRouteSheetComponent, ViewRouteSheetComponent, ViewCollectionComponent, ReportsComponent, RmrdListCollectionComponent, TransferRequestFormComponent, RequestMnmTransferListViewReceiverComponent, RequestMnmTransferListViewSenderComponent, TransferRequestFormViewUpdateComponent,MnmWeighingBridgeCcCampOperatorComponent,MnmWeighingBridgeListDairyOperatorComponent,MnmWeighingBridgeListCcCampOperatorComponent,MnmLoadingScreenComponent,ListMnmLoadingComponent,ListMnmUnloadingComponent,MnmUnloadingScreenComponent,MnmDispatchQualityComponent,MnmReceiveQualityComponent
  ]
})
export class CcManagerModule { }
