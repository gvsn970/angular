import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { SharedService } from 'src/app/shared/service/shared.service';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef ,  BsModalService} from 'ngx-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-update-dispatch',
  templateUrl: './update-dispatch.component.html',
  styleUrls: ['./update-dispatch.component.css']
})
export class UpdateDispatchComponent implements OnInit {
  currHour:number;
  receiptNum:number;
  constructor(private fb: FormBuilder , private MilkCollectionService: MilkCollectionService , private SharedService: SharedService , private toastr: ToastrService , private datePipe: DatePipe , private route: ActivatedRoute , private modalService: BsModalService, private spinnerService: Ng4LoadingSpinnerService) { }
  CreateIndentLineItem: FormGroup;
  modalRef: BsModalRef;
  UserData;
  locationData = null;
  routePoints;
  selectedroutePoints;
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
  overallavgFat:any = 0;
  overallavgSnf:any = 0;
  totalQty = 0;
  totalQtyLtr = 0;
  KgFat = 0;
  KgSnf = 0;
  bmcrefno;
  shippingHeaders;
  dispatchlocation;
  compartNumber;
  dipstickreading;
  sealnumber;
  temperature;
  acidity;

  ngOnInit() {
    
    this.bmcrefno = this.route.snapshot.paramMap.get('id');
    ////console.log(this.bmcrefno);

    this.spinnerService.show();
    this.MilkCollectionService.getshippingHeaderwithBmcrefno(this.bmcrefno).subscribe(
      (res:any) =>  {
                  this.shippingHeaders = res.filter((res)=> {
                    return res.receiptStatus !='Cancelled';
                  });;
                  // this.shippingHeaders
                  //
                  this.routePoint = res[0].routeNo;
                  this.compartNumber = res[0].dockNumber;
                  this.dipstickreading = res[0].dipStick;
                  this.sealnumber = res[0].sealNumber;
                  this.temperature = res[0].temperature;
                  this.acidity = res[0].acidity;
                  if(this.routePoint) {
                  //this.routeonChange(this.routePoint);
                  }
                  ////console.log(this.shippingHeaders);
                  for(let i=0; i<  this.shippingHeaders.length; i++){
          
            (this.CreateIndentLineItem.get('newIndtLItem') as FormArray).push(this.initItemRows(this.shippingHeaders[i]));
          //this.Totalweight += this.postData.mshippingLines[i].quantityReceived;
            // for (const totalObj of this.shippingHeaders[i]) {
          
            if (!isNaN(this.shippingHeaders[i].avgClr)) {
              this.avgClr += +this.shippingHeaders[i].avgClr;
            }
            if (!isNaN(this.shippingHeaders[i].quantityShipped)) {
              this.totalQty += +this.shippingHeaders[i].quantityShipped;
              this.totalQtyLtr =  (this.totalQty/1.03);
              this.totalQtyLtr = parseFloat(this.totalQtyLtr.toFixed(2));
            }
            if (!isNaN(this.shippingHeaders[i].avgFat)) {
              this.avgFat += this.shippingHeaders[i].avgFat * this.shippingHeaders[i].quantityShipped;
              this.KgFat+= this.shippingHeaders[i].mshippingLines[0].fatInKg;
            }
            if (!isNaN(this.shippingHeaders[i].avgSnf)) {
              this.avgSnf += +this.shippingHeaders[i].avgSnf * this.shippingHeaders[i].quantityShipped;
              this.KgSnf+= this.shippingHeaders[i].mshippingLines[0].snfInKg;
            }
         // }
            
        }
        this.overallavgFat = +(this.avgFat).toFixed(2);
        this.overallavgSnf = +(this.avgSnf).toFixed(2);
        this.avgClr = +(this.avgClr/this.shippingHeaders.length).toFixed(2);
            this.avgFat = parseFloat((this.avgFat/this.totalQty).toFixed(2));
            this.avgSnf = parseFloat((this.avgSnf/this.totalQty).toFixed(2));
            this.KgFat=parseFloat((this.KgFat).toFixed(2));
            this.KgSnf=parseFloat((this.KgSnf).toFixed(2));
            
        ////console.log(this.CreateIndentLineItem.controls.newIndtLItem);
        this.MilkCollectionService.getalltripbydatevendornum(this.shippingHeaders[0]['creationDate'],this.UserData.vendorNum).subscribe(
          res => {
            this.routePoints = res;
            
            ////console.log(this.routePoints);
            //this.dispatchlocation = this.routePoints[0].endLocation;
            //this.vehicleNumber = this.routePoints[0].vehicleNumber;
            //this.driverName = this.routePoints[0].driverName;
            //this.arrivalTime = this.routePoints[0].actualEndTime;
            if(this.routePoints.length > 0) {
              this.routeonChange(this.routePoints[0].routeNumber);
              }
          }, error => {
          });
     }, error => {
      });
    this.currHour = new Date().getHours();
    this.UserData = JSON.parse(localStorage.getItem('data'));
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([])
    });
    this.MilkCollectionService.getAllLocations().subscribe(
      res => {
        this.locationData = res;
      }, error => {
      });
    // this.MilkCollectionService.getRoutePoint().subscribe(
    //     res => {
    //       if (res && res["length"] > 0) {
    //           this.routePoints = res;
    //           this.routeonChange(this.routePoint);
    //       };
    //     }, error => {
    //     });
    
    for (let index = 0; index < this.formArr.value.length; index++) {
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({locatorId : 163 ,toSubinventory :'Bengalore Dairy',shipFromVendorId: this.UserData.supplierId});
      }

      this.MilkCollectionService.getallsociety().subscribe(
        res => {
          if(res['length'] > 0) {
          this.routeNosocietylogs = res;
          this.spinnerService.hide();
        }
          //this.spinnerService.hide();
        }, error => {
        });
  }

  // const isValidDate = (dateStr) => (/^\d{2}([-])\d{2}\1\d{4}$/).test(dateStr); 
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }

  toDate(dateStr) {
  var parts = dateStr.split("-")
  return new Date(parts[2], parts[1] - 1, parts[0])
}
  initItemRows(data) {
    if(data) {
    return this.fb.group({
      shipmentHeaderId: data.shipmentHeaderId,
      receiptSourceCode: data.receiptSourceCode,
      toSubinventory: data.toSubinventory,
      locatorId: data.locatorId,
      transactionCode: data.transactionCode,
      receiptNum: data.receiptNum,
      vendorNum: data.vendorNum,
      vendorId: data.vendorId,
      vendorSiteId: data.vendorSiteId,
      vendorName : data.vendorName,
      shipFromVendorId: data.shipFromVendorId,
      shippedDate: null,
      shift: data.shift,
      timecard: data.timecard,
      mshippingLines: [{
        shipmentLineId: data.mshippingLines[0].shipmentLineId,
        timecard: data.mshippingLines[0].timecard,
        sampleNum: data.mshippingLines[0].sampleNum,
        lineNum: data.mshippingLines[0].lineNum,
        unitOfMeasure: data.mshippingLines[0].unitOfMeasure,
        itemDescription: data.mshippingLines[0].itemDescription,
        itemId: data.mshippingLines[0].itemId,
        quantityReceived: data.mshippingLines[0].quantityReceived,
        lineStatusCode: data.mshippingLines[0].lineStatusCode,
        itemRevision: data.mshippingLines[0].lineStitemRevisionatusCode,
        reasonId: data.mshippingLines[0].reasonId,
        qcGrade: data.mshippingLines[0].qcGrade,
        clr: data.mshippingLines[0].clr,
        fat: data.mshippingLines[0].fat,
        snf: data.mshippingLines[0].snf,
        noticeUnitPrice: data.mshippingLines[0].noticeUnitPrice,
        approvalStatus: data.mshippingLines[0].approvalStatus,
        transportationAccount: data.mshippingLines[0].transportationAccount,
        shipmentUnitPrice: data.mshippingLines[0].shipmentUnitPrice,
        transferCost: data.mshippingLines[0].transferCost,
        trnsportationCost: data.mshippingLines[0].trnsportationCost,
        excessTransportReason: data.mshippingLines[0].excessTransportReason,
        excessTransportResponsible: data.mshippingLines[0].excessTransportResponsible,
        excessTransportAuthNum: data.mshippingLines[0].excessTransportAuthNum,
        containerNum: data.mshippingLines[0].containerNum,
        truckNum: data.mshippingLines[0].truckNum,
        comments: data.mshippingLines[0].comments,
        lastUpdateDate: data.mshippingLines[0].lastUpdateDate,
        lastUpdateBy: data.mshippingLines[0].lastUpdateBy,
        creationDate: data.mshippingLines[0].creationDate,
        createdBy: data.mshippingLines[0].createdBy,
        lastUpdateLogin: data.mshippingLines[0].lastUpdateLogin,
        poHeaderId: data.mshippingLines[0].poHeaderId,
        poReleaseId: data.mshippingLines[0].poReleaseId,
        poLineId: data.mshippingLines[0].poLineId,
        poLineLocationId: data.mshippingLines[0].poLineLocationId,
        poDistributionId: data.mshippingLines[0].poDistributionId,
        requestId: data.mshippingLines[0].requestId,
        programApplicationId: data.mshippingLines[0].programApplicationId,
        programId: data.mshippingLines[0].programId,
        programUpdateDate: data.mshippingLines[0].programUpdateDate,
        invoiceStatusCode: data.mshippingLines[0].invoiceStatusCode,
        oeOrderHeaderId: data.mshippingLines[0].oeOrderHeaderId,
        oeOrderLineId: data.mshippingLines[0].oeOrderLineId,
        clrAccepted : data.mshippingLines[0].clrAccepted,
        fatAccepted : data.mshippingLines[0].fatAccepted,
        snfAccepted : data.mshippingLines[0].snfAccepted,
        fatInKg : data.mshippingLines[0].fatInKg,
        snfInKg : data.mshippingLines[0].snfInKg ,
        fatInKgAccepted : data.mshippingLines[0].fatInKgAccepted,
        snfInKgAccepted : data.mshippingLines[0].snfInKgAccepted,
    }
       ],
      freightCarrierCode: data.freightCarrierCode,
      numOfContainers: data.numOfContainers,
      routTrxNum: data.routTrxNum,
      receiptStatus: data.receiptStatus,
      freightTerms: data.freightTerms,
      freightBillNumber: data.freightBillNumber,
      grossWeight: data.grossWeight,
      grossWeightUomCode: data.grossWeightUomCode,
      netWeight: data.netWeight,
      netWeightUomCode: data.netWeightUomCode,
      tarWeight: data.tarWeight,
      tarWeightUomCode: data.tarWeightUomCode,
      carrierMethod: data.carrierMethod,
      carrierEqipment: data.carrierEqipment,
      carrierEquipmentNum: data.carrierEquipmentNum,
      carrierEquipmentAlpha: data.carrierEquipmentAlpha,
      specialHandlingCode: data.specialHandlingCode,
      qcGrade: data.qcGrade,
      avgClr: data.avgClr,
      avgFat: data.avgFat,
      avgSnf: data.avgSnf,
      unitPrice: data.unitPrice,
      approvalStatus: data.approvalStatus,
      performancePeriodFrom: data.performancePeriodFrom,
      performancePeriodTo: data.performancePeriodTo,
      requestDate: this.toDate(data.requestDate),
      quantityShipped: data.quantityShipped,
      quantityReceived: data.quantityReceived,
      lastUpdateDate: data.lastUpdateDate,
      lastUpdateBy: this.UserData.userId,
      creationDate: data.creationDate,
      createdBy: data.createdBy,
      lastUpdateLogin: data.lastUpdateLogin,
      comments: data.comments,
      requestId: data.requestId,
      programApplicationId: data.programApplicationId,
      programId: data.programId,
      programUpdateDate: data.programUpdateDate,
      invoiceNum: data.invoiceNum,
      invoiceDate: data.invoiceDate,
      invoiceAmount: data.invoiceAmount,
      freightAmount: data.freightAmount,
      invoiceStatusCode: data.invoiceStatusCode,
      currencyCode: data.currencyCode,
      dockNumber: data.dockNumber,
      bmcRefNo: data.bmcRefNo,
      shipToLocationId: data.shipToLocationId,
      billToLocationId: data.billToLocationId,
      routeNo: data.routeNo,
      paymentTerms: data.paymentTerms,
      fob: data.fob,
      payOn: data.payOn
    });
  }
  else {
    return this.fb.group({
      receiptSourceCode: 'BMC',
      toSubinventory: 'DUMMY',
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
      shipToLocationId: 199,
      billToLocationId: 163,
      routeNo: null,
      paymentTerms: null,
      fob: null,
      payOn: "Receipt"
    });
  }
  }
  addNewRow() {
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows(null));
    ////console.log(this.CreateIndentLineItem.controls.newIndtLItem);
    for (let index = 0; index < this.formArr.value.length; index++) {
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({locatorId : 163 ,toSubinventory :'Bengalore Dairy',shipFromVendorId: this.UserData.supplierId});
  }
  }
  deleteRow(index: number) {
    // if (index >= 1) {
    //   this.formArr.removeAt(index);
    // }
  }

  openModal(template: any, index:number) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index , field): void {
   if(this.formArr.value.length != 1){
    this.formArr.value[index].receiptStatus = "Cancelled";
    if(!Array.isArray( this.formArr.value[index].mshippingLines)) {
      this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
    }
    this.MilkCollectionService.updateMilkCollection(this.formArr.value[index]).subscribe(
      res => {
       ////console.log(res);
       this.toastr.success('Receipt', 'Sucessfully Deleted', {
            timeOut: 1000
          });

          this.formArr.removeAt(index);
          this.avgSnf = 0;
          this.avgClr = 0;
          this.overallavgFat = 0;
          this.overallavgSnf = 0;
          this.avgFat = 0;
          this.totalQty = 0;
          this.totalQtyLtr = 0;
          this.KgFat = 0;
          this.KgSnf = 0;
          for (const totalObj of field) {
            
            if (!isNaN(totalObj.value.avgClr)) {
              this.avgClr += +totalObj.value.avgClr;
            }
            if (!isNaN(totalObj.value.quantityShipped)) {
              this.totalQty += +totalObj.value.quantityShipped;
              this.totalQtyLtr =  (this.totalQty/1.03);
              this.totalQtyLtr = parseFloat(this.totalQtyLtr.toFixed(2));
            }
            if (!isNaN(totalObj.value.avgFat)) {
              this.avgFat += +totalObj.value.avgFat * totalObj.value.quantityShipped;
              this.KgFat+= totalObj.value.mshippingLines.fatInKg;
            }
            if (!isNaN(totalObj.value.avgSnf)) {
              this.avgSnf += +totalObj.value.avgSnf * totalObj.value.quantityShipped;
              this.KgSnf+= totalObj.value.snfInKg;
            }
          }
              this.avgClr = +(this.avgClr/this.CreateIndentLineItem.value.newIndtLItem.length);
              this.avgFat = parseFloat((this.avgFat/this.totalQty).toFixed(2));
              this.avgSnf = parseFloat((this.avgSnf/this.totalQty).toFixed(2));
              this.overallavgFat = +(this.avgFat).toFixed(2);
                this.overallavgSnf = +(this.avgSnf).toFixed(2);
              this.KgFat=parseFloat((this.KgFat).toFixed(2));
              this.KgSnf=parseFloat((this.KgSnf).toFixed(2));
                this.modalRef.hide();
      }, error => {
      });

   }
   else {
    this.modalRef.hide();
    this.toastr.error('Receipt', 'single receipt cannot be Deleted', {
      timeOut: 1000
    });
   }
   

  }

  decline(): void {
    this.modalRef.hide();
  }

  focusOutFunction(field, i) {
      this.avgSnf = 0;
      this.avgClr = 0;
      this.overallavgFat = 0;
      this.overallavgSnf = 0;
      this.avgFat = 0;
      this.totalQty = 0;
      this.totalQtyLtr = 0;
      this.KgFat = 0;
      this.KgSnf = 0;
      //this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.containerNum = this.CreateIndentLineItem.value.newIndtLItem[i].numOfContainers;
      this.CreateIndentLineItem.value.newIndtLItem[i].mshippingLines.quantityReceived = this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped;

      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ quantityReceived: this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped , quantityShipped : this.CreateIndentLineItem.value.newIndtLItem[i].quantityShipped });

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
      this.avgFat += +totalObj.value.avgFat * totalObj.value.quantityShipped;
      this.KgFat+= totalObj.value.mshippingLines.fatInKg;
    }
    if (!isNaN(totalObj.value.avgSnf)) {
      this.avgSnf += +totalObj.value.avgSnf * totalObj.value.quantityShipped;
      this.KgSnf+= totalObj.value.mshippingLines.snfInKg;
    }
  }
      this.avgClr = +(this.avgClr/this.CreateIndentLineItem.value.newIndtLItem.length);
      // this.avgFat = this.avgFat/this.CreateIndentLineItem.value.newIndtLItem.length;
      // this.avgSnf = this.avgSnf/this.CreateIndentLineItem.value.newIndtLItem.length;
      this.overallavgFat = +(this.avgFat).toFixed(2);
        this.overallavgSnf = +(this.avgSnf).toFixed(2);
        this.avgFat = parseFloat((this.avgFat/this.totalQty).toFixed(2));
        this.avgSnf = parseFloat((this.avgSnf/this.totalQty).toFixed(2))
        this.KgFat=parseFloat((this.KgFat).toFixed(2));
        this.KgSnf=parseFloat((this.KgSnf).toFixed(2));

        ////console.log("new item" , this.CreateIndentLineItem.value.newIndtLItem[i] )

  }

  routeonChange(event) {

      this.routePoint = event;
      this.societyNumber = null;
      // //console.log(event);
      this.selectedroutePoints=[];
      this.selectedroutePoints = this.routePoints.filter((obj)=>{
          return obj.routeNumber == event;
      });
      // this.routeNosocietylogs = tempArr;
      this.dispatchlocation = this.selectedroutePoints[0].endLocation;
      this.vehicleNumber = this.selectedroutePoints[0].vehicleNumber;
      this.driverName = this.selectedroutePoints[0].driverName;
      this.arrivalTime = this.selectedroutePoints[0].actualEndTime;
  
      if(this.routePoint == null || this.routePoint ==''){
  
        this.dispatchlocation = null;
        this.vehicleNumber = null;
        this.driverName = null;
        this.arrivalTime = null;
      }

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
    this.MilkCollectionService.getReceiptNum().subscribe(
      res => {
        this.receiptNum = parseInt(res["receiptNum"]) + 1;

        for (let index = 0; index < this.formArr.value.length; index++) {
        if(!(/^\d{2}([-])\d{2}\1\d{4}$/).test(this.formArr.value[index].requestDate)) {
        let today:any = new Date(this.formArr.value[index].requestDate);
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
        this.CreateIndentLineItem.value.newIndtLItem[index].requestDate = today;
        this.formArr.value[index].requestDate = today;
       
        this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('requestDate').setValue(today);
      }
        
      this.formArr.value[index].mshippingLines.clrAccepted = this.formArr.value[index].avgClr;
      this.formArr.value[index].mshippingLines.fatAccepted = this.formArr.value[index].avgFat;
      this.formArr.value[index].mshippingLines.snfAccepted = this.formArr.value[index].avgSnf;
      this.formArr.value[index].mshippingLines.fatInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
      this.formArr.value[index].mshippingLines.snfInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
      this.formArr.value[index].mshippingLines.fatInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
      this.formArr.value[index].mshippingLines.snfInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
        if(this.formArr.value[index].shipmentHeaderId != undefined) {
          if(!Array.isArray( this.formArr.value[index].mshippingLines)) {
            this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
          }
          ////console.log(this.formArr.value[index]);
        this.MilkCollectionService.updateMilkCollection(this.formArr.value[index]).subscribe(
          res => {
           ////console.log(res);
           this.toastr.success('updated', 'Updated Sucessfully', {
                timeOut: 1000
              });
          }, error => {
          });
        }
        else {
          
          this.formArr.value[index].receiptNum = this.receiptNum;
          this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('receiptNum').setValue(this.receiptNum);
          this.receiptNum+1;
          this.formArr.value[index].bmcRefNo = this.bmcrefno;
          if(!Array.isArray( this.formArr.value[index].mshippingLines)) {
            this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
          }
          ////console.log(this.formArr.value[index]);
          this.MilkCollectionService.saveMilkCollection(this.formArr.value[index]).subscribe(
            res => {
             ////console.log(res);
             this.toastr.success('Created', 'Updated Sucessfully', {
                  timeOut: 1000
                });

                this.MilkCollectionService.getshippingHeaderwithBmcrefno(this.bmcrefno).subscribe(
                  (res:any) =>  {
                              this.shippingHeaders = res.filter((res)=> {
                                return res.receiptStatus !='Cancelled';
                              });
                              this.formArr.controls = [];
                            
                              // if(this.routePoint) {
                              // this.routeonChange(this.routePoint);
                              // }
                             
                              for(let i=0; i<  this.shippingHeaders.length; i++){
                      
                        (this.CreateIndentLineItem.get('newIndtLItem') as FormArray).push(this.initItemRows(this.shippingHeaders[i]));
                      //this.Totalweight += this.postData.mshippingLines[i].quantityReceived;
                        // for (const totalObj of this.shippingHeaders[i]) {
                      
                    //     if (!isNaN(this.shippingHeaders[i].avgClr)) {
                    //       this.avgClr += +this.shippingHeaders[i].avgClr;
                    //     }
                    //     if (!isNaN(this.shippingHeaders[i].quantityShipped)) {
                    //       this.totalQty += +this.shippingHeaders[i].quantityShipped;
                    //     }
                    //     if (!isNaN(this.shippingHeaders[i].avgFat)) {
                    //       this.avgFat += this.shippingHeaders[i].avgFat * this.shippingHeaders[i].quantityShipped;
                    //     }
                    //     if (!isNaN(this.shippingHeaders[i].avgSnf)) {
                    //       this.avgSnf += +this.shippingHeaders[i].avgSnf * this.shippingHeaders[i].quantityShipped;
                    //     }
                    //  // }
                        
                    }
                    // this.overallavgFat = +(this.avgFat/this.totalQty).toFixed(2);
                    // this.overallavgSnf = +(this.avgSnf/this.totalQty).toFixed(2);
                    // this.avgClr = +(this.avgClr/this.shippingHeaders.length).toFixed(2);
                    //     this.avgFat = this.avgFat/this.shippingHeaders.length;
                    //     this.avgSnf = this.avgSnf/this.shippingHeaders.length;
                    // //console.log(this.CreateIndentLineItem.controls.newIndtLItem);
                 }, error => {
                  });
            }, error => {
            });

        }
        }
      }, error => {
      });
  }

  dispatch () {
    if(this.routePoint == null) {

      this.toastr.error('Enter Data', 'Please Enter Route Information', {
        timeOut: 1000
      });
      return;
    }
    if(this.compartNumber == null) {
      this.toastr.error('Enter Data', 'Please Enter Compartment Number', {
        timeOut: 1000
      });
      return;
    }
    
    this.MilkCollectionService.getReceiptNum().subscribe(
      res => {
        this.receiptNum = parseInt(res["receiptNum"]) + 1;
        for (let index = 0; index < this.formArr.value.length; index++) { 
          this.formArr.value[index].mshippingLines.clrAccepted = this.formArr.value[index].avgClr;
          this.formArr.value[index].mshippingLines.fatAccepted = this.formArr.value[index].avgFat;
          this.formArr.value[index].mshippingLines.snfAccepted = this.formArr.value[index].avgSnf;
          this.formArr.value[index].mshippingLines.fatInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
          this.formArr.value[index].mshippingLines.snfInKg = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
          this.formArr.value[index].mshippingLines.fatInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgFat)/100
          this.formArr.value[index].mshippingLines.snfInKgAccepted = (this.formArr.value[index].quantityShipped * this.formArr.value[index].avgSnf)/100
          this.formArr.value[index].dockNumber = this.compartNumber;
          this.formArr.value[index].dipStick = this.dipstickreading;
          this.formArr.value[index].sealNumber = this.sealnumber;
          this.formArr.value[index].temperature = this.temperature;
          this.formArr.value[index].acidity = this.acidity;
          this.formArr.value[index].routeNo = this.routePoint;
          //this.formArr.value[index].toSubinventory = this.routePoints[0].endLocation;
          this.formArr.value[index].routTrxNum = this.selectedroutePoints[0].tripTransactionId;
          this.formArr.value[index].receiptStatus = "Dispatched";
          this.formArr.value[index].shipToLocationId = this.selectedroutePoints[0].endLocationId;
          this.formArr.value[index].shippedDate = this.SharedService.getDate();
        
      if(!(/^\d{2}([-])\d{2}\1\d{4}$/).test(this.formArr.value[index].requestDate)) {
        let today:any = new Date(this.formArr.value[index].requestDate);
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
          // this.formArr.value[index].shippedDate = new Date(this.datePipe.transform(this.formArr.value[index].shippedDate,"dd-MM-yyyy"));
        this.CreateIndentLineItem.value.newIndtLItem[index].requestDate = today;
        this.formArr.value[index].requestDate = today;
      }
        

        if(this.formArr.value[index].shipmentHeaderId != undefined) {
          if(!Array.isArray( this.formArr.value[index].mshippingLines)) {
            this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
          }
          //this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
        this.MilkCollectionService.updateMilkCollection(this.formArr.value[index]).subscribe(
          res => {
           ////console.log(res);
           this.toastr.success('updated', 'Updated Sucessfully', {
                timeOut: 1000
              });
          }, error => {
          });
        }
        else {
          this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('receiptNum').setValue(this.receiptNum);
          this.formArr.value[index].receiptNum = this.receiptNum;
          this.receiptNum+1;
          this.formArr.value[index].bmcRefNo = this.bmcrefno;
          if(!Array.isArray( this.formArr.value[index].mshippingLines)) {
            this.formArr.value[index].mshippingLines = [this.formArr.value[index].mshippingLines];
          }
          this.MilkCollectionService.saveMilkCollection(this.formArr.value[index]).subscribe(
            res => {
             ////console.log(res);
             this.toastr.success('Created', 'Created Sucessfully', {
                  timeOut: 1000
                });
            }, error => {
            });

        }
        }
      }, error => {
      });


  for (let i = 0; i < this.selectedroutePoints[0].tripPoints.length; i++) { 
      if(this.selectedroutePoints[0].tripPoints[i].routePointCode == this.UserData.vendorNum) {
        this.selectedroutePoints[0].tripPoints[i].actualQuantity = this.totalQty;
        this.selectedroutePoints[0].tripPoints[i].ebsReferenceNo = this.bmcrefno;
        this.selectedroutePoints[0].tripPoints[i].expectedArrivalTime = this.SharedService.getTime();
        this.selectedroutePoints[0].tripPoints[i].lastUpdateDate = this.SharedService.getDate();
      }
  }

  ////console.log(this.formArr.value);
  ////console.log(this.routePoints);

  this.MilkCollectionService.updateTrip(this.selectedroutePoints[0]).subscribe(
    res => {
      this.toastr.success('Updated', 'Trip Details', {
        timeOut: 1000
      });
     
    }, error => {
    });

    window.print();

}
print() {
  window.print();
}
}
