import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RandomCheckShippingComponent } from 'src/app/screens/security-screens/random-check-shipping/random-check-shipping.component';
import { BioDataUploadComponent } from 'src/app/screens/bio-data-upload/bio-data-upload.component';


@NgModule({
  declarations: [EmployeeComponent, SidebarComponent, RandomCheckShippingComponent, BioDataUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule
  ],
  exports: [RandomCheckShippingComponent, BioDataUploadComponent]
})
export class EmployeeModule { }
