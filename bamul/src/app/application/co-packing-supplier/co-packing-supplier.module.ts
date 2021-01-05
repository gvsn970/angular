import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoPackingSupplierRoutingModule } from './co-packing-supplier-routing.module';
import { CoPackingSupplierComponent } from './co-packing-supplier.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [CoPackingSupplierComponent, SidebarComponent],
  imports: [
    CommonModule,
    CoPackingSupplierRoutingModule
  ]
})
export class CoPackingSupplierModule { }
