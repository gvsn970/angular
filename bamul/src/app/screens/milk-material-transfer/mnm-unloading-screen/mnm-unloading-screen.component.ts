import { Component, OnInit } from '@angular/core';
import { WeighingBridgeService } from '../../../shared/service/weighing-bridge.service';
import { RouteService } from '../../../shared/service/route.service';
import { InitiateTransferMilkService } from 'src/app/shared/service/initiate-transfermilk.service';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-mnm-unloading-screen',
  templateUrl: './mnm-unloading-screen.component.html',
  styleUrls: ['./mnm-unloading-screen.component.css']
})
export class MnmUnloadingScreenComponent implements OnInit {
  SourceForm: FormGroup;
  MaterialForm: FormGroup;
  milkChallanForm: FormGroup;
  toDestinationForm: FormGroup;
  loadingForm: FormGroup;
  routDetailForm: FormGroup;
  approveForm: FormGroup;
  customerForm: FormGroup;
  challanDetails: any;
  CreateIndentLineItem: FormGroup;
  remarks: string = '';
  challanNo: string = '';
  submited: boolean = false;
  itemArray: any = [];
  sourceDairyData: any;
  destInventoryData: any;
  destLocationData: any;
  sourceDestinationData: any;
  routeDetail: any;
  milkTransferType: any;
  customerAccountDetail: any;
  customerShippingDetail: any;
  isGrossWeightCorrect: boolean = true;
  showCustomer: boolean = false;
  routyeNumber: any = [];
  allRoutes: any = [];
  routeType: any;
  materialTypeDetails: any;
  compartments: any = [];
  requestTypeData: any = [];
  uomList: any = [];
  allLocationDetails: any = [];
  tripTransactionDetial: any;
  constructor(
    private weighingBridgeService: WeighingBridgeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private initiateTransferMilkService: InitiateTransferMilkService,
    private routeService: RouteService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        let tripTransactionId = params['id'];
        // //console.log('tripTransactionId',tripTransactionId)
        this.initiateTransferMilkService.getMilkTransferByTripTransactionId(tripTransactionId).subscribe(res => {
          this.tripTransactionDetial = res;
          this.challanNo = this.tripTransactionDetial.deliveryChallanNo;
          this.getMilkTransferByChallanNo();
        });
      }
    })
    this.SourceForm = this.fb.group({
      FromSource: ['', Validators.required],
      requestType: ['', Validators.required],
      soNumber: ['', Validators.required],
      ToSource: ['', Validators.required]
    });
    this.MaterialForm = this.fb.group({
      materialType: [''],
    });
    this.milkChallanForm = this.fb.group({
      challanNumber: ['', Validators.required],
      status: ['', Validators.required],
      shift: ['', Validators.required],
      time: ['', Validators.required],
      soNumber: ['', Validators.required],
    });
    this.toDestinationForm = this.fb.group({
      toDairy: ['', Validators.required],
      toInventory: ['', Validators.required],
      toLocation: ['', Validators.required]
    });
    this.loadingForm = this.fb.group({
      tarWeight: ['', Validators.required],
      grossWeight: ['', Validators.required],
      netWeight: ['', Validators.required]
    });
    this.routDetailForm = this.fb.group({
      routeType: '',
      routeNumber: '',
      vehicleNumber: ['', Validators.required],
      driverName: ['', Validators.required],
      transporterName: ['', Validators.required],
      vehicleType: ['', Validators.required],
      capacity: ['', Validators.required],
      registered: 'register'
    });
    this.approveForm = this.fb.group({
      operatorName: ['', Validators.required],
      qualityName: ['', Validators.required],
      managerName: ['', Validators.required],
      securityName: ['', Validators.required]
    });
    this.customerForm = this.fb.group({
      custName: ['', Validators.required],
      custShipTo: ['', Validators.required],
      custContactName: ['', Validators.required],
      custContactNo: ''
    });
    this.doControlDisable();
    // this.getDistinctOrgId();
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initItemRows()])
    });
    this.doApproveFormDisable();
    this.getAllMilkTransTypes();
    this.doSourceFormDisable();
    this.doFormDisable();
    this.getRouteType();
    this.getDistinctMaterialType();
    this.getCompartment();
    this.getAllLocationDetail();
  }
  get sf() { return this.SourceForm.controls; }
  get mc() { return this.milkChallanForm.controls; }
  get td() { return this.toDestinationForm.controls; }
  get l() { return this.loadingForm.controls; }
  get r() { return this.routDetailForm.controls; }
  get a() { return this.approveForm.controls; }
  get c() { return this.customerForm.controls; }
  // get c() { return this.newIndtLItem.controls; }
  getAllLocationDetail() {
    this.initiateTransferMilkService.getAllLocationDetail().subscribe(res => {
      this.allLocationDetails = res;
    });
  }
  getCompartment() {
    this.spinnerService.show();
    this.routeService.getCompartmentDropDownValues().subscribe(res => {
      this.compartments = res;
      this.spinnerService.hide();
    });
  }
  requestTypeChange(val) {
    this.initiateTransferMilkService.getItemsByTransferRequestType(val).subscribe(res => {
      this.requestTypeData = res;
    });
  }
  setDescription(rowIndex: any, data: any){
    this.requestTypeData.forEach(element => {
      if(element.itemCode==data){
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[rowIndex].patchValue({ materialDescription: element.itemDescription });
        this.getUom(element.itemId);
      }
    });
  }
  getUom(itemId){
    this.initiateTransferMilkService.getUOMByItemId(itemId).subscribe(res => {
      this.uomList = res;
    });
  }
  initItemRows() {
    return this.fb.group({
      compartment: ['COMP1', Validators.required],
      marterialCode: ['', Validators.required],
      materialDescription: ['', Validators.required],
      uom: ['0', Validators.required],
      quantity: ['0', Validators.required],
      temp: ['0', Validators.required],
      acidity: ['0', Validators.required],
      clr: ['0', Validators.required],
      fat: ['0', Validators.required],
      snf: ['0', Validators.required],
      sealNumber: ['', Validators.required],
      remarks: [''],
      dChTtemNo: '',
      itemId: '',
      lineNumber: ''
    })
  }
  doFormDisable() {
    this.milkChallanForm.controls['challanNumber'].disable();
    this.milkChallanForm.controls['shift'].disable();
    this.milkChallanForm.controls['time'].disable();
    this.loadingForm.controls['tarWeight'].disable();
    this.loadingForm.controls['grossWeight'].disable();
    this.loadingForm.controls['netWeight'].disable();
  }
  doSourceFormDisable() {
    this.SourceForm.controls['soNumber'].disable();
    this.SourceForm.controls['FromSource'].disable();
    // this.SourceForm.controls['ToSource'].disable();
  }
  doControlDisable() {
    this.SourceForm.controls['requestType'].disable();
  }
  doApproveFormDisable() {
    this.approveForm.controls['operatorName'].disable();
    this.approveForm.controls['qualityName'].disable();
    this.approveForm.controls['managerName'].disable();
    this.approveForm.controls['securityName'].disable();
  }

  getDistinctOrgId(locationId) {
    this.spinnerService.show();
    this.initiateTransferMilkService.getAllLocationByLocId(locationId).subscribe(res => {
      this.sourceDairyData = res;
      this.spinnerService.hide();
    });
  }
  getAllSubDestInvCodeByOrgId(val) {
    this.spinnerService.show();
    var orgId = val.split('/');
    this.initiateTransferMilkService.getAllSubInvCodeByOrgId(orgId[1]).subscribe(res => {
      this.destInventoryData = res;
      this.spinnerService.hide();
    });
  }
  getAllDestLocationBySubInvCode(val) {
    var subInvCode = val.split('/');
    this.spinnerService.show();
    this.initiateTransferMilkService.getAllLocationBySubInvCode(subInvCode[1]).subscribe(res => {
      this.destLocationData = res;
      this.spinnerService.hide();
    });
  }

  getAllLocationWithOrgSubInvtory() {
    this.spinnerService.show();
    this.initiateTransferMilkService.getAllLocationWithOrgSubInvtory().subscribe(res => {
      this.sourceDestinationData = res;
      this.spinnerService.hide();
    });
  }
  getCustomerSalesOrder(soNumber) {
    this.spinnerService.show();
    this.initiateTransferMilkService.getCustomerBySalesOrder(soNumber).subscribe(res => {
      this.customerAccountDetail = res;
      this.getCustomerDetailByShippingNumber(this.customerAccountDetail.customerNumber);
      this.spinnerService.hide();
    });
  }
  getCustomerDetailByShippingNumber(customerAccountNumber) {
    this.spinnerService.show();
    this.initiateTransferMilkService.getShippingDetailsByAccountNumber(customerAccountNumber).subscribe(res => {
      this.customerShippingDetail = res;
      this.spinnerService.hide();
      this.customerForm.patchValue({
        custName: this.customerShippingDetail.partyName ? this.customerShippingDetail.partyName : '',
        custShipTo: this.customerShippingDetail.siteAddress ? this.customerShippingDetail.siteAddress : '',
        custContactName: this.customerShippingDetail.custContactName ? this.customerShippingDetail.custContactName : '',
        // custContactNo: this.customerShippingDetail.partyName ? this.customerShippingDetail.partyName : ''
      });
    });
  }
  getMilkTransferByChallanNo() {
    // let challanNumber = 422;
    this.spinnerService.show();
    this.weighingBridgeService.getMilkTransferByChallanNo(this.challanNo).subscribe(
      res => {
        this.challanDetails = res;
        this.getAllSubDestInvCodeByOrgId(this.challanDetails.toInvOrgDesc + '/' + this.challanDetails.toOrgId + '/' + this.challanDetails.toOrgCode);
        this.getAllDestLocationBySubInvCode(this.challanDetails.toSubInvDesc + '/' + this.challanDetails.toSubInventory);
        if (this.challanDetails != null) {
          this.requestTypeChange(this.challanDetails.requestType);
          this.SourceForm.patchValue({
            FromSource: this.challanDetails.fromLocDesc ? this.challanDetails.fromLocDesc : '',
            requestType: this.challanDetails.requestType ? this.challanDetails.requestType : '',
            soNumber: this.challanDetails.sOnumber ? this.challanDetails.sOnumber : '',
            ToSource: this.challanDetails.toLocId ? this.challanDetails.toLocId : '',
          });
          if (this.challanDetails.requestType == "Bulk_Sales") {
            this.showCustomer = true;
            this.SourceForm.controls['soNumber'].enable();
          }
          this.milkChallanForm.patchValue({
            challanNumber: this.challanDetails.deliveryChallanNo ? this.challanDetails.deliveryChallanNo : '',
            status: this.challanDetails.status ? this.challanDetails.status : '',
            shift: this.challanDetails.shift ? this.challanDetails.shift : '',
            time: this.challanDetails.requestedTime ? this.challanDetails.requestedTime : ''
          });
          this.toDestinationForm.patchValue({
            // toDairy: this.challanDetails.toInvOrgDesc ? this.challanDetails.toInvOrgDesc : '',
            // toInventory: this.challanDetails.toSubInvDesc ? this.challanDetails.toSubInvDesc : '',
            // toLocation: this.challanDetails.toLocDesc ? this.challanDetails.toLocDesc : '',
            toDairy: this.challanDetails.toInvOrgDesc + '/' + this.challanDetails.toOrgId + '/' + this.challanDetails.toOrgCode,
            toInventory: this.challanDetails.toSubInvDesc + '/' + this.challanDetails.toSubInventory,
            toLocation: this.challanDetails.toLocDesc + '/' + this.challanDetails.toLocationId,
          });
          this.loadingForm.patchValue({
            tarWeight: this.challanDetails.loadTrarWt ? this.challanDetails.loadTrarWt : '',
            grossWeight: this.challanDetails.loadGrossWt ? this.challanDetails.loadGrossWt : '',
            netWeight: this.challanDetails.loadNetWt ? this.challanDetails.loadNetWt : ''
          });
          this.remarks = this.challanDetails.dcRemarks;
          if (this.challanDetails.routeNumber != null) {
            this.routDetailForm.patchValue({
              registered: 'register'
            });
            this.getRouteDetailsByRouteNumber(this.challanDetails.routeNumber);
            this.routeRegister('register');
          } else {
            this.routDetailForm.patchValue({
              routeType: this.challanDetails.routeType ? this.challanDetails.routeType : '',
              routeNumber: this.challanDetails.routeNumber ? this.challanDetails.routeNumber : '',
              vehicleNumber: this.challanDetails.vehicleNumber ? this.challanDetails.vehicleNumber : '',
              driverName: this.challanDetails.driverName ? this.challanDetails.driverName : '',
              transporterName: this.challanDetails.transporterName ? this.challanDetails.transporterName : '',
              vehicleType: this.challanDetails.vehicleType ? this.challanDetails.vehicleType : '',
              capacity: this.challanDetails.capacityInKg ? this.challanDetails.capacityInKg : ''
            });
          }
          if (this.challanDetails.custName != '') {
            this.customerForm.patchValue({
              custName: this.challanDetails.custName ? this.challanDetails.custName : '',
              custShipTo: this.challanDetails.custShipTo ? this.challanDetails.custShipTo : '',
              custContactName: this.challanDetails.custContactName ? this.challanDetails.custContactName : '',
              custContactNo: this.challanDetails.custContactNo ? this.challanDetails.custContactNo : ''
            });
          } else {
            this.getCustomerSalesOrder(this.challanDetails.sOnumber);
          }
          this.remarks=this.challanDetails.reqRemarks;
          this.getDistinctOrgId(this.challanDetails.toLocId);
          if (this.challanDetails.deliveryLItem.length > 0) {
            for (let i = 0; i < this.challanDetails.deliveryLItem.length; i++) {
              if (i > 0) {
                this.addNewRow();
              }
              this.getUom(this.challanDetails.deliveryLItem[i].itemId);
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ compartment: (this.challanDetails.deliveryLItem[i].compertment) ? this.challanDetails.deliveryLItem[i].compertment : 'CABIN' });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ marterialCode: this.challanDetails.deliveryLItem[i].itemCode });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ materialDescription: this.challanDetails.deliveryLItem[i].itemDescription });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ uom: this.challanDetails.deliveryLItem[i].uom });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ quantity: this.challanDetails.deliveryLItem[i].requiredQty });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ temp: this.challanDetails.deliveryLItem[i].loadTimeTemp });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ acidity: this.challanDetails.deliveryLItem[i].loadedAcidity });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ clr: this.challanDetails.deliveryLItem[i].loadedCLR });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ fat: this.challanDetails.deliveryLItem[i].loadedFat });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ snf: this.challanDetails.deliveryLItem[i].loadedSNF });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ sealNumber: this.challanDetails.deliveryLItem[i].sealNumber });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ remarks: this.challanDetails.deliveryLItem[i].remarks });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ dChTtemNo: this.challanDetails.deliveryLItem[i].dChTtemNo });
              (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ itemId: this.challanDetails.deliveryLItem[i].itemId });
              this.MaterialForm.patchValue({
                materialType: this.challanDetails.deliveryLItem[i].materialType 
              });
            }
          }
        }
        this.spinnerService.hide();
      },
    );
  }
  getRouteDetailsByRouteNumber(route: number) {
    this.spinnerService.show();
    this.weighingBridgeService.getRouteDetailsByRouteNumber(route).subscribe(
      res => {
        this.routeDetail = res;
        //console.log('this.routeDetail',this.routeDetail)
        if (this.routeDetail != null) {
          this.routDetailForm.patchValue({
            routeType: this.routeDetail.routeType,
            routeNumber: this.routeDetail.routeNumber,
            vehicleNumber: this.routeDetail.vehicleNumber,
            vehicleType: this.routeDetail.vehicleType,
            capacity: this.routeDetail.vehicleCapInKg,
            driverName: this.routeDetail.driverName,
            transporterName: this.routeDetail.transporterName
            //registered: 'register'
          });
        }
        this.selectRouteType(this.routeDetail.routeType);
        // if(this.routeDetail==null&&this.index>6) {
        //   this.toastr.error('Route information not found', 'Record Not Founde', {
        //     timeOut: 2000
        //   });
        // }
        this.spinnerService.hide();
      },
    );
  }
  getAllMilkTransTypes() {
    this.spinnerService.show();
    this.initiateTransferMilkService.getAllMilkTransTypes().subscribe(res => {
      this.milkTransferType = res;
      this.spinnerService.hide();
    });
  }
  // calculateNetWeight(){
  //   // //console.log('calldeee')
  //   this.loadingForm.patchValue({
  //     tarWeight: this.challanDetails.loadTrarWt ? this.challanDetails.loadTrarWt : '',
  //     grossWeight: this.challanDetails.loadGrossWt ? this.challanDetails.loadGrossWt : '',
  //     netWeight: this.challanDetails.loadNetWt ? this.challanDetails.loadNetWt : ''
  //   });
  //   let netWeight = parseInt(this.loadingForm.value.grossWeight) - parseInt(this.loadingForm.value.tarWeight);
  //   // //console.log('netWeight',netWeight)
  //   if(this.loadingForm.value.tarWeight >0 && this.loadingForm.value.grossWeight>0){
  //     if(this.loadingForm.value.tarWeight < this.loadingForm.value.grossWeight){
  //       this.loadingForm.patchValue({
  //         netWeight : netWeight,
  //       })
  //       this.isGrossWeightCorrect = true;
  //     } else {
  //       this.isGrossWeightCorrect = false;
  //       this.toastr.error('Tar weight should be less then gross weight', '', {
  //         timeOut: 2000
  //       });
  //       this.loadingForm.patchValue({
  //         netWeight : 0
  //       })
  //     }
  //   } else {
  //     this.loadingForm.patchValue({
  //       netWeight : 0
  //     })
  //   }

  // }
  routeRegister(radioValue) {
    if (radioValue === 'register') {
      this.routDetailForm.controls['routeNumber'].enable();
      this.routDetailForm.controls['routeType'].enable();
      this.routDetailForm.controls['vehicleNumber'].disable();
      this.routDetailForm.controls['vehicleType'].disable();
      this.routDetailForm.controls['capacity'].disable();
      this.routDetailForm.controls['driverName'].disable();
      this.routDetailForm.controls['transporterName'].disable();
    } else {
      this.routDetailForm.patchValue({
        routeType: '',
        routeNumber: ''
      });
      this.routDetailForm.controls['routeType'].disable();
      this.routDetailForm.controls['routeNumber'].disable();
      this.routDetailForm.controls['vehicleNumber'].enable();
      this.routDetailForm.controls['vehicleType'].enable();
      this.routDetailForm.controls['capacity'].enable();
      this.routDetailForm.controls['driverName'].enable();
      this.routDetailForm.controls['transporterName'].enable();
    }
  }
  addNewRow() {
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
  }
  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }
  snfCalculate(index) {
    //(clr/4)+(0.25*fat)+0.35
    let snf = (parseFloat(this.CreateIndentLineItem.controls.newIndtLItem.value[index].clr) / 4) + (0.25 * parseFloat(this.CreateIndentLineItem.controls.newIndtLItem.value[index].fat)) + 0.35;
    (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ snf: snf });
  }
  getRouteType() {
    this.spinnerService.show();
    this.routeService.getDropDownValues().subscribe(res => {
      this.routeType = res;
      this.spinnerService.hide();
      // //console.log('this.routeType',this.routeType)
    });
  }
  selectRouteType(routeType) {
    this.routyeNumber = [];
    this.spinnerService.show();
    this.routeService.getDistinctTripRoutesbyRouteType(routeType).subscribe(res => {
      this.allRoutes = res;
      // //console.log('this.allRoutes',this.allRoutes)
      if (this.allRoutes.length > 0) {
        for (let index = 0; index < this.allRoutes.length; index++) {
          if (this.allRoutes[index].routeType == routeType) {
            this.routyeNumber.push({
              routeNumber: this.allRoutes[index].routeNumber
            });
          }
        }
        this.spinnerService.hide();
        // //console.log('this.routyeNumber',this.routyeNumber)
      }
    });
  }
  getDistinctMaterialType() {
    this.initiateTransferMilkService.getDistinctMaterialType().subscribe(res => {
      this.materialTypeDetails = res;
    });
  }
  submit() {
    this.submited = true;
    this.itemArray = [];
    let customerFormValid=false;
    if(this.showCustomer==false){
      customerFormValid=false;
    } else {
      customerFormValid=this.customerForm.invalid;
    }
    //console.log('this.CreateIndentLineItem.invalid',this.CreateIndentLineItem.invalid)
    //console.log('this.SourceForm.invalid',this.SourceForm.invalid)
    //console.log('this.milkChallanForm.invalid',this.milkChallanForm.invalid)
    //console.log('this.toDestinationForm.invalid',this.toDestinationForm.invalid)
    //console.log('this.loadingForm.invalid',this.loadingForm.invalid)
    //console.log('this.routDetailForm.invalid',this.routDetailForm.invalid)
    //console.log('customerFormValid',customerFormValid)
    if (this.CreateIndentLineItem.invalid || this.SourceForm.invalid || this.milkChallanForm.invalid || this.toDestinationForm.invalid || this.loadingForm.invalid || this.routDetailForm.invalid || customerFormValid) {
      this.toastr.error('Please provide your inputs on required fields', 'Required', {
        timeOut: 2000
      });
    } else {
      this.loadingForm = this.fb.group({
        tarWeight: ['', Validators.required],
        grossWeight: ['', Validators.required],
        netWeight: ['', Validators.required]
      });
      this.CreateIndentLineItem.controls.newIndtLItem.value.forEach(e => {
        this.itemArray.push({
          "itemId": e.itemId,
          "itemCode": e.marterialCode,
          "itemDescription": e.materialDescription,
          "dChTtemNo": e.dChTtemNo,
          "lineNumber": e.lineNumber,
          "compertment": e.compartment,
          // "srcTareWt": this.loadingForm.value.tarWeight,
          // "srcGrossWt": this.loadingForm.value.grossWeight,
          "receivedQty": e.quantity,
          "receivedFat": e.fat,
          "receivedSNF": e.snf,
          "receivedCLR": e.clr,
          "receivedAcidity": e.acidity,
          "recdTimeTemp": e.temp,
          "sealRemarks": e.remarks,
          "trgtGrossWt": this.loadingForm.value.tarWeight,
          "trgtTareWt": this.loadingForm.value.grossWeight,
          // "receivedQty": 0.0,
          // "receivedFat": 0.0,
          // "receivedSNF": 0.0,
          // "receivedCLR": null,
          // "receivedAcidity": 0.0,
          // "recdTimeTemp": 0.0,
          // "noOfcans": null,
          "materialType": this.MaterialForm.value.materialType,
          // "lineNumber": null,
          // "compertment": null,
          "requiredQty": e.quantity,
          "uom": e.uom,
          // "loadType": null,
          "sealNumber": e.sealNumber,
          "recordCreationDate": this.challanDetails.recordCreationDate,
          "recordCreationBy": this.challanDetails.recordCreationBy,
          "lastUpdateDate": JSON.parse(localStorage.getItem('data')).userId,
          // "lastUpdateBy": null
        })
      })
      const toDairy = this.toDestinationForm.value.toDairy.split('/');
      const toInventory = this.toDestinationForm.value.toInventory.split('/');
      const toLocation = this.toDestinationForm.value.toLocation.split('/');
      let postData = {
        "deliveryChallanNo": this.challanDetails.deliveryChallanNo,
        "requestType": this.challanDetails.requestType,
        "status": this.milkChallanForm.value.status,
        "fromOrgId": this.challanDetails.fromOrgId,
        "toOrgId": toDairy[1],
        "fromLocationId": this.challanDetails.fromLocationId,
        "toLocationId": toLocation[1],
        "fromSubInventory": this.SourceForm.value.FromSource,
        "toSubInventory": toInventory[1],
        "fromOrgCode": this.challanDetails.fromOrgCode,
        "toOrgCode": toDairy[2],
        "fromLocDesc": this.challanDetails.fromLocDesc,
        "toLocDesc": toLocation[0],
        "fromSubInvDesc": this.challanDetails.fromSubInvDesc,
        "toSubInvDesc": toInventory[0],
        "fromInvOrgDesc": this.challanDetails.fromInvOrgDesc,
        "toInvOrgDesc": toDairy[0],
        "requestedDate": this.challanDetails.requestedDate,
        "requestedTime": this.challanDetails.requestedTime,
        "itemId": this.challanDetails.itemId,
        "itemCode": this.challanDetails.itemCode,
        "itemDescription": this.challanDetails.itemDescription,
        "requiredQty": this.challanDetails.requiredQty,
        "requiredFAT": this.challanDetails.requiredFAT,
        "requiredSNF": this.challanDetails.requiredSNF,
        "requiredRemarks": this.challanDetails.requiredRemarks,
        "requestedBy": this.challanDetails.requestedBy,
        "department": this.challanDetails.department,
        "shift": this.milkChallanForm.value.shift,
        "sOnumber": this.SourceForm.value.soNumber,
        "pOnumber": this.challanDetails.pOnumber,
        "fromSubinvCode": this.challanDetails.fromSubinvCode,
        "toSubinvCode": this.challanDetails.toSubinvCode,
        "custNumber": this.challanDetails.custNumber,
        "custName": (this.customerForm.value.custName) ? this.customerForm.value.custName : this.challanDetails.custName,
        "custShipTo": (this.customerForm.value.custShipTo) ? this.customerForm.value.custShipTo : this.challanDetails.custShipTo,
        "custContactNo": (this.customerForm.value.custContactNo) ? this.customerForm.value.custContactNo : this.challanDetails.custContactNo,
        "custContactName": (this.customerForm.value.custContactName) ? this.customerForm.value.custContactName : this.challanDetails.custContactName,
        "reqRemarks": this.challanDetails.reqRemarks,
        "reqdQty": this.challanDetails.reqdQty,
        "routeType": this.routDetailForm.value.routeType,
        "routeNumber": this.routDetailForm.value.routeNumber,
        "vehicleNumber": this.routDetailForm.value.vehicleNumber,
        "vehicleType": this.routDetailForm.value.vehicleType,
        "driverName": this.routDetailForm.value.driverName,
        "transporterName": this.routDetailForm.value.transporterName,
        "capacityInKg": this.challanDetails.capacityInKg,
        "loadingSource": this.challanDetails.loadingSource,
        "loadTrarWt": this.loadingForm.value.tarWeight,
        "loadDate": this.challanDetails.loadDate,
        "loadTime": this.milkChallanForm.value.time,
        "loadGrossWt": this.loadingForm.value.grossWeight,
        "loadGrossdate": this.challanDetails.loadGrossdate,
        "loadGrossTime": this.challanDetails.loadGrossTime,
        "loadNetWt": this.loadingForm.value.netWeight,
        "wbOprtAproval": this.challanDetails.wbOprtAproval,
        "qltyApprover": this.challanDetails.qltyApprover,
        "mgrApprover": this.challanDetails.mgrApprover,
        "depertureDate": this.challanDetails.depertureDate,
        "depertureTime": this.challanDetails.depertureTime,
        "secuVerifiedBy": this.challanDetails.secuVerifiedBy,
        "securityRemarks": this.challanDetails.securityRemarks,
        "loadedRemarks": this.challanDetails.loadedRemarks,
        "arrivalDate": this.challanDetails.arrivalDate,
        "arrivalTime": this.challanDetails.arrivalTime,
        "arrivalVrfyBy": this.challanDetails.arrivalVrfyBy,
        "arrivalSecRemarks": this.challanDetails.arrivalSecRemarks,
        "recvRemarks": this.challanDetails.recvRemarks,
        "transRemarks": this.challanDetails.transRemarks,
        "dcRemarks": (this.remarks) ? this.remarks : this.challanDetails.dcRemarks,
        "receiveSource": this.challanDetails.receiveSource,
        "recvTargetWt": this.challanDetails.recvTargetWt,
        "receiveDate": this.challanDetails.receiveDate,
        "receiveTime": this.challanDetails.receiveTime,
        "recvGrossWeight": this.challanDetails.recvGrossWeight,
        "recvNetWeight": this.challanDetails.recvNetWeight,
        "receiveGrossDate": this.challanDetails.receiveGrossDate,
        "receiveGrossTime": this.challanDetails.receiveGrossTime,
        "recvWBOpeApprove": this.challanDetails.recvWBOpeApprove,
        "recvQytApprover": this.challanDetails.recvQytApprover,
        "recvMgrAprove": this.challanDetails.recvMgrAprove,
        "quantityInKg": this.challanDetails.quantityInKg,
        "recordCreationDate": this.challanDetails.recordCreationDate,
        "recordCreationBy": this.challanDetails.recordCreationBy,
        "lastUpdateDate": this.challanDetails.lastUpdateDate,
        "lastUpdateBy": this.challanDetails.lastUpdateBy,
        "deliveryLItem": this.itemArray
      }
      this.spinnerService.show();
      this.weighingBridgeService.saveMilkTransHdr(postData).subscribe(
        res => {
          // //console.log('res',res)
          if (res) {
            this.toastr.success('Record updated successfully', 'Success', {
              timeOut: 2000
            });
          }
          this.spinnerService.hide();
        });
    }
  }
}
