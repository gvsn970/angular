import { Component, OnInit } from '@angular/core';
// import { CreateIndentService } from '../../shared/components/services/create-indent.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
// import { SalesOrderLineItem } from '../../shared/components/model/sales-order-line-item';
// import { SalesOrderHeader } from '../../shared/components/model/sales-order-header ';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
import { CreateIndentService } from 'src/app/screens/customer-order-screens/shared/components/services/create-indent.service';

@Component({
  selector: 'app-pandi-indent',
  templateUrl: './pandi-indent.component.html',
  styleUrls: ['./pandi-indent.component.css']
})
export class PandiIndentComponent implements OnInit {
  totalTax: any[] = [];
  custBilling: any;
  occupations: any;
  custNm: any;
  custAdress: any;
  objArray: any;
  itemCodeDesc: any = [];
  CreateIndentLineItem: FormGroup;
  categories: any;
  submitted = false;
  formSubmitted = false;
  category: string;
  names: any;
  name: any;
  selectedAll: any;
  test: any[] = [];
  data: any;
  orders: any;
  shft: any[] ;
  status: any[] = ['New'];
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  oderTyp: any;
  shift: any;
  priceLstNm: object;
  allCatgeries: any;

  price: any;
  total: any;
  taxamount: any;
  taxs: number;
  unit: any;
  myArray: any[] = [];
  customerShippingDetails: any;
  customerBillingDetails: any;
  modalRef: BsModalRef;
  systemDt: string;
  sum: any;
  sumTotal: any = 0;
  sumTax = 0;
  amountTopay = 0;
  showAdd: any = false;
  createIndentSaved: Object;
  SalesOrderHeader: FormGroup;
  orderItems: FormArray;
  date: Date = new Date();
  indentUpdate: any;
  balaceNo: Object;
  priceListId: any;
  craPlaceHolder = 'Crates';
  pktPlaceHolder = 'Packets';
  enableCratesField = false;
  enablepacketsField = false;
  categoiesArray: any = [];
  itemArray: any = [];
  conversionRate: any = [];
  items: any;
  PPC = 20;
  taxPercentages: any = [];
  itemPrice: any = [];
  newTotal: any;
  taxTotal: any;
  conversionPPC: any;
  priceLstId: any;
  addMore = true;
  isSave = true;
  message: string;
  listItemOnHandQuantityByOrderedItem: any;
  listSumOfOrderedQunatityByLineStatusAndItemCode: any;
  shipToAdress: Object;
  oderTypName = false;
  indentNO: any;
  itemDetails: string;
  accountNumber: any;
  porttalData: any;
  isMIAvailable: Object;
  isCIAvailable: boolean;
  nextDt: string;
  deliveryDate: any;
  timer: any;
  time = new Date();
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private CreateIndentService: CreateIndentService) {
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        minDate: new Date(),
      });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.systemDt = datePipe.transform(this.date, 'dd-MM-yyyy');
    this.data = JSON.parse(localStorage.getItem('data'));
    this.accountNumber = this.data.accountNumber;
  }

  ngOnInit() {
    this.SalesOrderHeader = this.fb.group({
      // source:'CREATE',
      invoiceToOrgId: '',
      paymentTermId: '',
      priceListId: '',
      salesRepId: '',
      shipToOrgId: '',
      shipFromOrgId: '',
      soldFromOrgId: '',
      soldToOrgId: '',
      orgId: '',
      shift: ['', [Validators.required]],
      status: '',
      promiseDate: '',
      requestDate: this.systemDt,
      bookedFlag: '',
      cancelledFlag: '',
      freightTermsCode: '',
      orderSourceId: '',
      orderedDate: '',
      origSysDocumnetRef: '',
      pricingDate: '',
      shippingMethodCode: '',
      transactionalCurrencyCode: '',
      accountNumber: '',
      orderNumber: '',
      seq: '',
      route: '',
      orderTypeId: '',
      orderItems: this.fb.array([])
    });
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([])
    });
    this.getCustShippingDetailsByAcctNo();
    this.getCustBillingDetailsByAcctNo();
    this.getCustomerBalanceByAcctNo();
    this.timer = setInterval(() => {
      this.time = new Date();
      const timeNow: any = this.datePipe.transform(new Date(), 'HH:mm:ss');
      if(timeNow >= "10:30:01" && timeNow <= "15:59:59") {
        this.shft = ['M'];
          } else if (timeNow >= "00:00:01" && timeNow <= "08:59:59") {
        this.shft = ['E'];
          } else{
            this.shft = [' Indent creation not allowed now.'];
          }
    }, 3000);
  }
  getOrderTypeName() {
    this.formArr.removeAt(0);
    let shift = this.SalesOrderHeader.controls.shift.value;
    let custShiftVal1 = this.customerShippingDetails.shift1;
    let custShiftVal2 = this.customerShippingDetails.shift2;
    if (shift == custShiftVal1) {
      this.SalesOrderHeader.patchValue({
        route: this.customerShippingDetails.route1,
        seq: this.customerShippingDetails.rtSequence1,
        orderTypeId: this.customerShippingDetails.orderTypeId,
      })
      this.CreateIndentService.getOrderTypeName(this.customerShippingDetails.orderTypeId).
        subscribe(res => {
          this.oderTyp = res;
          this.oderTypName = true;
        });
    } else if (shift == custShiftVal2) {
      this.SalesOrderHeader.patchValue({
        route: this.customerShippingDetails.route2,
        seq: this.customerShippingDetails.rtSequence2,
        orderTypeId: this.customerShippingDetails.secondaryOrdTypeId,
      })
      this.CreateIndentService.getOrderTypeName(this.customerShippingDetails.secondaryOrdTypeId).
        subscribe(res => {
          this.oderTyp = res;
          this.oderTypName = true;
        });
    }
    this.setDeliveryDateAndShift();
      }

  validateMIAvailableAndPortalAvailable(){
    this.CreateIndentService.getSalesOrderByShipToSiteUseIdAndBookingDateAndDeliveryDateAndShiftId(
      this.accountNumber, this.systemDt, this.SalesOrderHeader.value.promiseDate , this.SalesOrderHeader.value.shift).subscribe(res => {
        this.porttalData = res;
        if (this.porttalData.length == 0) {
          this.isCIAvailable = false;
        } else {
          this.isCIAvailable = true;
        }
        this.CreateIndentService.validateMIAvailable(this.accountNumber, this.SalesOrderHeader.value.shift, this.systemDt,
          this.systemDt).subscribe(res => {
            this.isMIAvailable = res;
            this.enableAndDisabled(this.isMIAvailable, this.isCIAvailable)
          });
      })
  }

  setDeliveryDateAndShift() {
    const timeNow: any = this.datePipe.transform(new Date(), 'HH:mm:ss');
    var date = new Date();
    if(timeNow >= "10:30:01" && timeNow <= "15:59:59") {
        date.setDate(date.getDate() + 1);
      this.deliveryDate = this.datePipe.transform(date, 'dd-MM-yyyy');
      this.SalesOrderHeader.patchValue({ promiseDate: this.deliveryDate })
      this.validateMIAvailableAndPortalAvailable();
    } else if (timeNow >= "00:00:01" && timeNow <= "08:59:59") {
        date.setDate(date.getDate() + 0);
      this.deliveryDate = this.datePipe.transform(date, 'dd-MM-yyyy');
      this.SalesOrderHeader.patchValue({ promiseDate: this.deliveryDate })
      this.validateMIAvailableAndPortalAvailable();
      }  else{
           this.addMore = true;
        this.toastr.error('  Indent creation not allowed now.', 'Create  Indent!', {
          timeOut: 2000
        });
      }
  }


  enableAndDisabled(isMIAvailable, isCIAvailablee) {
    if (isMIAvailable == true || isCIAvailablee == true) {
      this.addMore = true;
      if (isMIAvailable) {
        this.toastr.error(' Already MI available in date range', 'Create  Indent!', {
          timeOut: 2000
        });
      } else {
        this.toastr.error(' Already  Indent is available', 'Create  Indent!', {
          timeOut: 2000
        });
      }
    } else {
      this.addMore = false;
      this.addNewRow();
    }
  }

  getCustomerBalanceByAcctNo() {
    this.CreateIndentService.getCustomerBalanceByAcctNo(this.accountNumber).subscribe(
      res => {
        this.balaceNo = res;
      });
  }

  getCustBillingDetailsByAcctNo() {
    this.CreateIndentService.getCustBillingDetailsByAcctNo(this.accountNumber).subscribe(res => {
      this.customerBillingDetails = res;
    })
  }

  getCustShippingDetailsByAcctNo() {
    this.CreateIndentService.getCustShippingDetailsByAcctNo(this.accountNumber).subscribe(res => {
      this.customerShippingDetails = res[0];
      this.shipToAdress = res;
      if (this.customerShippingDetails.secondaryOrdTypeId == null) {
        this.shft = ['M'];
      }
      this.getCategoriesByPriceListId();
    });
  }

  getCategoriesByPriceListId() {
    this.CreateIndentService.getCategoriesByPriceListId(this.customerShippingDetails.priceListId).subscribe(
      res => {
        this.allCatgeries = res;
      });
  }

  getPriceListByPriceListIdAndOrderType(subCategory, i) {
    this.spinner.show();
    this.CreateIndentService.getPriceListByPriceListIdAndOrderTypeIdAndCategory(
      this.customerShippingDetails.priceListId, this.SalesOrderHeader.value.orderTypeId, subCategory).subscribe((response) => {
        this.itemCodeDesc = response;
        this.spinner.hide();
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ price: this.price });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
          patchValue({ dp: this.itemCodeDesc });
      });
  }
  getItemOnHandQuantityByOrderedItem(itemCode) {
    this.CreateIndentService.getItemOnHandQuantityByOrderedItem(itemCode).subscribe(res => {
      this.listItemOnHandQuantityByOrderedItem = res;
    })
  }

  getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom(itemCode) {
    this.CreateIndentService.getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom(itemCode.itemCode, itemCode.uom).subscribe(res => {
      this.listSumOfOrderedQunatityByLineStatusAndItemCode = res;
    })
  }


  stockAvailabilityCheck(field, i) {
    let avoilToOrderInEBS = 0;
    let balanceOnHandQty = 0;
    if (this.listItemOnHandQuantityByOrderedItem == null) {
      avoilToOrderInEBS = 0
    } else {
      avoilToOrderInEBS = this.listItemOnHandQuantityByOrderedItem[0].avoilToOrder;
    }
    if (avoilToOrderInEBS <= 0) {
      this.addMore = true;
      this.toastr.info('Enough stock not available', 'Update Indent', {
        timeOut: 2000,
      });
      this.resetCrtAndPacket(i, field)
    } else {
      if (field.value.itemDesc.sellingUOM == "PKT") {
        balanceOnHandQty = avoilToOrderInEBS - field.value.packets;
      } else {
        balanceOnHandQty = avoilToOrderInEBS - (field.value.crt * field.value.itemDesc.ppc)
      }

      if (balanceOnHandQty < 0) {
        this.toastr.info('Enough stock not available', 'Update Indent', {
          timeOut: 2000,
        });
        this.addMore = true;
        this.resetCrtAndPacket(i, field)
      }
    }
  }
  resetCrtAndPacket(i, field) {
    if (field.value.packets) {
      const c = this.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
      const d = c.controls[i] as FormGroup;
      d.controls.packets.reset();
    } else if (field.value.crt) {
      const a = this.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
      const b = a.controls[i] as FormGroup;
      b.controls.crt.reset();
    }

  }


  itemCode(i, field) {
    let index = 0;
    if (field.value.itemDesc.subCategory == "Dairy Sweets" || field.value.itemDesc.subCategory == "Milk Product") {
      this.getItemOnHandQuantityByOrderedItem(field.value.itemDesc.itemCode);
      this.getSumOfOrderedQunatityByLineStatusAndItemCodeAndUom(field.value.itemDesc);
    }
    (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({
      price: field.value.itemDesc.itemPrice
    });
    const a = this.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
    const b = a.controls[i] as FormGroup;
    this.CreateIndentLineItem.controls.newIndtLItem.value.forEach(items => {
      if (index != i) {
        if (items.itemDesc.itemCode ==
          this.CreateIndentLineItem.controls.newIndtLItem.value[i].itemDesc.itemCode) {
          this.isSave = true;
          this.addMore = true;
          b.controls.crt.disable();
          b.controls.packets.disable();
          this.toastr.error('Item is already added in the Update  Indent', 'Update Indent', {
            timeOut: 2000
          });
          return
        } else {
          this.isSave = false;
          this.enableDisableQtyFields(field.value.itemDesc.sellingUOM, i, field.value.itemDesc.itemId);
        }
      }
      index += 1;
      this.enableDisableQtyFields(field.value.itemDesc.sellingUOM, i, field.value.itemDesc.itemId);
    });

  }


  enableDisableQtyFields(sellingUOM, i, itemId) {
    if (sellingUOM == 'CRA' || sellingUOM == "TIN" || sellingUOM == "BOX") {
      this.craPlaceHolder = 'Crates';
      this.enableCratesField = true;
      this.enablepacketsField = false;
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
        patchValue({ craPlaceHolder: this.craPlaceHolder });
      this.CreateIndentService.getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode(itemId).subscribe(data => {
        this.conversionPPC = data;
        if (data == null) {
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
            patchValue({ ppc: 1 });
        } else {
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
            patchValue({ ppc: this.conversionPPC.conversionRate });
        }
      });
    }
    else {
      this.enablepacketsField = true;
      this.enableCratesField = false;
    }
    const a = this.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
    const b = a.controls[i] as FormGroup;
    if (this.enableCratesField) {
      b.controls.crt.enable();
      b.controls.crt.reset();
    } else {
      b.controls.crt.disable();
      b.controls.crt.reset();
    }

    const c = this.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
    const d = c.controls[i] as FormGroup;
    if (this.enablepacketsField) {
      d.controls.packets.enable();
      d.controls.packets.reset();
    } else {
      d.controls.packets.disable();
      d.controls.packets.reset();
    }
  }

  focusOutFunction() {
    const th = this;
    setTimeout(function () {
      var total = 0;
      th.sumTotal = 0;
      for (var i = 0; i < th.CreateIndentLineItem.value.newIndtLItem.length; i++) {
        total = parseFloat((document.getElementById('amount-' + i) as HTMLInputElement).value);
        th.sumTotal += total;
      }
    }, 2000);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get formArr() {
    return this.CreateIndentLineItem.get('newIndtLItem') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      crt: ['', [Validators.required, Validators.maxLength(4)]],
      packets: ['', [Validators.required, Validators.maxLength(4),]],
      price: '',
      value: '',
      tax: '',
      amount: '',
      category: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      dp: ['', [Validators.required]],
      pktPlaceHolder: '',
      craPlaceHolder: '',
      ppc: '',
    });
  }


  addNewRow() {
    this.submitted = false;
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
    this.taxPercentages.push(0);
    this.addMore = true;
    this.isSave = true;
  }

  checkValidation(value, i, field) {

    if (value > 0) {
      this.addMore = false;
      this.isSave = false;
    } else {
      this.addMore = true;
      this.isSave = true;
    }
    let index = 0;
    this.CreateIndentLineItem.controls.newIndtLItem.value.forEach(items => {
      if (index != i) {
        if (items.itemDesc.itemCode == this.CreateIndentLineItem.controls.newIndtLItem.value[i].itemDesc.itemCode) {
          this.addMore = true;
          return
        } else {
          this.addMore = false;
        }
      } else {
        this.isSave = false;
      }
      index += 1;
    });


    let minOrderQty = parseInt(field.value.itemDesc.minOrderQty);
    let fieldValue = 0;
    if (minOrderQty == null || minOrderQty == 1) {
      //Do Nothing
    } else {
      if (field.value.itemDesc.sellingUOM = 'PKT') {
        fieldValue = parseInt(field.value.packets);
      } else {
        fieldValue = parseInt(field.value.crt);
      }
      let minOrderCheckValue = (fieldValue % minOrderQty);
      if (minOrderCheckValue != 0) {
        this.addMore = true;
        this.toastr.info(' "Order Minimum ' + minOrderQty + ' Packets or Multiples of ' + minOrderQty, 'Update Indent', {
          timeOut: 2000
        });
        this.resetCrtAndPacket(i, field)
      }
    }
    let itemCode = field.value.itemDesc.itemCode;
    if (itemCode != 'CU200' && itemCode != 'CU500' && itemCode != 'CU1000') {
      if (field.value.itemDesc.subCategory == "Dairy Sweets" || field.value.itemDesc.subCategory == "Milk Product") {
        this.stockAvailabilityCheck(field, i);
      }
    }

    if (!value && this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt == "" &&
      this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets == "") {
      this.addMore = true;
      this.isSave = true;
    }
    if (!value && this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt == "") {
      this.addMore = true;
      this.isSave = true;
    }
    if (!value && this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets == "") {
      this.addMore = true;
      this.isSave = true;
    }
    if (!value && this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt != ""
      && this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets == "" &&
      this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt != undefined &&
      this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets != undefined) {
      this.addMore = false;
      this.isSave = true;
    }
    if (!value && this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt == ""
      && this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets != "" &&
      this.CreateIndentLineItem.controls.newIndtLItem.value[i].crt != undefined &&
      this.CreateIndentLineItem.controls.newIndtLItem.value[i].packets != undefined) {
      this.addMore = false;
      this.isSave = true;
    }
  }


  submit(form: NgForm) {
    this.submitted = true;
    if (this.SalesOrderHeader.invalid) {
      return;
    }
    if (this.CreateIndentLineItem.invalid) {
      return;
    }

    this.SalesOrderHeader.patchValue({
      gst: this.customerBillingDetails.gst,
      panNumber: this.customerBillingDetails.panNumber,
      invoiceToOrgId: this.customerBillingDetails.siteUseId,
      paymentTermId: this.customerShippingDetails.sitePaymentTermId,
      priceListId: this.customerShippingDetails.sitePriceListId,
      salesRepId: this.customerBillingDetails.primarySalesRepId,
      shipToOrgId: this.customerShippingDetails.siteUseId,
      requestDate: this.systemDt,
      promiseDate: this.SalesOrderHeader.value.promiseDate,
      shipFromOrgId: this.customerShippingDetails.siteWareHouseId,
      soldFromOrgId: this.customerShippingDetails.orgId,
      soldToOrgId: this.customerShippingDetails.customerAccountId,
      transactionalCurrencyCode: 'INR',
      orgId: this.customerShippingDetails.siteOrgId,
      status: 'NEW',
      bookedFlag: 'Y',
      cancelledFlag: 'N',
      freightTermsCode: this.customerShippingDetails.siteFreightTerm,
      orderSourceId: 0,
      orderedDate: this.systemDt,
      pricingDate: this.systemDt,
      shippingMethodCode: '000001_TG_R_GND',
      soldToPartyId: 5042,
      transactionCurrencyCode: 'INR',
      accountNumber: this.customerShippingDetails.accountNumber,
    });

    this.orderItems = this.SalesOrderHeader.get('orderItems') as FormArray;
    this.itemDetails = '';
    form.value.newIndtLItem.forEach(e => {
      let PacketAndCrt;
      let orderQty;
      if (e.crt === undefined) {
        PacketAndCrt = e.packets + 'P,';
        orderQty = e.packets;
      } else if (e.packets === undefined) {
        orderQty = e.crt * e.ppc;
        PacketAndCrt = e.crt + 'C,';
      } else {
        orderQty = (e.crt * e.ppc) + e.packets;

      }
      this.itemDetails += e.itemDesc.itemCode + ":" + PacketAndCrt;
      this.orderItems.push(this.fb.group({
        orgId: this.customerShippingDetails.siteOrgId,
        shippedQuantity: 0,
        shippingMethodCode: '000001_TG_R_GND',
        lineTypeId: e.itemDesc.lineTypeId,
        status: 'NEW',
        soldFromOrgId: this.customerShippingDetails.orgId,
        soldToOrgId: this.customerShippingDetails.customerAccountId,
        inventoryItemId: e.itemDesc.itemId,
        category: e.category,
        qtyCrates: e.crt,
        qtyPackets: e.packets,
        description: e.itemDesc.description,
        itemCode: e.itemDesc.itemCode,
        orderQuantityUOM: e.itemDesc.uom,
        orderQuantity: orderQty,
        priceListId: this.customerShippingDetails.sitePriceListId,
        pricingDate: this.systemDt,
        shipFromOrgId: this.customerShippingDetails.siteWareHouseId,
        subInventory: null,
        unitListPrice: e.itemDesc.itemPrice,
        uom: e.itemDesc.sellingUOM,
        unitSellingPrice: parseInt(e.itemDesc.itemPrice),
        requestDate: this.systemDt,
        promiseDate: this.SalesOrderHeader.value.promiseDate

      }))
    })
    this.spinner.show();
    //console.log(this.SalesOrderHeader.value, 'this.SalesOrderHeader.value');
    this.CreateIndentService.createSalesOrderAndItems(this.SalesOrderHeader.value).subscribe(res => {
      this.indentNO = res;
      let smsTemplate= 'Dear :' +this.customerShippingDetails.accountNumber+''+', Indent created for ' +  
      this.SalesOrderHeader.value.promiseDate+' Shift: '+this.SalesOrderHeader.value.shift+''+ '  is ' +'\n' + this.itemDetails+'\n'+'   Worth of Rs.' +this.sumTotal;
      if (this.data.phoneNumber != null) {
        this.CreateIndentService.sendSMS(this.data.phoneNumber, smsTemplate).subscribe(res => {
          this.spinner.hide();
          localStorage.setItem('update-indent', JSON.stringify(this.indentNO));
          this.toastr.success('Create Indent#' + this.indentNO.indentId + '\n Created Successfully.');
          this.router.navigateByUrl('customer/indent/update-indent');
        })
      } else {
        this.spinner.hide();
        localStorage.setItem('update-indent', JSON.stringify(this.indentNO));
        this.toastr.success('Create Indent#' + this.indentNO.indentId + '\n Created Successfully.');
        this.router.navigateByUrl('customer/indent/update-indent');
      }
    }, error => {
      this.orderItems.controls = [];
      this.SalesOrderHeader.reset();
      this.CreateIndentLineItem.reset();
      this.SalesOrderHeader.disable();
      this.CreateIndentLineItem.disable();
      this.spinner.hide();
      //console.log(error);
      this.toastr.error('Something Went Wrong', 'Single Row', {
        timeOut: 2000
      });
    });
  }

  getFieldValue(ipVal) {
    let retValue;
    if (ipVal == null) {
      retValue = null;
    } else {
      retValue = ipVal
    }
    return retValue;
  }

  openModal(template: any, index) {
    this.addMore = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index, field): void {
    this.message = 'Confirmed!';
    this.addMore = false;
    this.modalRef.hide();
    this.addMore = false;
    const delIndexAmount = parseInt((document.getElementById('amount-' + index) as HTMLInputElement).value);
    const delIndexTax = parseInt((document.getElementById('tax-' + index) as HTMLInputElement).value);
    this.sumTotal = this.sumTotal - delIndexAmount;
    this.sumTax = this.sumTax - delIndexTax;
    if (this.formArr.length !== 1) {
      this.formArr.removeAt(index);
    } else {
      this.toastr.error('At least One product Mandatory', 'Single row', {
        timeOut: 2000
      });
    }
  }

  decline(): void {
    this.addMore = false;
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
