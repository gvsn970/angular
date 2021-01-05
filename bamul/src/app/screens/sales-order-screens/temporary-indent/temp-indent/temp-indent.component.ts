import { Component, OnInit, OnChanges, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TabService } from '../../../../shared/service/tab.service';
import { DatePipe } from '@angular/common';
import { Router, NavigationEnd } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CallDeskService } from 'src/app/shared/service/call-desk.service';
import { HostListener } from '@angular/core';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';

import { CreateIndentService } from 'src/app/screens/customer-order-screens/shared/components/services/create-indent.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-temp-indent',
  templateUrl: './temp-indent.component.html',
  styleUrls: ['./temp-indent.component.css'],
  providers: [TabService, DecimalPipe]
})
export class TempIndentComponent implements OnInit {
  modalRef: BsModalRef;
  cancelled = false;
  panelLeft: any;
  panelRight: any;
  crates: any;
  qty: any;
  testVal: any;
  result: any;
  billingDetails: any;
  shippingDetails: any;
  sumCrates = 0;
  sumQuantity = 0;
  customerDetails: any;
  systemDt: any;
  nextDt: any;
  orderTypeDetails: any;
  mapOfOrderByCustomer = new Map();
  mapOfOrderByCustomerUpdate = new Map();
  updateDisabled: boolean = true;
  oItem: any;
  orderState: any;
  valueTotal: any = 0.00;
  taxPercentage: any = 0.00;
  roundOff: any = 0.00;
  totalIndentVal: any = 0.00;
  allInputs: any;
  itemPriceAdd: any = 0;
  priceItem: any;
  shift: any;
  shiftResponse: any;
  custId: any;
  siteWarehouseName: any;
  salesRepName: any;
  siteWareHouseId: any;
  siteUseId: any;
  billingDtls: boolean;
  itemDetails: string;
  shippingPriceListID: any;
  isRetailer: any = true;
  bookingDate: any;
  deliveryDate: any;
  status: any;
  orderDetails: any;
  orderTypeDetailsList: any;
  routeList: any;
  filterForm: FormGroup;
  orderTypeId: number;
  routeNumber: number;
  sequence: number=0;
  data: any;
  date: Date = new Date();
  shiftId: any;
  dateToSend: any;
  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private callDeskService: CallDeskService,
    private createIndentService: CreateIndentService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private modalService: BsModalService,
    private SharedService: SharedService,
    private _decimalPipe: DecimalPipe,

  ) { }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 113) {
      if (this.updateDisabled === false) {
        this.updateData();
      }
    }
  }

  x = 0;
  ngOnInit() {
    // var x = document.getElementById("scroll-top");
    // x.scrollTop = 0;
    //alert('coming here');

    this.allInputs = false;
    this.callDeskService.getItemIndent('LEFT').subscribe((response) => {
      this.panelLeft = response;
      const tabIndexLeft: any = response;
      this.panelLeft = tabIndexLeft;
    });

    this.callDeskService.getItemIndent('RIGHT').subscribe((response) => {
      this.panelRight = response;
      const tabIndexRight: any = response;
      this.panelRight = tabIndexRight;
    });
    const dateNow: any = this.datePipe.transform(new Date(), 'HH');

    var date = new Date();
    date.setDate(date.getDate() + 1);
    this.systemDt = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.nextDt = this.datePipe.transform(date, 'dd-MM-yyyy');
    setTimeout(function () {
      const customerNumberSel = (document.getElementById('customerNumberSel') as HTMLInputElement);
      customerNumberSel.select();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 10)

    ////console.log("305870", this.panelLeft);
    this.getallsalesordertype();
    this.filterForm = this.fb.group({
      orderTypeId: [null],
      routeNumber: [null],
    });
  }

  // tempMethodForSettingPPC() {
  //   for (const panelObj of this.panelLeft) {
  //     panelObj.unitsPerCrates = 1;
  //   }
  //   for (const panelObj of this.panelRight) {
  //     panelObj.unitsPerCrates = 1;
  //   }
  // }



  checkInput(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((event.target.value.length > 3) || (charCode > 31 && (charCode < 48 || charCode > 57))) {
      return false;
    }
    return true;
  }

  async getCustomerDetails(elem) {
    this.custId = elem.target.value;
    // localStorage.setItem('coustomerNo', JSON.stringify(this.custId));
    // this.createIndentService.salerOrderListSet(this.custId)
    this.filterForm.patchValue({
      orderTypeId: "",
      routeNumber: ""
    });
    this.updateDisabled = false;
    this.mapOfOrderByCustomer = new Map();
    this.mapOfOrderByCustomerUpdate = new Map();
    this.callDeskService.getCustomerBilling(elem.target.value).subscribe((response) => {
      this.billingDetails = response;
      if(this.billingDetails.length>0){
        this.billingDetails=this.billingDetails[0];
      }
      if (this.billingDetails.salesRepName === "null") {
        this.salesRepName = '';
      }
      else {
        this.salesRepName = this.billingDetails.salesRepName;
      }
      // console.log(this.billingDetails);
      this.billingDtls = true;
      if (this.billingDetails !== undefined) {
        if (this.billingDetails.customerClassCode !== 'CI') {
          this.isRetailer = true;
        } else {
          this.isRetailer = false;
        }
      }
    },
      err => {
        if (err.status === 500) {
          this.billingDetails = [];
          this.billingDtls = false;
          this.isRetailer = false;
        }
      });
    this.callDeskService.getCustomerShipping(elem.target.value).subscribe(async (response) => {

      this.shippingDetails = response;
      if (this.shippingDetails) {
        const wareHouseId = this.shippingDetails.siteUseId;
        var todayDate = this.systemDt;
        const custId = elem.target.value;

        const shipVal = this.shippingDetails[0];
        // this.shippingPriceListID = shipVal.priceListId;
        if (shipVal !== undefined) {
          await this.callDeskService.getcurrentshiftbytime().subscribe(async (res) => {
            this.shift = res;
            this.shiftId=this.shift.shiftId;
            this.dateToSend=this.datePipe.transform((this.shift.addDays==1)?this.callDeskService.getNextDate(1):this.callDeskService.getCurrentDate(), 'dd-MM-yyyy');
            if(this.shift.shiftCode=='E'){
              this.shift = 'Evening';
              this.getIndentListBySiteUseId(shipVal.siteUseId + '/' + shipVal.siteWarehouseName + '/' + shipVal.salesRepName + '/' + shipVal.siteWareHouseId)
            } else {
              this.shift = 'Morning';
              this.getIndentListBySiteUseId(shipVal.siteUseId + '/' + shipVal.siteWarehouseName + '/' + shipVal.salesRepName + '/' + shipVal.siteWareHouseId)
            }
          });
        }
        else {
          this.errorHandle();
        }
        // await this.callDeskService.getSalesOrderDetail(wareHouseId, todayDate, custId).subscribe((response) => {
        //   if (response === null) {
        //     this.errorHandle();
        //   }
        //   else {
        //     this.customerDetails = response;

        //     this.shift = this.customerDetails.shift;

        //     this.allInputs = true;


        //     this.callDeskService.getOrderTypeDetail(this.customerDetails.orderTypeId).subscribe((response) => {
        //       this.orderTypeDetails = response;
        //     });

        //     this.updateDisabled = false;
        //     for (const order of this.customerDetails.orderItems) {
        //       const data: any[] = [];
        //       data.push(order.qtyCrates);
        //       data.push(order.qtyPackets);
        //       data.push(order.orderQuantityUOM);
        //       this.mapOfOrderByCustomer.set(order.itemCode, data);
        //       this.mapOfOrderByCustomerUpdate.set(order.itemCode, order);
        //     }
        //     for (const panelLeft of this.panelLeft) {
        //       if (this.mapOfOrderByCustomer.has(panelLeft.itemCode)) {
        //         panelLeft.crates = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[0];
        //         panelLeft.qty = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[1];
        //         panelLeft.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[2];
        //         panelLeft.isExist = true;
        //         panelLeft.isAvailToOrder = true;
        //         panelLeft.minOrderQtyFlag = true;
        //         this.descCalc(panelLeft);
        //       }
        //       else {
        //         panelLeft.crates = 0;
        //         panelLeft.qty = 0;
        //         panelLeft.isExist = false;
        //         panelLeft.uomOrderQuantityToSend = '';
        //         panelLeft.isAvailToOrder = true;
        //         panelLeft.minOrderQtyFlag = true;
        //         this.descCalc(panelLeft);

        //       }
        //     }

        //     for (const panelRight of this.panelRight) {
        //       if (this.mapOfOrderByCustomer.has(panelRight.itemCode)) {
        //         panelRight.crates = this.mapOfOrderByCustomer.get(panelRight.itemCode)[0];
        //         panelRight.qty = this.mapOfOrderByCustomer.get(panelRight.itemCode)[1];
        //         panelRight.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelRight.itemCode)[2];
        //         panelRight.isExist = true;
        //         panelRight.isAvailToOrder = true;
        //         panelRight.minOrderQtyFlag = true;
        //         this.descCalc(panelRight);
        //       }
        //       else {
        //         panelRight.crates = 0;
        //         panelRight.qty = 0;
        //         panelRight.isExist = false;
        //         panelRight.uomOrderQuantityToSend = '';
        //         panelRight.isAvailToOrder = true;
        //         panelRight.minOrderQtyFlag = true;
        //         this.descCalc(panelRight);
        //       }
        //     }
        //     this.calculateTotal();
        //     //this.updateDisabled = false;
        //   }
        // },
        //   err => {
        //     if (err.status === 500) {
        //       this.errorHandle();
        //     }
        //   });
        // console.log('this.shippingDetails.orderTypeId',this.shippingDetails[0].orderTypeId)
        // this.callDeskService.getOrderTypeDetail(this.customerDetails.orderTypeId).subscribe((res) => {
        //   this.orderTypeDetails = res;
        // });
        // this.callDeskService.getsalesorderviewbyshipfromorgid(this.shippingDetails[0].orgId).subscribe((response) => {
        //   this.orderDetails = response;
        //   this.callDeskService.getOrderTypeDetail(this.orderDetails.orderTypeId).subscribe((res) => {
        //     this.orderTypeDetails = res;
        //   });
        // });
      }

    },
      err => {

        if (err.status === 500) {
          this.shippingDetails = [];

        }
      });
    this.setTabIndex();
    //const firstSelected = document.getElementById('pkt-1');
    //firstSelected.focus();


    //firstSelected.select();
    await this.clearCratesAndPackets();

  }

  async getIndentListBySiteUseId(value) {
    const shippingVal = value.split('/');
    const wareHouseId = shippingVal[0];
    var todayDate = this.systemDt;
    var dataTosendToCreateIndent = [this.custId, wareHouseId]
    localStorage.setItem('indentVal', JSON.stringify(dataTosendToCreateIndent));
    this.createIndentService.salerOrderListSet(dataTosendToCreateIndent);
    this.siteUseId = shippingVal[0];
    if (shippingVal[1] === "null") {
      this.siteWarehouseName = '';
    }
    else {
      this.siteWarehouseName = shippingVal[1];
    }
    this.sequence = null;
    this.getallsalesordertype();
    // if (shippingVal[2] === "null") {
    //   this.salesRepName = '';
    // }
    // else {
    //   this.salesRepName = shippingVal[2];
    // }

    //this.salesRepName = shippingVal[2];
    this.siteWareHouseId = shippingVal[3];
    var todayDate = this.systemDt;
    const custId = this.custId;
    
    // console.log('this.callDeskService.getDateAndShift',this.callDeskService.getDateAndShift())
    // if(this.callDeskService.getDateAndShift()['shiftCode']=='E'){
    //   shift=2;
    //   this.shift = 'Evening';
    // } else {
    //   this.shift = 'Morning';
    //   shift=1;
    // }
    await this.callDeskService.getSalesOrderDetail(this.siteUseId, this.dateToSend, this.custId, this.shiftId).subscribe((response) => {
      if (response['length']==0 || response ===null) {
        this.errorHandle();
        this.orderTypeDetailsList = [];
      }
      else {
        this.customerDetails = response;
        if(this.customerDetails.length>0){
          this.customerDetails=this.customerDetails[0];
        }
        this.filterForm.patchValue({
          orderTypeId: this.customerDetails.orderTypeId,
          routeNumber: this.customerDetails.route
        });
        this.sequence=this.customerDetails.seq;
        this.callDeskService.getOrderTypeDetail(this.customerDetails.orderTypeId).subscribe((res) => {
          this.orderTypeDetails = res;
        });
        this.callDeskService.getcurrentshiftbytime().subscribe((res) => {
          this.shiftResponse = res;
          this.getRouteList(this.customerDetails.shipToSiteUseId,this.customerDetails.orderTypeId,this.shiftResponse.shiftCode);
        });
        // this.shift = this.customerDetails.shift;
        this.allInputs = true;
        if(this.orderTypeDetailsList){
          this.orderTypeDetailsList.forEach(element => {
            if(element.orderTypeId== this.customerDetails.orderTypeId){
              this.siteWarehouseName=element.warehouseName;
            }
          });  
        }
        // console.log('this.shippingDetails.orderTypeId',this.shippingDetails.orderTypeId)
        
        // this.callDeskService.getOrderTypeDetail(this.shippingDetails.orderTypeId).subscribe((response) => {
        //   this.orderTypeDetails = response;
        // });

        this.updateDisabled = false;
        // console.log('this.customerDetails',this.customerDetails)
        //orderItems converted to salesOrderLines 
        for (const order of this.customerDetails.salesOrderLine) {
          if(this.customerDetails.bookingDate!=null){ // date conversion as disscused on 19-oct
            let bdate = this.customerDetails.bookingDate.split(' ');
            bdate = bdate[0].split('-');
            let bookDate = new Date(bdate[2]+'-'+bdate[1]+'-'+bdate[0]);
            this.bookingDate= this.datePipe.transform(bookDate,'dd-MMM-yyyy').toUpperCase();
          } else {
            this.bookingDate='';
          }
          if(this.customerDetails.deliveryDate!=null){ // date conversion as disscused on 19-oct
            let ddate = this.customerDetails.deliveryDate.split(' ');
            ddate = ddate[0].split('-');
            let DeliverDate = new Date(ddate[2]+'-'+ddate[1]+'-'+ddate[0]);
            this.deliveryDate=this.datePipe.transform(DeliverDate,'dd-MMM-yyyy').toUpperCase();
          } else {
            this.deliveryDate='';
          }
          this.status=this.customerDetails.status;
          const data: any[] = [];
          data.push(order.quantityCrates);
          data.push(order.quantityPacket);
          data.push(order.sellingUom);
          data.push(order.quantityCrates/order.quantityPacket);
          data.push(order.lineId);
          data.push(order.masterLineId);
          data.push(order.lastUpdateBy);
          data.push(order.lastUpdateLogin);
          data.push(order.creationDate);
          data.push(order.createdBy);
          this.mapOfOrderByCustomer.set(order.itemCode, data);
          this.mapOfOrderByCustomerUpdate.set(order.itemCode, order);
        }
        // console.log('this.mapOfOrderByCustomer',this.mapOfOrderByCustomer)
        for (const panelLeft of this.panelLeft) {
          if (this.mapOfOrderByCustomer.has(panelLeft.itemCode)) {
            panelLeft.crates = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[0];
            panelLeft.qty = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[1];
            // panelLeft.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[2]; // changes made as per discussion with ganesh on 08-10-2020
            panelLeft.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[2] == 'CRA' ? 'PKT' : this.mapOfOrderByCustomer.get(panelLeft.itemCode)[2];
            panelLeft.orderQuantity = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[3];
            panelLeft.isExist = true;
            panelLeft.isAvailToOrder = true;
            panelLeft.minOrderQtyFlag = true;
            panelLeft.lineId = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[4];
            panelLeft.masterLineId = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[5];
            panelLeft.lastUpdateBy = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[6];
            panelLeft.lastUpdateLogin = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[7];
            panelLeft.creationDate = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[8];
            panelLeft.createdBy = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[9];
            panelLeft.lastUpdateDate =todayDate;
            this.descCalc(panelLeft);
            // console.log('panelLeft.sellingUOM',panelLeft.sellingUOM)
          }
          else {
            panelLeft.crates = 0;
            panelLeft.qty = 0;
            panelLeft.isExist = false;
            panelLeft.uomOrderQuantityToSend = panelLeft.sellingUOM == 'CRA' ? 'PKT' : panelLeft.sellingUOM;
            panelLeft.isAvailToOrder = true;
            panelLeft.minOrderQtyFlag = true;
            this.descCalc(panelLeft);
          }
        }

        for (const panelRight of this.panelRight) {
          if (this.mapOfOrderByCustomer.has(panelRight.itemCode)) {
            panelRight.crates = this.mapOfOrderByCustomer.get(panelRight.itemCode)[0];
            panelRight.qty = this.mapOfOrderByCustomer.get(panelRight.itemCode)[1];
            // panelRight.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelRight.itemCode)[2]; // changes made as per discussion with ganesh on 08-10-2020
            panelRight.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelRight.itemCode)[2] == 'CRA' ? 'PKT' : this.mapOfOrderByCustomer.get(panelRight.itemCode)[2];
            panelRight.orderQuantity = this.mapOfOrderByCustomer.get(panelRight.itemCode)[3];
            panelRight.isExist = true;
            panelRight.isAvailToOrder = true;
            panelRight.minOrderQtyFlag = true;
            panelRight.lineId = this.mapOfOrderByCustomer.get(panelRight.itemCode)[4];
            panelRight.masterLineId = this.mapOfOrderByCustomer.get(panelRight.itemCode)[5];
            panelRight.lastUpdateBy = this.mapOfOrderByCustomer.get(panelRight.itemCode)[6];
            panelRight.lastUpdateLogin = this.mapOfOrderByCustomer.get(panelRight.itemCode)[7];
            panelRight.lastUpdateDate =todayDate;
            panelRight.creationDate = this.mapOfOrderByCustomer.get(panelRight.itemCode)[8];
            panelRight.createdBy = this.mapOfOrderByCustomer.get(panelRight.itemCode)[9];
            this.descCalc(panelRight);
          }
          else {
            // console.log('panelRight.sellingUOM',panelRight.sellingUOM)
            panelRight.crates = 0;
            panelRight.qty = 0;
            panelRight.isExist = false;
            panelRight.uomOrderQuantityToSend = panelRight.sellingUOM == 'CRA' ? 'PKT' : panelRight.sellingUOM;
            panelRight.isAvailToOrder = true;
            panelRight.minOrderQtyFlag = true;
            // panelRight.lineId = this.mapOfOrderByCustomer.get(panelRight.itemCode)[4];
            // panelRight.masterLineId = this.mapOfOrderByCustomer.get(panelRight.itemCode)[5];
            this.descCalc(panelRight);
          }
          // console.log('panelRight',panelRight)
        }
        this.calculateTotal();

        if (this.isRetailer) {
          setTimeout(function () {
            const selectedValue = (document.getElementById('pkt-0') as HTMLInputElement);
            selectedValue.select();
          }, 10)
        }

        //this.updateDisabled = false;
      }
    },
      err => {
        if (err.status === 500) {
          this.errorHandle();
        }
      });

  }
  async getallsalesordertype(){
    await this.callDeskService.getallsalesordertype().subscribe((res) => {
      this.orderTypeDetailsList = res;
      if(this.orderTypeDetailsList){
        // this.sequence = null;
      }
    });
  }
  getRouteList(shipToSiteUseId,orderTypeId,shift){
    this.callDeskService.getRouteList(this.systemDt,shipToSiteUseId,orderTypeId,shift).subscribe((res) => {
      this.routeList = res;
      // this.sequence=null;
      // console.log('this.routeList',this.routeList)
      if(this.routeList.length>0){
        this.updateDisabled=false;
        this.routeNumber=this.routeList[0].routeNumber;
        this.filterForm.patchValue({
          // orderTypeId: this.customerDetails.orderTypeId,
          routeNumber: this.customerDetails.route
        });
      } else {
        this.sequence=null;
        this.updateDisabled=true;
        this.toastr.error('No Route Number Found', 'Call Desk', {
          timeOut: 1000
        });
      }
    });
  }
  setSequenceNumber(event){
    // console.log('event',event)
    this.routeList.forEach(element => {
      if(element.routeNumber==event){
        this.sequence=element.routeSeqNo;
      }
    });
  }
  setOrderTypeId(event){
    // console.log('value',event.target.value)
    this.orderTypeId=event.target.value;
    this.callDeskService.getcurrentshiftbytime().subscribe((res) => {
      this.shiftResponse = res;
      this.getRouteList(this.customerDetails.shipToSiteUseId,this.orderTypeId,this.shiftResponse.shiftCode);
    });
    
  }
  descCalc(panelVal) {

    if (panelVal.unitsPerCrates === null) {
      panelVal.unitsPerCrates = 0;
    }
    if (panelVal.qty === null) {
      panelVal.qty = 0;
    }
    if (panelVal.crates === null) {
      panelVal.crates = 0;
    }
    // if (panelVal.qty === null) {
    //   panelVal.qty = 0;
    // }
    panelVal.orderQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
    if (panelVal.qty !== '' && panelVal.qty !== undefined && panelVal.qty !== null) {
      const remainderPackets = panelVal.qty % panelVal.unitsPerCrates;
      panelVal.updatedqty = remainderPackets;
      panelVal.updatedcrates = ((panelVal.crates === undefined || panelVal.crates === null) ? 0 : panelVal.crates) + ((panelVal.qty - remainderPackets) / panelVal.unitsPerCrates);
    } else {
      panelVal.updatedcrates = ((panelVal.crates === undefined || panelVal.crates === null) ? 0 : panelVal.crates);

    }

    if (panelVal.updatedqty !== undefined) {
      panelVal.plusIcon = true;
    }

    if (panelVal.crates !== undefined || panelVal.qty != undefined) {
      panelVal.isModified = true;
    }
    var sellingUOM;
    if (this.shippingDetails != undefined) {
      if (panelVal.sellingUOM === 'CRA') {
        sellingUOM = 'PKT';
      }
      else {
        sellingUOM = panelVal.sellingUOM;
      }


      if (panelVal.isExist) {
        this.callDeskService.getItemsByPriceListIdAndOrderTypeIdAnditemCodeAndSellingUOM(this.shippingDetails[0].priceListId, this.customerDetails.orderTypeId, panelVal.itemCode, sellingUOM).subscribe((response) => {
          let itemDetails: any = response;
          if (itemDetails) {
            let singleItem = itemDetails[0];
            if (singleItem !== undefined) {
              panelVal.inventoryItemId = singleItem.itemId;
              panelVal.taxPercentage = singleItem.taxPercentage;
              //panelVal.taxPercentage = 0.5;
              panelVal.lineTypeId = singleItem.lineTypeId;
              panelVal.unitSellingPrice = singleItem.itemPrice;
              this.updateTotalValue();
            }
            else {
              this.updateTotalValue();
            }
          }
          else {
            this.updateTotalValue();
          }

        });
      }

    }
  }

  calculateTotal() {
    this.sumCrates = 0;
    let flagToDisable = false;
    for (const panelObj of this.panelLeft) {
      if (!isNaN(panelObj.updatedcrates)) {
        this.sumCrates += panelObj.updatedcrates;
      }
      if (panelObj.updatedqty !== 0 && (!isNaN(panelObj.updatedqty))) {
        this.sumCrates += 1;
      }
      if (!flagToDisable && (panelObj.minOrderQtyFlag === false || panelObj.isAvailToOrder === false)) {
        flagToDisable = true;
      }
    }

    for (const panelObj of this.panelRight) {
      if (Number.isNaN(panelObj.updatedcrates)) {
        panelObj.updatedcrates = 0;
      }
      if (Number.isNaN(panelObj.updatedqty)) {
        panelObj.updatedqty = 0;
      }

      if (!isNaN(panelObj.updatedcrates)) {
        this.sumCrates += panelObj.updatedcrates;
      }
      if (panelObj.updatedqty !== 0 && (!isNaN(panelObj.updatedqty))) {
        this.sumCrates += 1;
      }
      if (!flagToDisable && (panelObj.minOrderQtyFlag === false || panelObj.isAvailToOrder === false)) {
        flagToDisable = true;
      }
    }
    if (flagToDisable) {
      this.updateDisabled = true;
    } else if(this.sequence != null) {
      this.updateDisabled = false;
    }
  }
  errorHandle() {
    this.allInputs = false;
    this.customerDetails = [];
    this.shift = '';
    this.sumCrates = 0;
    this.orderTypeDetailsList = [];
    this.routeList = [];
    this.bookingDate = '';
    this.deliveryDate = '';
    this.status = '';
    this.sequence=null;
    this.filterForm.patchValue({
      orderTypeId: '',
      routeNumber: '',
    });
    for (const panelLeft of this.panelLeft) {
      panelLeft.crates = 0;
      panelLeft.qty = 0;
      panelLeft.orderQuantity = 0;
      //this.descCalc(panelLeft);
    }
    for (const panelRight of this.panelRight) {
      panelRight.crates = 0;
      panelRight.qty = 0;
      //this.descCalc(panelRight);
    }
    this.toastr.error('No Order Found', 'Call Desk', {
      timeOut: 1000
    });
    this.updateDisabled = true;
    this.valueTotal = 0;
    this.taxPercentage = 0;
    this.roundOff = 0;
    this.totalIndentVal = 0;
    this.orderState = 'NEW';
  }


  updateTotalValue() {
    this.valueTotal = 0;
    this.taxPercentage = 0;
    this.roundOff = 0;
    this.totalIndentVal = 0;

    for (const panelVal of this.panelLeft) {
      if (panelVal.updatedcrates === undefined) {
        panelVal.updatedcrates = 0;
      }
      if (panelVal.unitsPerCrates === undefined) {
        panelVal.unitsPerCrates = 0;
      }
      if (panelVal.qty === undefined) {
        panelVal.qty = 0;
      }

      if (panelVal.itemPriceAdd === undefined) {
        panelVal.itemPriceAdd = 0;
      }
      let cratesToAdd = isNaN(panelVal.crates) ? 0 : panelVal.crates;
      let unitsPerCratesAdd = isNaN(panelVal.unitsPerCrates) ? 0 : panelVal.unitsPerCrates;
      let unitsToAdd = isNaN(panelVal.qty) ? 0 : panelVal.qty;
      let itemPriceAdd = isNaN(panelVal.unitSellingPrice) ? 0 : panelVal.unitSellingPrice;
      panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;

      this.valueTotal = this.valueTotal + panelVal.priceItem;

      if (panelVal.taxPercentage === null) {
        panelVal.taxPercentage = 0;
      }

      if (panelVal.crates !== 0 || panelVal.qty !== 0) {
        if (panelVal.taxPercentage !== undefined) {
          this.taxPercentage += (((panelVal.priceItem * panelVal.taxPercentage) / 100));
          this.roundOff = Math.round(this.valueTotal + this.taxPercentage) - (this.valueTotal + this.taxPercentage);
          this.roundOff = this.roundOff.toFixed(2);
        }
      } else {
        this.taxPercentage = this.taxPercentage;
      }
      this.totalIndentVal = this.valueTotal + this.taxPercentage;
    }
    for (const panelVal of this.panelRight) {

      if (panelVal.updatedcrates === undefined) {
        panelVal.updatedcrates = 0;
      }
      if (panelVal.unitsPerCrates === undefined) {
        panelVal.unitsPerCrates = 0;
      }
      if (panelVal.qty === undefined) {
        panelVal.qty = 0;
      }

      if (panelVal.itemPriceAdd === undefined) {
        panelVal.itemPriceAdd = 0;
      }


      let cratesToAdd = isNaN(panelVal.crates) ? 0 : panelVal.crates;
      let unitsPerCratesAdd = isNaN(panelVal.unitsPerCrates) ? 0 : panelVal.unitsPerCrates;
      let unitsToAdd = isNaN(panelVal.qty) ? 0 : panelVal.qty;
      let itemPriceAdd = isNaN(panelVal.unitSellingPrice) ? 0 : panelVal.unitSellingPrice;
      panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;

      this.valueTotal = this.valueTotal + panelVal.priceItem;

      if (panelVal.taxPercentage === null) {
        panelVal.taxPercentage = 0;
      }
      if (panelVal.crates !== 0 || panelVal.qty !== 0) {

        if (panelVal.taxPercentage !== undefined) {
          this.taxPercentage += (((panelVal.priceItem * panelVal.taxPercentage) / 100));
          this.roundOff = Math.round(this.valueTotal + this.taxPercentage) - (this.valueTotal + this.taxPercentage);
          this.roundOff = this.roundOff.toFixed(2);
        }
      } else {
        this.taxPercentage = this.taxPercentage;
      }
      this.totalIndentVal = this.valueTotal + this.taxPercentage;
    }
  }
  async onChangeOfQuantity(panelVal) {
    if (panelVal.sellingUOM !== 'PKT') {
      if (panelVal.crates === null) {
        panelVal.crates = 0;
      }
    }
    else {
      if (panelVal.qty === null) {
        panelVal.qty = 0;
      }
    }
    this.x = this.x++;
    const oldIsExist = panelVal.isExist;
    panelVal.isExist = true;

    await this.verifyQuantityToAvail(panelVal);
    let valid = this.verifyMinOrderQuantity(panelVal);
    if (panelVal.minOrderQtyFlag && panelVal.isAvailToOrder) {
      // this.updateDisabled = false;
      this.descCalc(panelVal);
      this.calculateTotal();
    } else {
      this.updateDisabled = true;
    }

    panelVal.isExist = oldIsExist;
  }

  verifyMinOrderQuantity(panelVal) {
    panelVal.minOrderQtyFlag = true;
    if (panelVal.minOrderQty !== '1' && panelVal.minOrderQty !== null) {

      if (panelVal.sellingUOM !== 'PKT') {

        if ((panelVal.crates !== 0) && (panelVal.crates % panelVal.minOrderQty !== 0)) {
          this.toastr.error('Order should be minimum of ' + panelVal.minOrderQty + ' or multiple of ' + panelVal.minOrderQty, 'Call Desk', {
            timeOut: 1000
          });
          // panelVal.minOrderQtyFlag = false;
          panelVal.crates = 0;
          panelVal.isAvailToOrder = true;
          return false;
        }
      }
      else {
        if ((panelVal.qty !== 0) && (panelVal.qty % panelVal.minOrderQty !== 0)) {
          this.toastr.error('Order should be minimum of ' + panelVal.minOrderQty + ' or multiple of ' + panelVal.minOrderQty, 'Call Desk', {
            timeOut: 1000
          });
          // panelVal.minOrderQtyFlag = false;
          panelVal.qty = 0;
          panelVal.isAvailToOrder = true;
          return false;
        }
      }

    }
    return true;
  }

  // async verifyQuantityToAvail(panelVal) {
  //   panelVal.isAvailToOrder = false;
  //   if (panelVal.category === 'Dairy Sweets' || panelVal.category === 'Milk Product') {
  //     if (panelVal.itemCode !== 'CU200' && panelVal.itemCode !== 'CU500' && panelVal.itemCode !== 'CU1000') {
  //       const res = await this.callDeskService.getAvailToOrderValue(panelVal.itemCode).toPromise();
  //       if (res) {
  //         let firstRes = res[0];
  //         if (firstRes !== undefined) {
  //           let availToOrder = firstRes.avoilToOrder;
  //           if (availToOrder != null || availToOrder != undefined) {
  //             if (panelVal.sellingUOM !== 'PKT') {
  //               if ((panelVal.crates !== 0) && (panelVal.crates > availToOrder)) {
  //                 //console.log('Invalid Crates');
  //                 this.toastr.error('Enough stock not available', 'Call Desk', {
  //                   timeOut: 8000
  //                 });
  //                 panelVal.crates = 0;
  //                 panelVal.isAvailToOrder = true;
  //                 return false;
  //               } else {
  //                 panelVal.isAvailToOrder = true;
  //               }
  //             }
  //             else {
  //               if ((panelVal.qty !== 0) && (panelVal.qty > availToOrder)) {
  //                 this.toastr.error('Enough stock not available', 'Call Desk', {
  //                   timeOut: 8000
  //                 });
  //                 panelVal.qty = 0;
  //                 panelVal.isAvailToOrder = true;
  //                 return false;
  //               } else {
  //                 panelVal.isAvailToOrder = true;
  //               }
  //             }
  //           }
  //         }
  //         else {
  //           panelVal.isAvailToOrder = true;
  //         }
  //       }
  //     }
  //     else {
  //       panelVal.isAvailToOrder = true;
  //     }
  //   }
  //   else {
  //     panelVal.isAvailToOrder = true;
  //   }
  // }

  async verifyQuantityToAvail(panelVal) {
    panelVal.isAvailToOrder = false;
    if (panelVal.category === 'Dairy Sweets' || panelVal.category === 'Milk Product') {
      if (panelVal.itemCode !== 'CU200' && panelVal.itemCode !== 'CU500' && panelVal.itemCode !== 'CU1000') {
        const res = await this.callDeskService.getAvailToOrderValue(panelVal.itemCode).toPromise();
        if (res) {
          let firstRes = res[0];
          let enteredVal;
          if (firstRes !== undefined) {
            const availToOrder = firstRes.avoilToOrder;
            if ((availToOrder <= 0) || (availToOrder === null)) {
              this.toastr.error('Enough stock not available', 'Call Desk', {
                timeOut: 1000
              });
              panelVal.crates = 0;
              panelVal.qty = 0;
              panelVal.isAvailToOrder = true;
              return false;
            }
            else {
              if (availToOrder != null || availToOrder != undefined) {
                if (panelVal.sellingUOM !== 'PKT') {
                  enteredVal = panelVal.crates * panelVal.ppc;
                  if ((availToOrder - enteredVal) < 0) {
                    this.toastr.error('Enough stock not available', 'Call Desk', {
                      timeOut: 1000
                    });
                    panelVal.crates = 0;
                    panelVal.isAvailToOrder = true;
                    return false;
                  }
                  else {
                    panelVal.isAvailToOrder = true;
                  }
                }
                else {
                  enteredVal = panelVal.qty;
                  if ((availToOrder - enteredVal) < 0) {
                    this.toastr.error('Enough stock not available', 'Call Desk', {
                      timeOut: 1000
                    });
                    panelVal.qty = 0;
                    panelVal.isAvailToOrder = true;
                    return false;
                  }
                  else {
                    panelVal.isAvailToOrder = true;
                  }
                }
              }
            }
          } else {
            panelVal.isAvailToOrder = true;
          }
        }
      }
      else {
        panelVal.isAvailToOrder = true;
      }
    } else {
      panelVal.isAvailToOrder = true;
    }
  }

  async clearCratesAndPackets() {
    // var th = this;
    for (const panelVal of this.panelLeft) {
      panelVal.crates = 0;
      panelVal.qty = 0;
      panelVal.updatedqty = 0;
      panelVal.updatedcrates = 0;
    }
    for (const panelVal of this.panelRight) {
      panelVal.crates = 0;
      panelVal.qty = 0;
      panelVal.updatedqty = 0;
      panelVal.updatedcrates = 0;
    }
  }

  updateData() {
    let orderItems: any = [];
    let updateArray: any = {};
    this.data = JSON.parse(localStorage.getItem('data'));
    // console.log('this.panelLeft',this.panelLeft)
    this.itemDetails = '';
    for (let panelVal of this.panelLeft) {
      if (panelVal.crates === null) {
        panelVal.crates = 0;
      }
      if (panelVal.qty === null) {
        panelVal.qty = 0;
      }
      if (panelVal.isModified === true && (panelVal.crates !== 0 || panelVal.qty !== 0)) {
        this.oItem = {};
        let orderByCust: any = null;
        if (this.mapOfOrderByCustomerUpdate.has(panelVal.itemCode)) {
          orderByCust = this.mapOfOrderByCustomerUpdate.get(panelVal.itemCode);
        }
        // this.oItem.orgId = this.customerDetails.orgId; // siteOrgId from  getCustShippingDetailsByAcctNo
        // this.oItem.promiseDate = this.customerDetails.promiseDate;// next day
        // this.oItem.requestDate = this.customerDetails.requestDate;// todays date

        // this.oItem.itemCode = panelVal.itemCode;
        // this.oItem.itemSequenceNumber = panelVal.itemSequenceNumber;

        // this.oItem.qtyPackets = panelVal.qty;
        // this.oItem.priceListId = this.customerDetails.priceListId;// priceListId from  getCustShippingDetailsByAcctNo
        // this.oItem.pricingDate = this.customerDetails.pricingDate;// todays date
        // this.oItem.shipFromOrgId = this.customerDetails.soldFromOrgId;// siteWareHouseId from  getCustShippingDetailsByAcctNo
        // this.oItem.qtyCrates = panelVal.crates;
        // this.oItem.shippingMethodCode = '000001_TG_R_GND';
        // this.oItem.soldFromOrgId = this.customerDetails.soldFromOrgId; // orgId from  getCustShippingDetailsByAcctNo
        // this.oItem.soldToOrgId = this.customerDetails.soldToOrgId; // customerAccountId from  getCustShippingDetailsByAcctNo
        // if (this.cancelled == true) {
        //   this.oItem.status = "CANCELLED"
        // } else {
        //   this.oItem.status = this.customerDetails.status;
        // }
        // // If no orders are there then it will be new else it will be this.customerDetails.status
        // // this.oItem.status = 'Updated'; //If no orders are there then it will be new else it will be this.customerDetails.status
        // this.oItem.orderQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        // this.oItem.shippedQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;

        // this.oItem.subInventory = null;
        // // this.oItem.unitListPrice = orderByCust.unitListPrice;
        // this.oItem.unitSellingPrice = panelVal.unitSellingPrice;
        // this.oItem.unitListPrice = panelVal.unitSellingPrice;
        // // this.oItem.uom = panelVal.uomToOrder;
        // this.oItem.uom = panelVal.sellingUOM;
        // // this.oItem.lineTypeId = '1001';
        // this.oItem.lineTypeId = orderByCust != null ? orderByCust.lineTypeId : panelVal.lineTypeId;
        // if (orderByCust != null) {
        //   this.oItem.originalSysLineRef = orderByCust.originalSysLineRef;
        // }
        // // this.oItem.orderQuantityUOM = panelVal.uomOrderQuantityToSend;
        // // this.oItem.orderQuantityUOM = panelVal.uom;
        // if (panelVal.sellingUOM !== 'CRA') {
        //   this.oItem.orderQuantityUOM = panelVal.sellingUOM;
        // } else {
        //   this.oItem.orderQuantityUOM = 'PKT';
        // }
        // this.oItem.inventoryItemId = panelVal.inventoryItemId;
        //new values
        // console.log('panelVal',panelVal)
        this.oItem.lineId = panelVal.lineId;
        this.oItem.masterLineId = panelVal.masterLineId;
        this.oItem.itemId = panelVal.itemId;
        this.oItem.quantityCrates = panelVal.crates;
        this.oItem.quantityPacket = panelVal.qty;
        this.oItem.status = this.customerDetails.status;
        this.oItem.errorMessage = "";
        this.oItem.creationDate =(panelVal.creationDate!=null)?panelVal.creationDate:this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS');
        this.oItem.createdBy = (panelVal.createdBy!=null)?panelVal.createdBy:this.data.userId;
        this.oItem.lastUpdateDate = (panelVal.lastUpdateDate!=null)?panelVal.lastUpdateDate:this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS');
        this.oItem.lastUpdateBy = (panelVal.lastUpdateBy!=null)?panelVal.lastUpdateBy:this.data.userId;
        this.oItem.lastUpdateLogin = (panelVal.lastUpdateLogin!=null)?panelVal.lastUpdateLogin:this.data.userId;
        orderItems.push(this.oItem);
        // console.log('this.oItem',this.oItem)
      }
        let PacketAndCrt;
        if (panelVal.sellingUOM === 'BOX' && panelVal.orderQuantity>0) {
          PacketAndCrt = panelVal.orderQuantity + 'B,';
          this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
        }
        if (panelVal.sellingUOM === 'PKT' && panelVal.orderQuantity>0 ) {
          PacketAndCrt = panelVal.orderQuantity + 'P,';
          this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
        }
        if (panelVal.sellingUOM === 'CRA' && panelVal.orderQuantity>0) {
          PacketAndCrt = panelVal.orderQuantity + 'P,';
          this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
        }
         if (panelVal.sellingUOM === 'TIN' && panelVal.orderQuantity>0) {
          PacketAndCrt = panelVal.orderQuantity + 'T,';
          this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
        }
    }

    for (let panelVal of this.panelRight) {
      if (panelVal.isModified === true && (panelVal.crates !== 0 || panelVal.qty !== 0)) {
        this.oItem = {};
        let orderByCust: any = null;
        if (this.mapOfOrderByCustomerUpdate.has(panelVal.itemCode)) {
          orderByCust = this.mapOfOrderByCustomerUpdate.get(panelVal.itemCode);
        }
        // this.oItem.orgId = this.customerDetails.orgId; // siteOrgId from  getCustShippingDetailsByAcctNo
        // this.oItem.promiseDate = this.customerDetails.promiseDate;// next day
        // this.oItem.requestDate = this.customerDetails.requestDate;// todays date

        // this.oItem.itemCode = panelVal.itemCode;
        // this.oItem.itemSequenceNumber = panelVal.itemSequenceNumber;

        // this.oItem.qtyPackets = panelVal.qty;
        // this.oItem.priceListId = this.customerDetails.priceListId;// priceListId from  getCustShippingDetailsByAcctNo
        // this.oItem.pricingDate = this.customerDetails.pricingDate;// todays date
        // this.oItem.shipFromOrgId = this.customerDetails.shipFromOrgId;// siteWareHouseId from  getCustShippingDetailsByAcctNo
        // this.oItem.qtyCrates = panelVal.crates;
        // this.oItem.shippingMethodCode = '000001_TG_R_GND';
        // this.oItem.soldFromOrgId = this.customerDetails.soldFromOrgId; // orgId from  getCustShippingDetailsByAcctNo
        // this.oItem.soldToOrgId = this.customerDetails.soldToOrgId; // customerAccountId from  getCustShippingDetailsByAcctNo
        // if (this.cancelled == true) {
        //   this.oItem.status = "CANCELLED"
        // } else {
        //   this.oItem.status = this.customerDetails.status;
        // }
        // // If no orders are there then it will be new else it will be this.customerDetails.status
        // // this.oItem.status = 'Updated'; //If no orders are there then it will be new else it will be this.customerDetails.status
        // this.oItem.orderQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        // this.oItem.shippedQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        // this.oItem.subInventory = null;
        // this.oItem.unitListPrice = panelVal.unitSellingPrice;
        // this.oItem.unitSellingPrice = panelVal.unitSellingPrice;
        // this.oItem.uom = panelVal.sellingUOM;
        // // this.oItem.lineTypeId = '1001';
        // this.oItem.lineTypeId = orderByCust != null ? orderByCust.lineTypeId : panelVal.lineTypeId;
        // if (orderByCust != null) {
        //   this.oItem.originalSysLineRef = orderByCust.originalSysLineRef;
        // }
        // // this.oItem.orderQuantityUOM = panelVal.uom;
        // if (panelVal.sellingUOM !== 'CRA') {
        //   this.oItem.orderQuantityUOM = panelVal.sellingUOM;
        // } else {
        //   this.oItem.orderQuantityUOM = 'PKT';
        // }
        // this.oItem.inventoryItemId = panelVal.inventoryItemId;
        //new values
        this.oItem.lineId = panelVal.lineId;
        this.oItem.masterLineId = panelVal.masterLineId;
        this.oItem.itemId = panelVal.itemId;
        this.oItem.quantityCrates = panelVal.crates;
        this.oItem.quantityPacket = panelVal.qty;
        this.oItem.status = this.customerDetails.status;
        this.oItem.errorMessage = "";
        this.oItem.creationDate = (panelVal.creationDate!=null)?panelVal.creationDate:this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS');
        this.oItem.createdBy = (panelVal.createdBy!=null)?panelVal.createdBy:this.data.userId;
        this.oItem.lastUpdateDate = (panelVal.lastUpdateDate!=null)?panelVal.lastUpdateDate:this.datePipe.transform(this.date, 'dd-MM-yyyy HH:MM:SS');
        this.oItem.lastUpdateBy = (panelVal.lastUpdateBy!=null)?panelVal.lastUpdateBy:this.data.userId;
        this.oItem.lastUpdateLogin = (panelVal.lastUpdateLogin!=null)?panelVal.lastUpdateLogin:this.data.userId;
        orderItems.push(this.oItem);
        // console.log('this.oItem2',this.oItem)
      }
      let PacketAndCrt;
      if (panelVal.sellingUOM === 'BOX' && panelVal.orderQuantity>0) {
        PacketAndCrt = panelVal.orderQuantity + 'B,';
        this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
      }
      if (panelVal.sellingUOM === 'PKT' && panelVal.orderQuantity>0) {
        PacketAndCrt = panelVal.orderQuantity + 'P,';
        this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
      }
      if (panelVal.sellingUOM === 'CRA' && panelVal.orderQuantity>0) {
        PacketAndCrt = panelVal.orderQuantity + 'P,';
        this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
      }
      if (panelVal.sellingUOM === 'TIN' && panelVal.orderQuantity>0) {
        PacketAndCrt = panelVal.orderQuantity + 'T,';
        this.itemDetails += panelVal.itemCode + ':' + PacketAndCrt;
      }
      
    }
    updateArray.salesOrderLine = orderItems;
    // updateArray.route = this.customerDetails.route;
    // updateArray.invoiceToOrgId = this.siteUseId;// siteUseId from custBilling details call new API
    // updateArray.orderTypeId = this.customerDetails.orderTypeId;// will be fetched from dropdown
    // updateArray.paymentTermId = this.customerDetails.paymentTermId;
    // updateArray.priceListId = this.customerDetails.priceListId;
    // updateArray.salesRepId = this.customerDetails.salesRepId;// primarySalesRepId
    // updateArray.shipToOrgId = this.siteUseId;
    // updateArray.shipFromOrgId = this.customerDetails.shipFromOrgId;
    // updateArray.soldFromOrgId = this.customerDetails.soldFromOrgId;
    // updateArray.soldToOrgId = this.customerDetails.soldToOrgId;
    // updateArray.orgId = this.customerDetails.orgId;
    // updateArray.shift = this.customerDetails.shift;
    if (this.cancelled == true) {
      updateArray.status = "CANCELLED"
    } else {
      updateArray.status = this.customerDetails.status;
    }
    // updateArray.promiseDate = this.customerDetails.promiseDate;// next day
    // updateArray.requestDate = this.customerDetails.requestDate;// todays date
    // updateArray.promiseDate = this.nextDt;//next day
    // updateArray.requestDate = this.systemDt;//todays date
    // updateArray.bookedFlag = this.customerDetails.bookedFlag;
    // updateArray.cancelledFlag = this.customerDetails.cancelledFlag;
    // updateArray.freightTermsCode = this.customerDetails.freightTermsCode;
    // updateArray.orderSourceId = this.customerDetails.orderSourceId;
    // updateArray.orderedDate = this.customerDetails.orderedDate;// todays date
    // updateArray.origSysDocumnetRef = this.customerDetails.origSysDocumnetRef;
    // updateArray.indentId = this.customerDetails.indentId;
    // updateArray.seq = this.customerDetails.seq;
    // updateArray.source = this.customerDetails.source;
    // updateArray.pricingDate = this.customerDetails.pricingDate;// todays date
    // updateArray.shippingMethodCode = '000001_TG_R_GND';
    // updateArray.transactionalCurrencyCode = this.customerDetails.transactionalCurrencyCode;
    // updateArray.accountNumber = this.customerDetails.accountNumber;
    //new added values
    updateArray.headerId=this.customerDetails.headerId;
    updateArray.masterHeaderId=this.customerDetails.masterHeaderId;
    // updateArray.masterHeaderId=null;
    updateArray.customerAccountId=this.customerDetails.customerAccountId;
    updateArray.custAccountSiteId=this.customerDetails.custAccountSiteId;
    updateArray.uploadId=this.customerDetails.uploadId;
    updateArray.shiftId=this.customerDetails.shiftId;
    updateArray.bookingDate=this.customerDetails.bookingDate;
    updateArray.deliveryDate=this.customerDetails.deliveryDate;
    updateArray.errorMessage=null;
    updateArray.comments=null;
    updateArray.orderHeaderId=this.customerDetails.orderHeaderId;
    updateArray.creationDate=this.customerDetails.creationDate; //need to check
    updateArray.createdBy=this.customerDetails.createdBy;// need to check
    updateArray.lastUpdatedDate=this.customerDetails.lastUpdatedDate;//need to check
    updateArray.lastUpdatedBy=this.customerDetails.lastUpdatedBy;//need to check
    updateArray.lastUpdateLogin=this.customerDetails.lastUpdateLogin;//need to check
    updateArray.portalAllowUpdate="Y";//need to check
    updateArray.billToSiteUseId=this.customerDetails.billToSiteUseId,
    updateArray.shipToSiteUseId=this.customerDetails.shipToSiteUseId,
    updateArray.orderTypeId=parseInt(this.orderTypeId?this.orderTypeId:this.customerDetails.orderTypeId),
    updateArray.seq=parseInt(this.sequence?this.sequence:this.customerDetails.seq),
    updateArray.route=this.routeNumber?this.routeNumber:this.customerDetails.route,
    // updateArray.customerAcctSiteId=this.customerDetails.custAccountSiteId;//need to check
    // return false; 

    // console.log(updateArray)
    this.callDeskService.updateSalesOrder(updateArray).subscribe((response) => {
     // this.itemDetails = '';
      for (let i = 0; i < updateArray.salesOrderLine.length; i++) {
        // let PacketAndCrt;
        // if (updateArray.salesOrderLine[i].orderQuantityUOM === 'BOX') {
        //   PacketAndCrt = updateArray.salesOrderLine[i].orderQuantity + 'P,';
        // }
        // if (updateArray.salesOrderLine[i].orderQuantityUOM === 'PKT') {
        //   PacketAndCrt = updateArray.salesOrderLine[i].orderQuantity + 'P,';
        // }
        // if (updateArray.salesOrderLine[i].orderQuantityUOM === 'CRA') {
        //   PacketAndCrt = updateArray.salesOrderLine[i].orderQuantity + 'P,';
        // }
        // this.itemDetails += updateArray.salesOrderLine[i].itemCode + ':' + PacketAndCrt;
        if (i + 1 === updateArray.salesOrderLine.length) {
          const smsTemplate = 'Your Indent for ' +
            this.customerDetails.bookingDate + ',' + this.customerDetails.shiftCode + ',' + '\n' + this.itemDetails + '\n' + 'Worth Rs.' + this._decimalPipe.transform(this.totalIndentVal, '1.0-0');
          // console.log(smsTemplate);
          if (this.billingDetails.contactNumber != null) {
            this.callDeskService.sendSMS(this.billingDetails.contactNumber, smsTemplate).subscribe(res => {
            });
          }
        }
      }
      this.toastr.success('Sales Order Updated Successfully', 'Call Desk', {
        timeOut: 2000
      });
      location.reload();
    });
  }
  reload() {
    location.reload();
  }

  setTabIndex() {
    this.x = 0;
    for (let i = 0; i < this.panelLeft.length; i++) {
      this.panelLeft[i].unitsPerCrates = this.panelLeft[i].ppc;
      if (this.panelLeft[i].sellingUOM !== 'PKT') {
        this.panelLeft[i].tabIndexCrates = ++this.x;
      } else {
        this.panelLeft[i].tabIndexCrates = -1;
      }
      if (this.panelLeft[i].sellingUOM === 'PKT') {
        this.panelLeft[i].tabIndexPackets = ++this.x;
      } else {
        this.panelLeft[i].tabIndexPackets = -1;
      }
    }
    for (let i = 0; i < this.panelRight.length; i++) {
      this.panelRight[i].unitsPerCrates = this.panelRight[i].ppc;
      if (this.panelRight[i].sellingUOM !== 'PKT') {
        this.panelRight[i].tabIndexCrates = ++this.x;
      } else {
        this.panelRight[i].tabIndexCrates = -1;
      }
      if (this.panelRight[i].sellingUOM === 'PKT') {
        this.panelRight[i].tabIndexPackets = ++this.x;
      } else {
        this.panelRight[i].tabIndexPackets = -1;
      }
    }
  }

  openModal(template: any) {

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });

  }


  confirm(): void {
    this.cancelled = true;
    this.modalRef.hide();
    this.updateData();
  }

  decline(): void {
    this.modalRef.hide();
  }
}
