import { Component, OnInit } from '@angular/core';
import { CreateIndentService } from '../../shared/components/services/create-indent.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { SalesOrderLineItem } from '../../shared/components/model/sales-order-line-item';
import { SalesOrderHeader } from '../../shared/components/model/sales-order-header ';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-indent-view',
  templateUrl: './indent-view.component.html',
  styleUrls: ['./indent-view.component.css']
})
export class IndentViewComponent implements OnInit {
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
  bookingDate:  any;
  deliveryDate: any;
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



  submit(form: NgForm) {
    this.router.navigateByUrl('/customer/indent/list-indents');
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
