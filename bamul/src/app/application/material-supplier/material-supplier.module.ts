import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialSupplierRoutingModule } from './material-supplier-routing.module';
import { MaterialSupplierComponent } from './material-supplier.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [MaterialSupplierComponent, SidebarComponent],
  imports: [
    CommonModule,
    MaterialSupplierRoutingModule
  ]
})
export class MaterialSupplierModule { }
