import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RmrdOperatorComponent } from './rmrd-operator.component';
import { ListCollectionComponent } from '../../screens/rmrd-screens/milk-receive/list-collection/list-collection.component';
import { CollectionComponent } from '../../screens/rmrd-screens/milk-receive/collection/collection.component';
import { WasteMilkRecordsComponent } from '../../screens/rmrd-screens/milk-receive/waste-milk-records/waste-milk-records.component';
import { EditCollectionComponent } from '../../screens/rmrd-screens/milk-receive/edit-collection/edit-collection.component';
import { MilkCansSummaryComponent } from 'src/app/screens/rmrd-screens/milk-receive/milk-cans-summary/milk-cans-summary.component';
import { MilkReceiveComponent } from 'src/app/screens/rmrd-screens/milk-receive/milk-recieve/milk-receive.component';
import { EditMilkReceiveComponent } from 'src/app/screens/rmrd-screens/milk-receive/edit-milk-receive/edit-milk-receive.component';
const routes: Routes = [{
  path: '', component: RmrdOperatorComponent,
  children:
  [
    { path: '', redirectTo: 'CollectionComponent', pathMatch: 'full' },
    { path: 'milk-receive/collection', component: CollectionComponent},
    { path: 'milk-receive/list-collection', component: ListCollectionComponent},
    { path: 'milk-receive/waste-milk', component: WasteMilkRecordsComponent},
    { path: 'milk-receive/milk-summary/:status', component: MilkCansSummaryComponent},
    { path: 'milk-receive/milk-recieve/:routeId/:societyId', component: MilkReceiveComponent},
    { path: 'milk-receive/edit-milk-recieve/:id', component: EditMilkReceiveComponent},
    {path:'milk-receive/edit-collection/:id',component:EditCollectionComponent},
    { path: '**', redirectTo: 'milk-receive/collection', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmrdOperatorRoutingModule { }
