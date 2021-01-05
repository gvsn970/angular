import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmrdLabOperatorRoutingModule } from './rmrd-lab-operator-routing.module';
import { RmrdLabOperatorComponent } from './rmrd-lab-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { ListSamplesComponent } from '../../screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { SharedModule } from '../../shared/shared.module';
import { TwoDigitDecimaNumberDirective } from '../../shared/directives/restrict-digit-decimal-number.directive';
import { RmrdLabManagerModule } from '../rmrd-lab-manager/rmrd-lab-manager.module';

@NgModule({
  declarations: [RmrdLabOperatorComponent, SidebarComponent],
  imports: [
    SharedModule,
    CommonModule,
    RmrdLabOperatorRoutingModule,
    RmrdLabManagerModule
  ],
  exports : [ ]
})
export class RmrdLabOperatorModule { }
