import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-other-sales-order-dispatch-list-security',
  templateUrl: './other-sales-order-dispatch-list-security.component.html',
  styleUrls: ['./other-sales-order-dispatch-list-security.component.css']
})
export class OtherSalesOrderDispatchListSecurityComponent implements OnInit {
  listSodispshipbyOrderedDate;
  filterList:any=[];
  time = new Date();
  todayDate: string;
  search: any;
  constructor(private routeService:RouteService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService ,
    private router:Router,
    private route: ActivatedRoute)
     { 
      this.todayDate = datePipe.transform(new Date(), 'dd-MM-yyyy');
      // this.todayDate ="07-03-2020"
    }

  ngOnInit() {
    this.getsodispshipbyOrderedDate();
    }
    globalSearch(selection) {
      this.search = selection;
    }
    getsodispshipbyOrderedDate(){   
      this.spinner.show();
       this.routeService.getsodispshipbyOrderedDate( this.todayDate).subscribe(res=>{
  this.listSodispshipbyOrderedDate=res;
  this.spinner.hide();
  for (let index = 0; index < this.listSodispshipbyOrderedDate.length; index++) {
    if (this.listSodispshipbyOrderedDate[index].dispatchStatus == "Y" && this.listSodispshipbyOrderedDate[index].shipStatus == "N") {
      this.filterList.push(this.listSodispshipbyOrderedDate[index]);
    }
  }
})
  }
redirect(i)
{
  this.routeService.setOtherSalesOrderShipping(i);
this.router.navigate(['../other-sales-order-dispatch-security'] , { relativeTo: this.route })
}
}

