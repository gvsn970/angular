import { Component, OnInit } from '@angular/core';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/service/shared.service';
@Component({
  selector: 'app-milk-cans-confirmation',
  templateUrl: './milk-cans-confirmation.component.html',
  styleUrls: ['./milk-cans-confirmation.component.css']
})
export class MilkCansConfirmationComponent implements OnInit {
routePoints;
routePoint = null;
routeNosocietylogs;
totalacceptedcans = 0;
totalsentqtycans = 0;
UserData;
currHour:number;

  constructor(private MilkCollectionService: MilkCollectionService , private toastr: ToastrService , private SharedService: SharedService) { }

  ngOnInit() {
    this.currHour = new Date().getHours();
    this.UserData = JSON.parse(localStorage.getItem('data'));
    // this.MilkCollectionService.getRoutePoint().subscribe(
    //   res => {
    //     if (res && res["length"] > 0) {
    //       this.routePoints = res;
    //       //console.log(this.routePoints);
    //     }
    //   }, error => {
    //   });
    let routeType = "PTC";
    let scheduledDate = "06-07-2020";
    let routeStatus = "Arrived";
    let routeShift = "E"
    let endLocation = this.UserData.locationName;
  this.MilkCollectionService.getAllTripsBySchDatertptCode(routeType, this.SharedService.getDate(), routeStatus, this.SharedService.getShift(), endLocation).subscribe(
    res => {
      if (res && res["length"] > 0) {
        this.routePoints = res;
      }
    }, error => {
    });
  }

  routeonChange(event) {
    this.routePoint = event;
    var tempArr = [];
    tempArr = this.routePoints.filter((obj) => {
      return obj.routeNumber == event;
    });
    this.routeNosocietylogs = tempArr;
    this.routeNosocietylogs[0].tripPoints.sort((a, b) => a.routePointSequenceNo-b.routePointSequenceNo );
    this.totalacceptedcans = 0;
    this.totalsentqtycans = 0;
    this.routeNosocietylogs[0].tripPoints.forEach((element,i) => {
      // if(element.actualQuantity > element.estimatedquantity) {
      //   element.actualQuantity = 0;
      //   this.toastr.error('Error', 'Accepted Qty is greater than Sent Qty', {
      //     timeOut: 1000
      //   });
      // }
      if(element.receivedQty !=null) {
        this.totalacceptedcans+= element.receivedQty;
      }
      if(element.actualQuantity !=null) {
        this.totalsentqtycans+= element.actualQuantity;
      }
  })
  }

  focusOutFunction() {
    this.totalacceptedcans = 0;
    this.totalsentqtycans= 0;
    this.routeNosocietylogs[0].tripPoints.forEach((element,i) => {
      if(element.receivedQty !=null) {
        this.totalacceptedcans+= element.receivedQty;
      }
      if(element.actualQuantity !=null) {
        this.totalsentqtycans+= element.actualQuantity;
      }
      // if(element.actualQuantity > element.estimatedquantity) {
      //   element.actualQuantity = 0;
      //   this.toastr.error('Error', 'Accepted Qty is greater than Sent Qty', {
      //     timeOut: 1000
      //   });
      // }
  })


  }
  updateTripData(data){
    data.routeStatus = 'Arrived';
    //console.log(data);
    this.MilkCollectionService.updateTrip(data).subscribe(
      res => {
        this.toastr.success('Updated', 'Trip Details', {
          timeOut: 1000
        });
      }, error => {
      });
  }

  reset(){
    this.routeNosocietylogs = null;
    this.routePoint = null;
    this.totalacceptedcans=0;
    this.totalsentqtycans = 0;

  }

}
