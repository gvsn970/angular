import { Component, OnInit } from '@angular/core';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/service/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'milk-cans-summary',
  templateUrl: './milk-cans-summary.component.html',
  styleUrls: ['./milk-cans-summary.component.css']
})
export class MilkCansSummaryComponent implements OnInit {
routePoints;
routePoint = null;
routeNosocietylogs;
totalacceptedcans = 0;
totalsentqtycans = 0;
UserData;
shippingHeadersList;
tempList;
shift: any;
statusroute;
  constructor(private MilkCollectionService: MilkCollectionService , private toastr: ToastrService , private SharedService: SharedService,private router: Router , private spinnerService: Ng4LoadingSpinnerService,private datePipe: DatePipe,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.UserData = JSON.parse(localStorage.getItem('data'));
    const dateNow: any = this.datePipe.transform(new Date(), 'HH');


    if (dateNow > 4 && dateNow < 14) {
      this.shift = 'Morning';
    } else {
      this.shift = 'Evening';
    }
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
  this.MilkCollectionService.gettripshippingDetails(routeType, this.SharedService.getDate(), routeStatus, this.SharedService.getShift(), endLocation).subscribe(
    res => {
      if (res && res["length"] > 0) {
        this.routePoints = res;
            this.activatedRoute.params.subscribe(params => {
      if (params['status']) {
        this.statusroute = params['status'];
        if(this.statusroute == 'NEW') {

        }else {
          this.routePoint = this.statusroute;
          this.routeonChange(this.routePoint);
        }
   
      }
     
 
    })
      }
    }, error => {
    });
  }

  routeonChange(event) {
    this.routePoint = event;
    this.spinnerService.show();

    
    var tempArr = [];
    tempArr = this.routePoints.filter((obj) => {
      return obj.routeNumber == event;
    });
    this.routeNosocietylogs = tempArr;
    this.routeNosocietylogs[0].tripPoints.sort((a, b) => a.routePointSequenceNo-b.routePointSequenceNo );
    this.totalacceptedcans = 0;
    this.totalsentqtycans = 0;
    
        for (let j = 0; j < this.routeNosocietylogs[0].tripPoints.length; j++) {
       
          if(this.routeNosocietylogs[0].tripPoints[j].receivedQty !=null) {
            this.totalacceptedcans+= this.routeNosocietylogs[0].tripPoints[j].receivedQty;
          }
          if(this.routeNosocietylogs[0].tripPoints[j].numOfContainers !=null) {
            this.totalsentqtycans+= this.routeNosocietylogs[0].tripPoints[j].numOfContainers;
          }
        
      }
        this.spinnerService.hide();
          //console.log(this.shippingHeadersList);
      

  }

  focusOutFunction() {
    this.totalacceptedcans = 0;
    this.totalsentqtycans= 0;
    this.routeNosocietylogs[0].tripPoints.forEach((element,i) => {
      if(element.actualQuantity !=null) {
        this.totalacceptedcans+= element.receivedQty;
      }
      if(element.estimatedquantity !=null) {
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
  redirectTo(path: any,societyNumber) {
    this.router.navigateByUrl('/' + path+this.routePoint+'/'+societyNumber);
  }
  redirectToReceipt(path: any,shipmentheaderid) {
    this.router.navigateByUrl('/' + path+shipmentheaderid);
  }

}
