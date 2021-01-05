import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-other-sales-order-dispatch-list',
  templateUrl: './other-sales-order-dispatch-list.component.html',
  styleUrls: ['./other-sales-order-dispatch-list.component.css']
})
export class OtherSalesOrderDispatchListComponent implements OnInit {
  allDispatchShipConfirm: Object;
  time = new Date();
  todayDate: string;
  search: any;

  constructor(private routeService: RouteService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private router: Router) {
    this.todayDate = datePipe.transform(new Date(), 'dd-MM-yyyy');

  }
  globalSearch(selection) {
    this.search = selection;
  }
  ngOnInit() {
    this.getAllDispatchShipConfirm();
  }

  getAllDispatchShipConfirm() {
    this.spinner.show();
    this.routeService.getAllDispatchShipConfirm(this.todayDate).subscribe(res => {
      this.allDispatchShipConfirm = res;
      this.spinner.hide();
    })
  }

  redirect(i) {
    this.routeService.setOtherSalesOrderDispatch(i);
    this.router.navigateByUrl('/product-dispatch/other-sales-order-dispatch')
  }
}
