import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteInspectorComponent } from './route-inspector.component';
import { RouteInsepectorHoldComponent } from 'src/app/screens/rmrd-screens/route-insepector-hold/route-insepector-hold.component';
import { RouteManagerComponent } from 'src/app/screens/route-manager/route-manager.component';
import { OrdersReleasedComponent } from 'src/app/screens/sales-order-screens/orders-released/orders-released.component';



const routes: Routes = [{
  path: '', component: RouteInspectorComponent,
  children: [
    { path: '', redirectTo: 'RouteInsepectorHoldComponent', pathMatch: 'full' },
    { path: 'hold', component: RouteInsepectorHoldComponent },
    { path: 'route-manager', component: RouteManagerComponent },
    { path: 'order-release', component: OrdersReleasedComponent },
    { path: '**', redirectTo: 'RouteInsepectorHoldComponent' }
  ]
}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteInspectorRoutingModule { }
