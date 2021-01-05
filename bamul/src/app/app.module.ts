import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './core/guard/auth.guard';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { SharedModule } from './shared/shared.module';
import { UtilsModule } from './core/utils/utils.module';
import { CustomerRegistrationComponent } from './screens/abundant-screens/customer-registration/customer-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CustomerRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    CustomerRegistrationComponent
  ],
  providers: [AuthGuard, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
