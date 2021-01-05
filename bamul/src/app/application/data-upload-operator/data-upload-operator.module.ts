import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataUploadOperatorRoutingModule } from './data-upload-operator-routing.module';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { DataUploadComponent } from 'src/app/screens/data-upload/data-upload.component';
import { DataUploadOperatorComponent } from './data-upload-operator.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SidebarComponent, DataUploadComponent, DataUploadOperatorComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataUploadOperatorRoutingModule
  ],
  exports: [DataUploadComponent, SidebarComponent, DataUploadOperatorComponent]
})
export class DataUploadOperatorModule { }
