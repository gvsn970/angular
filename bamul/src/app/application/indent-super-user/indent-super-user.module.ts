import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndentSuperUserRoutingModule } from './indent-super-user-routing.module';
import { IndentSuperUserComponent } from './indent-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { SpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/special-indent.component';
import { ListSpecialIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/list-special-indent/list-special-indent.component';
import { UpdateSpecialIndnetComponent } from 'src/app/screens/sales-order-screens/special-indent/update-special-indnet/update-special-indnet.component';
import { PrintReceiptComponent } from 'src/app/screens/sales-order-screens/special-indent/print-receipt/print-receipt.component';
import { ReceiptFormComponent } from 'src/app/screens/sales-order-screens/special-indent/receipt-form/receipt-form.component';
import { ChallanComponent } from 'src/app/screens/sales-order-screens/special-indent/challan/challan.component';
import { SharedModule } from '../../shared/shared.module';
import { PandiIndentComponent } from 'src/app/screens/sales-order-screens/special-indent/pandi-indent/pandi-indent.component';
@NgModule({
  declarations: [IndentSuperUserComponent, SidebarComponent , SpecialIndentComponent , ListSpecialIndentComponent , UpdateSpecialIndnetComponent , PrintReceiptComponent , ReceiptFormComponent , ChallanComponent , PandiIndentComponent],
  imports: [
    SharedModule,
    CommonModule,
    IndentSuperUserRoutingModule,
  ],
  exports:[SpecialIndentComponent , ListSpecialIndentComponent , UpdateSpecialIndnetComponent , PrintReceiptComponent , ReceiptFormComponent , ChallanComponent ,PandiIndentComponent]
})
export class IndentSuperUserModule { }
