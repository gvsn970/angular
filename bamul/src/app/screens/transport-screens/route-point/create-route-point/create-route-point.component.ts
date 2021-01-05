import { Component, OnInit } from '@angular/core';
import { TransportRoutePoints } from 'src/app/shared/model/routepoint';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/shared/service/route.service';
@Component({
  selector: 'app-create-route-point',
  templateUrl: './create-route-point.component.html',
  styleUrls: ['./create-route-point.component.css']
})
export class CreateRoutePointComponent {
  // routeLst: object;
  // currentDate: Date = new Date();
  // setDob: any;
  // searchText: any = '';
  // public customerData: any;

  // positionSelect: any[] = [{

  //   shift: "Morning"

  // },
  // {

  //   shift: "Evening"
  // }]
  // routeNo: any;
  // parCrates: any;
  // Shift: any;
  // listItem: any;
  // dispatch: boolean = true;

  constructor(private datePipe: DatePipe,
    // private routeService: RouteService, private router: Router
  ) {


    // this.setDob = datePipe.transform(this.currentDate, 'dd/MM/yyyy');
  }

  // ngOnInit() {
  //   // this.getAllRouteSheets();
  //   this.getAllDispatchAndShippingStatus();
  //   const routesheetList = JSON.parse(localStorage.getItem('routeSheetList'));
  //   this.routeNo = routesheetList.routeNo;
  //   this.Shift = routesheetList.shift;
  //   this.parCrates = routesheetList.reportDate;
  //   this.listItem = routesheetList.routeSheetLine;
  //   //console.log(this.listItem = routesheetList.routeSheetLine);

  // }
  // save() {


  //   this.dispatch = true;

  // }
  // redirectTo(i) {

  //   // this.router.navigateByUrl('/transport/route-point/create-route-point');


  //   this.dispatch = false;

  //   localStorage.setItem('routeSheetList', JSON.stringify(i));
  //   const routesheetList = i;
  //   this.routeNo = routesheetList.routeNo;
  //   this.Shift = routesheetList.shift;
  //   this.parCrates = routesheetList.reportDate;
  //   this.listItem = routesheetList.routeSheetLine;
  //   //console.log(this.listItem = routesheetList.routeSheetLine);
  // }


  // getAllDispatchAndShippingStatus() {
  //   this.routeService.getAllDispatchAndShippingStatus().subscribe(res => {
  //     //console.log(res);
  //     this.routeLst = res;
  //   }, error => {

  //     //console.log(error);
  //   });
  // }
}
