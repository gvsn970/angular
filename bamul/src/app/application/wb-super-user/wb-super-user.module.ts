import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WbSuperUserRoutingModule } from './wb-super-user-routing.module';
import { WbSuperUserComponent } from './wb-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [WbSuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    WbSuperUserRoutingModule
  ]
})
export class WbSuperUserModule { }
