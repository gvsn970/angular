import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DairyMilkLabSampleListComponent } from 'src/app/screens/lab-screens/dairy-milk-lab-sample-list/dairy-milk-lab-sample-list.component';
import { DairyMilkDetailSampleComponent } from 'src/app/screens/lab-screens/dairy-milk-lab-sample-list/dairy-milk-detail-sample/dairy-milk-detail-sample.component';
import { BmcLabOperatorComponent } from './bmc-lab-operator.component';

const routes: Routes = [{
  path: '', component: BmcLabOperatorComponent,
  children:
    [
      { path: '', redirectTo: 'DairyMilkLabSampleListComponent', pathMatch: 'full' },
      { path: 'lab/dairy-sample', component: DairyMilkLabSampleListComponent},
      { path: 'lab/dairy-sample-detail/:id', component: DairyMilkDetailSampleComponent},
    ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BmcLabOperatorRoutingModule { }
