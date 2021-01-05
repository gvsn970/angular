import { Component, OnInit , OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';

import { SharedService } from 'src/app/shared/service/shared.service';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-edit-milk-receive',
  templateUrl: './edit-milk-receive.component.html',
  styleUrls: ['./edit-milk-receive.component.css']
})
export class EditMilkReceiveComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 113) {
      this.postCollectionData();
    }
    if(event.keyCode === 115) {
      this.nextCollectionData();
    }
  }
  id=46;
  selectedshift='M';
  date='28-12-2019';
  submitted = false;
  CreateIndentLineItem: FormGroup;
  sampleStartNumber = 1;
  now: any;
  nowhours: any;
  currHour: number;
  Totalcans = 0;
  Totalweight = 0;
  UserData;
  locationDetails;
  shift;
  recieptCode;
  receiptComments;
  supplierDetails;
  societyLogs;
  societyNumber;
  shippingId;
  postData;
  receiptNum;
  sampleNum;
  routePoints;
  routePoint=null;
  routeNosocietylogs=null;
  sourcecode="RMRD DOC 1";
  societyData;
  vehicleNumber ="-";
  driverName = "-";
  arrivalTime ="-";
  weightBowlData;
  societyTripData;
  acceptedCans = 0;
  subinventoryName;
  locatorid;
  distinctrouteNumber;
  bowlInterval;
  nextsampleNum;
  items;
  itemsSelected;
  addMoreDisabled: boolean=false; // new changes
  remarkValues;
  result;
  
 // items = [{ id: 69007, value: 'COB Milk', selected: 'false' }, { id: 70006, value: 'Curdle milk', selected: 'false' }, { id: 1000, value: 'Rejected Milk', selected: 'false' }, { id: 73006, value: 'Cow Milk', selected: 'false' },{ id: 28006, value: 'Good Raw Milk', selected: 'true' }]
// tslint:disable-next-line: no-shadowed-variable
// tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder , private MilkCollectionService: MilkCollectionService , private SharedService: SharedService,private route: ActivatedRoute , private spinnerService: Ng4LoadingSpinnerService ,private toastr: ToastrService , private router: Router) {
  }
  ngOnInit() {
    
    this.spinnerService.show();
    this.shippingId = this.route.snapshot.paramMap.get('id');
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
      }, error => {
      });
    this.MilkCollectionService.getlocationDetails(this.UserData.locationID).subscribe(
      res => {
        this.locationDetails = res;
        //console.log(this.locationDetails);
      }, error => {
      });
    this.MilkCollectionService.RetrieveSocietyLogs(this.id , this.selectedshift , this.date).subscribe(
          res => {
            this.societyLogs = res;
            //this.societyLogs[0].socId = 1242;
            this.MilkCollectionService.getallsupplierView().subscribe(
              resData => {
                let tempArr=[];
                this.supplierDetails = resData;
                for (let i =0; i<this.societyLogs.length; i++){
                  tempArr = this.supplierDetails.filter((obj)=>{
                  return obj.vendorId === this.societyLogs[i].socId;
              });
              }
                this.supplierDetails = tempArr;
                this.spinnerService.hide();
                //console.log(tempArr); 
              }, error => {
              });
          }, error => {
          });
    this.MilkCollectionService.getshippingHeaderswithshipmentHeaderid(this.shippingId).subscribe(
            resData => {

              let routeType = "PTC";
              let routeStatus = "Arrived";
              let endLocation = this.UserData.locationName;
  
      // this.MilkCollectionService.getRoutePoint().subscribe(
        this.MilkCollectionService.getAllTripsBySchDatertptCode(routeType, this.SharedService.getDate(), routeStatus, this.SharedService.getShift(), endLocation).subscribe(
                res => {
                  if (res && res["length"] > 0) {
                      this.routePoints = res;
                      this.distinctrouteNumber = [...new Set(this.routePoints.map(i => i.routeNumber))]
                      let tempArr=[];
                      let tempArr1=[];
                      tempArr = this.routePoints.filter((obj)=>{
                          return obj.routeNumber == this.postData.freightCarrierCode;
                      });
                      this.routeNosocietylogs = tempArr;
                      this.vehicleNumber = this.routeNosocietylogs[0].vehicleNumber;
                      this.driverName = this.routeNosocietylogs[0].driverName;
                      this.arrivalTime = this.routeNosocietylogs[0].actualEndTime;
                      this.routeNosocietylogs[0].tripPoints.sort((a, b) => b.routePointSequenceNo-a.routePointSequenceNo );
                      
                      //console.log(this.routeNosocietylogs);
                      //console.log(this.routePoints);
                      tempArr1 = this.routeNosocietylogs[0].tripPoints.filter((obj) => {
                        return obj.routePointCode == this.postData.vendorNum;
                      });
                      this.societyTripData = tempArr1;
                      this.acceptedCans = tempArr1[0].receivedQty;
  
                      // this.MilkCollectionService.getRoutePointData( this.postData.freightCarrierCode ,  this.SharedService.getDate(), this.UserData.locationName, this.SharedService.getShift()).subscribe(
                      //   res => {
                      //    this.societyData = res; 
                      //    //console.log(this.societyData);
                      //    this.vehicleNumber = this.societyData[0].vehicleNumber;
                      //    this.driverName = this.societyData[0].driverName;
                      //    this.arrivalTime = this.societyData[0].actualEndTime;
                      //   }, error => {
                      //   });
                  }
                }, error => {
                });

                
                this.Totalweight = 0;
                this.postData = resData;
                this.societyNumber = this.postData.vendorNum;
                this.receiptComments = this.postData.comments;
                this.Totalweight = this.postData.netWeight;
                this.Totalcans = this.postData.numOfContainers;
                this.subinventoryName = this.postData.toSubinventory;
                this.locatorid = this.postData.locatorId;
                if(this.postData.receiptStatus != 'Completed') {
                this.postData.receiptStatus = 'In progress';
                }
                this.recieptCode = this.postData.receiptSourceCode;
                this.currHour = new Date().getHours();
                this.CreateIndentLineItem = this.fb.group({
                  newIndtLItem: this.fb.array([])
                });
                this.Totalweight = 0;
                for(let i=0; i< this.postData.mshippingLines.length; i++){
                  (this.CreateIndentLineItem.get('newIndtLItem') as FormArray).push(this.initItemRows(this.postData.mshippingLines[i]));
                  this.Totalweight += this.postData.mshippingLines[i].quantityReceived;
                }
                //console.log(this.postData);
                this.MilkCollectionService.getSampleNum(this.SharedService.getDate(),this.SharedService.getShift(), this.UserData.locationID,this.recieptCode).subscribe(
                  res => {
                    if (res && res["length"] > 0) {
                      this.sampleNum = parseInt(res[0]["sampleNum"])+1;
                      this.nextsampleNum = parseInt(res[0]["sampleNum"]+1);
                    } else {
                      this.sampleNum = 1;
                    }
                    //console.log(this.sampleNum);
                  }, error => {
                  });
            }, error => {
            });

 




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

            }

            ngOnDestroy() {
              if (this.bowlInterval) {
                clearInterval(this.bowlInterval);
              }
            }
  onChange(event) {
    let tempArr = [];
    this.societyNumber = event;
    tempArr = this.routeNosocietylogs[0].tripPoints.filter((obj) => {
      return obj.routePointCode == event;
    });
    this.societyTripData = tempArr;
    this.acceptedCans = tempArr[0].receivedQty;
  }

  routeonChange(event) {
    this.routePoint = event;
    this.societyNumber = null;
    //console.log(event);
    let tempArr=[];
    tempArr = this.routePoints.filter((obj)=>{
        return obj.routeNumber == event;
    });
    this.routeNosocietylogs = tempArr;
    this.routeNosocietylogs[0].tripPoints.sort((a, b) => b.routePointSequenceNo-a.routePointSequenceNo );
    //console.log(this.routeNosocietylogs);
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
  focusOutFunction(event, field, i, f) {
    if(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived > 500){
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived = 500;
      this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('quantityReceived').setValue(Math.ceil(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived));
    }
    this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].get('containerNum').setValue(Math.ceil(this.CreateIndentLineItem.controls.newIndtLItem['controls'][i].value.quantityReceived/40));
    this.Totalcans = 0;
    this.Totalweight = 0;

    for (const totalObj of field) {
      if (!isNaN(totalObj.getRawValue().containerNum)) {
        this.Totalcans += +totalObj.getRawValue().containerNum;
      }
      if (!isNaN(totalObj.value.quantityReceived)) {
        this.Totalweight += +totalObj.value.quantityReceived;
      }
    }
  }
  checkQuantity(){ //new changes
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
    this.checkQuantity();
  }
  setrecieptCode(value) {
    //console.log(value);
    this.recieptCode = value;
    this.MilkCollectionService.getSampleNum(this.SharedService.getDate(),this.SharedService.getShift(), this.UserData.locationID,this.recieptCode).subscribe(
      res => {
        if (res && res["length"] > 0) {
          this.sampleNum = parseInt(res[0]["sampleNum"])+1;
          this.sampleStartChange(parseInt(res[0]["sampleNum"]+1));
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
  initItemRows(data) {
    if(data){
      //console.log(data);
      return this.fb.group({
        shipmentLineId : data.shipmentLineId,
        timecard: data.timecard,
        sampleNum: [data.sampleNum , [Validators.required , Validators.min(1)]],
        lineNum: data.lineNum,
        unitOfMeasure: data.unitOfMeasure,
        itemDescription: [ data.itemDescription , Validators.required],
        itemId: [ {value: data.itemId, disabled: data.approvalStatus == 'Approved'} , [ Validators.required , Validators.min(1)]],
        quantityReceived: [ {value : data.quantityReceived , disabled: data.approvalStatus == 'Approved'} , [Validators.required, Validators.min(1)]],
        lineStatusCode: data.lineStatusCode,
        itemRevision: data.itemRevision,
        reasonId: data.reasonId,
        qcGrade: data.qcGrade,
        clr: data.clr,
        fat: data.fat,
        snf: data.snf,
        noticeUnitPrice: data.noticeUnitPrice,
        approvalStatus: data.approvalStatus,
        transportationAccount: data.transportationAccount,
        shipmentUnitPrice: data.shipmentUnitPrice,
        transferCost: data.transferCost,
        trnsportationCost: data.trnsportationCost,
        excessTransportReason: data.excessTransportReason,
        excessTransportResponsible: data.excessTransportResponsible,
        excessTransportAuthNum: data.excessTransportAuthNum,
        containerNum: [ {value : data.containerNum , disabled: true } , [Validators.required, Validators.min(1)]],
        truckNum: data.truckNum,
        comments: [{value:data.comments , disabled: data.approvalStatus == 'Approved'}],
        lastUpdateDate: data.lastUpdateDate,
        lastUpdateBy: data.lastUpdateBy,
        creationDate: data.creationDate,
        createdBy: data.createdBy,
        lastUpdateLogin: data.lastUpdateLogin,
        poHeaderId: data.poHeaderId,
        poReleaseId: data.poReleaseId,
        poLineId: data.poLineId,
        poLineLocationId: data.poLineLocationId,
        poDistributionId: data.poDistributionId,
        requestId: data.requestId,
        programApplicationId: data.programApplicationId,
        programId: data.programId,
        programUpdateDate: data.programUpdateDate,
        invoiceStatusCode: data.invoiceStatusCode,
        oeOrderHeaderId: data.oeOrderHeaderId,
        oeOrderLineId: data.oeOrderLineId,
        clrAccepted: data.clrAccepted,
        fatAccepted: data.fatAccepted,
        snfAccepted: data.snfAccepted,
        weightSourceType : data.weightSourceType,
      });
    }
    else{
    return this.fb.group({
      timecard: this.SharedService.getTime(),
      sampleNum: [this.nextsampleNum , [Validators.required , Validators.min(1)]],
      lineNum: 1,
      unitOfMeasure: 'KG',
      itemDescription: [ this.itemsSelected ? this.itemsSelected[0].description : '' , Validators.required],
      itemId: [this.itemsSelected ? this.itemsSelected[0].inventoryItemId : '', [ Validators.required , Validators.min(1)]],
      quantityReceived: [ 0 , [Validators.required, Validators.min(1)]],
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
      containerNum: [{value : 0 , disabled: true } , [Validators.required, Validators.min(1)]],
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
  }

  formatTime() {
    return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  }
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }
  addNewRow() {
    // this.addMoreDisabled=true; //new changes
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows(null));
    console.log(this.formArr.value);
    this.nextsampleNum = this.nextsampleNum+1
    this.checkQuantity();
    // for (let index = 0; index < this.formArr.value.length; index++) {
    //   if (index != 0) {
    //     ( this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: parseInt(this.formArr.value[index - 1].sampleNum) + 1 });
    //   }
    // }
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
            ( this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: event });
         } else {
           this.sampleStartNumber += 1;
           ( this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: this.sampleStartNumber });
         }
    }
  }
  nextCollectionData(){ 
        this.submitted = true;
        if(this.societyNumber =='') {
            return;
          }
        if (this.CreateIndentLineItem.invalid) {
            return;
        }
        this.postData.receiptSourceCode =  this.recieptCode;
        this.postData.mshippingLines = this.formArr.getRawValue();
        this.postData.requestDate = this.SharedService.getDate();
        this.postData.lastUpdateBy = this.UserData.userId;
        this.postData.lastUpdateDate = this.SharedService.getDate();
        this.postData.quantityShipped = this.acceptedCans;
        this.postData.quantityReceived = this.Totalcans;
        this.postData.comments = this.receiptComments;
        this.postData.netWeight = this.Totalweight;
        this.postData.numOfContainers = this.Totalcans;
        
        for (let i = 0; i < this.formArr.value.length; i++) {
      this.formArr.value[i].lineNum = i + 1;
    }

        //console.log(this.postData);
        this.MilkCollectionService.updateMilkCollection(this.postData).subscribe(
          res => {
           //console.log(res);
           this.toastr.success('Update', 'updated sucessfully', {
            timeOut: 1000
          });
           this.MilkCollectionService.getReceiptNum().subscribe(
                res => {
                  this.receiptNum = parseInt(res["receiptNum"])+1;
                  this.postData.receiptNum = this.receiptNum;
                  //console.log(this.receiptNum);
                }, error => {
                });
           this.MilkCollectionService.getSampleNum(this.SharedService.getDate(),this.SharedService.getShift(), this.UserData.locationID,this.sourcecode).subscribe(
                  res => {
                    if (res && res["length"] > 0) {
                      this.sampleNum = parseInt(res[0]["sampleNum"])+1;
                      this.sampleStartChange(this.sampleNum);
                    } else {
                      this.sampleNum = 1;
                      this.sampleStartChange(this.sampleNum);
                    }
                    //console.log(this.sampleNum);
                  }, error => {
                  });
           this.postData.receiptNum = this.receiptNum;
           this.postData.receiptSourceCode = 'RMRD DOC 1';
           this.postData.comments = '';
           this.formArr.controls = [];
           this.Totalweight = 0;
           this.Totalcans = 0;
           this.postData.vendorId = null;
           this.postData.receiptStatus = "NEW"
           this.formArr.push(this.initItemRows(null));
           this.submitted =false;
           this.router.navigateByUrl(`/rmrd-operator/milk-receive/milk-summary/`+this.postData.freightCarrierCode);
          }, error => {
          });
  }

navigateToList(path) {
  this.router.navigateByUrl('/' + path);
}
  postCollectionData() {
        this.submitted =true;
        if (this.societyNumber == '') {
            return;
          }
        if (this.CreateIndentLineItem.invalid) {
            return;
        }
        this.postData.receiptSourceCode =  this.recieptCode;
        this.postData.mshippingLines = this.formArr.getRawValue();
        this.postData.requestDate = this.SharedService.getDate();
        this.postData.lastUpdateBy = this.UserData.userId;
        this.postData.lastUpdateDate = this.SharedService.getDate();
        this.postData.quantityShipped = this.acceptedCans;
        this.postData.quantityReceived = this.Totalcans;
        this.postData.comments = this.receiptComments;
        this.postData.netWeight = this.Totalweight;
        this.postData.numOfContainers = this.Totalcans;
        for (let i = 0; i < this.postData.mshippingLines.length; i++) {
          this.postData.mshippingLines[i].lineNum = i + 1;
    }
        //console.log(this.postData);
        this.MilkCollectionService.updateMilkCollection(this.postData).subscribe(
      res => {
        this.toastr.success('Updation', 'Updated Sucessfully', {
          timeOut: 1000
        });

      }, error => {
      });

  }

}
