import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DairySpecialSalesRoutingModule } from './dairy-special-sales-routing.module';
import { DairySpecialSalesComponent } from './dairy-special-sales.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [DairySpecialSalesComponent, SidebarComponent],
  imports: [
    CommonModule,
    DairySpecialSalesRoutingModule
  ]
})
export class DairySpecialSalesModule { }
