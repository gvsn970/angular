import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataUploadOperatorComponent } from './data-upload-operator.component';
import { DataUploadComponent } from 'src/app/screens/data-upload/data-upload.component';


const routes: Routes = [{
  path: '', component: DataUploadOperatorComponent,
  children: [
    { path: '', redirectTo: 'biometric-file', pathMatch: 'full' },
    { path: 'biometric-file', component: DataUploadComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataUploadOperatorRoutingModule { }
