import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversionSupplierRoutingModule } from './conversion-supplier-routing.module';
import { ConversionSupplierComponent } from './conversion-supplier.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [ConversionSupplierComponent, SidebarComponent],
  imports: [
    CommonModule,
    ConversionSupplierRoutingModule
  ]
})
export class ConversionSupplierModule { }
