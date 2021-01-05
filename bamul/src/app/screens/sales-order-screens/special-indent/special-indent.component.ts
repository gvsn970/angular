import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { BsDatepickerConfig, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { SpecialIndentService } from 'src/app/shared/service/special-indent.service';

@Component({
  selector: 'app-special-indent',
  templateUrl: './special-indent.component.html',
  styleUrls: ['./special-indent.component.css']
})
export class SpecialIndentComponent implements OnInit {
  customerListItem: any;
  keyword: any;
  customerBlank: any = false;
  accountNumber: any = '';
  addMoreSales: FormGroup;
  modalRef: BsModalRef;
  submitted = false;
  customerBillingDetails: any;
  customerInitialData: any;
  addMoreItemsList: any = [];
  userData: any;
  totalPrice: any = 0;
  totalTax: any = 0;
  error: any = { isError: false, errorMessage: '' };
  indentType: any = [];
  registeredView: any;
  unregisteredView: any;
  balanceVal: any;
  shiftVal: any[] = ['M', "E"];
  status: any[] = ['New'];
  orderTypeName: any;
  allCategories: any;
  priceListId: any;
  itemCodeDesc: any = [];
  itemPrice: any = [];
  orderTypeId: any;
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private router: Router, private toastr: ToastrService, private specialIndentService: SpecialIndentService, private modalService: BsModalService) {
  }
  ngOnInit() {
    this.keyword = 'partyName';
    this.customerListItem = [];
    this.addMoreSales = this.fb.group({
      newIndtLItem: this.fb.array([this.initNewItemRows()]),
      custNumber: [''],
      accountNumber: [''],
      name: [''],
      contactno: [''],
      gstno: [''],
      state: [''],
      city: [''],
      address: [''],
      pincode: [''],
      promiseDate: [''],
      requestDate: [new Date()],
      shift: [''],
    });
    this.indentType = ['Registered', 'Un-Registered'];
    this.indentVal('Registered');
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.setUserCategoryValidators();
  }

  setUserCategoryValidators() {
    const accountNumber = this.addMoreSales.get('accountNumber');
    const name = this.addMoreSales.get('name');
    const address = this.addMoreSales.get('address');
    // const toInventory = this.addMoreSales.get('toInventory');
    // const toLocation = this.addMoreSales.get('toLocation');

    // for (let k = 0; k < this.addMoreMnm.controls.newIndtLItem.value.length; k++) {
    //   var sealNumber = (this.addMoreMnm.controls.newIndtLItem as FormGroup).controls[k].get('sealNumber');
    // }

    if (this.registeredView === true) {
      accountNumber.setValidators([Validators.required]);
      name.clearValidators();
      address.clearValidators();

    } else {
      accountNumber.clearValidators();
      name.setValidators([Validators.required]);
      address.setValidators([Validators.required]);
    }
    accountNumber.updateValueAndValidity();
    name.updateValueAndValidity();
    address.updateValueAndValidity();
  }

  indentVal(val) {
    // const currentDate: any = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    // this.selfDispatchTime = this.datePipe.transform(new Date(), 'HH:mm:ss ');
    if (val === 'Registered') {
      this.registeredView = true;
      this.unregisteredView = false;
      this.customerBillingDetails = [];
      this.customerInitialData = [];
      this.addMoreSales.patchValue({
        accountNumber: ''
      });
      this.getCustDetailsByCustomerClassCode('SOCIETY');
    }
    else if (val === 'Un-Registered') {
      this.unregisteredView = true;
      this.registeredView = false;
      this.getCustBillingDetailsByAcctNo('305870');
      // this.getCustBillingDetailsByAcctNo('305325');
    }
    this.allCategories = [];
    this.itemCodeDesc = [];
    this.itemPrice = [];
    for (let k = 0; k < this.addMoreSales.controls.newIndtLItem.value.length; k++) {
      (this.addMoreSales.controls.newIndtLItem as FormGroup).controls[k].patchValue({ category: '' });
      (this.addMoreSales.controls.newIndtLItem as FormGroup).controls[k].patchValue({ itemDesc: '' });
      (this.addMoreSales.controls.newIndtLItem as FormGroup).controls[k].patchValue({ price: '' });
      (this.addMoreSales.controls.newIndtLItem as FormGroup).controls[k].patchValue({ dp: [] });
    }
    this.setUserCategoryValidators();
  }


  getCustDetailsByCustomerClassCode(classCode) {
    //console.log('ior')
    this.specialIndentService.getCustDetailsByCustomerClassCode(classCode).subscribe(res => {
      this.customerInitialData = res;
    })
  }

  getCustBillingDetailsByAcctNo(val) {
    this.specialIndentService.getCustomerBilling(val).subscribe(res => {
      this.customerBillingDetails = res;
      if (this.customerBillingDetails) {
        this.specialIndentService.getOrderTypeByPriceListId(this.customerBillingDetails.priceListId).subscribe(
          res => {
            this.orderTypeName = res[0].orderTypeName;
          });
        this.priceListId = this.customerBillingDetails.priceListId;
        this.getOrderTypeByPriceListId(this.priceListId);
        this.getCategoriesByPriceListId(this.priceListId);

      }
    });
    this.specialIndentService.getCustomerBalanceByAcctNo(val).subscribe(
      res => {
        this.balanceVal = res;
      });

  }

  getOrderTypeByPriceListId(priceListId) {
    this.specialIndentService.getOrderTypeByPriceListId(priceListId).subscribe(
      res => {
        this.orderTypeName = res[0].orderTypeName;
        this.orderTypeId = res[0].orderTypeId;
      });
  }
  getCategoriesByPriceListId(priceListId) {
    this.specialIndentService.getCategoriesByPriceListId(priceListId).subscribe(
      res => {
        this.allCategories = res;
      },
    );
  }

  getItemsByPriceListIdAndCategory(category, i) {
    this.specialIndentService.getItemsByPriceListIdAndCategory(this.priceListId, this.orderTypeId, category).subscribe((response) => {
      this.itemCodeDesc = response;
      (<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "dp": this.itemCodeDesc });
    });
  }

  getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom(event, i) {
    this.addMoreSales.value.newIndtLItem[i].selected = event.currentTarget.selectedIndex;
    const priceListId = this.itemCodeDesc[event.currentTarget.selectedIndex - 1].priceListId;
    const itemId = this.itemCodeDesc[event.currentTarget.selectedIndex - 1].itemId;
    const orderTypeId = this.itemCodeDesc[event.currentTarget.selectedIndex - 1].orderTypeId;
    const uom = this.itemCodeDesc[event.currentTarget.selectedIndex - 1].uom;

    this.specialIndentService.getItemDetailsByPriceListIdAndItemIdAndOrderTypeIdAndUom(priceListId, itemId, orderTypeId, uom).subscribe((response) => {
      this.itemPrice = response;
      (<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "price": this.itemPrice.itemPrice });
      (<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "Uom": this.itemPrice.uom });
      (<FormGroup>this.addMoreSales.controls.newIndtLItem).controls[i].patchValue({ "taxPercentage": this.itemPrice.taxPercentage });
      const a = this.addMoreSales.controls.newIndtLItem as FormGroup;
      const b = a.controls[i] as FormGroup;
      b.controls.units.enable();
    });
  }

  calculatePrice() {
    var calPrice = this.addMoreSales.get('newIndtLItem').value;
    this.totalPrice = 0;
    this.totalTax = 0;
    for (var i = 0; i < calPrice.length; i++) {
      this.totalPrice += (isNaN((parseFloat(calPrice[i].units)) * (parseFloat(calPrice[i].price))) ? 0 : (parseFloat(calPrice[i].units) * parseFloat(calPrice[i].price)));
      this.totalTax += (isNaN((parseFloat(calPrice[i].units)) * (parseFloat(calPrice[i].price)) * (parseFloat(calPrice[i].taxPercentage))) ? 0 : (parseFloat(calPrice[i].units) * parseFloat(calPrice[i].price) * parseFloat(calPrice[i].taxPercentage)));
    }
  }
  get NewFormArr() {
    return this.addMoreSales.get('newIndtLItem') as FormArray;
  }
  addMoreItem() {
    this.addMoreSales.controls.newIndtLItem.setValidators([Validators.required]);
    let i = this.addMoreSales.controls.newIndtLItem.value.length;
    this.NewFormArr.push(this.initNewItemRows());
  }

  initNewItemRows() {
    return this.fb.group({
      category: ['', [Validators.required]],
      itemDesc: ['', [Validators.required]],
      dp: '',
      units: ['', Validators.required],
      Uom: ['', Validators.required],
      price: ['', Validators.required],
      itemValue: [''],
      tax: [''],
      amount: [''],
      taxPercentage: [''],

    });
  }
  deleteRow(index: number) {
    if (this.NewFormArr.length !== 1) {
      this.NewFormArr.removeAt(index);
      this.calculatePrice();
    }
    else {
      this.toastr.error('At least One product is Mandatory', 'Single row', {
        timeOut: 3000
      });
    }
  }

  openModal(template: any, index) {

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index, field): void {

    this.modalRef.hide();


    if (this.NewFormArr.length !== 1) {
      this.NewFormArr.removeAt(index);
      this.calculatePrice();
    } else {
      this.toastr.error('At least One Item is Mandatory', 'Single row', {
        timeOut: 2000
      });
    }
  }

  decline(): void {
    this.modalRef.hide();
  }
  postSpecialIndentData(addmoreData) {
    this.setUserCategoryValidators();
    this.submitted = true;
    this.addMoreItemsList = [];
    if (this.addMoreSales.invalid) {
      return;
    }

    if (addmoreData.form.status != 'INVALID' && addmoreData.form.status != 'INVALID') {
      let data = JSON.parse(localStorage.getItem('data'));
      addmoreData.form.value.newIndtLItem.forEach(items => {
        //const materialCode = items.materialCodeDesc.split('/');
        this.addMoreItemsList.push({
          "itemCode": items.itemCode,
          "description": items.description,
          "units": items.units,
          "Uom": items.Uom,
          "price": items.price,
          "value": items.value,
          "tax": items.tax,
          "amount": items.amount,
        });
      });

      var dataToSend = {
        "custNumber": addmoreData.form.value.custNumber,
        "name": addmoreData.form.value.name,
        "contactno": addmoreData.form.value.contactno,
        "gstno": addmoreData.form.value.gstno,
        "state": addmoreData.form.value.state,
        "city": addmoreData.form.value.city,
        "address": addmoreData.form.value.address,
        "pincode": addmoreData.form.value.pincode,
        'deliveryLItem': this.addMoreItemsList
      }

      //console.log(dataToSend, 'dataToSend');

      // this.initiateTransferMilkService.saveMilkTransferHeader(dataToSend).subscribe(
      //   res => {
      //     this.toastr.success('Milk Transfer Done Successfully', 'Milk', {
      //       timeOut: 4000
      //     });
      //     this.router.navigate(['/super-admin/mnm/list-mnm-transfer-receiver']);
      //   }, error => {
      //     this.toastr.warning('Cannot Insert same seal number', 'Milk', {
      //       timeOut: 4000
      //     });
      //   });

    }
  }

  redirectTo(path: any) {
    this.router.navigateByUrl('/sales-order/' + path);
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {
      this.customerBlank = true;
    }
    if (val.length > 3) {
      this.specialIndentService.getCustomerList(val).subscribe((response) => {
        if (response)
          this.customerListItem = response;
        //console.log(this.customerListItem, 'customerListItem');
      });
    }
    else {
      this.customerListItem = [];
      // this.customerId = '';
      // this.customerName = '';
      this.accountNumber = '';
      // this.personPartyId = '';
      // this.custAvailable = true;
    }
  }

  selectEvent(item) {
    // this.customerId = item.custAcctSiteId;
    // this.customerName = item.partyName;
    this.accountNumber = item.accountNumber;
    this.getCustBillingDetailsByAcctNo(this.accountNumber);
    // this.personPartyId = item.partyId;
    // this.custAvailable = false;
    // this.custStatus = item.siteStatus;
  }
}
