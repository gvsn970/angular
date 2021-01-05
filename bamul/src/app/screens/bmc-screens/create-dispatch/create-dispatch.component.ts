import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-dispatch',
  templateUrl: './create-dispatch.component.html',
  styleUrls: ['./create-dispatch.component.css']
})
export class CreateDispatchComponent implements OnInit {
  currHour:number;
  receiptNum:number;
  constructor(private fb: FormBuilder , private MilkCollectionService: MilkCollectionService , private SharedService: SharedService , private toastr: ToastrService , private datePipe: DatePipe , private spinnerService: Ng4LoadingSpinnerService , private router: Router) { }
  CreateIndentLineItem: FormGroup;
  UserData;
  locationData = null;
  routePoints;
  routeNosocietylogs=null;
  routePoint=null;
  societyData;
  societyNumber=null;
  vehicleNumber ="-";
  driverName = "-";
  arrivalTime ="-";
  supplierInfo;
  avgSnf = 0;
  avgClr = 0;
  avgFat = 0;
  totalQty = 0;
  totalQtyLtr = 0;
  overallavgFat = 0;
  overallavgSnf = 0;
  compartNumber;
  BmcMaxRefNo;
  dispatchlocation;
  dipstickreading;
  sealnumber;
  temperature;
  acidity;
  KgFat;
  KgSnf;

  ngOnInit() {
    this.spinnerService.show();
    this.currHour = new Date().getHours();
    this.UserData = JSON.parse(localStorage.getItem('data'));
    
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initItemRows()])
    });
    this.MilkCollectionService.getAllLocations().subscribe(
      res => {
        this.locationData = res;
      }, error => {
      });

      // this.MilkCollectionService.getRoutePointData("128", "06-03-2020", this.UserData.locationName, "E").subscribe(
      //   res => {
      //     this.societyData = res;
      //     //console.log(this.societyData);
      //     this.vehicleNumber = this.societyData[0].vehicleNumber;
      //     this.driverName = this.societyData[0].driverName;
      //     this.arrivalTime = this.societyData[0].actualEndTime;
      //   }, error => {
      //   });
      
    // this.MilkCollectionService.getRoutePoint().subscribe(
    //     res => {
         
    //       if (res && res["length"] > 0) {
    //         let tempArr;
    //           this.routePoints = res;
    //           tempArr = res;
    //           tempArr = this.routePoints.filter((obj)=>{
    //             return obj.routeNumber == event;
    //         });
    //       };
    //     }, error => {
    //     });
    for (let index = 0; index < this.formArr.value.length; index++) {
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({locatorId : null ,toSubinventory :null,shipFromVendorId: this.UserData.supplierId});
      }

      this.MilkCollectionService.getallsociety().subscribe(
        res => {
          this.routeNosocietylogs = res;
          this.spinnerService.hide();
        }, error => {
        });

        this.MilkCollectionService.getalltripbydatevendornum(this.SharedService.getDate(),this.UserData.vendorNum).subscribe(
          res => {
            this.routePoints = res;
            if(this.routePoints.length > 0) {
              this.routeonChange(this.routePoints[0].routeNumber);
            }
            ////console.log(this.routePoints);
          }, error => {
          });
  
        
  }
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }
  initItemRows() {
    return this.fb.group({
      receiptSourceCode: 'BMC',
      toSubinventory: null,
      locatorId: 99,
      transactionCode: 'BMC',
      receiptNum: null,
      vendorNum: null,
      vendorId: null,
      vendorSiteId: null,
      vendorName : null,
      shipFromVendorId: 99,
      shippedDate: null,
      shift: 'M',
      timecard: this.SharedService.getTime(),
      mshippingLines: [{
        timecard: this.SharedService.getTime(),
        sampleNum: 1,
        lineNum: 1,
        unitOfMeasure: 'KGS',
        itemDescription: 'RAW MILK',
        itemId: 11017,
        quantityReceived: 0,
        lineStatusCode: 'QC-Awaiting',
        itemRevision: 0,
        reasonId: null,
        qcGrade: null,
        clr: 0.0,
        fat: 0.0,
        snf: 0.0,
        noticeUnitPrice: null,
        approvalStatus: 'Awaiting For Approval',
        transportationAccount: null,
        shipmentUnitPrice: null,
        transferCost: null,
        trnsportationCost: null,
        excessTransportReason: null,
        excessTransportResponsible: null,
        excessTransportAuthNum: null,
        containerNum: 0,
        truckNum: null,
        comments: null,
        lastUpdateDate: this.SharedService.getDate(),
        lastUpdateBy: this.UserData.userId,
        creationDate: this.SharedService.getDate(),
        createdBy: this.UserData.userId,
        lastUpdateLogin: null,
        poHeaderId: null,
        poReleaseId: null,
        poLineId: null,
        poLineLocationId: null,
        poDistributionId: null,
        requestId: null,
        programApplicationId: null,
        programId: null,
        programUpdateDate: null,
        invoiceStatusCode: null,
        oeOrderHeaderId: null,
        oeOrderLineId: null
    }
       ],
      freightCarrierCode: null,
      numOfContainers: 0,
      routTrxNum: null,
      receiptStatus: 'NEW',
      freightTerms: null,
      freightBillNumber: null,
      grossWeight: 0.0,
      grossWeightUomCode: null,
      netWeight: 0.0,
      netWeightUomCode: 'KGS',
      tarWeight: 0.0,
      tarWeightUomCode: null,
      carrierMethod: null,
      carrierEqipment: null,
      carrierEquipmentNum: null,
      carrierEquipmentAlpha: null,
      specialHandlingCode: null,
      qcGrade: null,
      avgClr: 0.0,
      avgFat: 0.0,
      avgSnf: 0.0,
      unitPrice: 0.0,
      approvalStatus: 'Awaiting For Approval',
      performancePeriodFrom: null,
      performancePeriodTo: null,
      requestDate: new Date(),
      quantityShipped: 0,
      quantityReceived: 0,
      lastUpdateDate: this.SharedService.getDate(),
      lastUpdateBy: this.UserData.userId,
      creationDate: this.SharedService.getDate(),
      createdBy: this.UserData.userId,
      lastUpdateLogin: null,
      comments: null,
      requestId: null,
      programApplicationId: null,
      programId: null,
      programUpdateDate: null,
      invoiceNum: null,
      invoiceDate: null,
      invoiceAmount: null,
      freightAmount: null,
      invoiceStatusCode: null,
      currencyCode: 'INR',
      dockNumber: null,
      bmcRefNo: null,
      shipToLocationId: null,
      billToLocationId: 163,
      routeNo: null,
      paymentTerms: null,
      fob: null,
      payOn: "Receipt"
    });
  }
  addNewRow() {
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
    ////console.log(this.CreateIndentLineItem.controls.newIndtLItem);
    for (let index = 0; index < this.formArr.value.length; index++) {
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({locatorId : null ,toSubinventory : null,shipFromVendorId: this.UserData.supplierId});
  }
  }
  deleteRow(index: number) {
    if (index >= 1) {
      this.formArr.removeAt(index);
    }
  }

  focusOutFunction(field, i) {
      this.avgSnf = 0;
      this.avgClr = 0;
      this.avgFat = 0;
      this.totalQty = 0;
      this.totalQtyLtr = 0;
      this.KgFat = 0;
      this.KgSnf = 0;
      this.overallavgFat = 0;
      this.overallavgSnf = 0;
     
      //this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.containerNum = this.CreateIndentLineItem.value.newIndtLItem[i].numOfContainers;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.quantityReceived = this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped;

      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ quantityReceived: this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped , quantityShipped : this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped });
 
      
      // var converteddate = this.datePipe.transform(this.CreateIndentLineItem.value.newIndtLItem[i].shippedDate,"dd-MM-yyyy");
      // this.CreateIndentLineItem.value.newIndtLItem[i].shippedDate = converteddate;
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('avgClr').setValue(parseFloat(this.CreateIndentLineItem.value.newIndtLItem[i].avgClr).toFixed(2));
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('avgFat').setValue(parseFloat(this.CreateIndentLineItem.value.newIndtLItem[i].avgFat).toFixed(1));
      if (this.CreateIndentLineItem.value.newIndtLItem[i].avgClr != 0 && this.CreateIndentLineItem.value.newIndtLItem[i].avgFat != 0)
    {
      this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf = (((this.CreateIndentLineItem.value.newIndtLItem[i].avgClr)/4)+(0.25*this.CreateIndentLineItem.value.newIndtLItem[i].avgFat)+0.35).toFixed(2);
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('avgSnf').setValue(this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf);
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.snf = this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.clr = this.CreateIndentLineItem.value.newIndtLItem[i].avgClr;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.fat = this.CreateIndentLineItem.value.newIndtLItem[i].avgFat;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.clrAccepted = this.CreateIndentLineItem.value.newIndtLItem[i].avgClr;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.fatAccepted = this.CreateIndentLineItem.value.newIndtLItem[i].avgFat;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.snfAccepted = this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.fatInKg = (this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped * this.CreateIndentLineItem.value.newIndtLItem[i].avgFat)/100
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.snfInKg = (this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped * this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf)/100
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.fatInKgAccepted = (this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped * this.CreateIndentLineItem.value.newIndtLItem[i].avgFat)/100
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.snfInKgAccepted = (this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped * this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf)/100
      this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped = this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped;
      this.CreateIndentLineItem.value.newIndtLItem[i].quantityReceived = this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped;

 
      
      // totalObj.value.mshippingLines.lineStatusCode ="Updated";
    } else {
      this.CreateIndentLineItem.value.newIndtLItem[i].avgSnf = null;
      // totalObj.value.mshippingLines.lineStatusCode = "QC-InProgress";
    }
      for (const totalObj of field) {
    ////console.log(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i]);
    if (!isNaN(totalObj.value.avgClr)) {
      this.avgClr += +totalObj.value.avgClr;
    }
    if (!isNaN(totalObj.value.quantityShipped)) {
      this.totalQty += +totalObj.value.quantityShipped;
      this.totalQtyLtr =  (this.totalQty/1.03);
      this.totalQtyLtr = parseFloat(this.totalQtyLtr.toFixed(2));
      
    }
    if (!isNaN(totalObj.value.avgFat)) {
      this.avgFat += +totalObj.value.avgFat * totalObj.value.quantityShipped  ;
      this.KgFat+= totalObj.value.mshippingLines.fatInKg;
    }
    if (!isNaN(totalObj.value.avgSnf)) {
      this.avgSnf += +totalObj.value.avgSnf * totalObj.value.quantityShipped;
      this.KgSnf+= totalObj.value.mshippingLines.snfInKg;
    }
  }
      this.avgClr = +(this.avgClr/this.CreateIndentLineItem.value.newIndtLItem.length);
      //this.avgFat = this.avgFat/this.CreateIndentLineItem.value.newIndtLItem.length;
      //this.avgSnf = this.avgSnf/this.CreateIndentLineItem.value.newIndtLItem.length;
      this.overallavgFat = +(this.avgFat).toFixed(2);
        this.overallavgSnf = +(this.avgSnf).toFixed(2);

        this.avgFat = parseFloat((this.avgFat/this.totalQty).toFixed(2));
        this.avgSnf = parseFloat((this.avgSnf/this.totalQty).toFixed(2));
        this.KgFat=parseFloat((this.KgFat).toFixed(2));
        this.KgSnf=parseFloat((this.KgSnf).toFixed(2));

        //console.log("new item" , this.CreateIndentLineItem.value.newIndtLItem[i])

  }

  routeonChange(event) {
    this.routePoint = event;
    this.societyNumber = null;

    //console.log(event);
    let tempArr=[];
    tempArr = this.routePoints.filter((obj)=>{
        return obj.routeNumber == event;
    });
    // this.routeNosocietylogs = tempArr;
    this.dispatchlocation = tempArr[0].endLocation;
    this.vehicleNumber = tempArr[0].vehicleNumber;
    this.driverName = tempArr[0].driverName;
    this.arrivalTime = tempArr[0].actualEndTime;

    if(this.routePoint == null || this.routePoint ==''){
      this.dispatchlocation = null;
      this.vehicleNumber = null;
      this.driverName = null;
      this.arrivalTime = null;
    }

 
    // this.MilkCollectionService.getRoutePointData(event,"17-03-2020","Bengalore Dairy","E").subscribe(
    //     res => {
    //      this.societyData = res; 
    //      //console.log(this.societyData);
    //      this.vehicleNumber = this.societyData[0].vehicleNumber;
    //      this.driverName = this.societyData[0].driverName;
    //      this.arrivalTime = this.societyData[0].actualEndTime;
    //     }, error => {
    //     });

    for (let index = 0; index < this.formArr.value.length; index++) {
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ freightCarrierCode: this.routePoint});
        } 
  }

  onChange(event,field,index) {
    this.MilkCollectionService.getsupplierInfo(event).subscribe(
      res => {
                this.supplierInfo = res;
                ////console.log(this.supplierInfo);
                this.societyNumber = this.supplierInfo.vendorNum;
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('vendorNum').setValue(this.societyNumber);
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('vendorId').setValue(this.supplierInfo.vendorId);
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('vendorSiteId').setValue(this.supplierInfo.vendorSiteId);
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('vendorName').setValue(this.supplierInfo.vendorName);
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('paymentTerms').setValue(this.supplierInfo.paymentTerms);
                this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('payOn').setValue(this.supplierInfo.payOn);
              
      }, error => {
      });
  }
  saveCollection() {
    this.MilkCollectionService.getBmcMaxref().subscribe(
      res => {
        if(res['length'] == 0) {
          this.BmcMaxRefNo =  "BMC-1001"
        }
        else {
          let tempValue = res[0].bmcRefNo;
          tempValue = tempValue.substring(4);
          ////console.log(tempValue);
          tempValue = +parseInt(tempValue)+1
          this.BmcMaxRefNo = `BMC-${tempValue}`;
        }

       
        //this.BmcMaxRefNo = res;
        this.MilkCollectionService.getReceiptNum().subscribe(
          res => {
            // this.receiptNum = parseInt(res["receiptNum"]) + 1;
            this.receiptNum = parseInt(res["receiptNum"]);
            for (let index = 0; index < this.formArr.value.length; index++) {
              this.receiptNum++;
              let today:any = this.formArr.value[index].requestDate;
              let dd: any = today.getDate();
              let mm: any = today.getMonth() + 1; //January is 0!
              const yyyy = today.getFullYear();
              if (dd < 10) {
              dd = '0' + dd;
            }
              if (mm < 10) {
              mm = '0' + mm;
            }
              today = dd + '-' + mm + '-' + yyyy;
              this.formArr.value[index].requestDate = today;
              this.formArr.value[index].mshippingLines.clrAccepted = this.formArr.value[index].avgClr;
              this.formArr.value[index].mshippingLines.fatAccepted = this.formArr.value[index].avgFat;
              this.formArr.value[index].mshippingLines.snfAccepted = this.formArr.value[index].avgSnf;
              this.formArr.value[index].mshippingLines.fatInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
              this.formArr.value[index].mshippingLines.snfInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
              this.formArr.value[index].mshippingLines.fatInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
              this.formArr.value[index].mshippingLines.snfInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
              this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('requestDate').setValue(today);
              this.formArr.value[index].receiptNum = this.receiptNum;
              this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('receiptNum').setValue(this.receiptNum);
              this.formArr.value[index].bmcRefNo = this.BmcMaxRefNo;
              this.formArr.value[index].dockNumber = this.compartNumber;
              this.formArr.value[index].dipStick = this.dipstickreading;
              this.formArr.value[index].sealNumber = this.sealnumber;
              this.formArr.value[index].temperature = this.temperature;
              this.formArr.value[index].acidity = this.acidity;
              this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
              ////console.log(index ,    this.formArr.value[index]);
              this.MilkCollectionService.saveMilkCollection(this.formArr.value[index]).subscribe(
              res => {
               ////console.log(res);
               this.toastr.success('Created', 'Added Sucessfully', {
                    timeOut: 1000
                  });
                  if((this.formArr.value.length-1) == index) {
                    this.router.navigateByUrl(`/bmc-operator/milk-receive/update-dispatch/${this.BmcMaxRefNo}`);
                  }
              }, error => {
              });
            }
           
          }, error => {
          });
      }, error => {
      });
  }
  dispatch() {
    for (let index = 0; index < this.formArr.value.length; index++) { 
      
    }
  }
}
