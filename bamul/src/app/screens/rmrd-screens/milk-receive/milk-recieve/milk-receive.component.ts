import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';

import { SharedService } from 'src/app/shared/service/shared.service';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-milk-receive.',
  templateUrl: './milk-receive.component.html',
  styleUrls: ['./milk-receive.component.css']
})
export class  MilkReceiveComponent implements OnInit , OnDestroy {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 113) {
      this.postCollectionData();
    }
    if(event.keyCode === 114) {
      this.nextCollectionData();
    }
  }
  

  id = 46;
  selectedshift = 'M';
  date = '28-12-2019';
  submitted = false;
  societylogs = [];
  CreateIndentLineItem: FormGroup;
  sampleStartNumber = 1;
  addCollectionForm: FormGroup;
  now: any;
  nowhours: any;
  currHour: number;
  Totalcans = 0;
  Totalweight = 0;
  UserData;
  locationDetails;
  shift;
  recieptCode = 'RMRD DOC 1';
  receiptComments = '';
  supplierDetails = null;
  societyLogs;
  societyNumber = null;
  societyVenNumber = null;
  receiptNum;
  sampleNum;
  supplierInfo;
  routePoints;
  routeNosocietylogs = null;
  routePoint = null;
  sourcecode = 'RMRD DOC 1';
  societyData;
  vehicleNumber = "-";
  driverName = "-";
  arrivalTime = "-";
  weightBowlData;
  societyTripData;
  acceptedCans = 0;
  subinventoryName;
  locatorid;
  index;
  distinctrouteNumber = [];
  bowlInterval;
  items;
  itemsSelected;
  disabledbutton =false;
  locationDetailsCC;
  routeId;
  societyId;
  // items = [{ id: 69007, value: 'COB Milk', selected: 'false' }, { id: 70006, value: 'Curdle milk', selected: 'false' }, { id: 1000, value: 'Rejected Milk', selected: 'false' }, { id: 73006, value: 'Cow Milk', selected: 'false' },{ id: 28006, value: 'Good Raw Milk', selected: 'true' }]
  postData = {
    receiptSourceCode: 'RMRD DOC 1',
    toSubinventory: 'DUMMY',
    locatorId: 99,
    transactionCode: 'MPCS',
    // receiptNum: null,
    vendorNum: null,
    vendorId: null,
    vendorSiteId: null,
    vendorName: null,
    shipFromVendorId: 99,
    shippedDate: 'null',
    shift: this.SharedService.getShift(),
    timecard: '',
    mshippingLines: [
    ],
    freightCarrierCode: 'DUMMY',
    numOfContainers: 0,
    routTrxNum: '99',
    receiptStatus: 'NEW',
    freightTerms: 'DUMMY',
    freightBillNumber: '99',
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
    requestDate: null,
    quantityShipped: 0,
    quantityReceived: 0,
    lastUpdateDate: this.SharedService.getDate(),
    lastUpdateBy: null,
    creationDate: null,
    createdBy: null,
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
    shipToLocationId: null,
    billToLocationId: 163,
    routeNo: null,
    paymentTerms: null,
    fob: null,
    payOn: "Receipt"
  };
  addMoreDisabled: boolean=true; // new changes
  remarkValues;
  result;
  
  // tslint:disable-next-line: no-shadowed-variable
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private MilkCollectionService: MilkCollectionService, private SharedService: SharedService, private toastr: ToastrService, private router: Router , private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.currHour = new Date().getHours();
    this.UserData = JSON.parse(localStorage.getItem('data'));

   
    this.MilkCollectionService.getRemarkValues().subscribe(
      res => {
        this.remarkValues = res;
      }, error => {
      });

    this.MilkCollectionService.getItemsDetails(this.UserData.locationID).subscribe(
      res => {
        this.items = res;
        let tempArr = this.items.filter((obj) => {
          return obj.description == 'RAW MILK';
        });
        this.itemsSelected = tempArr;
        console.log(this.itemsSelected);
         if(this.CreateIndentLineItem) {
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[0].patchValue({ itemDescription: this.itemsSelected ? this.itemsSelected[0].description : '' , itemId: this.itemsSelected ? this.itemsSelected[0].inventoryItemId : '' });
         }
      }, error => {
      });
    this.MilkCollectionService.getlocationDetails(this.UserData.locationID).subscribe(
      res => {
        this.locationDetails = res;
      }, error => {
      });
      this.MilkCollectionService.getLocationDetailsByLocationIdForCC(this.UserData.locationID).subscribe(
        res => {
          this.locationDetailsCC = res;
          this.subinventoryName = this.locationDetailsCC[0].subInventory;
          this.locatorid = this.locationDetailsCC[0].invLocId;
        }, error => {
        });
    this.MilkCollectionService.getSampleNum(this.SharedService.getDate(), this.SharedService.getShift(), this.UserData.locationID, this.sourcecode).subscribe(
      res => {
        if (res && res["length"] > 0) {
          this.sampleNum = parseInt(res[0]["sampleNum"]) + 1;
          this.sampleStartChange(parseInt(res[0]["sampleNum"] + 1));
        } else {
          this.sampleNum = 1;
          this.sampleStartChange(this.sampleNum);
        }
        //console.log(this.sampleNum);
      }, error => {
      });
      let routeType = "PTC";
      let scheduledDate = "06-03-2020";
      let routeStatus = "Arrived";
      let routeShift = "E"
      let endLocation = this.UserData.locationName;
    this.MilkCollectionService.getAllTripsBySchDatertptCode(routeType, this.SharedService.getDate(), routeStatus, this.SharedService.getShift(), endLocation).subscribe(
      res => {
        if (res && res["length"] > 0) {
          this.routePoints = res;
          // .filter((obj) => {
          //   return obj.routeNumber == event;
          // });
          //console.log(this.routePoints);
          this.distinctrouteNumber = [...new Set(this.routePoints.map(i => i.routeNumber))]
          this.activatedRoute.params.subscribe(params => {
            if (params['routeId']) {
              this.routeId = params['routeId'];
              this.routePoint = this.routeId;
              this.routeonChange(this.routeId);
            }
            if (params['societyId']) {
              this.societyId = params['societyId'];
              this.societyNumber = this.societyId;
              this.onChange(this.societyId);
            }
            console.log(this.routeId,this.societyId);
          })
          //console.log(this.distinctrouteNumber);
        }
      }, error => {
      });
    // this.MilkCollectionService.getRoutePoint().subscribe(
    //   res => {
    //     if (res && res["length"] > 0) {
    //       this.routePoints = res;
    //       // .filter((obj) => {
    //       //   return obj.routeNumber == event;
    //       // });
    //       //console.log(this.routePoints);
    //       this.distinctrouteNumber = [...new Set(this.routePoints.map(i => i.routeNumber))]
    //       //console.log(this.distinctrouteNumber);
    //     }
    //   }, error => {
    //   });
    this.bowlInterval = setInterval(() => {
      this.MilkCollectionService.getweightBowlData().subscribe(
        res => {
          if(res >= 0) {
         this.weightBowlData = res;
          } else {
			if (res == -1002) {
				this.toastr.error('RMRD', 'Specific Port Not Available/Responding', {
				timeOut: 1000});
			} else if (res == -1003) {
				this.toastr.error('RMRD', 'No Ports Available', {
				timeOut: 4000});
			}
		  }
        }, error => {
          this.weightBowlData = 0;
          if (this.bowlInterval) {
            clearInterval(this.bowlInterval);
           
          }
          if(error.status ==0 || error.status ==404 ) {  
            this.toastr.error('RMRD', 'Weighing service is not running', {
              timeOut: 4000
            });
          
        }
        if(error.status==406) { 
            this.toastr.error('RMRD', 'Weighing scale not connected', {
              timeOut: 4000
            });
        }
        });
      }, 500);

    // this.MilkCollectionService.RetrieveSocietyLogs(this.id , this.selectedshift , this.date).subscribe(
    //       res => {
    //         this.societyLogs = res;
    //         this.societyLogs[0].socId = 1242;
    //         this.MilkCollectionService.getallsupplierView().subscribe(
    //           resData => {
    //             let tempArr=[];
    //             this.supplierDetails = resData;
    //             for (let i =0; i<this.societyLogs.length; i++){
    //               tempArr = this.supplierDetails.filter((obj)=>{
    //               return obj.vendorId === this.societyLogs[i].socId;
    //           });
    //           }
    //             this.supplierDetails = tempArr;
    //             //console.log(tempArr); 
    //           }, error => {
    //           });
    //       }, error => {
    //       });
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initItemRows()])
    });

    // this.milkproduct(28006 , 1);

    //console.log("shift" , this.SharedService.getShift())
  }

  ngOnDestroy() {
    if (this.bowlInterval) {
      clearInterval(this.bowlInterval);
    }
  }
  routeonChange(event) {
    this.routePoint = event;
    this.societyNumber = null;
    this.societyVenNumber = null;
    //console.log(event);
    let tempArr = [];
    tempArr = this.routePoints.filter((obj) => {
      return obj.routeNumber == event;
    });
    this.routeNosocietylogs = tempArr;
    //console.log("society", this.routeNosocietylogs);
    this.routeNosocietylogs[0].tripPoints.sort((a, b) => b.routePointSequenceNo-a.routePointSequenceNo );
    

    let routeType = "PTC";
    let scheduledDate = "06-03-2020";
    let routeStatus = "Arrived";
    let routeShift = "E"
    let endLocation = this.UserData.locationName;
  this.MilkCollectionService.getAllTripsBySchDatertptCode(routeType, this.SharedService.getDate(), routeStatus, this.SharedService.getShift(), endLocation).subscribe(
    res => {
      if (res && res["length"] > 0) {
    this.societyData = res;
    //console.log(this.societyData);
    this.vehicleNumber = this.societyData[0].vehicleNumber;
    this.driverName = this.societyData[0].driverName;
    this.arrivalTime = this.societyData[0].actualEndTime;
      }
    }, error => {
    });

  }
  checkQuantity(event, field, i, f){ //new changes
    let formArrayLength=this.CreateIndentLineItem.controls.newIndtLItem['controls'].length;
    this.addMoreDisabled=false;
    for(let j=0;j<formArrayLength;j++){
      if(this.CreateIndentLineItem.controls.newIndtLItem['controls'][j].value.quantityReceived==0||this.CreateIndentLineItem.controls.newIndtLItem['controls'][j].value.quantityReceived==null){
        this.addMoreDisabled=true;
      } 
    }
  }

  changeWeightSourceType(event, field, i, f) {
    (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ weightSourceType: event });   
  }
  onChange(event) {
    let tempArr = [];
    //this.societyNumber = event;
    this.MilkCollectionService.getsupplierInfofromvendorNum(event).subscribe(
      res => {
        this.supplierInfo = res;
        this.societyVenNumber = this.supplierInfo.vendorNum;
        tempArr = this.routeNosocietylogs[0].tripPoints.filter((obj) => {
          return obj.routePointCode == event;
        });
        this.societyTripData = tempArr;
        this.acceptedCans = tempArr[0].receivedQty;
        this.index =  this.routeNosocietylogs[0].tripPoints.findIndex((data)=>data.routePointCode == event);
      }, error => {
      });
  }
  isValideDate(estimated, actual) {
    return Date.parse(`01/01/2011 ${estimated}`) < Date.parse(`01/01/2011 ${actual}`)
  }
  milkproduct(event, index) {
    this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('itemDescription').setValue(event.selectedOptions[0].text);
    this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('itemId').setValue(event.value);
    if(event.selectedOptions[0].text =='RAW MILK') {
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('qcGrade').setValue('G');
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: '' });
    }
    if(event.selectedOptions[0].text =='COB MILK') {
      if(this.routeNosocietylogs.length > 0) {
      this.result = this.isValideDate(this.routeNosocietylogs[0].estimatedEndTime, this.routeNosocietylogs[0].actualEndTime);
      if (this.result == true) {
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: 'Contractor Fault' });
      }
      if (this.result == false) {
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: 'Society Fault' });
      }
    }
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('qcGrade').setValue('COB');
    }
    if(event.selectedOptions[0].text =='Curdled Milk') {
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('qcGrade').setValue('CURD');
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: '' });
    }
    if(event.selectedOptions[0].text =='Rejected Milk') {
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('qcGrade').setValue('R');
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: '' });
    }
    if(event.selectedOptions[0].text =='DESI COW MILK BULK') {
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][index].get('qcGrade').setValue('CM');
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ comments: '' });
    }
    //console.log(this.CreateIndentLineItem.controls.newIndtLItem['controls'][index]);
  }
  focusOutFunction(event, field, i, f) {
    if(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived > 500){
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived = 500;
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('quantityReceived').setValue(Math.ceil(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived));
    }
    this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('containerNum').setValue(Math.ceil(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived/40));
    this.Totalcans = 0;
    this.Totalweight = 0;
    for (const totalObj of field) {

      if (!isNaN(totalObj.value.quantityReceived)) {
        this.Totalweight += +totalObj.value.quantityReceived;
      }
      if (!isNaN(totalObj.getRawValue().containerNum)) {
        this.Totalcans += +totalObj.getRawValue().containerNum;
      }
    }
  }
  changesubInventory(event){
this.subinventoryName = event;
  }
  changelocatorId(event){
this.locationDetails = event;
  }
  appendweighBowlData(event, field, i, f){
    (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ quantityReceived: this.weightBowlData });
    (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ containerNum : Math.ceil((this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived/40)) })
    this.Totalcans = 0;
    this.Totalweight = 0;
    for (const totalObj of field) {

      if (!isNaN(totalObj.value.quantityReceived)) {
        this.Totalweight += +totalObj.value.quantityReceived;
      }
      if (!isNaN(totalObj.getRawValue().containerNum)) {
        this.Totalcans += +totalObj.getRawValue().containerNum;
      }
    }
    this.checkQuantity(event, field, i, f);
  }
  focusOutSampleFunction(event, field, i, f) {
    //console.log(i);
    if (!isNaN(field[i].value.sampleNum)) {
      if (field[i].value.sampleNum >= this.sampleNum) {

      } else {
        this.toastr.error('Sample', 'sample Number Already present', {
          timeOut: 4000
        });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ sampleNum: null });
      }
    }
  }
  setrecieptCode(value) {
    this.recieptCode = value;

    this.MilkCollectionService.getSampleNum(this.SharedService.getDate(),this.SharedService.getShift(), this.UserData.locationID, this.recieptCode).subscribe(
      res => {
        if (res && res["length"] > 0) {
          this.sampleNum = parseInt(res[0]["sampleNum"]) + 1;
          this.sampleStartChange(parseInt(res[0]["sampleNum"] + 1));
        } else {
          this.sampleNum = 1;
          this.sampleStartChange(this.sampleNum);
        }
        //console.log(this.sampleNum);
      }, error => {
      });
  }
  doTextareaValueChange(value) {
    this.receiptComments = value;
  }
  shiftData() {
    this.currHour = new Date().getHours();
    if (this.currHour > 14) {
      return this.shift = 'E';
    } else {
      return this.shift = 'M';
    }
  }
  minMax(control: FormControl) {
    return parseInt(control.value) > 0 ? null : {
      minMax: true
    }
  }
  initItemRows() {
    return this.fb.group({
      timecard: this.SharedService.getTime(),
      sampleNum: [parseInt(this.sampleNum) + 1, Validators.required],
      lineNum: 1,
      unitOfMeasure: 'KGS',
      itemDescription: [this.itemsSelected ? this.itemsSelected[0].description : '', Validators.required],
      itemId: [this.itemsSelected ? this.itemsSelected[0].inventoryItemId : '', [Validators.required, Validators.min(1)]],
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
      containerNum: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]],
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
      oeOrderLineId: null,
      clrAccepted: 0.0,
      fatAccepted: 0.0,
      snfAccepted: 0.0,
      weightSourceType : 'Auto'
    });
  }

  formatTime() {
    return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  }
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }
  addNewRow() {
    this.addMoreDisabled=true; //new changes
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
    // console.log(this.formArr.value)
    for (let index = 0; index < this.formArr.value.length; index++) {
      if (index != 0) {
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: parseInt(this.formArr.value[index - 1].sampleNum) + 1 });
      }
    }
    //console.log(this.CreateIndentLineItem.controls.newIndtLItem);
  }
  deleteRow(index: number) {
    if (index >= 1) {
      this.formArr.removeAt(index);
      this.Totalcans = 0;
      this.Totalweight = 0;
      for (const totalObj of this.formArr.value) {
        if (!isNaN(totalObj.containerNum)) {
          this.Totalcans += + totalObj.containerNum;
        }
        if (!isNaN(totalObj.quantityReceived)) {
          this.Totalweight += + totalObj.quantityReceived;
        }
      }
    }
  }
  sampleStartChange(event) {
    this.sampleStartNumber = parseInt(event);
    this.formArr.value[0].sampleNum = 2;
    for (let index = 0; index < this.formArr.value.length; index++) {
      if (index == 0) {
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: event });
      } else {
        this.sampleStartNumber += 1;
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: this.sampleStartNumber });
      }
    }
  }
  nextCollectionData() {
    let tempArr = []
    this.submitted = true;

    if (this.societyVenNumber == null) {
      return;
    }
    if (this.CreateIndentLineItem.invalid) {
      return;
    }
    // this.MilkCollectionService.getReceiptNum().subscribe(
    //   res => {
    //     if(res==null) {
    //       this.receiptNum = "1001"
    //     }
    //     if(res!=null) {
    //     this.receiptNum = parseInt(res["receiptNum"]) + 1;
    //     }
        // this.postData.receiptNum = this.receiptNum;
        this.postData.receiptSourceCode = this.recieptCode;
        this.postData.timecard = this.SharedService.getTime();
        this.postData.mshippingLines = this.formArr.getRawValue();
        this.postData.shift = this.SharedService.getShift();
        this.postData.shippedDate = this.SharedService.getDate();
        this.postData.creationDate = this.SharedService.getDate();
        this.postData.requestDate = this.SharedService.getDate();
        this.postData.createdBy = this.UserData.userId;
        this.postData.lastUpdateBy = this.UserData.userId;
        this.postData.quantityShipped = this.acceptedCans;
        this.postData.quantityReceived = this.Totalcans;
        this.postData.vendorId = this.supplierInfo.vendorId;
        this.postData.vendorNum = this.supplierInfo.vendorNum;
        this.postData.vendorSiteId = this.supplierInfo.vendorSiteId;
        this.postData.vendorName = this.supplierInfo.vendorName;
        this.postData.comments = this.receiptComments;
        this.postData.netWeight = this.Totalweight;
        this.postData.toSubinventory = this.subinventoryName;
        this.postData.locatorId = this.locatorid;
        this.postData.numOfContainers = this.Totalcans;
        // this.postData.receiptNum = this.receiptNum;
        this.postData.freightCarrierCode = this.routePoint;
        this.postData.shipFromVendorId = this.supplierInfo.vendorId;
        this.postData.routTrxNum = this.routeNosocietylogs[0].tripTransactionId;
        this.postData.freightAmount = this.routeNosocietylogs[0].paymentAmount;
        this.postData.shipToLocationId = this.UserData.locationID;
        this.postData.routeNo = this.routePoint;
        this.postData.paymentTerms =  this.supplierInfo.paymentTerms;
        this.postData.billToLocationId = this.supplierInfo.billToLocationId;

        for (let i = 0; i < this.formArr.value.length; i++) {
          this.formArr.value[i].lineNum = i + 1;
        }

        //console.log(this.postData);
        this.MilkCollectionService.saveMilkCollection(this.postData).subscribe(
          res => {
            //console.log(res);
            this.toastr.success('Created', 'Added Sucessfully', {
              timeOut: 1000
            });
            // this.MilkCollectionService.getReceiptNum().subscribe(
            //   res => {
            //     this.receiptNum = parseInt(res["receiptNum"]) + 1;
            //     this.postData.receiptNum = this.receiptNum;
                
            //   }, error => {
            //   });
           
            this.MilkCollectionService.getSampleNum(this.SharedService.getDate(), this.SharedService.getShift(), this.UserData.locationID, this.sourcecode).subscribe(
              res => {
                if (res && res["length"] > 0) {
                  this.sampleNum = parseInt(res[0]["sampleNum"]) + 1;
                  this.sampleStartChange(parseInt(res[0]["sampleNum"] + 1));
                } else {
                  this.sampleNum = 1;
                  this.sampleStartChange(this.sampleNum);
                }
                //console.log(this.sampleNum);
              }, error => {
              });
            this.recieptCode = 'RMRD DOC 1';
            this.receiptComments = '';
            this.formArr.controls = [];
            this.Totalweight = 0;
            this.Totalcans = 0;
            // this.vehicleNumber = "-";
            // this.driverName = "-";
            // this.arrivalTime = "-";
            //this.societyNumber = null;
            //this.routePoint = null;
            if(this.routeNosocietylogs[0].tripPoints.length == this.index + 1) {
              this.routeNosocietylogs[0].tripPoints[0]
              this.societyNumber = this.routeNosocietylogs[0].tripPoints[0].routePointCode;
              this.index =  this.routeNosocietylogs[0].tripPoints.findIndex((data)=>data.routePointCode == this.societyNumber);
            }
            else{
            this.routeNosocietylogs[0].tripPoints[this.index];
            this.societyNumber = this.routeNosocietylogs[0].tripPoints[(this.index + 1)].routePointCode;
            this.index =  this.routeNosocietylogs[0].tripPoints.findIndex((data)=>data.routePointCode == this.societyNumber);
            }
            this.onChange(this.societyNumber);
            tempArr = this.routeNosocietylogs[0].tripPoints.filter((obj) => {
              return obj.routePointCode == this.societyNumber;
            });            
            this.acceptedCans = tempArr[0].receivedQty;
            this.receiptNum = null;
            this.formArr.push(this.initItemRows());
            this.submitted = false;
          }, error => {
            if(error.status == 409) {
              this.toastr.error(error.error.message,'Error' , {
                timeOut: 5000
              });
            }
          });
      // }, error => {
      // });



  }
  postCollectionData() {
    this.submitted = true;
    this.disabledbutton = true;
    //console.log(this.subinventoryName);
        //console.log(this.locatorid);
    if (this.CreateIndentLineItem.invalid) {
      this.disabledbutton = false;
      return;
    }
    if (this.societyVenNumber == null) {
      this.disabledbutton = false;
      return;
    }
    if (this.CreateIndentLineItem.controls.newIndtLItem) {
      this.disabledbutton = false;

    }
    // this.MilkCollectionService.getReceiptNum().subscribe(
    //   res => {
    //     if(res==null) {
    //       this.receiptNum = "1001"
    //     }
    //     if(res!=null) {
    //     this.receiptNum = parseInt(res["receiptNum"]) + 1;
    //     }
        // this.postData.receiptNum = this.receiptNum;
        this.postData.receiptSourceCode = this.recieptCode;
        this.postData.timecard = this.SharedService.getTime();
        this.postData.mshippingLines = this.formArr.getRawValue();
        this.postData.shift = this.SharedService.getShift();
        this.postData.shippedDate = this.SharedService.getDate();
        this.postData.creationDate = this.SharedService.getDate();
        this.postData.requestDate = this.SharedService.getDate();
        this.postData.createdBy = this.UserData.userId;
        this.postData.lastUpdateBy = this.UserData.userId;
        this.postData.quantityShipped = this.acceptedCans;
        this.postData.quantityReceived = this.Totalcans;
        this.postData.vendorId = this.supplierInfo.vendorId;
        this.postData.vendorNum = this.supplierInfo.vendorNum;
        this.postData.vendorName = this.supplierInfo.vendorName;
        this.postData.vendorSiteId = this.supplierInfo.vendorSiteId;
        this.postData.comments = this.receiptComments;
        this.postData.netWeight = this.Totalweight;
        this.postData.toSubinventory = this.subinventoryName;
        this.postData.locatorId = this.locatorid;
        this.postData.numOfContainers = this.Totalcans;
        // this.postData.receiptNum = this.receiptNum;
        this.postData.freightCarrierCode = this.routePoint;
        this.postData.shipFromVendorId = this.supplierInfo.vendorId;
        this.postData.routTrxNum = this.routeNosocietylogs[0].tripTransactionId;
        this.postData.freightAmount = this.routeNosocietylogs[0].paymentAmount;
        this.postData.shipToLocationId = this.UserData.locationID;
        this.postData.routeNo = this.routePoint;
        this.postData.paymentTerms =  this.supplierInfo.paymentTerms;
        this.postData.billToLocationId = this.supplierInfo.billToLocationId;

        for (let i = 0; i < this.postData.mshippingLines.length; i++) {
          this.postData.mshippingLines[i].lineNum = i + 1;
        }
        
        this.MilkCollectionService.saveMilkCollection(this.postData).subscribe(
          res => {
            //console.log(res);
            this.toastr.success('Created', 'Added Sucessfully', {
              timeOut: 1000
            });
            this.router.navigateByUrl(`/rmrd-operator/milk-receive/edit-milk-recieve/${res['shipmentHeaderId']}`);
            //this.router.navigateByUrl(`/rmrd-operator/milk-receive/milk-summary`);
            
          }, error => {
            if(error.status == 409) {
              this.toastr.error(error.error.message,'Error' , {
                timeOut: 5000
              });
            }
          });
        //console.log(this.postData);
      // }, error => {
      // });
  }

 
}
