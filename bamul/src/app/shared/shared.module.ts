import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { AccordionModule, BsDatepickerModule, ModalModule, CollapseModule, TabsModule, TimepickerModule, } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ContactComponent } from './components/contact/contact.component';
import { ClockComponent } from './components/clock/clock.component';
import { DateComponent } from './components/date/date.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from './pipes/search.pipe';
import { GrdFilterPipe } from './pipes/advance-search.pipe';
import { DataFilteringPipe } from './pipes/data-filtering.pipe';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TwoDigitDecimaNumberDirective } from './directives/restrict-digit-decimal-number.directive';
import { DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardSidebarComponent,
    ContactComponent,
    ClockComponent,
    DateComponent,
    SearchPipe,
    GrdFilterPipe,
    DataFilteringPipe,
    TwoDigitDecimaNumberDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot(
      { autoDismiss: true, maxOpened: 1, preventDuplicates: true, }),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    AutocompleteLibModule,
    DndModule,
    DragDropModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AccordionModule,
    BsDatepickerModule,
    AngularFontAwesomeModule,
    CollapseModule,
    TabsModule,
    DateComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ClockComponent,
    Ng4LoadingSpinnerModule,
    TimepickerModule,
    ModalModule,
    NgxPaginationModule,
    ToastrModule,
    DatePipe,
    SearchPipe,
    GrdFilterPipe,
    AutocompleteLibModule,
    DataFilteringPipe,
    TwoDigitDecimaNumberDirective,
    NgxSpinnerModule,
    DndModule,
    DragDropModule
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
