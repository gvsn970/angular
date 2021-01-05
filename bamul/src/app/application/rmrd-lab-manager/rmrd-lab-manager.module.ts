import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmrdLabManagerRoutingModule } from './rmrd-lab-manager-routing.module';
import { RmrdLabManagerComponent } from './rmrd-lab-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { ListSamplesComponent } from '../../screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { LabReportComponent } from '../../screens/rmrd-screens/test-lab/lab-report/lab-report.component';
import { UpdateSampleComponent } from '../../screens/rmrd-screens/test-lab/update-sample/update-sample.component';
import { SharedModule } from '../../shared/shared.module';
import { TwoDigitDecimaNumberDirective } from '../../shared/directives/restrict-digit-decimal-number.directive';


@NgModule({
  declarations: [RmrdLabManagerComponent, SidebarComponent , ListSamplesComponent , LabReportComponent , UpdateSampleComponent ],
  imports: [
    SharedModule,
    CommonModule,
    RmrdLabManagerRoutingModule
  ],
  exports : [ListSamplesComponent , LabReportComponent , UpdateSampleComponent ]
})
export class RmrdLabManagerModule { }
