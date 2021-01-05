import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/shared/service/trip.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/shared/service/shared.service';

@Component({
  selector: 'app-list-trip',
  templateUrl: './list-trip.component.html',
  styleUrls: ['./list-trip.component.css']
})
export class ListTripComponent implements OnInit {
  routeLst: any;
  public search: any = '';
  p:any = 1;
  pageSize = 10;
  constructor(private tripService: TripService, private sharedService: SharedService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getRouteList();
  }
  globalSearch(selection) {
    this.search = selection;
    if(this.search.length>2){
      this.getRouteListBySearch();
    }  else if(this.search.length==0){
      this.getRouteListBySearch();
    }
  }
  getRouteList() {
    this.spinnerService.show();
    this.tripService.getTripsByScheduledDate(this.p,this.pageSize,this.sharedService.getDate(),this.search).subscribe(res => {
      // this.tripService.getTripsByScheduledDate(this.sharedService.getDate()).subscribe(res => {
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
    this.tripService.getTripsByScheduledDate(this.p,this.pageSize,this.sharedService.getDate(),this.search).subscribe(res => {
      // this.tripService.getTripsByScheduledDate(this.sharedService.getDate()).subscribe(res => {
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
