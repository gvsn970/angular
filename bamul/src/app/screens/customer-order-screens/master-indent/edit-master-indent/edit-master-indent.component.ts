
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { MasterindentService } from '../../shared/components/services/masterindent.service';
import { MasterIndentHeader } from '../../shared/components/model/master-indent-header ';
import { MasterIndentLineItem } from '../../shared/components/model/master-indent-line-item ';
import { MasterIndentSchedule } from '../../shared/components/model/master-indent-schedule ';
import { CallDeskService } from 'src/app/shared/service/call-desk.service';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';

@Component({
  selector: 'app-edit-master-indent',
  templateUrl: './edit-master-indent.component.html',
  styleUrls: ['./edit-master-indent.component.css']
})
export class EditMasterIndentComponent implements OnInit {
  selectLabel: any;
  modalRef: BsModalRef;
  addMore = true;
  message: string;
  submitted = false;
  sortarray = [];
  itemCodeDesc: any = [];
  myArray: any = [];
  MasterIndentLineItem: FormGroup;
  MasterIndentHeader: FormGroup;
  MasterIndentSchedule: FormGroup;
  data: any;
  shift: any;
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  masterIndentLineItems: FormArray;
  allCatgeries: object;
  customerDetailByAcctId: any;
  masterIndentUp: any;
  datePickerConfig: Partial<BsDatepickerConfig>;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;
  customerBilling: any;
  lastUpdateDate: string;
  priceLstId: any;
  orderTypeNm: any;
  minDate: Date;
  maxDate: Date;
  mstrIndentId: any;
  balaceNo: any;
  isValidDate: any;
  craPlaceHolder = 'Crates';
  pktPlaceHolder = 'Packets';
  enableCratesField = false;
  enablepacketsField = false;
  custShippingDetailsByAcctNo: any;
  oderTyp: any;
  masterindentid: any;
  shipToAdress: Object;
  custShippingDetailsByAcctNu: any;
  allsalesordertype: Object;
  routedetailsbyshiptositeidordertypeidandshift: any;
  billToSiteUseIdList: any;
  shipToSiteUseIdList: any;
  orderTypeDetailsList: any;
  sequence: any;
  orderTypeId: any;
  routeList: any;
  routeNumber: any;
  startDate: string;
  endDate: string;
  endDateValidation: any;
  masterIndentStatusList: Object;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private masterIndentService: MasterindentService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,

  ) {

    this.masterSelected = false;
    this.masterIndentUp = JSON.parse(localStorage.getItem('edit-master-indent'));
    // this.masterIndentUp = this.masterIndentService.getOptions();
    this.checklist = [
      { id: 1, value: 'MONDAY', isSelected: this.masterIndentUp.mon == "Y" ? true : false },
      { id: 2, value: 'TUESDAY', isSelected: this.masterIndentUp.tue == "Y" ? true : false },
      { id: 3, value: 'WEDNESDAY', isSelected: this.masterIndentUp.wed == "Y" ? true : false },
      { id: 4, value: 'THURSDAY', isSelected: this.masterIndentUp.thu == "Y" ? true : false },
      { id: 5, value: 'FRIDAY', isSelected: this.masterIndentUp.fri == "Y" ? true : false },
      { id: 6, value: 'SATURDAY', isSelected: this.masterIndentUp.sat == "Y" ? true : false },
      { id: 7, value: 'SUNDAY', isSelected: this.masterIndentUp.sun == "Y" ? true : false },
    ];
    this.getCheckedItemList();
    this.datePickerConfig = Object.assign({},
      {
        dateInputFormat: 'DD-MMM-YYYY',
        dateYMD: new FormControl(new Date()),
        dateFull: new FormControl(new Date()),
        dateMDY: new FormControl(new Date()),
        showWeekNumbers: true,
        minDate: new Date(),
      });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    this.lastUpdateDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
  }

  ngOnInit() {
    this.MasterIndentHeader = this.fb.group({
      mstHdrId: "",
      startDate: "",
      endDate: "",
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
      status: "",
      partyId: "",
      custAccountId: "",
      custAcctSiteId: "",
      billToSiteUseId: "",
      shipToSiteUseId: "",
      shiftId: ['', Validators.required],
      creationDate: "",
      createdBy: "",
      lastUpdateDate: "",
      lastUpdateBy: "",
      lastUpdateLogin: "",
      orderTypeId: ['', Validators.required],
      orderType: "",
      seq: "",
      route: "",
      masterIndentLineItems: this.fb.array([]),
    }),
      this.MasterIndentLineItem = this.fb.group({
        mstrIndLItm: this.fb.array([this.initItemRows(),])
      });
    this.MasterIndentLineItem = this.fb.group({
      mstrIndLItm: this.fb.array([])
    });
    this.data = JSON.parse(localStorage.getItem('data'));
    this.updateMasterIndent();
    this.shipToAdressList();
    this.billToAdress();
    this.getCustomerBalanceByAcctNo();
    this.getAllIndentShifts();
    this.getallsalesordertype();
    this.getCategoriesByPriceListId();
   this.masterIndentStatus();
  }

  updateMasterIndent() {
    this.MasterIndentHeader.patchValue({
      mstHdrId: this.masterIndentUp.mstHdrId,
      startDate: this.masterIndentUp.startDate,
      endDate: this.masterIndentUp.endDate,
      status: this.masterIndentUp.status,
      partyId: this.masterIndentUp.partyId,
      custAccountId: this.masterIndentUp.custAccountId,
      custAcctSiteId: this.masterIndentUp.custAcctSiteId,
      shiftId: this.masterIndentUp.shiftId,
      creationDate: this.masterIndentUp.creationDate,
      createdBy: this.masterIndentUp.createdBy,
      lastUpdateDate: this.masterIndentUp.lastUpdateDate,
      lastUpdateBy: this.masterIndentUp.lastUpdateBy,
      lastUpdateLogin: this.masterIndentUp.lastUpdateLogin,
      orderTypeId: this.masterIndentUp.orderTypeId,
      orderType: this.masterIndentUp.orderType,
      seq: this.masterIndentUp.seq,
      route: this.masterIndentUp.route,
      warehouseId: this.masterIndentUp.warehouseId,
    });
    this.endDateValidation=this.masterIndentUp.endDate;
    if(this.masterIndentUp.startDate!=null){
      let bdate = this.masterIndentUp.startDate.split(' ');
      bdate = bdate[0].split('-');
      let startDate = new Date(bdate[2]+'-'+bdate[1]+'-'+bdate[0]);
      this.startDate= this.datePipe.transform(startDate,'dd-MMM-yyyy').toUpperCase();
    } else {
      this.startDate='';
    }
    if(this.masterIndentUp.endDate!=null){
      let ddate = this.masterIndentUp.endDate.split(' ');
      ddate = ddate[0].split('-');
      let endDate = new Date(ddate[2]+'-'+ddate[1]+'-'+ddate[0]);
      this.endDate=this.datePipe.transform(endDate,'dd-MMM-yyyy').toUpperCase();
    } else {
      this.endDate='';
    }
    this.MasterIndentHeader.patchValue({
      endDate: this.endDate,})
    for (let i = 0; i < this.masterIndentUp.masterIndentLineItems.length; i++) {
      this.myArray.push(this.masterIndentUp.masterIndentLineItems[i]);
    }
    this.myArray.sort(function (a, b) {
      return a.mstLineId - b.mstLineId;
    });
    for (let i = 0; i < this.myArray.length; i++) {
      this.addNewRow(this.myArray[i]);
    }
    this.initializeDropdown();
  }

  async initializeDropdown() {
    for (let j = 0; j < this.myArray.length; j++) {
      this.spinner.show();
      const res = await this.masterIndentService.getItemDetailsByPriceListIdAndItemIdAndSellingUom(
        this.masterIndentUp.shipToSitePriceListId, this.myArray[j].itemId, this.myArray[j].sellingUOM).toPromise();
      if (res) {
        this.sortarray.push(res);
        this.addMore = false;
        this.spinner.hide();
      }
    }
    for (let i = 0; i < this.sortarray.length; i++) {
      (this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup).controls[i].patchValue({ itemDesc: this.sortarray[i], dp: this.sortarray });
    }
  }

  billToAdress() {
    this.masterIndentService.billToAdress(this.masterIndentUp.accountNumber, this.masterIndentUp.billToSiteUseId).subscribe(res => {
      this.customerDetailByAcctId = res;
      this.MasterIndentHeader.patchValue({
        billToSiteUseId: res[0]
      })

    })
  }
  shipToAdressList() {
    this.masterIndentService.shipToAdress(this.masterIndentUp.accountNumber, this.masterIndentUp.shipToSiteUseId).subscribe(res => {
      this.custShippingDetailsByAcctNu = res
      this.MasterIndentHeader.patchValue({
        shipToSiteUseId: res[0]
      })
    })
  }

  // getallsalesordertype() {
  //   this.masterIndentService.getallsalesordertype().subscribe(res => {
  //     this.allsalesordertype = resas
  //   })
  //   this.spinner.show();
  //   this.masterIndentService.getroutenumberandsequencebyshiptositeidordertypeidandshift(
  //     this.masterIndentUp.shipToSiteUseId, this.masterIndentUp.orderTypeId, this.masterIndentUp.shiftName == "Evening" ? 'E' : 'M').subscribe(res => {
  //       this.routedetailsbyshiptositeidordertypeidandshift = res
  //       this.spinner.hide();
  //     })
  // }

  masterIndentStatus() {
    this.masterIndentService.masterIndentStatus().subscribe(res => {
      this.masterIndentStatusList = res
    })
  }
  getAllIndentShifts() {
    this.masterIndentService.getAllIndentShifts().subscribe(res => {
      this.shift = res
    })
  }

  shipToSiteUseIdDP() {
    this.MasterIndentHeader.controls.orderTypeId.reset();
    this.MasterIndentHeader.controls.shiftId.reset();
    this.MasterIndentHeader.controls.route.reset();
    this.MasterIndentHeader.controls.seq.reset();
  }
  shiftDP() {
    this.MasterIndentHeader.controls.orderTypeId.reset();
    this.MasterIndentHeader.controls.route.reset();
    this.MasterIndentHeader.controls.seq.reset();
  }



  getCustomerBalanceByAcctNo() {
    this.masterIndentService.getCustomerBalanceByAcctNo(this.data.accountNumber).subscribe(
      res => {
        this.balaceNo = res;
      });
  }

  // getCustBillingDetailsByAcctNo() {
  //   this.masterIndentService.getCustBillingDetailsByAcctNo(this.data.accountNumber).subscribe(res => {
  //     this.customerDetailByAcctId = res;
  //     this.MasterIndentHeader.patchValue({
  //       billToSiteUseId: res[0]
  //     })
  //   });
  // }

  // getCustShippingDetailsByAcctNo() {
  //   this.masterIndentService.getCustShippingDetailsByAcctNo(this.data.accountNumber).subscribe(res => {
  //     this.custShippingDetailsByAcctNu = res
  //     for (let i = 0; i < this.custShippingDetailsByAcctNu.length; i++) {
  //       if (this.custShippingDetailsByAcctNu[i].siteUseId == this.shipToSiteUseIdList[0].siteUseId) {
  //         this.MasterIndentHeader.patchValue({
  //           shipToSiteUseId: res[i]
  //         })
  //       }
  //     }
  //   });
  // }

  getCategoriesByPriceListId() {
    this.masterIndentService.getCategoriesByPriceListId(this.masterIndentUp.shipToSitePriceListId).subscribe(
      res => {
        this.allCatgeries = res;
      });
  }


  getItemsByPriceListIdAndCategory(category, i) {
    this.masterIndentService.getItemsByPriceListIdAndCategory(this.masterIndentUp.shipToSitePriceListId, category).subscribe((response) => {
      this.itemCodeDesc = response;
      (this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup).controls[i].patchValue({ dp: this.itemCodeDesc });
    });
  }


  itemCode(i, field) {
    let index = 0;
    this.enableDisableQtyFields(field.value.itemDesc.sellingUOM, i);
    const a = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
    const b = a.controls[i] as FormGroup;
    this.MasterIndentLineItem.controls.mstrIndLItm.value.forEach(items => {
      if (index != i) {
        if (items.itemDesc.itemCode ==
          this.MasterIndentLineItem.controls.mstrIndLItm.value[i].itemDesc.itemCode) {
          b.controls.crt.disable();
          b.controls.packets.disable();
          this.addMore = true;
          this.toastr.error('Item is already added in the Master Indent', 'Master Indent', {
            timeOut: 2000
          });
          return
        } else {
        }
      }
      index += 1;
    });
  }


  enableDisableQtyFields(sellingUOM, i) {
    this.submitted = false;
    if (sellingUOM == 'CRA' || sellingUOM == "TIN" || sellingUOM == "BOX") {
      this.craPlaceHolder = 'Crates';
      this.enableCratesField = true;
      this.enablepacketsField = false;
    } else {
      this.enableCratesField = false;
      this.enablepacketsField = true;
    }
    const a = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
    const b = a.controls[i] as FormGroup;
    if (this.enableCratesField) {
      b.controls.crt.enable();
      b.controls.crt.reset();
    } else {
      b.controls.crt.disable();
      b.controls.crt.reset();
    }
    const c = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
    const d = c.controls[i] as FormGroup;
    if (this.enablepacketsField) {
      d.controls.packets.enable();
      d.controls.packets.reset();
    } else {
      d.controls.packets.disable();
      d.controls.packets.reset();
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  get mstrIndSechedule() {
    return this.MasterIndentHeader.controls.mstrIndSechedule as FormGroup;
  }

  get formArr() {
    return this.MasterIndentLineItem.get('mstrIndLItm') as FormArray;
  }

  addNewRow(data?) {
    this.addMore = true;
    this.submitted = false;
    this.MasterIndentLineItem.controls.mstrIndLItm.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows(data));
  }

  get f() { return this.MasterIndentHeader.controls; }

  initItemRows(data?) {
    return this.fb.group({
      dp: '',
      crt: [data && data.qtyCrates ? data.qtyCrates : { value: '', disabled: true },
      [Validators.required]],
      packets: [data && data.qtyPkt ? data.qtyPkt : { value: '', disabled: true },
      [Validators.required]],
      category: [data && data.itemCategory ? data.itemCategory : '', [Validators.required]],
      disabled: [data ? true : false],
      itemDesc: ['', [Validators.required]],
      mstLineId: [data]
    });
  }

  checkUncheckAll() {
    for (let i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checklist.every(function (item: any) {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }


  getCheckedItemList() {
    this.checkedList = [];
    for (let i = 0; i < this.checklist.length; i++) {
      if (this.checklist[i].isSelected) {
        this.checkedList.push(this.checklist[i]);
      }
    }
    if (this.checkedList.length === 7) {
      this.masterSelected = true;
      this.selectLabel = 'UnSelect All';
    }
    else {
      this.selectLabel = 'Select All';
    }
  }
  endDateval(i){
    this.endDateValidation=i;
  }
 
  submit(form: NgForm) {
    this.submitted = true;
    if (this.masterIndentUp.endDate != this.endDateValidation) {
      this.MasterIndentHeader.patchValue({
        endDate: this.datePipe.transform(this.endDateValidation,'dd-MM-yyyy 23:59:59 ')
      })
    }else{
      this.MasterIndentHeader.patchValue({
        endDate: this.masterIndentUp.endDate})
    }
    this.masterIndentLineItems = this.MasterIndentHeader.get('masterIndentLineItems') as FormArray;
    if (this.MasterIndentHeader.invalid) {
      return;
    }
    if (this.MasterIndentLineItem.invalid) {
      return;
    }
    if (this.checkedList.length != 0) {
      this.spinner.show();

      for (let i = 0; i < this.checkedList.length; ++i) {
        this.checkedList[i].value ? 'MONDAY' : null;

        switch (this.checkedList[i].id) {
          case 1:
            this.monday = this.checkedList[i].isSelected;
            break;
          case 2:
            this.tuesday = this.checkedList[i].isSelected;
            break;
          case 3:
            this.wednesday = this.checkedList[i].isSelected;
            break;
          case 4:
            this.thursday = this.checkedList[i].isSelected;
            break;
          case 5:
            this.friday = this.checkedList[i].isSelected;
            break;
          case 6:
            this.saturday = this.checkedList[i].isSelected;
            break;
          case 7:
            this.sunday = this.checkedList[i].isSelected;
            break;
          default:
            break;
        }
      }


      this.MasterIndentHeader.patchValue({
        startDate: this.masterIndentUp.startDate,
        mon: this.monday == true ? "Y" : "N",
        tue: this.tuesday == true ? "Y" : "N",
        wed: this.wednesday == true ? "Y" : "N",
        thu: this.thursday == true ? "Y" : "N",
        fri: this.friday == true ? "Y" : "N",
        sat: this.saturday == true ? "Y" : "N",
        sun: this.sunday == true ? "Y" : "N",
        billToSiteUseId: this.MasterIndentHeader.value.billToSiteUseId.siteUseId,
        shipToSiteUseId: this.MasterIndentHeader.value.shipToSiteUseId.siteUseId,
        lastUpdateDate: this.datePipe.transform(new Date(),  'dd-MM-yyyy HH:MM:SS'),
      });
      form.value.mstrIndLItm.forEach(e => {
        this.masterIndentLineItems.push(this.fb.group({
          mstLineId: e.mstLineId == null ? null : e.mstLineId.mstLineId,
          itemId: e.itemDesc.itemId,
          qtyCrates: parseInt(e.crt),
          qtyPkt: parseInt(e.packets),
          lastUpdateDate:    this.datePipe.transform(new Date(),  'dd-MM-yyyy  HH:MM:SS'),
          creationDate: this.masterIndentUp.creationDate,
          createdBy: this.masterIndentUp.createdBy,
          lastUpdateBy: this.masterIndentUp.lastUpdateBy,
          lastUpdateLogin: this.masterIndentUp.lastUpdateLogin,
        }));
      });

      // console.log(this.MasterIndentHeader.value);
      this.masterIndentService.updateMasterIndent(this.MasterIndentHeader.value).subscribe(res => {
        ////console.log(' Updated Create Master Indent!' + this.MasterIndentHeader.value);
        this.masterIndentLineItems.controls = [];
        this.mstrIndentId = res;
        this.toastr.success(
          'Updated  Master Indent#' + this.mstrIndentId.mstHdrId + '\n Update Successfully.');
        // this.formArr.reset();
        // this.MasterIndentHeader.reset();
        this.spinner.hide();
        this.router.navigateByUrl('/customer/master-indent/list-master-indents');
      }, error => {
        ////console.log(error);
        this.masterIndentLineItems.controls = [];
        // this.formArr.reset();
        // this.MasterIndentHeader.reset();
        this.toastr.error('Something Went Wrong', 'Updated Master Indent!', {
          timeOut: 2000
        });
      }
      );
    }

  }

  checkValidation(value, i, field) {
    ////console.log('checkValidation')
    if (value > 0) {
      this.addMore = false;
    } else {
      this.addMore = true;
    }
    let index = 0;
    this.MasterIndentLineItem.controls.mstrIndLItm.value.forEach(items => {
      if (index != i) {
        if (items.itemDesc.itemCode == this.MasterIndentLineItem.controls.mstrIndLItm.value[i].itemDesc.itemCode) {
          this.addMore = true;

          return
        } else {
          this.addMore = false;
        }
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

  }
  resetCrtAndPacket(i, field) {
    if (field.value.packets) {
      const c = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
      const d = c.controls[i] as FormGroup;
      d.controls.packets.reset();
    } else if (field.value.crt) {
      const a = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
      const b = a.controls[i] as FormGroup;
      b.controls.crt.reset();
    }

  }
  cancel() {
    this.submitted = false;
    this.addMore = false;
    this.formArr.reset();
    this.router.navigateByUrl('/customer/master-indent/list-master-indents');
    this.MasterIndentLineItem.reset();
    this.MasterIndentHeader.reset();
  }

  onChange(Value) {
    this.MasterIndentHeader.patchValue({
      status: Value,
    });
  }
  openModal(template: any, index) {
    this.addMore = false;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(index, field): void {
    this.message = 'Confirmed!';
    this.addMore = false;
    this.modalRef.hide();
    this.spinner.show();
    if (this.formArr.length > 1) {
      if (field.value.mstLineId == null) {
        this.formArr.removeAt(index);
        this.spinner.hide();
      } else {
        this.masterIndentService.deleteLineItem(field.value.mstLineId.mstLineId).subscribe(
          res => {
            this.spinner.hide();
            this.formArr.removeAt(index);
          })
      }
    } else {
      this.spinner.hide();
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
    await this.masterIndentService.getallsalesordertype().subscribe((res) => {
      this.orderTypeDetailsList = res;
      this.getRouteList(this.masterIndentUp.shipToSiteUseId, this.masterIndentUp.orderTypeId, this.masterIndentUp.shiftCode);
      if (this.orderTypeDetailsList.length == 0) {
        this.sequence = null;
      }
    });

  }
  setOrderTypeId(event) {
    this.orderTypeId = event.target.value;
    let shift = this.MasterIndentHeader.value.shiftId == '1' ? "M" : "E";
    let shipToSiteUseId = this.MasterIndentHeader.value.shipToSiteUseId.siteUseId;
    this.getRouteList(shipToSiteUseId, this.orderTypeId, shift);
  }

  getRouteList(shipToSiteUseId, orderTypeId, shift) {
    this.spinner.show();
    this.masterIndentService.getroutenumberandsequencebyshiptositeidordertypeidandshift(shipToSiteUseId, orderTypeId, shift).subscribe((res) => {
      this.routeList = res;
      this.spinner.hide();
      if (this.routeList.length > 0) {
        this.addMore = false;
        this.routeNumber = this.routeList[0].routeNumber;
        this.MasterIndentHeader.patchValue({
          route: this.routeList[0].routeNumber, seq: this.routeList[0].routeSeqNo
        });
        this.setSequenceNumber(this.routeNumber);
      } else {
        this.addMore = true;
        this.sequence = null;
        this.toastr.error('No Route Number Found', 'Updated Master Indent!', {
          timeOut: 1000
        });
      }
    });
  }
  setSequenceNumber(event) {
    this.routeNumber = event;
    this.routeList.forEach(element => {
      if (element.routeNumber == event) {
        this.sequence = element.routeSeqNo;
      }
    });
  }
}

