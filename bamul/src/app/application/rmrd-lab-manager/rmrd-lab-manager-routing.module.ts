import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RmrdLabManagerComponent } from './rmrd-lab-manager.component';
import { ListSamplesComponent } from '../../screens/rmrd-screens/test-lab/list-samples/list-samples.component';
import { LabReportComponent } from '../../screens/rmrd-screens/test-lab/lab-report/lab-report.component';
import { UpdateSampleComponent } from '../../screens/rmrd-screens/test-lab/update-sample/update-sample.component';


const routes: Routes = [{
  path: '', component: RmrdLabManagerComponent,
  children:
    [
      { path: '', redirectTo: 'ListSamplesComponent', pathMatch: 'full' },
      { path: 'lab/list-samples', component: ListSamplesComponent },
      { path: 'lab/lab-report', component: LabReportComponent },
      { path: 'lab/update-sample', component: UpdateSampleComponent },
      // { path: 'lab/dairy-sample', component: DairyMilkLabSampleListComponent, pathMatch: 'full' },
      // { path: 'lab/dairy-sample-detail', component: DairyMilkDetailSampleComponent, pathMatch: 'full' },
      
      
      // { path: 'contact', component: ContactComponent, pathMatch: 'full' }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmrdLabManagerRoutingModule { }
