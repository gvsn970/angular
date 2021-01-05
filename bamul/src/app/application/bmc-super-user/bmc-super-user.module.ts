import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmcSuperUserRoutingModule } from './bmc-super-user-routing.module';
import { BmcSuperUserComponent } from './bmc-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [BmcSuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    BmcSuperUserRoutingModule
  ]
})
export class BmcSuperUserModule { }
