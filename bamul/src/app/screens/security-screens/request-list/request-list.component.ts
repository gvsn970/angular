import { Component, OnInit } from '@angular/core';
import { WeighingBridgeService } from '../../../shared/service/weighing-bridge.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from 'src/app/shared/service/shared.service';
;
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requestListData: any = [];
  systemDt: any;
  userData;
  currHour:number;
  constructor(
    private weighingBridgeService: WeighingBridgeService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router, private datePipe: DatePipe,
    private SharedService: SharedService

  ) { }

  ngOnInit() {
    this.currHour = new Date().getHours();
    this.userData =  JSON.parse(localStorage.getItem('data'));
    this.getAllMilkTransferByFromLocationId();
   
  }
  getAllMilkTransferByFromLocationId() {
    let userData = JSON.parse(localStorage.getItem('data'));

    var date = new Date();
    date.setDate(date.getDate() + 1);

    const dateNow: any = this.datePipe.transform(new Date(), 'HH');
    if (dateNow > 4 && dateNow < 16) {
      var shift = 'M';
    } else {
      var shift = 'E';
    }

    //var scheduledDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    var scheduledDate = this.SharedService.getDate();
    var routeStatus = 'Arrived';
    var routeShift = this.SharedService.getShift();
    var endLocation = this.userData.locationName ;
    var routeType = 'BMC';
    //var vendorNum = userData.vendorNum;
    //var vendorNum = '200010';
    let locationId = 706;
    userData.locationID = locationId;
    this.spinnerService.show();
    this.weighingBridgeService.getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation).subscribe(
      res => {
        if (res != null) {
          this.requestListData = res;
          //console.log(this.requestListData, 'this.requestListData');

          this.spinnerService.hide();
        }
      });
  }


}
