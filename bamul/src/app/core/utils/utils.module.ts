import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule, BsDatepickerModule, TabsModule, CollapseModule, TimepickerModule, ModalModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { GrdFilterPipe } from 'src/app/shared/pipes/advance-search.pipe';


@NgModule({
  declarations: [SearchPipe, GrdFilterPipe],
  imports: [
    CommonModule,
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
    CollapseModule.forRoot(),
    ToastrModule.forRoot(
      { autoDismiss: true, maxOpened: 1, preventDuplicates: true, }),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    AutocompleteLibModule
  ],
  exports: [
    CommonModule,
    /* Modules */
    FormsModule,
    AccordionModule,
    BsDatepickerModule,
    AngularFontAwesomeModule,
    CollapseModule,
    TabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng4LoadingSpinnerModule,
    TimepickerModule,
    ModalModule,
    NgxPaginationModule,
    ToastrModule,
    NgxSpinnerModule,
    CollapseModule,
    AutocompleteLibModule,

    /*Pipes*/
    DatePipe, SearchPipe, GrdFilterPipe

  ],
  providers: [
    DatePipe
  ]
})
export class UtilsModule { }
