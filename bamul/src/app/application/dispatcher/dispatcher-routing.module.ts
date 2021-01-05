import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProductDispatchComponent } from 'src/app/screens/product-dispatch/list-product-dispatch/list-product-dispatch.component';
import { ViewProductDispatchComponent } from 'src/app/screens/product-dispatch/view-product-dispatch/view-product-dispatch.component';
import { OtherSalesOrderDispatchComponent } from 'src/app/screens/sales-order-screens/sales-order-dispatch/other-sales-order-dispatch/other-sales-order-dispatch.component';
import { OtherSalesOrderDispatchListComponent } from 'src/app/screens/sales-order-screens/sales-order-dispatch/other-sales-order-dispatch-list/other-sales-order-dispatch-list.component';
import { DispatcherComponent } from './dispatcher.component';


const routes: Routes = [{
  path: '', component: DispatcherComponent,
  children:
    [
      { path: '', redirectTo: 'list-order-dispatch', pathMatch: 'full' },
      { path: 'list-order-dispatch', component: ListProductDispatchComponent},
      { path: 'view-order-dispatch', component: ViewProductDispatchComponent },
      { path: 'other-sales-order-dispatch-list', component: OtherSalesOrderDispatchListComponent },
      { path: 'other-sales-order-dispatch', component: OtherSalesOrderDispatchComponent }
    ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispatcherRoutingModule { }
