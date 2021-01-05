import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MktDairyManagerRoutingModule } from './mkt-dairy-manager-routing.module';
import { MktDairyManagerComponent } from './mkt-dairy-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';

import { RouteInspectorModule } from '../route-inspector/route-inspector.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RetailerModule } from '../retailer/retailer.module';
import { ListMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/list-master-indent-manager/list-master-indent-manager.component';
import { EditMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/edit-master-indent-manager/edit-master-indent-manager.component';
import { CreateMasterIndentManagerComponent } from 'src/app/screens/customer-order-screens/master-indent/create-master-indent-manager/create-master-indent-manager.component';


@NgModule({
  declarations: [MktDairyManagerComponent, SidebarComponent , CreateMasterIndentManagerComponent,ListMasterIndentManagerComponent , EditMasterIndentManagerComponent],
  imports: [
    CommonModule,
    MktDairyManagerRoutingModule,
    SharedModule,
    RouteInspectorModule,
    RetailerModule,
  ],
  exports : [ListMasterIndentManagerComponent , EditMasterIndentManagerComponent,CreateMasterIndentManagerComponent]
})
export class MktDairyManagerModule { }
