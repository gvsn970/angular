import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispatcherRoutingModule } from './dispatcher-routing.module';
import { DispatcherComponent } from './dispatcher.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { ListProductDispatchComponent } from 'src/app/screens/product-dispatch/list-product-dispatch/list-product-dispatch.component';
import { ViewProductDispatchComponent } from 'src/app/screens/product-dispatch/view-product-dispatch/view-product-dispatch.component';
import { OtherSalesOrderDispatchComponent } from 'src/app/screens/sales-order-screens/sales-order-dispatch/other-sales-order-dispatch/other-sales-order-dispatch.component';
import { OtherSalesOrderDispatchListComponent } from 'src/app/screens/sales-order-screens/sales-order-dispatch/other-sales-order-dispatch-list/other-sales-order-dispatch-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DispatcherComponent, SidebarComponent , ListProductDispatchComponent , ViewProductDispatchComponent , OtherSalesOrderDispatchListComponent , OtherSalesOrderDispatchComponent],
  imports: [
    CommonModule,
    SharedModule,
    DispatcherRoutingModule
  ],
  exports : [
    ListProductDispatchComponent , ViewProductDispatchComponent , OtherSalesOrderDispatchListComponent , OtherSalesOrderDispatchComponent
  ]
})
export class DispatcherModule { }
