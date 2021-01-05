import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/special-indent.component';
import { ListSpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/list-special-indent/list-special-indent.component';
import { UpdateSpecialIndnetComponent } from 'src/app/screens/sales-order-screens/special-indent/update-special-indnet/update-special-indnet.component';
import { PrintReceiptComponent } from 'src/app/screens/sales-order-screens/special-indent/print-receipt/print-receipt.component';
import { ReceiptFormComponent } from 'src/app/screens/sales-order-screens/special-indent/receipt-form/receipt-form.component';
import { ChallanComponent } from 'src/app/screens/sales-order-screens/special-indent/challan/challan.component';
import { IndentSuperUserComponent } from './indent-super-user.component';
import { PandiIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/pandi-indent/pandi-indent.component';

const routes: Routes = [{
  path: '', component: IndentSuperUserComponent,
  children: [
    { path: '', redirectTo: 'SpecialIndentComponent', pathMatch: 'full' },
    { path: 'sales-order/cs/counter-sales', component: SpecialIndentComponent },
    { path: 'sales-order/cs/list-counter-sales', component: ListSpecialIndentComponent },
    { path: 'sales-order/cs/update-counter-sales', component: UpdateSpecialIndnetComponent },
    { path: 'sales-order/cs/print-receipt', component: PrintReceiptComponent },
    { path: 'sales-order/cs/receipt-form', component: ReceiptFormComponent },
    { path: 'sales-order/cs/challan', component: ChallanComponent },
    { path: 'sales-order/cs/p&i-indent' , component: PandiIndentComponent}, 

    { path: '**', redirectTo: 'SpecialIndentComponent' }
  ]
}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndentSuperUserRoutingModule { }
