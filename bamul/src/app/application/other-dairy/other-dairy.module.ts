import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherDairyRoutingModule } from './other-dairy-routing.module';
import { OtherDairyComponent } from './other-dairy.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [OtherDairyComponent, SidebarComponent],
  imports: [
    CommonModule,
    OtherDairyRoutingModule
  ]
})
export class OtherDairyModule { }
