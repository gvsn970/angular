import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DairyWbOperatorComponent } from './dairy-wb-operator.component';
import { RequestListComponent } from 'src/app/screens/security-screens/request-list/request-list.component';
import { WeighmentEntryComponent } from 'src/app/screens/security-screens/weighment-entry/weighment-entry.component';


const routes: Routes = [{
  path: '', component: DairyWbOperatorComponent,
  children: [
    { path: '', redirectTo: 'RequestListComponent', pathMatch: 'full' },
    { path: 'request-list', component: RequestListComponent, pathMatch: 'full' },
    { path: 'weighment-entry/:id', component: WeighmentEntryComponent },
  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DairyWbOperatorRoutingModule { }
