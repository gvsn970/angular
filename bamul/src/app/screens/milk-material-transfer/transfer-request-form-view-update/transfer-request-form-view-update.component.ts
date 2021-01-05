import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/shared/service/data.service';
import { InitiateTransferMilkService } from 'src/app/shared/service/initiate-transfermilk.service';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-transfer-request-form-view-update',
  templateUrl: './transfer-request-form-view-update.component.html',
  styleUrls: ['./transfer-request-form-view-update.component.css']
})
export class TransferRequestFormViewUpdateComponent implements OnInit {
  getDeliveryChallanNo: any;
  milkTransferListItemByChallanNo: any;
  sourceLocation: any;
  destinationLocation: any;
  vehicleNumber: any;
  driverName: any;
  addMoreMnm: FormGroup;
  otherItems: FormGroup;
  submitted = false;
  addMoreItemsList: any = [];
  items: any = [];
  userData: any;
  userDetails: any;
  departmentDetails: any;
  milkTransferType: any;
  sourceDestinationData: any;
  salesView: any = false;
  custAccNumber: any;
  shippingDetails: any = [];
  requestTypeData: any;
  sysDate: any;
  partyName: any;
  accountNumber: any;
  siteAddress: any;
  shift: any;
  sealVal: any = [];
  sourceDairyData: any;
  sourceInventoryData: any = [];
  sourceLocationData: any;
  destInventoryData: any;
  destLocationData: any;
  UOMVal: any;
  locationVal: any = '';
  sourceSubInvCode: any = '';
  materialTypeDetails: any;
  allLocationDetails: any;
  modalRef: BsModalRef;
  datePickerConfig: Partial<BsDatepickerConfig>;
  selectedItemCode: any;
  constructor(private fb: FormBuilder, private dataService: DataService, private initiateTransferMilkService: InitiateTransferMilkService, private datePipe: DatePipe, private router: Router, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getDeliveryChallanNo = this.dataService.getOption();
    if (this.getDeliveryChallanNo.deliveryChallanNo === undefined) {
      this.router.navigate(['/rmrd-manager/mnm/list-mnm-transfer-receiver']);
      //return false;
    } else {
      this.getMilkTransferByChallanNo(this.getDeliveryChallanNo.deliveryChallanNo);
    }

    this.addMoreMnm = this.fb.group({
      newIndtLItem: this.fb.array([]),
      department: ['', Validators.required],
      requestType: ['', Validators.required],
      recordCreationDate: ['', Validators.required],
      shift: ['', Validators.required],
      fromDairy: ['', Validators.required],
      fromInventory: ['', Validators.required],
      fromLocation: ['', Validators.required],
      toDairy: [''],
      toInventory: [''],
      toLocation: [''],
      sOnumber: [''],
      custName: [''],
      custShipTo: [''],
      custContactName: [''],
      custContactNo: [''],
      requiredRemarks: [''],
      accountNo: [''],
      materialType: ['', Validators.required],
    });

    this.setUserCategoryValidators();
    this.userData = JSON.parse(localStorage.getItem('data'));
    // Get User Details
    this.getuserDetails();
    // Get Department Details
    this.getAllDepartmentDetails();
    // Get Request Type
    this.getAllMilkTransTypes();
    // Get From Source Details
    this.getAllLocationWithOrgSubInvtory();
    // Get Dairy Data
    this.getDistinctOrgId();

    this.getDistinctMaterialType();

    this.getAllLocationDetail();
    // Date set
    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.sysDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.datePickerConfig = Object.assign({},
      {
        minDate: new Date(),
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
      });
    const dateNow: any = this.datePipe.transform(new Date(), 'HH');
    if (dateNow > 4 && dateNow < 16) {
      this.shift = 'M';
    } else {
      this.shift = 'E';
    }
  }

  setUserCategoryValidators() {
    const toDairy = this.addMoreMnm.get('toDairy');
    const toInventory = this.addMoreMnm.get('toInventory');
    const toLocation = this.addMoreMnm.get('toLocation');
    // ;
    // let i = this.addMoreMnm.controls.newIndtLItem.value.length;
    // (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].get('sealNumber');

    // for (var k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
    //   var sealNumber = (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].get('sealNumber');
    // }
    // //console.log(sealNumber, 'sealNumber');
    if (this.salesView === false) {
      toDairy.setValidators([Validators.required]);
      toInventory.setValidators([Validators.required]);
      toLocation.setValidators([Validators.required]);
      // sealNumber.clearValidators();
    } else {
      toDairy.clearValidators();
      toInventory.clearValidators();
      toLocation.clearValidators();
      // sealNumber.setValidators([Validators.required]);
    }
    toDairy.updateValueAndValidity();
    toInventory.updateValueAndValidity();
    toLocation.updateValueAndValidity();
    // sealNumber.updateValueAndValidity();

  }

  async getMilkTransferByChallanNo(challanNo) {
    this.initiateTransferMilkService.getMilkTransferByChallanNos(challanNo).subscribe((response) => {
      if (response) {
        this.milkTransferListItemByChallanNo = response;
        // //console.log('this.milkTransferListItemByChallanNo',this.milkTransferListItemByChallanNo)
        this.getMaterilCodeDescription(this.milkTransferListItemByChallanNo.deliveryLItem[0].materialType);
        this.addMoreMnm.patchValue({
          recordCreationDate: this.milkTransferListItemByChallanNo.recordCreationDate,
          shift: this.milkTransferListItemByChallanNo.shift,
          department: this.milkTransferListItemByChallanNo.department,
          requestType: this.milkTransferListItemByChallanNo.requestType,
          sOnumber: this.milkTransferListItemByChallanNo.sOnumber,
          custName: this.milkTransferListItemByChallanNo.custName,
          custShipTo: this.milkTransferListItemByChallanNo.custShipTo,
          accountNo: this.milkTransferListItemByChallanNo.custNumber,
          fromDairy: this.milkTransferListItemByChallanNo.fromLocId + '/' + this.milkTransferListItemByChallanNo.fromLocDesc,
          fromInventory: this.milkTransferListItemByChallanNo.fromSubInvDesc + '/' + this.milkTransferListItemByChallanNo.fromSubInventory,
          fromLocation: this.milkTransferListItemByChallanNo.fromLocDesc + '/' + this.milkTransferListItemByChallanNo.fromLocationId,
          toDairy: this.milkTransferListItemByChallanNo.toLocId + '/' + this.milkTransferListItemByChallanNo.toLocDesc,
          toInventory: this.milkTransferListItemByChallanNo.toSubInvDesc + '/' + this.milkTransferListItemByChallanNo.toSubInventory,
          toLocation: this.milkTransferListItemByChallanNo.toLocDesc + '/' + this.milkTransferListItemByChallanNo.toLocationId,
          requiredRemarks: this.milkTransferListItemByChallanNo.reqRemarks,
          materialType: this.milkTransferListItemByChallanNo.deliveryLItem[0].materialType
        });
        this.getShippingDetails(this.milkTransferListItemByChallanNo.sOnumber);
        setTimeout(() => {
          for (let i = 0; i < this.milkTransferListItemByChallanNo.deliveryLItem.length; i++) {
            //(this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].patchValue({ dp: '' });
            //(this.addMoreMnm.controls.mstrIndLItm as FormGroup).controls[i].patchValue({ dp: sortarray });
            // //console.log('this.milkTransferListItemByChallanNo.deliveryLItem[i]',this.milkTransferListItemByChallanNo.deliveryLItem[i]);
            (this.addMoreMnm.get('newIndtLItem') as FormArray).push(this.initNewItemRows(this.milkTransferListItemByChallanNo.deliveryLItem[i]));
            this.getUOMVal(this.milkTransferListItemByChallanNo.deliveryLItem[i].itemId + '/' + this.milkTransferListItemByChallanNo.deliveryLItem[i].itemCode + '/' + this.milkTransferListItemByChallanNo.deliveryLItem[i].itemCodeDesc, i, 'init');
  
            this.getAllSubInvCodeByOrgIdForDropdownInit(this.milkTransferListItemByChallanNo.deliveryLItem[i].fromSubinvCode, i);
            // //console.log(this.milkTransferListItemByChallanNo.deliveryLItem[i].fromSubinvCode + '/' + this.milkTransferListItemByChallanNo.deliveryLItem[i].fromSubInvLocId);
            (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].patchValue({ fromSubinvCode: this.milkTransferListItemByChallanNo.deliveryLItem[i].fromSubinvCode + '/' + this.milkTransferListItemByChallanNo.deliveryLItem[i].fromSubInvLocId });
            (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].patchValue({ Uom: this.milkTransferListItemByChallanNo.deliveryLItem[i].uom });
            //this.getUOMVal(data.itemId, 1);
          }
        }, 1000);
      }
    });
  }

  getAllLocationDetail() {
    this.initiateTransferMilkService.getAllLocationDetail().subscribe(res => {
      this.allLocationDetails = res;
    });
  }

  getDistinctMaterialType() {
    this.initiateTransferMilkService.getDistinctMaterialType().subscribe(res => {
      this.materialTypeDetails = res;
    });
  }

  getuserDetails() {
    this.initiateTransferMilkService.getUserDetails(this.userData.userId).subscribe(res => {
      this.userDetails = res;
    });
  }
  getAllDepartmentDetails() {
    this.initiateTransferMilkService.getAllDepartmentDetails().subscribe(res => {
      this.departmentDetails = res;
    });
  }
  getAllMilkTransTypes() {
    this.initiateTransferMilkService.getAllMilkTransTypes().subscribe(res => {
      this.milkTransferType = res;
    });
  }

  getDistinctOrgId() {
    this.initiateTransferMilkService.getDistinctOrgId().subscribe(res => {
      this.sourceDairyData = res;
    });
  }
  getAllSubInvCodeByOrgId(itemId, index) {
    //this.addMoreMnm.value.fromDairy = 'BMD';
    //const orgId = val.split('/');
    const fromDairy = this.addMoreMnm.value.fromDairy.split('/');
    this.initiateTransferMilkService.getLocationDetailsByLocationId(fromDairy[0], this.selectedItemCode).subscribe(res => {
      //this.sourceInventoryData[index] = res;
      // //console.log('this.sourceInventoryData',this.sourceInventoryData)
      this.sourceInventoryData = res;
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[index].patchValue({ dpItemInv: this.sourceInventoryData });
    });
    // this.formReset();
  }
  getAllSubInvCodeByOrgIdForDropdown(itemId, index) {
    //this.addMoreMnm.value.fromDairy = 'BMD';
    //const orgId = val.split('/');
    const fromDairy = this.addMoreMnm.value.fromDairy.split('/');
    //this.requestTypeData = [];
    this.sourceLocationData = [];
    this.sourceInventoryData = [];
    this.UOMVal = [];
    for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
      //(this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ fromSubinvCode: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ fromLocDesc: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dpItemLoc: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ materialCodeDesc: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ fromSubinvCode: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dpItemInv: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ Uom: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dp: '' });
    }

    //this.locationDropdownReset();
  }

  getAllSubInvCodeByOrgIdForDropdownInit(itemId, index) {
    //this.addMoreMnm.value.fromDairy = 'BMD';
    //const orgId = val.split('/');
    const fromDairy = this.addMoreMnm.value.fromDairy.split('/');
    // this.sourceLocationData = [];
    //this.sourceInventoryData = [];
    for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
      this.initiateTransferMilkService.getLocationDetailsByLocationId(fromDairy[0], this.selectedItemCode).subscribe(res => {
        this.sourceInventoryData = res;
        (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dpItemInv: this.sourceInventoryData });
      });
      const subInvCodeVal = this.milkTransferListItemByChallanNo.deliveryLItem[k].fromSubinvCode + '/' + this.milkTransferListItemByChallanNo.deliveryLItem[k].fromSubInvLocId
      this.getAllLocationBySubInvCode(subInvCodeVal, k);
    }

    //this.locationDropdownReset();
  }
  getAllLocationBySubInvCode(val, i) {
    const subInvCode = val.split('/');
    //this.sourceSubInvCode = subInvCode[1];
    // for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
    //   (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ materialCodeDesc: '' });
    //   (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ Uom: '' });
    // }
    // //console.log('this.addMoreMnm.value.fromDairy',this.addMoreMnm.value.fromDairy)
    const fromDairy = this.addMoreMnm.value.fromDairy.split('/');
    if (subInvCode[0] !== 'null') {
      // //console.log('subInvCode',subInvCode)
      // this.milkTransferListItemByChallanNo.fromLocId
      this.initiateTransferMilkService.getAllItemLevelLocationBySubInvCode(this.selectedItemCode, subInvCode[0], subInvCode[1]).subscribe(res => {
        this.sourceLocationData = res;
        // //console.log(this.sourceLocationData, 'sourceLocationData');
        (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "dpItemLoc": this.sourceLocationData });
        // if (this.milkTransferListItemByChallanNo.deliveryLItem[i] !== undefined) {
        //   (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "Uom": this.milkTransferListItemByChallanNo.deliveryLItem[i].uom });
        // }
      });
    }
  }

  getAllSubDestInvCodeByOrgId(val) {
    const orgId = val.split('/');
    this.initiateTransferMilkService.getAllSubInvCodeByOrgId(orgId[1]).subscribe(res => {
      this.destInventoryData = res;
    });
  }

  getAllLocationWithOrgSubInvtory() {
    this.initiateTransferMilkService.getAllLocationWithOrgSubInvtory().subscribe(res => {
      this.sourceDestinationData = res;
    });
  }
  async getMaterilCodeDescription(val){
    await this.initiateTransferMilkService.getallitemsviewbycategory(val).subscribe(res => {
      // //console.log('val',val)
      this.requestTypeData = res;
      const i = this.addMoreMnm.controls.newIndtLItem.value.length - 1;
      for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
        (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ materialCodeDesc: '' });
        (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dp: [] });
        const a = this.addMoreMnm.controls.newIndtLItem as FormGroup;
        const b = a.controls[i] as FormGroup;
        b.controls.materialCodeDesc.enable();
      }
    });

    this.setUserCategoryValidators();
  }
  requestTypeChange(val) {
    if (val === 'Bulk_Sales') {
      this.salesView = true;
    } else {
      this.salesView = false;
    }
    this.initiateTransferMilkService.getItemsByTransferRequestType(val).subscribe(res => {
      this.requestTypeData = res;
      const i = this.addMoreMnm.controls.newIndtLItem.value.length - 1;
    });

    this.setUserCategoryValidators();

  }

  getShippingDetails(val) {
    if (val) {
      this.initiateTransferMilkService.getCustomerBySalesOrder(val).subscribe(response => {
        this.custAccNumber = response;
        if (response) {
          this.initiateTransferMilkService.getShippingDetailsByAccountNumber(this.custAccNumber.customerNumber).subscribe(
            res => {
              this.shippingDetails = res;
            }, error => {
              this.shippingDetails = '';
            });
        }
      }, error => {
        this.shippingDetails = '';
      });
    }
  }

  get NewFormArr() {
    return this.addMoreMnm.get('newIndtLItem') as FormArray;
  }



  addMoreItem() {
    this.addMoreMnm.controls.newIndtLItem.setValidators([Validators.required]);
    const i = this.addMoreMnm.controls.newIndtLItem.value.length;
    // if (i < 3) {
    this.NewFormArr.push(this.initNewItemRows(null));
    (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].patchValue({ serialNumber: parseInt(i) + 1 });
  }

  initNewItemRows(data) {
    // //console.log('sss',data.itemId + '/' + data.itemCode + '/' + data.itemDescription);
    if (data) {
      return this.fb.group({
        serialNumber: '1',
        materialCodeDesc: [data.itemId + '/' + data.itemCode + '/' + data.itemDescription, Validators.required],
        Uom: data.uom,
        Qty: data.requiredQty,
        sealNumber: data.sealNumber,
        remarks: data.remarks,
        dChTtemNo: data.dChTtemNo,
        dp: '',
        dpItemLoc: '',
        dpItemInv: '',
        fromSubinvCode: [data.fromSubinvCode + '/' + data.fromSubInvLocId, Validators.required],
        fromLocDesc: [data.fromLocDesc, Validators.required],
      });

    } else {
      return this.fb.group({
        serialNumber: '1',
        materialCodeDesc: ['', Validators.required],
        Uom: ['', Validators.required],
        Qty: ['', Validators.required],
        sealNumber: [''],
        remarks: '',
        dp: '',
        dpItemLoc: '',
        dpItemInv: '',
        fromSubinvCode: ['', Validators.required],
        fromLocDesc: ['', Validators.required]
      });
    }
    this.setUserCategoryValidators();
  }
  locationDropdownReset() {
    // //console.log('<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i]',(<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls);
    this.NewFormArr.clear();
  }
  checkInput(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((event.target.value.length > 4) || (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }
  getUOMVal(materialCode, i, type) {
    const itemId = materialCode.split('/');
    this.selectedItemCode = itemId[0];
    this.sourceLocationData = [];
    this.initiateTransferMilkService.getItemsviewByItemIdAndSubinventoryCodeAndInventoryLocationId(itemId[0]).subscribe((response) => {
      if (response !== undefined) {
        // //console.log(response, 'uomresponse');
        this.UOMVal = response;
        //this.UOMVal = response;
        //this.UOMVal = response.uom;
      }
      else {
        this.UOMVal = '';
      }
      ////console.log(this.milkTransferListItemByChallanNo.deliveryLItem[i], 'this.milkTransferListItemByChallanNo.deliveryLItem[i].uom');
      //(<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "dp": this.itemCodeDesc });
      (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "dp": this.UOMVal });
      (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "dpItemLoc": '' });
      if (type !== 'init') {
        //(<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "dpItemInv": '' });
        (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "fromSubinvCode": '' });
      }
      // (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "Uom": this.UOMVal });
      if (this.milkTransferListItemByChallanNo.deliveryLItem[i] !== undefined) {
        (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "Uom": this.milkTransferListItemByChallanNo.deliveryLItem[i].uom });
      }

    });
    this.getAllSubInvCodeByOrgId(itemId[0], i);
  }

  openModal(template: any, index) {

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index, field): void {

    // this.modalRef.hide();
    // if (this.NewFormArr.length !== 1) {
    //   this.NewFormArr.removeAt(index);
    // } else {
    //   this.toastr.error('At least One Item is Mandatory', 'Single row', {
    //     timeOut: 2000
    //   });
    // }


    this.modalRef.hide();
    if (this.NewFormArr.length > 1) {
      if (field.value.dChTtemNo == null) {
        this.NewFormArr.removeAt(index);
      } else {
        this.initiateTransferMilkService.deleteLineItem(field.value.dChTtemNo).subscribe(
          res => {
            this.NewFormArr.removeAt(index);
          })
      }

    } else {
      this.toastr.error('At least One Item is Mandatory', 'Single row', {
        timeOut: 2000
      });
    }


  }

  decline(): void {
    this.modalRef.hide();
  }

  postmilkTransferData(addmoreData) {
    this.setUserCategoryValidators();
    this.submitted = true;
    this.addMoreItemsList = [];
    if (this.addMoreMnm.invalid) {

      return;
    }
    if (addmoreData.form.status !== 'INVALID' && addmoreData.form.status !== 'INVALID') {
      const data = JSON.parse(localStorage.getItem('data'));
      const changedDate = addmoreData.form.value.recordCreationDate;
      const compareDate = this.milkTransferListItemByChallanNo.recordCreationDate;
      if (changedDate !== compareDate) {
        var recordCreationDate: any = this.datePipe.transform(addmoreData.form.value.recordCreationDate, 'dd-MM-yyyy');
      } else {
        var recordCreationDate = addmoreData.form.value.recordCreationDate;
      }


      // const recordCreationDate = this.datePipe.transform(addmoreData.form.value.recordCreationDate, 'dd-MM-yyyy');
      const currentTime = this.datePipe.transform(new Date(), 'HH:mm:ss ');
      // this.salesView
      if (this.salesView === true) {
        if (this.shippingDetails.length === 0) {
          this.partyName = '';
          this.accountNumber = '';
          this.siteAddress = '';
        } else {
          this.partyName = this.shippingDetails.partyName;
          this.accountNumber = this.shippingDetails.accountNumber;
          this.siteAddress = this.shippingDetails.siteAddress;
        }
      } else {
        this.partyName = '';
        this.accountNumber = '';
        this.siteAddress = '';
      }

      addmoreData.form.value.newIndtLItem.forEach(items => {
        const materialCode = items.materialCodeDesc.split('/');
        const fromSubinvCode = items.fromSubinvCode.split('/');
        this.addMoreItemsList.push({
          // itemId: materialCode[0],
          // itemCode: materialCode[1],
          // itemDescription: materialCode[2],
          // dChTtemNo: items.dChTtemNo,
          // remarks: items.remarks,
          // srcTareWt: 0,
          // srcGrossWt: 0,
          // loadedQty: 0.0,
          // loadedFat: 0.0,
          // loadedSNF: 0.0,
          // loadedCLR: null,
          // loadedAcidity: 0.8,
          // loadTimeTemp: 0.0,
          // trgtGrossWt: null,
          // trgtTareWt: null,
          // receivedQty: 0.0,
          // receivedFat: 0.0,
          // receivedSNF: 0.0,
          // receivedCLR: null,
          // receivedAcidity: 0.0,
          // recdTimeTemp: 0.0,
          // noOfcans: null,
          // materialType: null,
          // lineNumber: null,
          // compertment: null,
          // requiredQty: items.Qty,
          // uom: items.Uom,
          // loadType: null,
          // sealNumber: items.sealNumber,
          // recordCreationDate,
          // recordCreationBy: this.userData.userId,
          // lastUpdateDate: null,
          // lastUpdateBy: null


          itemId: materialCode[0],
          itemCode: materialCode[1],
          itemDescription: materialCode[2],
          dChTtemNo: items.dChTtemNo,
          srcTareWt: 0,
          srcGrossWt: 0,
          loadedQty: 0.0,
          loadedFat: 0.0,
          loadedSNF: 0.0,
          loadedCLR: null,
          loadedAcidity: 0.0,
          loadTimeTemp: 0.0,
          trgtGrossWt: null,
          trgtTareWt: null,
          receivedQty: 0.0,
          receivedFat: 0.0,
          receivedSNF: 0.0,
          receivedCLR: null,
          receivedAcidity: 0.0,
          recdTimeTemp: 0.0,
          noOfcans: null,
          materialType: addmoreData.form.value.materialType,
          lineNumber: null,
          compertment: null,
          requiredQty: items.Qty,
          uom: items.Uom,
          loadType: null,
          sealNumber: null,
          sealApprove: null,
          sealRemarks: null,
          remarks: items.remarks,
          fromOrgId: null,
          toOrgId: null,
          fromLocationId: null,
          toLocationId: null,
          fromSubinvCode: fromSubinvCode[0],
          fromSubInvLocId: fromSubinvCode[1],
          toSubinvCode: null,
          fromOrgCode: null,
          toOrgCode: null,
          fromSubInvDesc: null,
          toSubInvDesc: null,
          fromLocDesc: items.fromLocDesc,
          toLocDesc: null,
          recordCreationDate: recordCreationDate,
          recordCreationBy: this.userData.userId,
          lastUpdateDate: null,
          lastUpdateBy: null,
        });
      });

      const fromDairy = addmoreData.form.value.fromDairy.split('/');
      const fromInventory = addmoreData.form.value.fromInventory.split('/');
      const fromLocation = addmoreData.form.value.fromLocation.split('/');

      const toDairy = addmoreData.form.value.toDairy.split('/');
      const toInventory = addmoreData.form.value.toInventory.split('/');
      const toLocation = addmoreData.form.value.toLocation.split('/');



      const dataToSend = {
        deliveryChallanNo: this.milkTransferListItemByChallanNo.deliveryChallanNo,

        // requestType: addmoreData.form.value.requestType,
        // status: 'N',
        // fromOrgId: fromDairy[1],
        // toOrgId: toDairy[1],
        // fromLocationId: fromLocation[1],
        // toLocationId: toLocation[1],
        // fromSubInventory: fromInventory[1],
        // toSubInventory: toInventory[1],
        // fromOrgCode: fromDairy[2],
        // toOrgCode: toDairy[2],
        // fromLocDesc: fromLocation[0],
        // toLocDesc: toLocation[0],
        // fromSubInvDesc: fromInventory[0],
        // toSubInvDesc: toInventory[0],
        // fromInvOrgDesc: fromDairy[0],
        // toInvOrgDesc: toDairy[0],
        // requestedDate: recordCreationDate,
        // requestedTime: currentTime,
        // requiredRemarks: addmoreData.form.value.requiredRemarks,
        // requestedBy: this.userData.userId,
        // department: addmoreData.form.value.department,
        // shift: addmoreData.form.value.shift,
        // sOnumber: addmoreData.form.value.sOnumber,
        // pOnumber: null,
        // fromSubinvCode: fromInventory[1],
        // toSubinvCode: toInventory[1],
        // custNumber: this.accountNumber,
        // custName: this.partyName,
        // custShipTo: this.siteAddress,
        // custContactNo: addmoreData.form.value.custContactNo,
        // custContactName: addmoreData.form.value.custContactName,
        // reqRemarks: addmoreData.form.value.requiredRemarks,
        // reqdQty: null,
        // routeType: null,
        // routeNumber: null,
        // vehicleNumber: null,
        // vehicleType: null,
        // driverName: null,
        // transporterName: null,
        // capacityInKg: null,
        // loadingSource: null,
        // loadTrarWt: null,
        // loadDate: null,
        // loadTime: null,
        // loadGrossWt: null,
        // loadGrossdate: null,
        // loadGrossTime: currentTime,
        // loadNetWt: null,
        // wbOprtAproval: null,
        // qltyApprover: null,
        // mgrApprover: null,
        // depertureDate: null,
        // depertureTime: null,
        // secuVerifiedBy: null,
        // securityRemarks: null,
        // loadedRemarks: null,
        // arrivalDate: null,
        // arrivalTime: null,
        // arrivalVrfyBy: null,
        // arrivalSecRemarks: null,
        // recvRemarks: null,
        // transRemarks: null,
        // dcRemarks: null,
        // receiveSource: null,
        // recvTargetWt: null,
        // receiveDate: null,
        // receiveTime: null,
        // recvGrossWeight: null,
        // recvNetWeight: null,
        // receiveGrossDate: null,
        // receiveGrossTime: null,
        // recvWBOpeApprove: 'Abc',
        // recvQytApprover: 'dcb',
        // recvMgrAprove: null,
        // quantityInKg: null,
        // recordCreationDate,
        // recordCreationBy: this.userData.userId,
        // lastUpdateDate: null,
        // lastUpdateBy: null,
        // deliveryLItem: this.addMoreItemsList

        requestType: addmoreData.form.value.requestType,
        status: 'New',
        fromSubInventory: null,
        toSubInventory: null,
        toInvOrgDesc: null,
        fromInvOrgDesc: null,
        requestedDate: recordCreationDate,
        requestedTime: currentTime,
        itemId: null,
        itemCode: null,
        itemDescription: null,
        requiredQty: null,
        requiredFAT: null,
        requiredSNF: null,
        requiredRemarks: addmoreData.form.value.requiredRemarks,
        requestedBy: this.userData.userId,
        department: addmoreData.form.value.department,
        shift: addmoreData.form.value.shift,
        sOnumber: addmoreData.form.value.sOnumber,
        pOnumber: null,
        custNumber: this.accountNumber,
        custName: this.partyName,
        custShipTo: this.siteAddress,
        custContactNo: addmoreData.form.value.custContactNo,
        custContactName: addmoreData.form.value.custContactName,
        reqRemarks: addmoreData.form.value.requiredRemarks,
        // "tripTransactionId": null,
        reqdQty: null,
        routeType: null,
        routeNumber: null,
        vehicleNumber: null,
        vehicleType: null,
        driverName: null,
        transporterName: null,
        capacityInKg: null,
        loadingSource: null,
        loadTrarWt: null,
        loadDate: null,
        loadTime: null,
        loadGrossWt: null,
        loadGrossdate: null,
        loadGrossTime: currentTime,
        loadNetWt: null,
        wbOprtAproval: null,
        qltyApprover: null,
        mgrApprover: null,
        depertureDate: null,
        depertureTime: null,
        secuVerifiedBy: null,
        securityRemarks: null,
        loadedRemarks: null,
        arrivalDate: null,
        arrivalTime: null,
        arrivalVrfyBy: null,
        arrivalSecRemarks: null,
        recvRemarks: null,
        transRemarks: null,
        dcRemarks: null,
        receiveSource: null,
        recvTargetWt: null,
        receiveDate: null,
        receiveTime: null,
        recvGrossWeight: null,
        recvNetWeight: null,
        receiveGrossDate: null,
        receiveGrossTime: null,
        recvWBOpeApprove: 'Abc',
        recvQytApprover: 'dcb',
        recvMgrAprove: null,
        quantityInKg: null,
        fromLocId: fromDairy[0],
        fromLocDesc: fromDairy[1],
        toLocId: toDairy[0],
        toLocDesc: toDairy[1],
        recordCreationDate: recordCreationDate,
        recordCreationBy: this.userData.userId,
        lastUpdateDate: null,
        lastUpdateBy: null,
        deliveryLItem: this.addMoreItemsList
      };

      this.initiateTransferMilkService.saveMilkTransferHeader(dataToSend).subscribe(
        res => {
          this.toastr.success('Milk Transfer Done Successfully', 'Milk', {
            timeOut: 4000
          });
          this.router.navigate(['/rmrd-manager/mnm/list-mnm-transfer-receiver']);
        }, error => {
          this.toastr.warning('Cannot Insert same seal number', 'Milk', {
            timeOut: 4000
          });
        });
    }
  }

}
