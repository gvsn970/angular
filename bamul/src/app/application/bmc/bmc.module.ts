import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmcRoutingModule } from './bmc-routing.module';
import { BmcComponent } from './bmc.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { CreateDispatchComponent } from '../../screens/bmc-screens/create-dispatch/create-dispatch.component';
import { ListDispatchComponent } from '../../screens/bmc-screens/list-dispatch/list-dispatch.component';
import { UpdateDispatchComponent } from '../../screens/bmc-screens/update-dispatch/update-dispatch/update-dispatch.component';
import { TwoDigitDecimaNumberDirective } from '../../shared/directives/restrict-digit-decimal-number.directive';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [BmcComponent, SidebarComponent , CreateDispatchComponent , ListDispatchComponent , UpdateDispatchComponent ],
  imports: [
    SharedModule,
    CommonModule,
    BmcRoutingModule
  ],
  exports : [ CreateDispatchComponent , ListDispatchComponent , UpdateDispatchComponent ]
})
export class BmcModule { }
