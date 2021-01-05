import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MpcsRoutingModule } from './mpcs-routing.module';
import { MpcsComponent } from './mpcs.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { CreateDispatchComponent } from 'src/app/screens/society-screens/create-dispatch/create-dispatch.component';
import { ListDispatchComponent } from 'src/app/screens/society-screens/list-dispatch/list-dispatch.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SocietyMilkDispatchComponent } from 'src/app/screens/society-screens/society-milk-dispatch/society-milk-dispatch.component';
@NgModule({
  declarations: [MpcsComponent, SidebarComponent , CreateDispatchComponent , ListDispatchComponent , SocietyMilkDispatchComponent],
  imports: [
    SharedModule,
    CommonModule,
    MpcsRoutingModule
  ],
  exports : [CreateDispatchComponent , ListDispatchComponent , SocietyMilkDispatchComponent]
})
export class MpcsModule { }
