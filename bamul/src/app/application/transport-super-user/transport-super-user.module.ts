import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportSuperUserRoutingModule } from './transport-super-user-routing.module';
import { TransportSuperUserComponent } from './transport-super-user.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [TransportSuperUserComponent, SidebarComponent],
  imports: [
    CommonModule,
    TransportSuperUserRoutingModule
  ]
})
export class TransportSuperUserModule { }
