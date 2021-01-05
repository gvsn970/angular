import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TabService } from '../../../../shared/service/tab.service';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CallDeskService } from 'src/app/shared/service/call-desk.service';
import { SharedService } from 'src/app/shared/service/shared.service';


@Component({
  selector: 'app-temp-indent',
  templateUrl: './temp-indent.component.html',
  styleUrls: ['./temp-indent.component.css'],
  providers: [TabService]
})
export class TempIndentComponent implements OnInit {

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
  allInputs: any;
  itemPriceAdd: any = 0;
  priceItem: any;
  shift: any;
  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private callDeskService: CallDeskService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router,
    private SharedService: SharedService) { }
  x = 0;
  ngOnInit() {
    this.allInputs = false;
    this.callDeskService.getItemIndent('LEFT').subscribe((response) => {
      this.panelLeft = response;
      //this.panelLeft.unitsPerCrates = '12';
      const tabIndexLeft: any = response;
      // return false;

      //code commented for clarity starts
      for (let i = 0; i < tabIndexLeft.length; i++) {
        if (tabIndexLeft[i].sellingUOM !== 'PKT') {
          tabIndexLeft[i].tabIndexCrates = ++this.x;
        } else {
          tabIndexLeft[i].tabIndexCrates = -1;
        }
        if (tabIndexLeft[i].sellingUOM === 'PKT') {
          tabIndexLeft[i].tabIndexPackets = ++this.x;
        } else {
          tabIndexLeft[i].tabIndexPackets = -1;
        }
      }
      this.panelLeft = tabIndexLeft;
    });

    this.callDeskService.getItemIndent('RIGHT').subscribe((response) => {
      this.panelRight = response;
      const tabIndexRight: any = response;

      for (let i = 0; i < tabIndexRight.length; i++) {
        if (tabIndexRight[i].sellingUOM !== 'PKT') {
          tabIndexRight[i].tabIndexCrates = ++this.x;
        } else {
          tabIndexRight[i].tabIndexCrates = -1;
        }
        if (tabIndexRight[i].sellingUOM == 'PKT') {
          tabIndexRight[i].tabIndexPackets = ++this.x;
        } else {
          tabIndexRight[i].tabIndexPackets = -1;
        }
      }


      this.panelRight = tabIndexRight;
    });

    const dateNow: any = this.datePipe.transform(new Date(), 'HH');

    var date = new Date();
    date.setDate(date.getDate() + 1);
    this.systemDt = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.nextDt = this.datePipe.transform(date, 'dd-MM-yyyy');

  }

  descCalc(panelVal) {
    this.x = this.x++;
    if (panelVal.unitsPerCrates === null) {
      panelVal.unitsPerCrates = 0;
    }
    if (panelVal.qty !== '' && panelVal.qty !== undefined && panelVal.qty !== null) {
      const remainderPackets = panelVal.qty % panelVal.unitsPerCrates;
      panelVal.updatedqty = remainderPackets;
      panelVal.updatedcrates = ((panelVal.crates === undefined || panelVal.crates === null) ? 0 : panelVal.crates) + ((panelVal.qty - remainderPackets) / panelVal.unitsPerCrates);
    } else {
      panelVal.updatedcrates = ((panelVal.crates === undefined || panelVal.crates === null) ? 0 : panelVal.crates);

    }


    this.sumCrates = 0;
    // this.valueTotal = 0;
    for (const panelObj of this.panelLeft) {
      if (!isNaN(panelObj.updatedcrates)) {
        this.sumCrates += panelObj.updatedcrates;
      }
      if (panelObj.updatedqty !== 0 && (!isNaN(panelObj.updatedqty))) {
        this.sumCrates += 1;
      }



      /* let cratesToAdd = isNaN(panelObj.updatedcrates) ? 0 : panelObj.updatedcrates;
       let unitsPerCratesAdd = isNaN(panelObj.unitsPerCrates) ? 0 : panelObj.unitsPerCrates;
       let unitsToAdd = isNaN(panelObj.qty) ? 0 : panelObj.qty;
       let itemPriceAdd = isNaN(panelObj.unitSellingPrice) ? 0 : panelObj.unitSellingPrice;
       //this.valueTotal = this.valueTotal + (((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd);
       this.valueTotal = this.valueTotal + (((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd);*/


    }

    for (const panelObj of this.panelRight) {
      //code added to check if updatedcrates or updatedqty is NAN then show 0 over there
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

      if (panelVal.minOrderQty !== '1' && panelVal.minOrderQty !== null) {
        if (panelVal.sellingUOM !== 'PKT') {
          if (panelVal.crates % panelVal.minOrderQty !== 0) {
            //console.log('Invalid Crates');
          }
        }
        else {
          if (panelVal.qty % panelVal.minOrderQty !== 0) {
            //console.log('Invalid Packets');
          }
        }
      }

      this.callDeskService.getItemsByPriceListIdAndOrderTypeIdAnditemCodeAndSellingUOM(this.shippingDetails.priceListId, this.customerDetails.orderTypeId, panelVal.itemCode, sellingUOM).subscribe((response) => {
        let itemDetails: any = response;
        if (itemDetails) {
          let singleItem = itemDetails[0];
          if (singleItem !== undefined) {
            //panelVal.unitSellingPrice = singleItem.itemPrice;
            //panelVal.uom = singleItem.uom;
            panelVal.inventoryItemId = singleItem.itemId;
            panelVal.taxPercentage = singleItem.taxPercentage;
            panelVal.lineTypeId = singleItem.lineTypeId;
            panelVal.unitSellingPrice = singleItem.itemPrice;
            this.updateTotalValue();

            // for (let itemInResponse of itemDetails) {
            //   if (itemInResponse.uom === 'PKT' || itemInResponse.uom === 'KGS' ||
            //     itemInResponse.uom === 'EA' || itemInResponse.uom === 'LTR') {
            //     panelVal.unitSellingPrice = itemInResponse.itemPrice;
            //     if (!panelVal.isExist) {
            //       panelVal.uomOrderQuantityToSend = itemInResponse.uom;
            //     }
            //   } else if (itemInResponse.uom === 'CRA') {
            //     panelVal.cratesPrice = itemInResponse.itemPrice;
            //     if (!panelVal.isExist) {
            //       panelVal.uomOrderQuantityToSend = 'PKT';
            //     }
            //   }
            // }
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

  // updateTotalValue(panelVal) {
  //   let cratesToAdd = isNaN(panelVal.updatedcrates) ? 0 : panelVal.updatedcrates;
  //   let unitsPerCratesAdd = isNaN(panelVal.unitsPerCrates) ? 0 : panelVal.unitsPerCrates;
  //   let unitsToAdd = isNaN(panelVal.qty) ? 0 : panelVal.qty;
  //   let itemPriceAdd = isNaN(panelVal.unitSellingPrice) ? 0 : panelVal.unitSellingPrice;
  //   this.valueTotal = this.valueTotal + (((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd);
  //   if (panelVal.taxPercentage !== undefined) {
  //     this.taxPercentage = (this.taxPercentage + (parseInt(this.valueTotal) * parseInt(panelVal.taxPercentage) / 100));
  //     this.roundOff = (this.valueTotal + this.taxPercentage) - Math.floor(this.valueTotal + this.taxPercentage);
  //     this.roundOff = this.roundOff.toFixed(2);
  //   }
  // }

  updateTotalValue() {
    ////console.log(panelVal, 'panelVal');
    this.valueTotal = 0;
    this.taxPercentage = 0;
    this.roundOff = 0;

    if (this.shippingDetails != undefined) {
      var th = this;
      // setTimeout(function () {
      //   th.callDeskService.getByItemCodeAndPriceListId(panelVal.itemCode, th.shippingDetails.priceListId).subscribe((response) => {
      //     let itemDetails = response;
      //     let singleItem = itemDetails[0];
      //     if (singleItem !== undefined) {
      //       panelVal.unitSellingPrice = singleItem.itemPrice;
      //       panelVal.uom = singleItem.uom;
      //       panelVal.inventoryItemId = singleItem.itemId;
      //       panelVal.taxPercentage = singleItem.taxPercentage;
      //     }
      //   });
      // }, 7000);

    }

    //this.itemPriceAdd = 0;
    ////console.log(this.panelLeft.unitSellingPrice, 'panelVal.unitSellingPrice');

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
      // if (panelVal.itemCode === 'CU1000' || panelVal.itemCode === 'MSP500') {
      //   //console.log("panelVal", panelVal);
      // }
      panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;
      //this.valueTotal = this.valueTotal + (((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd);
      // if (cratesPrice === 0) {
      //   //panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;
      //   panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;
      // } else {
      //   panelVal.priceItem = ((cratesToAdd * cratesPrice) + (unitsToAdd * itemPriceAdd));
      // }

      this.valueTotal = this.valueTotal + panelVal.priceItem;

      if (panelVal.taxPercentage !== undefined) {
        this.taxPercentage = (this.taxPercentage + (parseInt(this.valueTotal) * parseInt(panelVal.taxPercentage) / 100));
        this.roundOff = (this.valueTotal + this.taxPercentage) - Math.floor(this.valueTotal + this.taxPercentage);
        this.roundOff = this.roundOff.toFixed(2);
      }
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
      //this.valueTotal = this.valueTotal + (((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd);
      // if (cratesPrice === 0) {
      //   panelVal.priceItem = ((cratesToAdd * unitsPerCratesAdd) + unitsToAdd) * itemPriceAdd;
      // } else {
      //   panelVal.priceItem = ((cratesToAdd * cratesPrice) + (unitsToAdd * itemPriceAdd));
      // }

      this.valueTotal = this.valueTotal + panelVal.priceItem;
      if (panelVal.taxPercentage !== undefined) {
        this.taxPercentage = (this.taxPercentage + (parseInt(this.valueTotal) * parseInt(panelVal.taxPercentage) / 100));
        this.roundOff = (this.valueTotal + this.taxPercentage) - Math.floor(this.valueTotal + this.taxPercentage);
        this.roundOff = this.roundOff.toFixed(2);
      }
    }
  }
  getCustomerDetails(elem) {
    //if (elem.target.value.length > 5) {
    this.callDeskService.getCustomerBilling(elem.target.value).subscribe((response) => {
      this.billingDetails = response;
    },
      err => {
        if (err.status === 500) {
          this.billingDetails = [];
        }
      });
    this.callDeskService.getCustomerShipping(elem.target.value).subscribe((response) => {

      this.shippingDetails = response;
      if (this.shippingDetails) {
        const wareHouseId = this.shippingDetails.siteUseId;
        //var wareHouseId = '21059';
        var todayDate = this.systemDt;
        //const todayDate = '19-02-2020';
        //var shiftNow = this.shift;
        //const shiftNow = 'E';
        const custId = elem.target.value;

        this.callDeskService.getSalesOrderDetail(wareHouseId,  this.SharedService.getDate(), custId , this.SharedService.getShift()).subscribe((response) => {
          if (response === null) {
            this.errorHandle();
          }
          else {
            this.customerDetails = response;

            this.shift = this.customerDetails.shift;

            this.allInputs = true;


            this.callDeskService.getOrderTypeDetail(this.customerDetails.orderTypeId).subscribe((response) => {
              this.orderTypeDetails = response;
              // //console.log(this.orderTypeDetails, 'ordername');

            });


            // //console.log(this.customerDetails, 'custDetails');

            this.updateDisabled = false;
            for (const order of this.customerDetails.orderItems) {
              const data: any[] = [];
              data.push(order.qtyCrates);
              data.push(order.qtyPackets);
              data.push(order.orderQuantityUOM);
              // this.mapOfOrderByCustomer.set("TM200", data);
              // this.mapOfOrderByCustomer.set("CU6000", data);
              this.mapOfOrderByCustomer.set(order.itemCode, data);
              this.mapOfOrderByCustomerUpdate.set(order.itemCode, order);
            }
            //console.log("this.mapOfOrderByCustomer", this.mapOfOrderByCustomer);
            for (const panelLeft of this.panelLeft) {
              if (this.mapOfOrderByCustomer.has(panelLeft.itemCode)) {
                panelLeft.crates = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[0];
                panelLeft.qty = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[1];
                panelLeft.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelLeft.itemCode)[2];
                panelLeft.isExist = true;
                this.descCalc(panelLeft);
              }
              else {
                panelLeft.crates = 0;
                panelLeft.qty = 0;
                panelLeft.isExist = false;
                panelLeft.uomOrderQuantityToSend = '';
                this.descCalc(panelLeft);

              }
            }

            for (const panelRight of this.panelRight) {
              if (this.mapOfOrderByCustomer.has(panelRight.itemCode)) {
                panelRight.crates = this.mapOfOrderByCustomer.get(panelRight.itemCode)[0];
                panelRight.qty = this.mapOfOrderByCustomer.get(panelRight.itemCode)[1];
                panelRight.uomOrderQuantityToSend = this.mapOfOrderByCustomer.get(panelRight.itemCode)[2];
                panelRight.isExist = true;
                this.descCalc(panelRight);
              }
              else {
                panelRight.crates = 0;
                panelRight.qty = 0;
                panelRight.isExist = false;
                panelRight.uomOrderQuantityToSend = '';
                this.descCalc(panelRight);
              }
            }
          }
          //console.log("this.panelLeft", this.panelLeft);

          // let element: HTMLElement = document.getElementById('cancel') as HTMLElement;
          // //console.log(element, 'element');
          // setTimeout(() => element.click());
        },
          err => {
            //this.updateTotalValue();
            ////console.log(err.status, 'error');
            if (err.status === 500) {
              this.errorHandle();
            }
          });
      }

    },
      err => {

        if (err.status === 500) {
          this.shippingDetails = [];

        }
      });

    // wareHouseId

    //window.dispatchEvent(new Event('resize'));

    // this.descCalc(this.panelLeft);
    // this.descCalc(this.panelRight);
    //}
  }


  errorHandle() {
    this.allInputs = false;
    this.customerDetails = [];
    this.shift = '';

    for (const panelLeft of this.panelLeft) {
      panelLeft.crates = 0;
      panelLeft.qty = 0;
      this.descCalc(panelLeft);
    }
    for (const panelRight of this.panelRight) {
      panelRight.crates = 0;
      panelRight.qty = 0;
      this.descCalc(panelRight);
    }
    this.toastr.error('No Order Found', 'Call Desk', {
      timeOut: 8000
    });
    this.updateDisabled = true;
    this.valueTotal = 0;
    this.taxPercentage = 0;
    this.roundOff = 0;
    this.orderState = 'NEW';
  }

  updateData() {
    let orderItems: any = [];
    let updateArray: any = {};
    for (let panelVal of this.panelLeft) {

      ////console.log(panelVal, 'panelVal');


      // if (panelVal.crates === null) {
      //   panelVal.crates = 0;
      // }
      // if (panelVal.qty === null) {
      //   panelVal.qty = 0;
      // }
      if (panelVal.isModified === true && (panelVal.crates !== 0 || panelVal.qty !== 0)) {
        this.oItem = {};
        let orderByCust: any = null;
        if (this.mapOfOrderByCustomerUpdate.has(panelVal.itemCode)) {
          orderByCust = this.mapOfOrderByCustomerUpdate.get(panelVal.itemCode);
        }
        this.oItem.orgId = this.shippingDetails.orgId; //siteOrgId from  getCustShippingDetailsByAcctNo
        this.oItem.promiseDate = this.nextDt;//next day
        this.oItem.requestDate = this.systemDt;//todays date

        this.oItem.itemCode = panelVal.itemCode;
        this.oItem.itemSequenceNumber = panelVal.itemSequenceNumber;

        this.oItem.qtyPackets = panelVal.qty;
        this.oItem.priceListId = this.shippingDetails.priceListId;//priceListId from  getCustShippingDetailsByAcctNo
        this.oItem.pricingDate = this.systemDt;//todays date
        this.oItem.shipFromOrgId = this.shippingDetails.siteWareHouseId;//siteWareHouseId from  getCustShippingDetailsByAcctNo
        this.oItem.qtyCrates = panelVal.crates;
        this.oItem.shippingMethodCode = '000001_TG_R_GND';
        this.oItem.soldFromOrgId = this.shippingDetails.orgId; //orgId from  getCustShippingDetailsByAcctNo
        this.oItem.soldToOrgId = this.shippingDetails.customerAccountId; //customerAccountId from  getCustShippingDetailsByAcctNo
        this.oItem.status = this.customerDetails.status; //If no orders are there then it will be new else it will be this.customerDetails.status
        //this.oItem.status = 'Updated'; //If no orders are there then it will be new else it will be this.customerDetails.status
        this.oItem.orderQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        this.oItem.shippedQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;

        this.oItem.subInventory = null;
        //this.oItem.unitListPrice = orderByCust.unitListPrice;
        this.oItem.unitSellingPrice = panelVal.unitSellingPrice;
        this.oItem.unitListPrice = panelVal.unitSellingPrice;
        this.oItem.uom = panelVal.uomToOrder;
        //this.oItem.lineTypeId = '1001';
        this.oItem.lineTypeId = orderByCust != null ? orderByCust.lineTypeId : panelVal.lineTypeId;
        if (orderByCust != null) {
          this.oItem.originalSysLineRef = orderByCust.originalSysLineRef;
        }
        this.oItem.orderQuantityUOM = panelVal.uomOrderQuantityToSend;
        this.oItem.inventoryItemId = panelVal.inventoryItemId;

        orderItems.push(this.oItem);
      }
    }

    for (let panelVal of this.panelRight) {
      if (panelVal.isModified === true && (panelVal.crates !== 0 || panelVal.qty !== 0)) {
        this.oItem = {};
        let orderByCust: any = null;
        if (this.mapOfOrderByCustomerUpdate.has(panelVal.itemCode)) {
          orderByCust = this.mapOfOrderByCustomerUpdate.get(panelVal.itemCode);
        }
        this.oItem.orgId = this.shippingDetails.orgId; //siteOrgId from  getCustShippingDetailsByAcctNo
        this.oItem.promiseDate = this.nextDt;//next day
        this.oItem.requestDate = this.systemDt;//todays date

        this.oItem.itemCode = panelVal.itemCode;
        this.oItem.itemSequenceNumber = panelVal.itemSequenceNumber;

        this.oItem.qtyPackets = panelVal.qty;
        this.oItem.priceListId = this.shippingDetails.priceListId;//priceListId from  getCustShippingDetailsByAcctNo
        this.oItem.pricingDate = this.systemDt;//todays date
        this.oItem.shipFromOrgId = this.shippingDetails.siteWareHouseId;//siteWareHouseId from  getCustShippingDetailsByAcctNo
        this.oItem.qtyCrates = panelVal.crates;
        this.oItem.shippingMethodCode = '000001_TG_R_GND';
        this.oItem.soldFromOrgId = this.shippingDetails.orgId; //orgId from  getCustShippingDetailsByAcctNo
        this.oItem.soldToOrgId = this.shippingDetails.customerAccountId; //customerAccountId from  getCustShippingDetailsByAcctNo
        this.oItem.status = this.customerDetails.status; //If no orders are there then it will be new else it will be this.customerDetails.status
        //this.oItem.status = 'Updated'; //If no orders are there then it will be new else it will be this.customerDetails.status
        this.oItem.orderQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        this.oItem.shippedQuantity = (panelVal.crates * panelVal.unitsPerCrates) + panelVal.qty;
        this.oItem.subInventory = null;
        this.oItem.unitListPrice = panelVal.unitSellingPrice;
        this.oItem.unitSellingPrice = panelVal.unitSellingPrice;
        this.oItem.uom = panelVal.uomToOrder;
        //this.oItem.lineTypeId = '1001';
        this.oItem.lineTypeId = orderByCust != null ? orderByCust.lineTypeId : panelVal.lineTypeId;
        if (orderByCust != null) {
          this.oItem.originalSysLineRef = orderByCust.originalSysLineRef;
        }
        this.oItem.orderQuantityUOM = panelVal.uomOrderQuantityToSend;
        this.oItem.inventoryItemId = panelVal.inventoryItemId;
        orderItems.push(this.oItem);
      }
    }
    updateArray.orderItems = orderItems;
    updateArray.route = this.customerDetails.route;
    updateArray.invoiceToOrgId = this.billingDetails.siteUseId;//siteUseId from custBilling details call new API
    updateArray.orderTypeId = this.customerDetails.orderTypeId;//will be fetched from dropdown
    updateArray.paymentTermId = this.customerDetails.paymentTermId;
    updateArray.priceListId = this.shippingDetails.priceListId;
    updateArray.salesRepId = this.customerDetails.salesRepId;//primarySalesRepId
    updateArray.shipToOrgId = this.shippingDetails.siteUseId;
    updateArray.shipFromOrgId = this.shippingDetails.siteWareHouseId;
    updateArray.soldFromOrgId = this.shippingDetails.orgId;
    updateArray.soldToOrgId = this.shippingDetails.customerAccountId;
    updateArray.orgId = this.shippingDetails.orgId;
    updateArray.shift = this.customerDetails.shift;
    updateArray.status = this.customerDetails.status;
    updateArray.promiseDate = this.nextDt;//next day
    updateArray.requestDate = this.systemDt;//todays date
    updateArray.bookedFlag = this.customerDetails.bookedFlag;
    updateArray.cancelledFlag = this.customerDetails.cancelledFlag;
    updateArray.freightTermsCode = this.customerDetails.freightTermsCode;
    updateArray.orderSourceId = this.customerDetails.orderSourceId;
    updateArray.orderedDate = this.customerDetails.orderedDate;//todays date
    updateArray.origSysDocumnetRef = this.customerDetails.origSysDocumnetRef;
    updateArray.pricingDate = this.systemDt;// todays date
    updateArray.shippingMethodCode = '000001_TG_R_GND';
    updateArray.transactionalCurrencyCode = this.customerDetails.transactionalCurrencyCode;
    updateArray.accountNumber = this.shippingDetails.accountNumber;
    // this.callDeskService.updateSalesOrder(updateArray).subscribe((response) => {
    //   this.panelLeft = response;

    // });

    ////console.log(updateArray, 'updateArray');


    //return false;

    this.callDeskService.updateSalesOrder(updateArray).subscribe((response) => {
      this.toastr.success('Sales Order Updated Successfully', 'Call Desk', {
        timeOut: 4000
      });

      //this.panelLeft = [];
      location.reload();
      //orderItems = [];
      // this.allInputs = false;
      // this.customerDetails = false;
      // this.orderTypeDetails = false;
      // this.shippingDetails = false;
      // (<HTMLInputElement>document.getElementById('orderID')).value = '';

      // location.reload();

    });
  }
  reload() {
    location.reload();
  }
}
