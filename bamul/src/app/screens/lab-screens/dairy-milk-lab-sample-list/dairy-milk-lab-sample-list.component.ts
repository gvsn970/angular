import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/service/shared.service';
import { WeighingBridgeService } from 'src/app/shared/service/weighing-bridge.service';
@Component({
  selector: 'app-dairy-milk-lab-sample-list',
  templateUrl: './dairy-milk-lab-sample-list.component.html',
  styleUrls: ['./dairy-milk-lab-sample-list.component.css']
})
export class DairyMilkLabSampleListComponent implements OnInit {
  userData;
  shippingHeadersList;
  shippingHeadersBMCList = []
  disableSubmit=false;
  tripData;
  constructor(private MilkCollectionServices: MilkCollectionService , private router: Router , 
              private spinnerService: Ng4LoadingSpinnerService , private toastr: ToastrService , private SharedService: SharedService , private weighingBridgeService: WeighingBridgeService) { }

  ngOnInit() {
    this.userData =  JSON.parse(localStorage.getItem('data'));
    this.spinnerService.show();


    this.userData =  JSON.parse(localStorage.getItem('data'));
    var scheduledDate = this.SharedService.getDate();
    let routeStatus = 'Arrived';
    var routeShift = this.SharedService.getShift();
    const endLocation = this.userData.locationName;
    var routeType = 'BMC';
    // var vendorNum = userData.vendorNum;
    // var vendorNum = '200010';
    const locationId = 706;

    this.spinnerService.show();
    this.weighingBridgeService.getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation).subscribe(
      res => {
        if (res != null) {
          this.tripData = res;

          // this.spinnerService.hide();

          for (let index = 0; index < this.tripData.length; index++) {
              
            this.MilkCollectionServices.getDairyQcList(this.tripData[index].routeNumber,this.userData.locationID,this.SharedService.getDate()).subscribe(
              res => {
                  this.shippingHeadersList = res;
                  let result; 
                  this.shippingHeadersList.forEach((element,i) => {
                    result = this.shippingHeadersBMCList.find((data)=>data.routeNo == element.routeNo);
                    if(element.routeNo !=null) {
                      //this.avgFat+=  (this.shippingHeadersList.avgFat*this.shippingHeadersList.netWeight);
                      //this.sumSociety+= this.shippingHeadersList.netWeight;
                      if(result==undefined) {
                      element.customAvgFat = element.avgFat*element.quantityShipped; 
                      element.customSociety= element.quantityShipped;
                      element.customAvgSnf= element.avgSnf*element.quantityShipped;
                      element.acceptedAvgFat = element.mshippingLines[0].fatAccepted*element.quantityReceived; 
                      element.acceptedSociety= element.quantityReceived;
                      element.acceptedAvgSnf= element.mshippingLines[0].snfAccepted*element.quantityReceived
                      this.shippingHeadersBMCList.push(element);
                      }
                      else {
                        let index = this.shippingHeadersBMCList.findIndex((data)=>data.routeNo == element.routeNo);
                        this.shippingHeadersBMCList[index].numOfContainers+= element.numOfContainers;
                        this.shippingHeadersBMCList[index].quantityShipped+=element.quantityShipped
                        // this.avgFat+=  (element.avgFat*element.netWeight);
                        // this.sumSociety+= element.netWeight;
                        this.shippingHeadersBMCList[index].customAvgFat += element.avgFat*element.quantityShipped;
                        this.shippingHeadersBMCList[index].customAvgSnf += element.avgSnf*element.quantityShipped;  
                        this.shippingHeadersBMCList[index].customSociety += element.quantityShipped;
        
                        this.shippingHeadersBMCList[index].acceptedAvgFat += element.mshippingLines[0].fatAccepted*element.quantityReceived;
                        this.shippingHeadersBMCList[index].acceptedAvgSnf += element.mshippingLines[0].snfAccepted*element.quantityReceived;  
                        this.shippingHeadersBMCList[index].acceptedSociety += element.quantityReceived;
                        //this.shippingHeadersBmcList[index].customAvgFat = (this.shippingHeadersBmcList[index].customAvgFat/this.shippingHeadersBmcList[index].customSociety);
                        //this.shippingHeadersBmcList[index].customAvgSnf = (this.shippingHeadersBmcList[index].customAvgSnf/this.shippingHeadersBmcList[index].customSociety);
                        //console.log(this.shippingHeadersBMCList[index]);
        
                      }
                      }
                    // if(element.bmcRefNo !=null) {
                    //   this.shippingHeadersBMCList.push(element);
                    // }
          })
                  this.shippingHeadersBMCList.forEach((element,i)=> {
            element.overallcustomAvgFat = (this.shippingHeadersBMCList[i].customAvgFat/this.shippingHeadersBMCList[i].customSociety).toFixed(2);
            element.overallcustomAvgSnf = (this.shippingHeadersBMCList[i].customAvgSnf/this.shippingHeadersBMCList[i].customSociety).toFixed(2);
            element.overallAcceptedAvgFat = (this.shippingHeadersBMCList[i].acceptedAvgFat/this.shippingHeadersBMCList[i].acceptedSociety).toFixed(2);
            element.overallAcceptedAvgSnf = (this.shippingHeadersBMCList[i].acceptedAvgSnf/this.shippingHeadersBMCList[i].acceptedSociety).toFixed(2);
            //console.log("original" ,element);
        })
                  this.spinnerService.hide();
        })

               }

        }
      });

  }


  updateData(shipingHeader , k) {


    if (shipingHeader.avgClr != 0 && shipingHeader.avgFat != 0)
      {
        shipingHeader.avgClr = parseFloat((+shipingHeader.avgClr).toFixed(2));
        shipingHeader.avgFat  =parseFloat((+shipingHeader.avgFat).toFixed(2));
        shipingHeader.avgSnf = parseFloat((((shipingHeader.avgClr)/4)+(0.25*shipingHeader.avgFat) + 0.35).toFixed(2));
        // shipingHeader.mshippingLines[k].lineStatusCode ="Updated";

      } else {
        shipingHeader.avgSnf = null;
        //shipingHeader.mshippingLines[k].lineStatusCode = "QC-InProgress";
      }
      //console.log(shipingHeader);
    this.MilkCollectionServices.updateMilkCollection(shipingHeader).subscribe(
        res => {

          this.toastr.success('Updation', 'Updated Sucessfully', {
            timeOut: 2000
          });
        }, error => {
        });
  }

  approveAll() {
    this.shippingHeadersList.forEach((element,i) => {
          element.mshippingLines[0].approvalStatus = "Approved";
          element.mshippingLines[0].lineStatusCode = "Completed"
          element.receiptStatus ="Completed"
          element.approvalStatus = "Approved";
          this.disableSubmit = true;
          this.MilkCollectionServices.getunitPrice(element.mshippingLines[0].itemId,element.mshippingLines[0].shipmentLineId).subscribe(
            res => { 
              if(res['length'] == 0) {
                element.mshippingLines[i].lineStatusCode ="Updated";
                element.mshippingLines[i].approvalStatus = 'Awaiting For Approval';
                this.toastr.error('QC Values Error', `Out of Range Error for ${element.receiptNum}`, {
                  timeOut: 2000
                  });
                this.disableSubmit = false;
                return;
              }
              else {
                element.mshippingLines[0].noticeUnitPrice = res[0]['paymentRate'];
                this.MilkCollectionServices.updateMilkCollection(element).subscribe(
                  res => {
                    if(this.shippingHeadersList.length == i+1){
                    this.toastr.success('Updation', 'Updated Sucessfully', {
                      timeOut: 2000
                    });
                  }
                    this.disableSubmit = true;
                  }, error => {
                  });
              }
            });
    });
   
  }

  redirectTo(path: any) {
    this.router.navigateByUrl(`/${path}`);
  }
}