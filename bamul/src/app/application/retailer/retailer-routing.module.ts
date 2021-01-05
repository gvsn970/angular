import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDashboardComponent } from 'src/app/screens/customer-order-screens/customer-dashboard/customer-dashboard.component';
import { CreateMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/create-master-indent/create-master-indent.component';
import { ListMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/list-master-indent/list-master-indent.component';
import { EditMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/edit-master-indent/edit-master-indent.component';
import { CreateIndentComponent } from 'src/app/screens/customer-order-screens/indent/create-indent/create-indent.component';
import { EditIndentComponent } from 'src/app/screens/customer-order-screens/indent/edit-indent/edit-indent.component';
import { ListIndentComponent } from 'src/app/screens/customer-order-screens/indent/list-indent/list-indent.component';
import { CustomerReportsComponent } from 'src/app/screens/customer-order-screens/reports/reports.component';
import { ContactComponent } from 'src/app/shared/components/contact/contact.component';
import { PaymentComponent } from 'src/app/screens/customer-order-screens/payment/payment.component';
import { IndentViewComponent } from 'src/app/screens/customer-order-screens/indent/indent-view/indent-view.component';
import { RetailerComponent } from './retailer.component';
import { PaymentHistoryComponent } from 'src/app/screens/customer-order-screens/payment-history/payment-history.component';
import { MasterIndentViewComponent } from 'src/app/screens/customer-order-screens/master-indent/master-indent-view/master-indent-view.component';


const routes: Routes = [{
  path: '', component: RetailerComponent,
  children:
    [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CustomerDashboardComponent , pathMatch: 'full'},
      { path: 'master-indent/create-master-indent', component: CreateMasterIndentComponent },
      { path: 'master-indent/list-master-indents', component: ListMasterIndentComponent },
      { path: 'master-indent/edit-master-indent', component: EditMasterIndentComponent },
      { path: 'master-indent/master-indent-view', component: MasterIndentViewComponent },
      { path: 'indent/view-indent', component: IndentViewComponent },
      { path: 'indent/create-indent', component: CreateIndentComponent },
      { path: 'indent/update-indent', component: EditIndentComponent },
      { path: 'indent/list-indents', component: ListIndentComponent },
      { path: 'reports', component: CustomerReportsComponent },
      // { path: 'contact', component: ContactComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'payment-log', component: PaymentHistoryComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule { }
