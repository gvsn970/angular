import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router , ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/service/shared.service';
import { WeighingBridgeService } from 'src/app/shared/service/weighing-bridge.service';


@Component({
  selector: 'app-dairy-milk-detail-sample',
  templateUrl: './dairy-milk-detail-sample.component.html',
  styleUrls: ['./dairy-milk-detail-sample.component.css']
})
export class DairyMilkDetailSampleComponent implements OnInit {
  isCollapsed = -1;
  constructor(private MilkCollectionServices: MilkCollectionService, private router: Router,
              private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastrService, private SharedService: SharedService, private weighingBridgeService: WeighingBridgeService,private activatedRoute: ActivatedRoute ) { }
  shippingHeadersList;
  shippingHeadersBmcList = []
  shippingheaderGroup;
  shippingHeadersBmcListFinal = []
  tripData:any;
  result;
  invDetails;
  FilteredinvDetails= [];
  distincttoSubinventory = [];
  organizationName;
  subInventory;
  invLocCombination;
  locatorid;
  disableSubmit = true;
  SubInvBased =[];
  userData;
  triprouteno;
  locatorsubinvDetail;
  ngOnInit() {
    this.userData =  JSON.parse(localStorage.getItem('data'));
    this.MilkCollectionServices.getlocatorsubinventoryforBMD(this.userData.locationID).subscribe(
      res => {
        this.locatorsubinvDetail = res;
       
      }, error => {
      });
    var scheduledDate = this.SharedService.getDate();
    let routeStatus = 'Arrived';
    var routeShift = this.SharedService.getShift();
    const endLocation = this.userData.locationName;
    var routeType = 'BMC';
    // var vendorNum = userData.vendorNum;
    // var vendorNum = '200010';
    const locationId = 706;

    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.triprouteno = params['id'];
      }
    });

    this.spinnerService.show();
    this.weighingBridgeService.getAllTripsBySchDatertptCode(routeType, scheduledDate, routeStatus, routeShift, endLocation).subscribe(
      res => {
        if (res != null) {
          this.tripData = res;
          let tempArr = this.tripData.filter((obj) => {
            return obj.routeNumber == this.triprouteno;
          });
          this.tripData = tempArr;

          console.log(this.tripData)

          

          this.MilkCollectionServices.getsubinventoryDetails(this.tripData[0].endLocationId).subscribe(
           ( res : any )=> {
              if (res != null) {
                this.invDetails  = res.filter((res , i)=> {
                  return res !=null;
                });
                this.organizationName = this.invDetails[0].organizationName;
                if(this.shippingHeadersList[0].locatorId != 163 && this.shippingHeadersList[0].toSubinventory != 'Bengalore Dairy') {
                  this.subInventory = this.shippingHeadersList[0].toSubinventory;
                  this.organizationName = this.invDetails[0].organizationName;
                  this.invLocCombination = null;
                  this.changeSubInv(this.subInventory);
                  this.locatorid = this.invDetails.filter((v, i)=> {
                    return ( v['subInventory'] == this.subInventory && v['invLocId'] == this.shippingHeadersList[0].locatorId);
                  });
                  if(this.locatorid.length !=0){
                  this.invLocCombination = this.locatorid[0].invLocCombination;
                  }
                  this.disableSubmit = false;
                }
                this.distincttoSubinventory = [...new Set(this.invDetails.map(i => i.subInventory))]
               
                
                // for (let index = 0; index < this.invDetails.length; index++) {
                //   if (this.invDetails[index] != null) {
                //     this.FilteredinvDetails.push(this.invDetails[index]);

                //   }
                // }

              }
            });

          this.spinnerService.hide();
        }
      });

    this.MilkCollectionServices.getDairyQcList(this.triprouteno, this.userData.locationID, this.SharedService.getDate()).subscribe(
      res => {
        // let result;
        this.shippingHeadersList = res;
        

        
        // this.shippingHeadersList.forEach((element,i) => {
        //     result = this.shippingHeadersBmcList.find((data)=>data.bmcRefNo == element.bmcRefNo);
        //     if(element.bmcRefNo !=null) {
        //       if(result==undefined) {
        //       element.customAvgFat = element.avgFat*element.netWeight;
        //       element.customAvgSnf= element.avgSnf*element.netWeight
        //       this.shippingHeadersBmcList.push(element);
        //       }
        //       else {
        //         let index = this.shippingHeadersBmcList.findIndex((data)=>data.bmcRefNo == element.bmcRefNo);

        //         this.shippingHeadersBmcList[index].netWeight+=element.netWeight;
        //         this.shippingHeadersBmcList[index].customAvgFat += element.avgFat*element.netWeight;
        //         this.shippingHeadersBmcList[index].customAvgSnf += element.avgSnf*element.netWeight;
        //       }
        //     }
        //   })

        //   this.shippingHeadersBmcList.forEach((element,i) => {
        //     element.overallcustomAvgFat = (this.shippingHeadersBmcList[i].customAvgFat/this.shippingHeadersBmcList[i].netWeight).toFixed(2);
        //     element.overallcustomAvgSnf = (this.shippingHeadersBmcList[i].customAvgSnf/this.shippingHeadersBmcList[i].netWeight).toFixed(2);
        //   });

        //   this.shippingHeadersBmcListFinal = this.shippingHeadersBmcList;
        //   //console.log(this.shippingHeadersBmcList[0].netWeight)

        const groupBy = (items, key) => items.reduce(
          (result, item) => ({
            ...result,
            [item[key]]: [
              ...(result[item[key]] || []),
              item,
            ],
          }),
          {},
        );

        this.shippingheaderGroup = groupBy(this.shippingHeadersList, 'bmcRefNo');

        this.groupingfunction();



        this.spinnerService.hide();
      });
  }

  groupingfunction() {
    const okeys = Object.keys(this.shippingheaderGroup);

    this.result = {};
    let tarWeight = 0;
    let grossweight = 0;
    let netweight = 0;
    let totalreceivedweight = 0;
    let totalshippedweight = 0;
    let diffweight = 0;
    okeys.forEach(k => {
      let netWeight = 0;
      let customAvgFat = 0;
      let customAvgSnf = 0;
      let acceptedAvgFat = 0;
      let acceptedAvgSnf = 0;
      let compartmentNumber;
      let dipstickReading;
      let sealNumber;
      let bmcname;
      let shippedQty = 0;


      this.shippingheaderGroup[k].forEach(item => {
        netWeight += item.quantityReceived;
        shippedQty += item.quantityShipped;
        customAvgFat += item.avgFat * item.quantityShipped;
        customAvgSnf += item.avgSnf * item.quantityShipped;
        acceptedAvgFat += item.mshippingLines[0].fatAccepted * item.quantityReceived;
        acceptedAvgSnf += item.mshippingLines[0].snfAccepted * item.quantityReceived;
        tarWeight = item.tarWeight;
        grossweight = item.grossWeight;
        this.subInventory = item.toSubinventory;
        //this.locatorid = this.FilteredinvDetails.filter((v, i)=> {
          //return ( v['subInventory'] == this.subInventory && v['invLocId'] == item.locatorId);
        //});
        //this.invLocCombination = this.locatorid[0].invLocCombination;
        compartmentNumber = item.dockNumber;
        dipstickReading = item.dipStick;
        sealNumber = item.sealNumber;

        netweight = item.netWeight;
        totalreceivedweight += item.quantityReceived;
        totalshippedweight+= item.quantityShipped;
        diffweight = +(netweight - totalreceivedweight)
        this.MilkCollectionServices.getsupplierInfo(item.shipFromVendorId).subscribe(
          res => {
            if (res != null) {
              bmcname = res['vendorName'];
              this.result[k] = {};
              this.result[k].overallcustomAvgFat = (customAvgFat / shippedQty).toFixed(1);
              this.result[k].overallcustomAvgSnf = (customAvgSnf / shippedQty).toFixed(2);
              this.result[k].overallAcceptedAvgFat = (acceptedAvgFat / netWeight).toFixed(1);
              this.result[k].overallAcceptedAvgSnf = (acceptedAvgSnf / netWeight).toFixed(2);
              this.result[k].TotalNetWeight = netWeight;
              this.result.tarweight = tarWeight;
              this.result[k].compartmentNumber = compartmentNumber;
              this.result[k].dipstickReading = dipstickReading;
              this.result[k].sealNumber = sealNumber;
              this.result[k].bmcName = bmcname;
              this.result.netweight = netweight;
              this.result.grossweight = grossweight;
              this.result.totalreceivedweight = totalreceivedweight;
              this.result.totalshippedweight = totalshippedweight;
              this.result.diffweight = netweight - totalreceivedweight;
              this.result[k].shippedQty= shippedQty;
            }
          });
      });

    });

    ////console.log('result pp', this.result);
  }
  changeSubInv(event) {
    if(this.organizationName && this.subInventory){
    this.SubInvBased = this.invDetails.filter((v, i)=> {
      return (v["organizationName"] == this.organizationName  && v['subInventory'] == this.subInventory);
    })
    }
    else {
      this.SubInvBased = [];
    }
  }

  changeInvDetail(event) {
    if(this.organizationName && this.subInventory && this.invLocCombination ) {
      this.locatorid = this.invDetails.filter((v, i)=> {
        return (v["organizationName"] == this.organizationName  && v['subInventory'] == this.subInventory && v['invLocCombination'] == this.invLocCombination);
      })
    ////console.log(this.locatorid);
      this.disableSubmit = false;
    }
    else {
      this.disableSubmit = true;
    }
  }

  updateData(shipingHeader , k) {
    if (shipingHeader.mshippingLines[0].clrAccepted != 0 && shipingHeader.mshippingLines[0].fatAccepted != 0)
      {
        shipingHeader.mshippingLines[0].clrAccepted = parseFloat((+shipingHeader.mshippingLines[0].clrAccepted).toFixed(2));
        //shipingHeader.mshippingLines[0].clr =  parseFloat((+shipingHeader.avgClr).toFixed(2));
        
        shipingHeader.mshippingLines[0].fatAccepted  =parseFloat((+shipingHeader.mshippingLines[0].fatAccepted).toFixed(1));
        // shipingHeader.mshippingLines[0].fat = parseFloat((+shipingHeader.avgFat).toFixed(1));
        //shipingHeader.mshippingLines[0].snfAccepted = parseFloat((((shipingHeader.avgClr)/4)+(0.25*shipingHeader.avgFat) + 0.35).toFixed(2));
        // shipingHeader.mshippingLines[k].lineStatusCode ="Updated";
        shipingHeader.mshippingLines[0].snfAccepted = parseFloat((((shipingHeader.mshippingLines[0].clrAccepted)/4)+(0.25*shipingHeader.mshippingLines[0].fatAccepted) + 0.35).toFixed(2));

      } else {
        shipingHeader.avgSnf = null;
        //shipingHeader.mshippingLines[k].lineStatusCode = "QC-InProgress";
      }
    ////console.log(shipingHeader);
    this.groupingfunction();

    this.MilkCollectionServices.updateMilkCollection(shipingHeader).subscribe(
      res => {
        this.toastr.success('Updation', 'Updated Sucessfully', {
          timeOut: 2000
        });
      }, error => {
      });
  }
  submit() {
    const okeys = Object.keys(this.shippingheaderGroup);
    okeys.forEach(k => {
    this.shippingheaderGroup[k].forEach(item => {
        item.locatorId = this.locatorsubinvDetail[0].invLocId;
        item.toSubinventory = this.locatorsubinvDetail[0].subInventory;
        this.MilkCollectionServices.updateMilkCollection(item).subscribe(
          res => {
            
          }, error => {
          });
    });
    this.toastr.success('Updation', 'Updated Sucessfully', {
      timeOut: 2000
    });
  });

  this.router.navigateByUrl(`/dairy-lab/lab/dairy-sample`);
  }
  updatembrt(value , arr) {
    arr.forEach((item , i) => {
    item.mbrt = value;
      this.MilkCollectionServices.updateMilkCollection(item).subscribe(
        res => {
      if(arr.length -1 == i) {
          this.toastr.success('Updation', 'Mbrt Updated Sucessfully', {
            timeOut: 2000
          })
        }
        }, error => {
        });
  });
  }
}
