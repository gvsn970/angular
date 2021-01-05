import { Component, OnInit } from '@angular/core';
import { WeighingBridgeService } from '../../../shared/service/weighing-bridge.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list-mnm-unloading',
  templateUrl: './list-mnm-unloading.component.html',
  styleUrls: ['./list-mnm-unloading.component.css']
})
export class ListMnmUnloadingComponent implements OnInit {
  milkMaterialUnloadingListData: any = [];
  sysDate: any;
  totalRoute: number=0;
  totalVehicle: number=0;
  totalSociety:number=0
  totalCans: number=0;
  acceptedCans: number=0;
  quantity: number=0;
  constructor(
    private weighingBridgeService: WeighingBridgeService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAllMilkTransferByFromLocationId();
  }
  getAllMilkTransferByFromLocationId() {
    let userData = JSON.parse(localStorage.getItem('data'));
    // let locationId = 113;
    // userData.locationID = locationId;
    this.spinnerService.show();
    this.sysDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    let shift='M';
    this.weighingBridgeService.getAllTripsBySchedualAndShiftendloc(this.sysDate,shift,userData.locationName).subscribe(
      res => {
        if (res != null) {
          this.milkMaterialUnloadingListData = res;
          this.totalRoute=this.milkMaterialUnloadingListData.length;
          this.totalVehicle=this.milkMaterialUnloadingListData.length;
          this.milkMaterialUnloadingListData.forEach((element,index) => {
            this.totalSociety+=element.tripPoints.length;
            this.totalCans+=element.estimatedtotalQuantity;
            this.acceptedCans+=element.actualTotalQuantity;
            this.quantity+=element.quantityKgs;
          });
          this.spinnerService.hide();
        }
      });
  }
}
