import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { RetailerComponent } from './retailer.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
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
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentHistoryComponent } from 'src/app/screens/customer-order-screens/payment-history/payment-history.component';
import { MasterIndentViewComponent } from 'src/app/screens/customer-order-screens/master-indent/master-indent-view/master-indent-view.component';

@NgModule({
  declarations: [RetailerComponent, SidebarComponent , CustomerDashboardComponent ,MasterIndentViewComponent, CreateMasterIndentComponent , ListMasterIndentComponent , EditMasterIndentComponent , CreateIndentComponent , EditIndentComponent , ListIndentComponent , CustomerReportsComponent , PaymentComponent , IndentViewComponent, PaymentHistoryComponent],
  imports: [
    SharedModule,
    CommonModule,
    RetailerRoutingModule
  ],
  exports:[CustomerDashboardComponent , CreateMasterIndentComponent ,MasterIndentViewComponent, ListMasterIndentComponent , EditMasterIndentComponent , CreateIndentComponent , EditIndentComponent , ListIndentComponent , CustomerReportsComponent , PaymentComponent , IndentViewComponent,PaymentHistoryComponent]
})
export class RetailerModule { }
