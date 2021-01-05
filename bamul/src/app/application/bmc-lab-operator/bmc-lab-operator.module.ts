import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmcLabOperatorRoutingModule } from './bmc-lab-operator-routing.module';
import { BmcLabOperatorComponent } from './bmc-lab-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { DairyMilkLabSampleListComponent } from 'src/app/screens/lab-screens/dairy-milk-lab-sample-list/dairy-milk-lab-sample-list.component';
import { DairyMilkDetailSampleComponent } from 'src/app/screens/lab-screens/dairy-milk-lab-sample-list/dairy-milk-detail-sample/dairy-milk-detail-sample.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/directives/restrict-digit-decimal-number.directive';

@NgModule({
  declarations: [BmcLabOperatorComponent, SidebarComponent , DairyMilkLabSampleListComponent , DairyMilkDetailSampleComponent  ],
  imports: [
    SharedModule,
    CommonModule,
    BmcLabOperatorRoutingModule,
  ],
  exports :[DairyMilkLabSampleListComponent , DairyMilkDetailSampleComponent ]
})
export class BmcLabOperatorModule { }
