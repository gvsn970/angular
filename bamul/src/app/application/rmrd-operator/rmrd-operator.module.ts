import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RmrdOperatorRoutingModule } from './rmrd-operator-routing.module';
import { RmrdOperatorComponent } from './rmrd-operator.component';
import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';

import { ListCollectionComponent } from '../../screens/rmrd-screens/milk-receive/list-collection/list-collection.component';
import { CollectionComponent } from '../../screens/rmrd-screens/milk-receive/collection/collection.component';
import { WasteMilkRecordsComponent } from '../../screens/rmrd-screens/milk-receive/waste-milk-records/waste-milk-records.component';
import { EditCollectionComponent } from '../../screens/rmrd-screens/milk-receive/edit-collection/edit-collection.component';
import { MilkCansSummaryComponent } from '../../screens/rmrd-screens/milk-receive/milk-cans-summary/milk-cans-summary.component';
import { MilkReceiveComponent } from 'src/app/screens/rmrd-screens/milk-receive/milk-recieve/milk-receive.component';
import { EditMilkReceiveComponent } from 'src/app/screens/rmrd-screens/milk-receive/edit-milk-receive/edit-milk-receive.component';


@NgModule({
  declarations: [RmrdOperatorComponent, SidebarComponent , ListCollectionComponent , CollectionComponent , WasteMilkRecordsComponent , EditCollectionComponent, MilkCansSummaryComponent,MilkReceiveComponent , EditMilkReceiveComponent ],
  imports: [
    SharedModule,
    CommonModule,
    RmrdOperatorRoutingModule,
  ],
  exports : [ListCollectionComponent , CollectionComponent , WasteMilkRecordsComponent , EditCollectionComponent,MilkCansSummaryComponent,MilkReceiveComponent , EditMilkReceiveComponent]
})
export class RmrdOperatorModule { }
