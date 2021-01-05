import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmcManagerRoutingModule } from './bmc-manager-routing.module';
import { BmcManagerComponent } from './bmc-manager.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { RandomCheckComponent } from 'src/app/screens/security-screens/random-check/random-check.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BmcManagerComponent, SidebarComponent , RandomCheckComponent],
  imports: [
    CommonModule,
    SharedModule,
    BmcManagerRoutingModule
  ],
  exports : [RandomCheckComponent]
})
export class BmcManagerModule { }
