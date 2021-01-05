import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScreensComponent } from './pages/screens/screens.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ScreensComponent,ForgetPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CoreModule { }
