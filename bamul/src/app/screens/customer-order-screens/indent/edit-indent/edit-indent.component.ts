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

@Component({
  selector: 'app-edit-indent',
  templateUrl: './edit-indent.component.html',
  styleUrls: ['./edit-indent.component.css']
})
export class EditIndentComponent implements OnInit {
  cancelled = false;
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
  conversionRate: any = [];
  items: any;
  PPC = 20;
  newTotal: any;
  taxTotal: any;
  conversionPPC: any;
  priceLstId: any;
  addMore = true;
  isSave = true;
  message: string;
  tax: any;
  roundOff: any = 0;
  listItemOnHandQuantityByOrderedItem: any;
  listSumOfOrderedQunatityByLineStatusAndItemCode: any;
  shipToAdress: Object;
  indentNo: any;
  itemDetails: string;
  custShippingDetailsByAcctNu: any;
  orderTypeDetailsList: any;
  sequence: number = 0;
  orderTypeId: number;
  routeList: any;
  routeNumber: number;

  filterForm: FormGroup;
  bookingDate: string;
  deliveryDate: string;
  statusEditIndent:any;
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
        minDate: new Date(),
        dateInputFormat: 'DD-MM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
      });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.systemDt = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.data = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit() {
    this.SalesOrderHeader = this.fb.group({
      status: "",
      headerId: "",
      masterHeaderId: "",
      customerAccountId: "",
      uploadId: "",
      shiftId: '',
      bookingDate: "",
      deliveryDate: "",
      errorMessage: "",
      comments: "",
      orderHeaderId: "",
      creationDate: "",
      createdBy: "",
      lastUpdatedDate: "",
      lastUpdatedBy: "",
      lastUpdateLogin: "",
      portalAllowUpdate: "",
      custAccountSiteId: "",
      billToSiteUseId: "",
      shipToSiteUseId: "",
      salesOrderLine: this.fb.array([]),
      orderTypeId: [null],
      route: [null],
      seq: null,
      shiftCode: "",
    });
    this.CreateIndentLineItem = this.fb.group({
      newIndtLItem: this.fb.array([])
    });

    this.indentUpdate = JSON.parse(localStorage.getItem('update-indent'));
    this.sequence = this.indentUpdate.seq;
    // this.indentUpdate = this.CreateIndentService.getIndentList();
    for (let i = 0; i < this.indentUpdate.salesOrderLine.length; i++) {
      this.myArray.push(this.indentUpdate.salesOrderLine[i]);
    }
    this.myArray.sort(function (a, b) {
      return a.lineId - b.lineId;
    });
    this.upadteIndent();
    this.shipToAdressList();
    this.billToAdress();
    this.getCustomerBalanceByAcctNo();
    this.getAllIndentShifts();
    this.getallsalesordertype();

  }



  getAllIndentShifts() {
    this.CreateIndentService.getAllIndentShifts().subscribe(res => {
      this.shift = res
    })
  }
  upadteIndent() {
    this.addMore = false;
    this.SalesOrderHeader.patchValue({
      status: this.indentUpdate.status,
      headerId: this.indentUpdate.headerId,
      masterHeaderId: this.indentUpdate.masterHeaderId,
      customerAccountId: this.indentUpdate.customerAccountId,
      uploadId: this.indentUpdate.uploadId,
      shiftId: this.indentUpdate.shiftId,
      bookingDate: this.indentUpdate.bookingDate,
      deliveryDate: this.indentUpdate.deliveryDate,
      errorMessage: this.indentUpdate.errorMessage,
      comments: this.indentUpdate.comments,
      orderHeaderId: this.indentUpdate.orderHeaderId,
      creationDate: this.indentUpdate.creationDate,
      createdBy: this.indentUpdate.createdBy,
      lastUpdatedDate: this.indentUpdate.lastUpdatedDate,
      lastUpdatedBy: this.indentUpdate.lastUpdatedBy,
      lastUpdateLogin: this.indentUpdate.lastUpdateLogin,
      portalAllowUpdate: this.indentUpdate.portalAllowUpdate,
      custAccountSiteId: this.indentUpdate.custAccountSiteId,
      billToSiteUseId: this.indentUpdate.billToSiteUseId,
      seq: this.sequence,
      orderTypeId: this.indentUpdate.orderTypeId,
      route: this.indentUpdate.route,
      shiftCode: this.indentUpdate.shiftCode,
    })
    if(this.indentUpdate.bookingDate!=null){ // date conversion as disscused on 19-oct
      let bdate = this.indentUpdate.bookingDate.split(' ');
      bdate = bdate[0].split('-');
      let bookDate = new Date(bdate[2]+'-'+bdate[1]+'-'+bdate[0]);
      this.bookingDate= this.datePipe.transform(bookDate,'dd-MMM-yyyy').toUpperCase();
    } else {
      this.bookingDate='';
    }
    if(this.indentUpdate.deliveryDate!=null){ // date conversion as disscused on 19-oct
      let ddate = this.indentUpdate.deliveryDate.split(' ');
      ddate = ddate[0].split('-');
      let DeliverDate = new Date(ddate[2]+'-'+ddate[1]+'-'+ddate[0]);
      this.deliveryDate=this.datePipe.transform(DeliverDate,'dd-MMM-yyyy').toUpperCase();
    } else {
      this.deliveryDate='';
    }
  }

  async initializeDropdown() {
    for (let j = 0; j < this.myArray.length; j++) {
      this.spinner.show();
      const res = await this.CreateIndentService.getItemDetailsByPriceListIdAndItemIdAndSellingUom(
        this.customerShippingDetails.priceListId, this.myArray[j].itemId, this.myArray[j].sellingUom).toPromise();
      if (res) {
        this.focusOutFunction();
        this.addNewRow(this.myArray[j]);
        this.spinner.hide();
        this.items = res;
        this.uomListItems(this.items.sellingUOM, j);
        this.categoiesArray.push(this.items);
        this.addMore = false;
      }
    }

    for (let i = 0; i < this.categoiesArray.length; i++) {
      let sortarray = [];
      sortarray.push(this.categoiesArray[i]);
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].
        patchValue({ dp: sortarray });
    }
    const th = this;
    for (let index = 0; index <= th.categoiesArray.length - 1; index++) {
      (th.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].
        patchValue({ category: th.categoiesArray[index].category });
      (th.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].
        patchValue({ price: th.categoiesArray[index].itemPrice });
      (th.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].
        patchValue({ tax: th.categoiesArray[index].taxPercentage });
      const a = th.CreateIndentLineItem.controls.newIndtLItem as FormGroup;
      const b = a.controls[index] as FormGroup;
      b.controls.category.disable();
      // b.controls.itemDesc.disable();
      (th.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[index].
        patchValue({ itemDesc: this.categoiesArray[index] });
    }
  }

  uomListItems(sellingUOM, j) {
    if (sellingUOM == 'CRA' || sellingUOM == "TIN" || sellingUOM == "BOX") {
      this.craPlaceHolder = 'Crates';
      (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[j].
        patchValue({ craPlaceHolder: this.craPlaceHolder });
      this.CreateIndentService.getCovertionDetailsByInventoryItemidAndFromUomCodeAndToUomCode(
        this.myArray[j].itemId).subscribe(data => {
          this.conversionPPC = data;
          if (this.conversionPPC == null) {
            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[j].
              patchValue({ ppc: 1 });
          } else {

            (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[j].
              patchValue({ ppc: this.conversionPPC.conversionRate });
          }
        });
    }
  }

  getCustomerBalanceByAcctNo() {
    this.CreateIndentService.getCustomerBalanceByAcctNo(this.data.accountNumber).subscribe(
      res => {
        this.balaceNo = res;
      });
  }



  billToAdress() {
    this.CreateIndentService.billToAdress(this.indentUpdate.accountNumber, this.indentUpdate.billToSiteUseId).subscribe(res => {
      this.customerBillingDetails = res[0];
    })
  }
  shipToAdressList() {
    this.CreateIndentService.shipToAdress(this.indentUpdate.accountNumber, this.indentUpdate.shipToSiteUseId).subscribe(res => {
      this.SalesOrderHeader.patchValue({
        shipToSiteUseId: res[0]
      })
      this.customerShippingDetails = res[0];
      this.custShippingDetailsByAcctNu = res;
      this.getCategoriesByPriceListId();
      this.initializeDropdown();
    })

  }
  // getcustdetailsbycustacntnumberandsiteuseidforshipto(){
  //   this.CreateIndentService.getcustdetailsbycustacntnumberandsiteuseidforshipto( this.indentUpdate.accountNumber, this.indentUpdate.shipToOrgId,).subscribe(res => {
  //     this.shipToAdress = res[0];
  //   })
  // }
  // getCustShippingDetailsByAcctNo() {
  //   this.CreateIndentService.getCustShippingDetailsByAcctNo(this.data.accountNumber).subscribe(res => {
  //     this.SalesOrderHeader.patchValue({
  //       shipToSiteUseId:res[0] 
  //     })
  //     this.customerShippingDetails = res[0];
  //        this.custShippingDetailsByAcctNu = res;

  //   });
  // }

  shipTO(event) {
    this.customerShippingDetails = this.SalesOrderHeader.value.shipToSiteUseId;
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
      this.customerShippingDetails.priceListId, this.customerShippingDetails.orderTypeId, subCategory).subscribe((response) => {
        this.itemCodeDesc = response;
        this.spinner.hide();
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ price: this.price });
        (this.CreateIndentLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ tax: this.tax });
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

  initItemRows(data) {
    if (data && data.quantityCrates == null) {
      data.quantityCrates = 0;
    }
    if (data && data.quantityPacket == null) {
      data.quantityPacket = 0;
    }
    return this.fb.group({
      crt: [data && data.quantityCrates ? data.quantityCrates : { value: '', disabled: true }
        , [Validators.required, Validators.maxLength(4)]],
      packets: [data && data.quantityPacket ? data.quantityPacket : { value: '', disabled: true },
      [Validators.required, Validators.maxLength(4),]],
      price: '',
      value: '',
      tax: '',
      amount: '',
      category: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      dp: ['', [Validators.required]],
      originalSysLineRef: data,
      pktPlaceHolder: '',
      craPlaceHolder: '',
      disabled: [data ? true : false],
      ppc: '',
    });
  }


  addNewRow(data) {
    this.submitted = false;
    this.CreateIndentLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows(data));
    //this.taxPercentages.push(0);
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


  saveAndCancelled(CANCELLED) {
    this.submitted = true;
    if (this.SalesOrderHeader.invalid) {
      return;
    }
    if (this.CreateIndentLineItem.invalid) {
      return;
    }
    if (this.sequence == null) {
      this.toastr.error('Please select route number', 'Update Indent', {
        timeOut: 5000
      });
      return;
    }
    if (CANCELLED == true) {
     this.statusEditIndent = "CANCELLED"
    } else {
     this.statusEditIndent = this.indentUpdate.status
    }
    this.systemDt = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:MM:SS'),
      this.SalesOrderHeader.patchValue({
        shipToSiteUseId: this.customerShippingDetails.siteUseId,
        lastUpdateDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
        status: this.statusEditIndent,
      });
    this.salesOrderLine = this.SalesOrderHeader.get('salesOrderLine') as FormArray;
    this.itemDetails = '';
    this.CreateIndentLineItem.controls.newIndtLItem.value.forEach(e => {
      let PacketAndCrt;
      if (e.packets) {
        PacketAndCrt = e.packets + 'P,';
      } else if (e.crt) {
        PacketAndCrt = e.crt + 'C,';
      } 
      this.itemDetails += e.itemDesc.itemCode + ":" +PacketAndCrt;
      this.salesOrderLine.push(this.fb.group({
        lineId: e.originalSysLineRef ? e.originalSysLineRef.lineId : null,
        headerid: e.originalSysLineRef ? e.originalSysLineRef.headerid : null,
        masterLineId: e.originalSysLineRef ? e.originalSysLineRef.masterLineId : null,
        itemId: e.itemDesc.itemId,
        quantityCrates: e.crt,
        quantityPacket: e.packets,
        status: this.statusEditIndent,
        errorMessage: this.indentUpdate.errorMessage,
        lastUpdateDate: this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS'),
        creationDate: e.originalSysLineRef ? e.originalSysLineRef.creationDate : this.systemDt,
        createdBy: this.indentUpdate.createdBy,
        lastUpdatedBy: this.indentUpdate.lastUpdatedBy,
        lastUpdateLogin: this.indentUpdate.lastUpdateLogin,
      }));
    });
    this.spinner.show();
    this.CreateIndentService.updateSalesOrder(this.SalesOrderHeader.value).subscribe(res => {
      let smsTemplate = 'Dear :' + this.customerShippingDetails.accountNumber + '' + ', Indent created for ' +
      this.SalesOrderHeader.value.bookingDate + ' Shift: ' + this.SalesOrderHeader.value.shiftCode + '' + '  is ' + '\n' + this.itemDetails + '\n' + '   Worth of Rs.' + this.sumTotal;
    if (this.data.phoneNumber != null) {
      this.CreateIndentService.sendSMS(this.data.phoneNumber, smsTemplate).subscribe(res => {
        this.spinner.hide();
        this.toastr.success('Successfully   Indent Cancelled”');
        this.router.navigateByUrl('/customer/indent/list-indents');
      })
    }
      if (this.statusEditIndent == "CANCELLED" ) {   
          this.spinner.hide();
          this.toastr.success('Successfully   Indent Cancelled”');
          this.router.navigateByUrl('/customer/indent/list-indents');
      } else {
        this.spinner.hide();
        this.toastr.success('Successfully Update Create Indent ');
        this.router.navigateByUrl('/customer/indent/list-indents');
      }
    }, error => {
      this.salesOrderLine.controls = [];
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
    const delIndexAmount = parseFloat((document.getElementById('amount-' + index) as HTMLInputElement).value);
    const delIndexTax = parseFloat((document.getElementById('tax-' + index) as HTMLInputElement).value);
    this.sumTotal = this.sumTotal - delIndexAmount;
    this.sumTax = this.sumTax - delIndexTax;
    if (isNaN(this.sumTax)) {
      this.sumTax = 0;
    }
    if (this.formArr.length !== 1) {
      if (field.value.originalSysLineRef == null) {
        this.formArr.removeAt(index);
      }
      else {
        this.CreateIndentService.deleteLineItemIndent(field.value.originalSysLineRef.lineId).subscribe(
          res => {
            this.formArr.removeAt(index);
          })
      }
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
      this.getRouteList(this.indentUpdate.shipToSiteUseId, this.indentUpdate.orderTypeId, this.indentUpdate.shiftCode);
      if (this.orderTypeDetailsList.length == 0) {
        this.sequence = null;
      }
    });

  }
  setOrderTypeId(event) {
    this.orderTypeId = event.target.value;
    let shift = this.indentUpdate.shiftCode;
    let shipToSiteUseId = this.indentUpdate.shipToSiteUseId;
    this.getRouteList(shipToSiteUseId, this.orderTypeId, shift);
  }
  getRouteList(shipToSiteUseId, orderTypeId, shift) {
    this.CreateIndentService.getRouteList(this.systemDt, shipToSiteUseId, orderTypeId, shift).subscribe((res) => {
      this.routeList = res;
      // this.sequence=null;
      // console.log('this.routeList',this.routeList)
      if (this.routeList.length > 0) {
        this.addMore = false;
        this.routeNumber = this.routeList[0].routeNumber;
        this.SalesOrderHeader.patchValue({
          // orderTypeId: this.customerDetails.orderTypeId,
          route: this.indentUpdate.route
        });
        this.setSequenceNumber(this.routeNumber);
      } else {
        this.addMore = true;
        this.sequence = null;
        this.toastr.error('No Route Number Found', 'Update  Indent', {
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
