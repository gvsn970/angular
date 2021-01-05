import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CcManagerComponent } from './cc-manager.component';
import { CollectionComponent } from '../../screens/rmrd-screens/milk-receive/collection/collection.component';
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
import { TransferRequestFormComponent } from 'src/app/screens/milk-material-transfer/transfer-request-form/transfer-request-form.component';
import { RequestMnmTransferListViewReceiverComponent } from 'src/app/screens/milk-material-transfer/request-mnm-transfer-list-view-receiver/request-mnm-transfer-list-view-receiver.component';
import { RequestMnmTransferListViewSenderComponent } from 'src/app/screens/milk-material-transfer/request-mnm-transfer-list-view-sender/request-mnm-transfer-list-view-sender.component';
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

const routes: Routes = [{
  path: '', component: CcManagerComponent,
  children: [
    { path: '', redirectTo: 'RmrdDashboardComponent', pathMatch: 'full' },
    { path: 'dashboard', component: RmrdDashboardComponent },
    { path: 'milk-receive/rmrd-list-collection', component: RmrdListCollectionComponent },
    { path: 'milk-receive/collection', component: CollectionComponent },
    { path: 'milk-receive/waste-milk', component: WasteMilkRecordsComponent },
    { path: 'lab/list-samples', component: ListSamplesComponent },
    { path: 'lab/lab-report', component: LabReportComponent },
    { path: 'lab/update-sample', component: UpdateSampleComponent },
    { path: 'route-sheet/list-route-sheet', component: ListRouteSheetComponent },
    { path: 'route-sheet/update-route-sheet', component: UpdateRouteSheetComponent },
    { path: 'route-sheet/view-route-sheet', component: ViewRouteSheetComponent },
    { path: 'route-sheet/view-collection', component: ViewCollectionComponent },
    { path: 'mnm/initiate-mnm-transfer', component: TransferRequestFormComponent },
    { path: 'mnm/list-mnm-transfer-receiver', component: RequestMnmTransferListViewReceiverComponent },
    { path: 'mnm/list-mnm-transfer-sender', component: RequestMnmTransferListViewSenderComponent },
    { path: 'mnm/update-mnm-transfer', component: TransferRequestFormViewUpdateComponent },
    { path: 'mnm/weighing-bridge/:id', component: MnmWeighingBridgeCcCampOperatorComponent },
    { path: 'mnm/list-weighing-bridge-dairy', component: MnmWeighingBridgeListDairyOperatorComponent },
    { path: 'mnm/list-weighing-bridge-cc-camp', component: MnmWeighingBridgeListCcCampOperatorComponent },
    { path: 'mnm/mnm-loading/:id', component: MnmLoadingScreenComponent },
    { path: 'mnm/mnm-loading-list', component: ListMnmLoadingComponent },
    { path: 'mnm/mnm-unloading-list', component: ListMnmUnloadingComponent },
    { path: 'mnm/mnm-unloading/:id', component: MnmUnloadingScreenComponent },

    { path: 'mnm/quality-dispatch', component: MnmDispatchQualityComponent },
    { path: 'mnm/quality-dispatch-list', component: MnmDispatchQualityComponent },
    { path: 'mnm/quality-receive', component: MnmReceiveQualityComponent },
    { path: 'mnm/quality-receive-list', component: MnmReceiveQualityComponent },
    { path: 'report', component: ReportsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'milk-receive/list-collection', component: ListCollectionComponent},
    {path:'milk-receive/edit-collection/:id',component:EditCollectionComponent},
    { path: '**', redirectTo: 'dashboard' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CcManagerRoutingModule { }
