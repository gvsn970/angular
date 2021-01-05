import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CcWbOperatorRoutingModule } from './cc-wb-operator-routing.module';
import { CcWbOperatorComponent } from './cc-wb-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';


@NgModule({
  declarations: [CcWbOperatorComponent, SidebarComponent],
  imports: [
    CommonModule,
    CcWbOperatorRoutingModule
  ]
})
export class CcWbOperatorModule { }
