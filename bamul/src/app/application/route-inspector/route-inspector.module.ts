import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteInspectorRoutingModule } from './route-inspector-routing.module';
import { RouteInspectorComponent } from './route-inspector.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { RouteInsepectorHoldComponent } from 'src/app/screens/rmrd-screens/route-insepector-hold/route-insepector-hold.component';
import { RouteManagerComponent } from 'src/app/screens/route-manager/route-manager.component';
import { OrdersReleasedComponent } from 'src/app/screens/sales-order-screens/orders-released/orders-released.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [RouteInspectorComponent, SidebarComponent , RouteInsepectorHoldComponent , RouteManagerComponent , OrdersReleasedComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouteInspectorRoutingModule
  ],
  exports:[
    RouteInsepectorHoldComponent ,
    RouteManagerComponent,
    OrdersReleasedComponent,
  ]
})
export class RouteInspectorModule { }
