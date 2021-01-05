import { Component, OnInit } from '@angular/core';
import { CreateIndentService } from '../../shared/components/services/create-indent.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { SalesOrderLineItem } from '../../shared/components/model/sales-order-line-item';
import { SalesOrderHeader } from '../../shared/components/model/sales-order-header ';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';

@Component({
  selector: 'app-create-indent',
  templateUrl: './create-indent.component.html',
  styleUrls: ['./create-indent.component.css']
})

export class CreateIndentComponent implements OnInit {
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
  minDate: Date;
  maxDate: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;
  oderTyp: any;
  shift: any;
  shiftArray: any = [];
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
  salesOrderLine: FormArray;
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
  timer: any;
  time = new Date();
  roundOff: any = 0;
  custShippingDetailsByAcctNu: Object;
  orderTypeDetailsList: any;
  sequence: number = 0;
  orderTypeId: number;
  routeList: any;
  routeNumber: number;
  filterForm: FormGroup;
  deliveryDateByListIndent: any;
  uploadId: any;
  deliveryDate: string;
  bookingDate: string;
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
    this.getCustBillingDetailsByAcctNo();
    this.getCustShippingDetailsByAcctNo();
  }

  ngOnInit() {
    this.SalesOrderHeader = this.fb.group({
      status: "NEW",
      customerAccountId: "",
      uploadId: "",
      shiftId: ['', [Validators.required]],
      bookingDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
      deliveryDate: "",
      errorMessage: "",
      comments: "",
      creationDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
      createdBy: this.data.userId,
      lastUpdatedDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
      lastUpdatedBy: this.data.userId,
      lastUpdateLogin: this.data.userId,
      portalAllowUpdate: "",
      custAccountSiteId: "",
      billToSiteUseId: "",
      shipToSiteUseId: "",
      salesOrderLine: this.fb.array([]),
      orderTypeId: [null],
      route: [null],
      seq: null,
      masterHeaderId: null,
      orderHeaderId: null
    });
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([])
    });
    this.getCustomerBalanceByAcctNo();
    this.getallsalesordertype();
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
      this.SalesOrderHeader.patchValue({
        billToSiteUseId: res[0]
      })
    })
  }

  getCustShippingDetailsByAcctNo() {
    this.CreateIndentService.getCustShippingDetailsByAcctNo(this.accountNumber).subscribe(res => {
      this.SalesOrderHeader.patchValue({
        shipToSiteUseId: res[0]
      })
      this.custShippingDetailsByAcctNu = res
      this.customerShippingDetails = res[0];
      this.shipToAdress = res;
      this.getCategoriesByPriceListId();
      this.getAllIndentShifts();
    });
  }

  shipTO(event) {
    this.customerShippingDetails = this.SalesOrderHeader.value.shipToSiteUseId;
  }

  getCategoriesByPriceListId() {
    this.CreateIndentService.getCategoriesByPriceListId(this.customerShippingDetails.priceListId).subscribe(
      res => {
        this.allCatgeries = res;
      });
  }

  getAllIndentShifts() {
    this.CreateIndentService.getAllIndentShifts().subscribe(res => {
      this.shift = res;
      if (this.shift) {
        this.shiftArray.push(this.shift);
        this.setDeliveryDateAndShift(res);
      }
    })
  }

  setDeliveryDateAndShift(res) {
    const timeNow: any = this.datePipe.transform(new Date(), 'HH:mm:ss');
    var date = new Date();
    date.setDate(date.getDate() + this.shiftArray[0].addDays);
    this.uploadId = this.datePipe.transform(date, 'yyyyMMdd'),
      this.deliveryDateByListIndent = this.datePipe.transform(date, 'dd-MM-yyyy');
    let deliveryDate = this.datePipe.transform(date, 'dd-MM-yyyy HH:MM:SS');
    this.SalesOrderHeader.patchValue({ shiftId: this.shiftArray[0] });
    this.SalesOrderHeader.patchValue({ deliveryDate: deliveryDate });
    this.SalesOrderHeader.patchValue({ bookingDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'), })
    this.deliveryDate= this.datePipe.transform(date, 'dd-MMM-yyyy').toUpperCase();
    this.bookingDate= this.datePipe.transform(this.date, 'dd-MMM-yyyy').toUpperCase();
    this.validateMIAvailableAndPortalAvailable();
  }


  validateMIAvailableAndPortalAvailable() {
    let shiftId = this.SalesOrderHeader.value.shiftId.shiftId;
    this.CreateIndentService.getSalesOrderByShipToSiteUseIdAndBookingDateAndDeliveryDateAndShiftId(
      this.SalesOrderHeader.value.shipToSiteUseId.siteUseId, this.systemDt, this.deliveryDateByListIndent, shiftId
    ).subscribe(res => {
      this.porttalData = res;
      if (this.porttalData.length == 0) {
        this.isCIAvailable = false;
      } else {
        this.isCIAvailable = true;
      }
      this.CreateIndentService.isTemporaryIndentCreationAllowed(this.SalesOrderHeader.value.billToSiteUseId.siteUseId,
        this.SalesOrderHeader.value.shipToSiteUseId.siteUseId, this.uploadId, shiftId).subscribe(res => {
          // let allowedCreate = res;
          // this.isMIAvailable = allowedCreate == "Y" ? true : false;
          // this.enableAndDisabled(this.isMIAvailable, this.isCIAvailable)
        }, error => {
          let allowedCreate = error.error.text;
          this.isMIAvailable = allowedCreate == "N" ? true : false;
          this.enableAndDisabled(this.isMIAvailable, this.isCIAvailable)
        }
        );
    })
  }



  enableAndDisabled(isMIAvailable, isCIAvailablee) {
    if (isMIAvailable == true || isCIAvailablee == true) {
      this.addMore = true;
        this.toastr.error(' Indent is not allowed', 'Create  Indent!', {
          timeOut: 2000
        });
    } else {
      this.addMore = false;
      this.addNewRow();
    }
  }


  getPriceListByPriceListIdAndOrderType(subCategory, i) {
    if (this.orderTypeId != null) {
      this.spinner.show();
      this.CreateIndentService.getPriceListByPriceListIdAndOrderTypeIdAndCategory(
        this.customerShippingDetails.priceListId, this.orderTypeId, subCategory).subscribe((response) => {
          this.itemCodeDesc = response;
          this.spinner.hide();
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ price: this.price });
          (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
            patchValue({ dp: this.itemCodeDesc });
        });
    }
    else {
      this.toastr.error('Please select order type', 'Create  Indent!', {
        timeOut: 5000
      });
    }
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
      price: field.value.itemDesc.itemPrice,
      tax: field.value.itemDesc.taxPercentage
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
      var tax = 0;
      th.sumTotal = 0;
      th.sumTax = 0;

      for (var i = 0; i < th.CreateIndentLineItem.value.newIndtLItem.length; i++) {
        total = parseFloat((document.getElementById('amount-' + i) as HTMLInputElement).value);
        tax = parseFloat((document.getElementById('tax-' + i) as HTMLInputElement).value);

        if (isNaN(tax)) {
          tax = 0;
        }
        th.sumTotal += total;
        th.sumTax += tax;
        th.roundOff = Math.round((th.sumTotal - th.sumTax) + th.sumTax) - ((th.sumTotal - th.sumTax) + th.sumTax);
        th.roundOff = th.roundOff.toFixed(2);
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
    // this.taxPercentages.push(0);
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
        fieldValue = parseInt(field.value.packets ? field.value.packets : field.value.crt);
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

  }


  submit(form: NgForm) {
    this.submitted = true;
    if (this.SalesOrderHeader.invalid) {
      return;
    }
    if (this.CreateIndentLineItem.invalid) {
      return;
    }
    if (this.sequence == null) {
      this.toastr.error('Please select route number', 'Update Indent', {
        timeOut: 2000
      });
      return;
    }
    var date = new Date();
    // if (timeNow >= this.shift[0].startTime && timeNow <= this.shift.endTime) {
    date.setDate(date.getDate() + this.shiftArray[0].addDays);
    let deliveryDate = this.datePipe.transform(date, 'dd-MM-yyyy');

    this.SalesOrderHeader.patchValue({
      // uploadId: deliveryDate,
      uploadId: this.datePipe.transform(date, 'yyyyMMdd'),
      customerAccountId: this.customerShippingDetails.customerAccountId,
      portalAllowUpdate: this.SalesOrderHeader.value.shiftId.allowUpdate,
      custAccountSiteId: this.customerShippingDetails.custAcctSiteId,
      billToSiteUseId: this.SalesOrderHeader.value.billToSiteUseId.siteUseId,
      shipToSiteUseId: this.customerShippingDetails.siteUseId,
      shiftId: this.SalesOrderHeader.value.shiftId.shiftId,
      seq: this.sequence,
      orderTypeId: this.orderTypeId,
      route: this.routeNumber,
    });
    this.itemDetails = '';
    this.salesOrderLine = this.SalesOrderHeader.get('salesOrderLine') as FormArray;
    form.value.newIndtLItem.forEach(e => {
      let PacketAndCrt;
      if (e.packets) {
        PacketAndCrt = e.packets + 'P,';
      } else if (e.crt) {
        PacketAndCrt = e.crt + 'C,';
      } 
      this.itemDetails += e.itemDesc.itemCode + ":" +PacketAndCrt;
      this.salesOrderLine.push(this.fb.group({
        itemId: e.itemDesc.itemId,
        quantityCrates: e.crt,
        quantityPacket: e.packets,
        status: "NEW",
        errorMessage: "",
        creationDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
        createdBy: this.data.userId,
        lastUpdateDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
        lastUpdateBy: this.data.userId,
        lastUpdateLogin: this.data.userId
      }))
    })
    console.log('this.SalesOrderHeader', this.SalesOrderHeader.value)
    this.spinner.show();
    ////console.log(this.SalesOrderHeader.value, 'this.SalesOrderHeader.value');
    this.CreateIndentService.createSalesOrderAndItems(this.SalesOrderHeader.value).subscribe(res => {
      this.indentNO = res;
      let smsTemplate = 'Dear :' + this.customerShippingDetails.accountNumber + '' + ', Indent created for ' +
        this.SalesOrderHeader.value.bookingDate + ' Shift: ' + this.shift.shiftCode+ '' + '  is ' + '\n' + this.itemDetails + '\n' + '   Worth of Rs.' + this.sumTotal;
      if (this.data.phoneNumber != null) {
        this.CreateIndentService.sendSMS(this.data.phoneNumber, smsTemplate).subscribe(res => {
          this.spinner.hide();
          localStorage.setItem('update-indent', JSON.stringify(this.indentNO));
          this.toastr.success('Create Indent#' + this.indentNO.headerId + '\n Created Successfully.');
          this.router.navigateByUrl('/customer/indent/list-indents');
        })
      } else {
        this.spinner.hide();
        localStorage.setItem('update-indent', JSON.stringify(this.indentNO));
        this.toastr.success('Create Indent#' + this.indentNO.headerId + '\n Created Successfully.');
        this.router.navigateByUrl('/customer/indent/list-indents');
      }
    }, error => {
      this.sumTotal = 0;
      this.sumTax = 0;
      this.amountTopay = 0;
      this.salesOrderLine.controls = [];
      this.SalesOrderHeader.reset();
      this.CreateIndentLineItem.reset();
      this.SalesOrderHeader.disable();
      this.CreateIndentLineItem.disable();
      this.spinner.hide();
      console.log(error);
      if (error.status == 409) {
        this.toastr.error(error.error.message, 'Single Row', {
          timeOut: 2000
        });
      } else {
        this.toastr.error('Something went wrong', 'Single Row', {
          timeOut: 2000
        });
      }
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
    if (isNaN(this.sumTax)) {
      this.sumTax = 0;
    }
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
  async getallsalesordertype() {
    await this.CreateIndentService.getallsalesordertype().subscribe((res) => {
      this.orderTypeDetailsList = res;
      if (this.orderTypeDetailsList.length == 0) {
        this.sequence = null;
      }
    });
  }
  setOrderTypeId(event) {
    this.orderTypeId = event.target.value;
    let shift = this.SalesOrderHeader.value.shiftId.shiftCode;
    let shipToSiteUseId = this.SalesOrderHeader.value.shipToSiteUseId.siteUseId;
    this.getRouteList(shipToSiteUseId, this.orderTypeId, shift);
  }
  getRouteList(shipToSiteUseId, orderTypeId, shift) {
    this.CreateIndentService.getRouteList(this.systemDt, shipToSiteUseId, orderTypeId, shift).subscribe((res) => {
      this.routeList = res;
      // this.sequence=null;
      // console.log('this.routeList',this.routeList)
      if (this.routeList.length > 0) {
        this.routeNumber = this.routeList[0].routeNumber;
        // this.SalesOrderHeader.patchValue({
        //   // orderTypeId: this.customerDetails.orderTypeId,
        //   route: this.customerDetails.route
        // }); // for anurag
      } else {
        this.addMore = true;
        this.sequence = null;
        this.toastr.error('No Route Number Found', ' Create Indent', {
          timeOut: 5000
        });
      }
    });
  }
  setSequenceNumber(event) {
    // console.log('event',event)
    this.routeNumber = event;
    this.routeList.forEach(element => {
      if (element.routeNumber == event) {
        this.sequence = element.routeSeqNo;
      }
    });
  }
}
