import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MktDairyManagerComponent } from './mkt-dairy-manager.component';
import { RouteInsepectorHoldComponent } from 'src/app/screens/rmrd-screens/route-insepector-hold/route-insepector-hold.component';
import { RouteManagerComponent } from 'src/app/screens/route-manager/route-manager.component';
import { OrdersReleasedComponent } from 'src/app/screens/sales-order-screens/orders-released/orders-released.component';
import { CreateMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/create-master-indent/create-master-indent.component';
import { ListMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/list-master-indent/list-master-indent.component';
import { EditMasterIndentComponent } from 'src/app/screens/customer-order-screens/master-indent/edit-master-indent/edit-master-indent.component';
import { ListMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/list-master-indent-manager/list-master-indent-manager.component';
import { EditMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/edit-master-indent-manager/edit-master-indent-manager.component';
import { CreateMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/create-master-indent-manager/create-master-indent-manager.component';


const routes: Routes = [{
  path: '', component: MktDairyManagerComponent,
  children: [
    { path: '', redirectTo: 'RouteInsepectorHoldComponent', pathMatch: 'full' },
    { path: 'hold', component: RouteInsepectorHoldComponent },
    { path: 'route-manager', component: RouteManagerComponent },
    { path: 'order-release', component: OrdersReleasedComponent },
    { path: 'master-indent/create-master-indent', component: CreateMasterIndentComponent },
    { path: 'master-indent/list-master-indents', component: ListMasterIndentComponent },
    { path: 'master-indent/edit-master-indent', component: EditMasterIndentComponent },
    { path: 'master-indent/list-master-indents-manager', component:  ListMasterIndentManagerComponent},
    { path: 'master-indent/edit-master-indent-manager', component:  EditMasterIndentManagerComponent},
    { path: 'master-indent/create-master-indent-manager', component: CreateMasterIndentManagerComponent },
    { path: '**', redirectTo: 'RouteInsepectorHoldComponent' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MktDairyManagerRoutingModule { }
