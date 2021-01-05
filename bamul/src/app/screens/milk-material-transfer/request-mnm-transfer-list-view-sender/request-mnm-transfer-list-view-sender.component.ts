import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { InitiateTransferMilkService } from 'src/app/shared/service/initiate-transfermilk.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-request-mnm-transfer-list-view-sender',
  templateUrl: './request-mnm-transfer-list-view-sender.component.html',
  styleUrls: ['./request-mnm-transfer-list-view-sender.component.css']
})
export class RequestMnmTransferListViewSenderComponent implements OnInit {

  constructor(private router: Router, private initiateTransferMilkService: InitiateTransferMilkService, private dataService: DataService, private datePipe: DatePipe, private spinnerService: NgxSpinnerService) { }
  milkTransferListItem: any;
  userData: any;

  ngOnInit() {
    this.spinnerService.show();
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.getMilkTransferList(this.userData.locationID);
    // this.getMilkTransferList(164);
  }
  getMilkTransferList(locationID) {
    this.initiateTransferMilkService.getAllMilkTransferByFromLocationId(locationID).subscribe((response) => {
      if (response) {
        this.milkTransferListItem = response;
        this.spinnerService.hide();
      }
    },
      error => {
        this.milkTransferListItem = error.error;
        this.spinnerService.hide();
      });
  }
  redirectTo(id: any) {
    this.dataService.setOption('deliveryChallanNo', id);
  }

}
