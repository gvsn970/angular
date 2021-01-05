import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { MilkTransferService } from '../milk-transfer.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-view-milk-transfer',
  templateUrl: './view-milk-transfer.component.html',
  styleUrls: ['./view-milk-transfer.component.css']
})
export class ViewMilkTransferComponent implements OnInit {
  getDeliveryChallanNo: any;
  milkTransferListItemByChallanNo: any;
  sourceLocation: any;
  destinationLocation: any;
  vehicleNumber: any;
  driverName: any;


  constructor(private dataService: DataService, private milkTransferService: MilkTransferService, private router: Router) { }

  ngOnInit() {
    this.getDeliveryChallanNo = this.dataService.getOption();
    //console.log(this.getDeliveryChallanNo, 'getDeliveryChallanNo');
    if (this.getDeliveryChallanNo.deliveryChallanNo === undefined) {
      this.router.navigate(['/super-admin/milk-transfer/list-milk-transfer']);
      return false;
    }
    else {
      this.getMilkTransferByChallanNo(this.getDeliveryChallanNo.deliveryChallanNo);
    }

  }

  getMilkTransferByChallanNo(challanNo) {
    //console.log(challanNo, 'challanNo');

    this.milkTransferService.getMilkTransferByChallanNos(challanNo).subscribe((response) => {
      if (response) {
        this.milkTransferListItemByChallanNo = response;
        //console.log(this.milkTransferListItemByChallanNo.milkTransDCVehicle, 'milkTransDCVehicle');
        ////console.log(this.milkTransferListItemByChallanNo, 'milktransfer');
        if (this.milkTransferListItemByChallanNo.milkTransDCVehicle !== null) {
          this.vehicleNumber = this.milkTransferListItemByChallanNo.milkTransDCVehicle.vehicleNo;
          this.driverName = this.milkTransferListItemByChallanNo.milkTransDCVehicle.driverName;
          //this.vehicleNumber = this.milkTransferListItemByChallanNo.milkTransDCVehicle.vehicleNo;
        }
        else {
          this.vehicleNumber = 'NA';
          this.driverName = 'NA';
        }
        this.milkTransferService.getAllLocationByLocId(this.milkTransferListItemByChallanNo.fromLocationId).subscribe((response) => {
          //console.log(response, 'locationdetails');
          this.sourceLocation = response[0];
        });
        this.milkTransferService.getAllLocationByLocId(this.milkTransferListItemByChallanNo.toLocationId).subscribe((response) => {
          //console.log(response, 'locationdetails');
          this.destinationLocation = response[0];
        });
      }
    });
  }



}
