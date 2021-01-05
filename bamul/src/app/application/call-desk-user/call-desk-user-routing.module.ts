import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SoDashbaordComponent } from 'src/app/screens/sales-order-screens/so-dashbaord/so-dashbaord.component';
import { ListOrdersComponent } from 'src/app/screens/sales-order-screens/orders/list-orders/list-orders.component';
import { UpdateOrderComponent } from 'src/app/screens/sales-order-screens/orders/update-order/update-order.component';
import { ListTempIndentsComponent } from 'src/app/screens/sales-order-screens/temporary-indent/list-temp-indents/list-temp-indents.component';
import { UpdateTempIndentComponent } from 'src/app/screens/sales-order-screens/temporary-indent/update-temp-indent/update-temp-indent.component';
import { SpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/special-indent.component';
import { ListSpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/list-special-indent/list-special-indent.component';
import { UpdateSpecialIndnetComponent } from 'src/app/screens/sales-order-screens/special-indent/update-special-indnet/update-special-indnet.component';
import { ChallanComponent } from 'src/app/screens/sales-order-screens/special-indent/challan/challan.component';
import { ReceiptFormComponent } from 'src/app/screens/sales-order-screens/special-indent/receipt-form/receipt-form.component';
import { PrintReceiptComponent } from 'src/app/screens/sales-order-screens/special-indent/print-receipt/print-receipt.component';
import { TempIndentComponent } from 'src/app/screens/sales-order-screens/temporary-indent/temp-indent/temp-indent.component';
import { OnhandQuantityComponent } from 'src/app/screens/sales-order-screens/onhand-quantity/onhand-quantity.component';
import { CallDeskUserComponent } from './call-desk-user.component';
import { IndentForCustByEmpComponent } from 'src/app/screens/sales-order-screens/indent-for-cust-by-emp/indent-for-cust-by-emp.component';
import { CiCalldeskComponent } from 'src/app/screens/sales-order-screens/temporary-indent/ci-calldesk/ci-calldesk.component';


const routes: Routes = [{
  path: '', component: CallDeskUserComponent,
  children:
    [
      { path: '', redirectTo: 'TempIndentComponent', pathMatch: 'full' },
      { path: 'dashboard', component: SoDashbaordComponent },
      { path: 'list-of-orders', component: ListOrdersComponent },
      { path: 'update-order', component: UpdateOrderComponent },
      { path: 'list-temp-indents', component: ListTempIndentsComponent },
      { path: 'temp-indents', component: TempIndentComponent },
      { path: 'update-temp-indent', component: UpdateTempIndentComponent },
      { path: 'create-indent-for-cust-by-emp/:customerId', component: IndentForCustByEmpComponent },
      { path: 'ci-calldesk', component: CiCalldeskComponent },
      // { path: 'special-indent', component: SpecialIndentComponent },
      // { path: 'list-special-indent', component: ListSpecialIndentComponent },
      // { path: 'update-special-indent', component: UpdateSpecialIndnetComponent },
      // { path: 'print-challan', component: ChallanComponent },
      // { path: 'receipt-form', component: ReceiptFormComponent },
      // { path: 'print-receipt', component: PrintReceiptComponent },
      { path: 'onhand-quantity', component: OnhandQuantityComponent },

      { path: '**', redirectTo: 'TempIndentComponent', pathMatch: 'full' }
    ]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallDeskUserRoutingModule { }
