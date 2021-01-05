import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallDeskUserRoutingModule } from './call-desk-user-routing.module';
import { CallDeskUserComponent } from './call-desk-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { SoDashbaordComponent } from 'src/app/screens/sales-order-screens/so-dashbaord/so-dashbaord.component';
import { ListOrdersComponent } from 'src/app/screens/sales-order-screens/orders/list-orders/list-orders.component';
import { UpdateOrderComponent } from 'src/app/screens/sales-order-screens/orders/update-order/update-order.component';
import { ListTempIndentsComponent } from 'src/app/screens/sales-order-screens/temporary-indent/list-temp-indents/list-temp-indents.component';
import { UpdateTempIndentComponent } from 'src/app/screens/sales-order-screens/temporary-indent/update-temp-indent/update-temp-indent.component';
// import { SpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/special-indent.component';
// import { ListSpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/list-special-indent/list-special-indent.component';
// import { UpdateSpecialIndnetComponent } from 'src/app/screens/sales-order-screens/special-indent/update-special-indnet/update-special-indnet.component';
// import { ChallanComponent } from 'src/app/screens/sales-order-screens/special-indent/challan/challan.component';
// import { ReceiptFormComponent } from 'src/app/screens/sales-order-screens/special-indent/receipt-form/receipt-form.component';
// import { PrintReceiptComponent } from 'src/app/screens/sales-order-screens/special-indent/print-receipt/print-receipt.component';
import { TempIndentComponent } from 'src/app/screens/sales-order-screens/temporary-indent/temp-indent/temp-indent.component';
import { OnhandQuantityComponent } from 'src/app/screens/sales-order-screens/onhand-quantity/onhand-quantity.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TabDirective } from 'src/app/shared/service/tab.directive';
import { IndentForCustByEmpComponent } from 'src/app/screens/sales-order-screens/indent-for-cust-by-emp/indent-for-cust-by-emp.component';
import { CiCalldeskComponent } from 'src/app/screens/sales-order-screens/temporary-indent/ci-calldesk/ci-calldesk.component';


@NgModule({
  declarations: [CallDeskUserComponent, SidebarComponent, SoDashbaordComponent, CiCalldeskComponent, ListOrdersComponent, UpdateOrderComponent, ListTempIndentsComponent, UpdateTempIndentComponent, TempIndentComponent, OnhandQuantityComponent, TabDirective, IndentForCustByEmpComponent],
  imports: [
    SharedModule,
    CommonModule,
    CallDeskUserRoutingModule

  ],
  exports: [SoDashbaordComponent, ListOrdersComponent, UpdateOrderComponent, CiCalldeskComponent, ListTempIndentsComponent, UpdateTempIndentComponent, TempIndentComponent, OnhandQuantityComponent, TabDirective, IndentForCustByEmpComponent]
})
export class CallDeskUserModule { }
