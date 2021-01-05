import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DairyWbOperatorRoutingModule } from './dairy-wb-operator-routing.module';
import { DairyWbOperatorComponent } from './dairy-wb-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestListComponent } from 'src/app/screens/security-screens/request-list/request-list.component';
import { WeighmentEntryComponent } from 'src/app/screens/security-screens/weighment-entry/weighment-entry.component';

@NgModule({
  declarations: [DairyWbOperatorComponent, SidebarComponent , RequestListComponent , WeighmentEntryComponent],
  imports: [
    SharedModule,
    CommonModule,
    DairyWbOperatorRoutingModule
  ],
  exports : [
    RequestListComponent , WeighmentEntryComponent
  ]
})
export class DairyWbOperatorModule { }
