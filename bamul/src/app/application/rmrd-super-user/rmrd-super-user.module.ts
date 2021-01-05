import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmrdSuperUserRoutingModule } from './rmrd-super-user-routing.module';
import { RmrdSuperUserComponent } from './rmrd-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [RmrdSuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    RmrdSuperUserRoutingModule
  ]
})
export class RmrdSuperUserModule { }
