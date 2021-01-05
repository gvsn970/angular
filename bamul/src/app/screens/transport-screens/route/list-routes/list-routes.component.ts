import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-list-routes',
  templateUrl: './list-routes.component.html',
  styleUrls: ['./list-routes.component.css']
})
export class ListRoutesComponent implements OnInit {
  routeLst: any;
  public search: any = '';
  p:any = 1;
  pageSize = 10;
  constructor(private routeService: RouteService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getRouteList();
  }
  globalSearch(selection) {
    this.search = selection;
    if(this.search.length>3){
      this.getRouteListBySearch();
    } else if(this.search.length==0){
      this.getRouteListBySearch();
    }
  }
  getRouteList() {
    this.spinnerService.show();
    this.routeService.getRoutes(this.p,this.pageSize,this.search).subscribe(res => {
      this.routeLst = res;
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
      //console.log(error);
    })
  }
  getRouteListBySearch() {
    this.spinnerService.show();
    this.p=1;
    this.routeService.getRoutes(this.p,this.pageSize,this.search).subscribe(res => {
      this.routeLst = res;
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
      //console.log(error);
    })
  }
  pagechange(value){
    this.p = (value);
    this.getRouteList();
  }
}
