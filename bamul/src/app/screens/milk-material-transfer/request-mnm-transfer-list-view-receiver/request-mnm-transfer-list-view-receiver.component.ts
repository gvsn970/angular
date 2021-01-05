import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { InitiateTransferMilkService } from 'src/app/shared/service/initiate-transfermilk.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-request-mnm-transfer-list-view-receiver',
  templateUrl: './request-mnm-transfer-list-view-receiver.component.html',
  styleUrls: ['./request-mnm-transfer-list-view-receiver.component.css']
})
export class RequestMnmTransferListViewReceiverComponent implements OnInit {

  constructor(private router: Router, private initiateTransferMilkService: InitiateTransferMilkService, private dataService: DataService, private datePipe: DatePipe, private spinnerService: NgxSpinnerService) { }
  milkTransferListItem: any;
  userData: any;

  ngOnInit() {
    this.spinnerService.show();
    this.userData = JSON.parse(localStorage.getItem('data'));
    //this.getMilkTransferList(this.userData.locationID);
    this.getMilkTransferList(this.userData.locationID);
  }
  getMilkTransferList(locationID) {
    this.initiateTransferMilkService.getAllMilkTransferByFromLocationId(locationID).subscribe((response) => {
      if (response) {
        this.spinnerService.hide();
        this.milkTransferListItem = response;
      }
    },
      error => {
        this.spinnerService.hide();
        this.milkTransferListItem = error.error;
      });
  }
  redirectTo(id: any) {
    this.dataService.setOption('deliveryChallanNo', id);
  }

}
