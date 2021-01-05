import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { InitiateTransferMilkService } from 'src/app/shared/service/initiate-transfermilk.service';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transfer-request-form',
  templateUrl: './transfer-request-form.component.html',
  styleUrls: ['./transfer-request-form.component.css']
})
export class TransferRequestFormComponent implements OnInit {
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
  sourceInventoryData: any;
  sourceLocationData: any;
  destInventoryData: any;
  destLocationData: any;
  UOMVal: any;
  locationVal: any = '';
  sourceSubInvCode: any = '';
  materialTypeDetails: any;
  allLocationDetails: any;
  subInvCode: any;
  locId: any;
  modalRef: BsModalRef;
  datePickerConfig: Partial<BsDatepickerConfig>;
  typeList: any;//new changes
  startPointList: any; // new changes
  endPointList: any; // new changes
  constructor(private fb: FormBuilder, private initiateTransferMilkService: InitiateTransferMilkService, private datePipe: DatePipe, private router: Router, private toastr: ToastrService, private modalService: BsModalService) {
  }
  ngOnInit() {
    this.addMoreMnm = this.fb.group({
      newIndtLItem: this.fb.array([this.initNewItemRows()]),
      department: ['', Validators.required],
      requestType: ['', Validators.required],
      materialType: ['', Validators.required],
      recordCreationDate: ['', Validators.required],
      shift: ['', Validators.required],
      fromDairy: ['', Validators.required],
      fromInventory: [''],
      fromLocation: [''],
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

    //Get list of material type
    this.getDistinctMaterialType();

    //Get all location details
    // this.getAllLocationDetail();



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
    this.addMoreMnm.patchValue({
      recordCreationDate: new Date(),
      shift: this.shift
    });
    this.getSourceDestinationType();
  }
  
  getSourceDestinationType() {
    this.initiateTransferMilkService.getSourceDestinationType().subscribe(res => {
      this.typeList = res;
    });
  }
  sourceTypeVal(val) {
    this.initiateTransferMilkService.getLocationByType(val).subscribe(res => {
      this.startPointList = res;
    });
  }
  destinationTypeVal(val) {
    this.initiateTransferMilkService.getLocationByType(val).subscribe(res => {
      this.endPointList = res;
    });
  }
  setUserCategoryValidators() {
    const toDairy = this.addMoreMnm.get('toDairy');
    // const toInventory = this.addMoreMnm.get('toInventory');
    // const toLocation = this.addMoreMnm.get('toLocation');

    for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
      var sealNumber = (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].get('sealNumber');
    }

    if (this.salesView === false) {
      toDairy.setValidators([Validators.required]);
      // toInventory.setValidators([Validators.required]);
      // toLocation.setValidators([Validators.required]);
      sealNumber.clearValidators();
    } else {
      toDairy.clearValidators();
      // toInventory.clearValidators();
      // toLocation.clearValidators();
      sealNumber.setValidators([Validators.required]);
    }
    toDairy.updateValueAndValidity();
    // toInventory.updateValueAndValidity();
    // toLocation.updateValueAndValidity();
    sealNumber.updateValueAndValidity();

  }

  getuserDetails() {
    this.initiateTransferMilkService.getUserDetails(this.userData.userId).subscribe(res => {
      this.userDetails = res;
    });
  }

  // getAllLocationDetail() {
  //   this.initiateTransferMilkService.getAllLocationDetail().subscribe(res => {
  //     this.allLocationDetails = res;
  //   });
  // }

  getDistinctMaterialType() {
    this.initiateTransferMilkService.getDistinctMaterialTypeById(this.userData.locationID).subscribe(res => {
      this.materialTypeDetails = res;
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
  getAllSubInvCodeByOrgId(val) {
    const orgId = val.split('/');
    this.initiateTransferMilkService.getAllSubInvCodeByOrgId(orgId[1]).subscribe(res => {
      this.sourceInventoryData = res;
    });
  }
  getAllLocationBySubInvCode(val) {
    const subInvCode = val.split('/');
    this.sourceSubInvCode = subInvCode[1];
    for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ materialCodeDesc: '' });
      (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ Uom: '' });
    }
    this.initiateTransferMilkService.getAllLocationBySubInvCode(subInvCode[1]).subscribe(res => {
      this.sourceLocationData = res;
    });
  }

  getAllSubDestInvCodeByOrgId(val) {
    const orgId = val.split('/');
    this.initiateTransferMilkService.getAllSubInvCodeByOrgId(orgId[1]).subscribe(res => {
      this.destInventoryData = res;
    });
  }
  getAllDestLocationBySubInvCode(val) {
    const subInvCode = val.split('/');
    this.initiateTransferMilkService.getAllLocationBySubInvCode(subInvCode[1]).subscribe(res => {
      this.destLocationData = res;
    });
  }

  getAllLocationWithOrgSubInvtory() {
    this.initiateTransferMilkService.getAllLocationWithOrgSubInvtory().subscribe(res => {
      this.sourceDestinationData = res;
    });
  }

  getSourceLocationVal(val) {
    // for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
    //   (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ materialCodeDesc: '' });
    //   (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dp: [] });
    //   // const a = this.addMoreMnm.controls.newIndtLItem as FormGroup;
    //   // const b = a.controls[k] as FormGroup;
    //   // b.controls.materialCodeDesc.enable();
    // }
    //this.addMoreMnm.get('toDairy');
    //console.log(this.addMoreMnm.get('fromDairy').value);

    const locationVal = val.split('/');

    //this.locationVal = this.addMoreMnm.get('fromDairy').value;

    this.locId = locationVal[0];
    this.subInvCode = locationVal[1];
  }
  getMaterilCodeDescription(val){
    this.initiateTransferMilkService.getallitemsviewbycategory(val).subscribe(res => {
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
    this.UOMVal = [];
    if (val === 'Bulk_Sales') {
      this.salesView = true;
    } else {
      this.salesView = false;
    }
    this.initiateTransferMilkService.getItemsByTransferRequestType(val).subscribe(res => {
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

  getShippingDetails(val) {
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


  getUOMVal(materialCode, i) {
    const itemId = materialCode.split('/');
    this.initiateTransferMilkService.getItemsviewByItemIdAndSubinventoryCodeAndInventoryLocationId(itemId[0]).subscribe((response) => {
      if (response !== undefined) {
        //console.log(response, 'uomresponse');
        this.UOMVal = response;
        //this.UOMVal = response;
        //this.UOMVal = response.uom;
      }
      else {
        this.UOMVal = '';
      }

      //(<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "dp": this.itemCodeDesc });
      (<FormGroup>this.addMoreMnm.controls.newIndtLItem).controls[i].patchValue({ "dp": this.UOMVal });
    });
  }


  get NewFormArr() {
    return this.addMoreMnm.get('newIndtLItem') as FormArray;
  }



  addMoreItem() {
    this.addMoreMnm.controls.newIndtLItem.setValidators([Validators.required]);
    const i = this.addMoreMnm.controls.newIndtLItem.value.length;
    this.NewFormArr.push(this.initNewItemRows());
    (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[i].patchValue({ serialNumber: parseInt(i) + 1 });
    const a = this.addMoreMnm.controls.newIndtLItem as FormGroup;
    const b = a.controls[i] as FormGroup;
    b.controls.materialCodeDesc.enable();
  }

  initNewItemRows() {
    return this.fb.group({
      serialNumber: '1',
      // materialDesc: ['', Validators.required],
      materialCodeDesc: ['', Validators.required],
      //Uom: ['', Validators.required],
      Uom: ['', Validators.required],
      dp: '',
      Qty: ['', Validators.required],
      sealNumber: [''],
      remarks: ''
    });

    this.setUserCategoryValidators();
  }

  openModal(template: any, index) {

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index, field): void {

    this.modalRef.hide();


    if (this.NewFormArr.length !== 1) {
      this.NewFormArr.removeAt(index);
    } else {
      this.toastr.error('At least One Item is Mandatory', 'Single row', {
        timeOut: 2000
      });
    }
  }

  checkInput(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((event.target.value.length > 4) || (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
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
      const recordCreationDate = this.datePipe.transform(addmoreData.form.value.recordCreationDate, 'dd-MM-yyyy');
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
        this.addMoreItemsList.push({
          // itemId: materialCode[0],
          // itemCode: materialCode[1],
          // itemDescription: materialCode[2],
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
          // materialType: addmoreData.form.value.materialType,
          // lineNumber: null,
          // compertment: null,
          // requiredQty: items.Qty,
          // uom: items.Uom,
          // loadType: null,
          // sealNumber: null,
          // recordCreationDate: recordCreationDate,
          // recordCreationBy: this.userData.userId,
          // lastUpdateDate: null,
          // lastUpdateBy: null,

          itemId: materialCode[0],
          itemCode: materialCode[1],
          itemDescription: materialCode[2],
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
          fromSubinvCode: null,
          toSubinvCode: null,
          fromOrgCode: null,
          toOrgCode: null,
          fromSubInvDesc: null,
          toSubInvDesc: null,
          fromLocDesc: null,
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

      // var dataToSend1 = {
      //   'department': addmoreData.form.value.department,
      //   'deliveryLItem': this.addMoreItemsList
      // }

      const dataToSend = {
        // requestType: addmoreData.form.value.requestType,
        // status: 'N',
        // fromOrgId: fromDairy[1],
        // toOrgId: toDairy[1],
        // fromLocationId: fromDairy[0],
        // toLocationId: toDairy[0],
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


        requestType: addmoreData.form.value.requestType,
        status: 'N',
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
      //console.log(dataToSend, 'dataToSend');
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
