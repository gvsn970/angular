import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl, ValidatorFn } from '@angular/forms';
// import { MasterindentService } from '../../../shared/components/services/masterindent.service';
import { MasterindentService } from '../../shared/components/services/masterindent.service';
import { MasterIndentHeader } from '../../shared/components/model/master-indent-header ';
import { MasterIndentLineItem } from '../../shared/components/model/master-indent-line-item ';
import { MasterIndentSchedule } from '../../shared/components/model/master-indent-schedule ';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { element } from 'protractor';
import { LoginService } from 'src/app/core/services/login.service';
import { StartDateAndEndDateValidation } from 'src/app/shared/service/startDateAndEndDateValidation';
@Component({
  selector: 'app-create-master-indent',
  templateUrl: './create-master-indent.component.html',
  styleUrls: ['./create-master-indent.component.css']
})
export class CreateMasterIndentComponent implements OnInit {
  submitted = false;
  itemCodeDesc: any = [];
  MasterIndentLineItem: FormGroup;
  MasterIndentHeader: FormGroup;
  MasterIndentSchedule: FormGroup;
  data: any;
  shift: any;
  orderLines: FormArray;
  masterIndentLineItems: FormArray;
  oderTyp: any;
  allCatgeriesList: object;
  custBillingDetailsByAcctNo: any;
  minDate: Date;
  maxDate: Date;
  duplicateData: any[] = [];
  datePickerConfig: Partial<BsDatepickerConfig>;
  schduleList: FormGroup;
  systemDate: any;
  priceLstId: any;
  selectLabel: any = 'Select All';
  Scheduleday = [
    { id: 'MONDAY', weekday: 'MONDAY' },
    { id: 'TUESDAY', weekday: 'TUESDAY' },
    { id: 'WEDNESDAY', weekday: 'WEDNESDAY' },
    { id: 'THURSDAY', weekday: 'THURSDAY' },
    { id: 'FRIDAY', weekday: 'FRIDAY' },
    { id: 'SATURDAY', weekday: 'SATURDAY' },
    { id: 'SUNDAY', weekday: 'SUNDAY' }
  ];
  addMore = true;
  mstrIndentId: any;
  balaceNo: object;
  balanceNo: object;
  isValidDate: any;
  model: any;
  error: any = { isError: false, errorMessage: '' };
  craPlaceHolder = 'Crates';
  pktPlaceHolder = 'Packets';
  enableCratesField = false;
  enablepacketsField = false;
  endDate: string;
  startDate: string;
  custShippingDetailsByAcctNo: any;
  orderTypeNm: Object;
  custShippingDetailsByAcctNu: any;
  allsalesordertype: any;
  routedetailsbyshiptositeidordertypeidandshift: any;
  seqNo: any;
  ordereTypeList: boolean;
  routeNumber: any;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private masterIndentService: MasterindentService,
    private datePipe: DatePipe,
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
  ) {
    const formControls = this.Scheduleday.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.schduleList = this.fb.group({
      Scheduleday: new FormArray(formControls, this.minSelectedCheckboxes(1)),
      selectAll: selectAllControl
    });
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
  }

  ngOnInit() {
    this.MasterIndentHeader = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: ['', Validators.required],
      mon: "",
      tue: "",
      wed: "",
      thu: "",
      fri: "",
      sat: "",
      sun: "",
      status: "NEW",
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
      seq: "",
      route: "",
      masterIndentLineItems: this.fb.array([]),
    }, {
      validator: StartDateAndEndDateValidation('startDate', 'endDate'),
    }),
      this.MasterIndentLineItem = this.fb.group({
        mstrIndLItm: this.fb.array([])
      });
    this.systemDate = this.datePipe.transform(new Date(),  'dd-MM-yyyy HH:MM:SS');
    this.data = JSON.parse(localStorage.getItem('data'));
    this.onChanges();
    this.getCustBillingDetailsByAcctNo();
    this.getCustShippingDetailsByAcctNo();
    this.getCustomerBalanceByAcctNo();
    this.getAllIndentShifts();
    this.getallsalesordertype();
    this.addMore = true;
    this.MasterIndentHeader.controls.orderTypeId.disable();
  }
  shipToSiteUseIdDP() {
    this.MasterIndentHeader.controls.orderTypeId.reset();
    this.MasterIndentHeader.controls.shiftId.reset();
    this.MasterIndentHeader.controls.route.reset();
    this.MasterIndentHeader.controls.seq.reset();
  }
  shiftDP() {
    this.formArr.removeAt(0);
    this.MasterIndentHeader.controls.orderTypeId.reset();
    this.MasterIndentHeader.controls.route.reset();
    this.MasterIndentHeader.controls.seq.reset();
    const shift = this.MasterIndentHeader.get('shiftId').value;
    const mIndentEndDate = this.datePipe.transform(this.MasterIndentHeader.get('endDate').value, 'dd-MM-yyyy');
    const mIndentCreateDate = this.datePipe.transform(this.MasterIndentHeader.get('startDate').value, 'dd-MM-yyyy');
    if (mIndentEndDate != null && mIndentCreateDate != null) {
      this.spinner.show();
      this.masterIndentService.validateMIAvailable(this.MasterIndentHeader.value.shipToSiteUseId.siteUseId, shift, mIndentCreateDate, mIndentEndDate).subscribe(res => {
        if (res === true) {
          this.spinner.hide();
          this.ordereTypeList = false;
          this.MasterIndentHeader.controls.orderTypeId.disable();
       
          this.addMore = true;
          this.toastr.error(' Already MI available in date range', 'Create Master Indent!', {
            timeOut: 2000
          });
        } else {
          this.spinner.hide();
          this.ordereTypeList = true;
          this.addMore = false;
          this.MasterIndentHeader.controls.orderTypeId.enable();
          this.addNewRow();
        }
      });
    } else {
      this.toastr.error('please select start date and end date ', 'Create Master Indent!', {
        timeOut: 2000
      });
    }
  }

  getroutenumberandsequencebyshiptositeidordertypeidandshift() {
    if (!this.MasterIndentHeader.invalid) {
      this.spinner.show();
      this.masterIndentService.getroutenumberandsequencebyshiptositeidordertypeidandshift(
        this.MasterIndentHeader.value.shipToSiteUseId.siteUseId, this.MasterIndentHeader.value.orderTypeId.orderTypeId, this.MasterIndentHeader.value.shiftId == 1 ? 'M' : 'E').subscribe(res => {
          this.routedetailsbyshiptositeidordertypeidandshift = res
          this.spinner.hide();
          if (this.routedetailsbyshiptositeidordertypeidandshift.length == 0) {
            this.toastr.error('No Route Number Found', 'Master Indent', {
              timeOut: 1000
            });
            this.seqNo = null,
              this.addMore = true;
            this.MasterIndentHeader.patchValue({
              route: null,
              seq: null,
            })
          } else {
            this.addMore = false;
            this.seqNo = res[0].routeSeqNo,
              this.routeNumber = this.routedetailsbyshiptositeidordertypeidandshift[0].routeNumber;
            this.MasterIndentHeader.patchValue({
              route: res[0].routeNumber,
              seq: res[0].routeSeqNo,
            })
          }

        })
    }
  }
  setSequenceNumber(event) {
    // console.log('event',event)
    this.routedetailsbyshiptositeidordertypeidandshift.forEach(element => {
      if (element.routeNumber == event) {
        this.seqNo = element.routeSeqNo;
        this.routeNumber = element.routeNumber;
        this.MasterIndentHeader.patchValue({
          seq: this.seqNo,
        })
      }
    });
  }
  getallsalesordertype() {
    this.masterIndentService.getallsalesordertype().subscribe(res => {
      this.allsalesordertype = res
    })
  }
  getAllIndentShifts() {
    this.masterIndentService.getAllIndentShifts().subscribe(res => {
      this.shift = res
    })
  }
  getCustBillingDetailsByAcctNo() {
    this.masterIndentService.getCustBillingDetailsByAcctNo(this.data.accountNumber).subscribe(res => {
      this.custBillingDetailsByAcctNo = res;
      this.MasterIndentHeader.patchValue({
        billToSiteUseId: res[0]
      })
    });
  }

  getCustShippingDetailsByAcctNo() {
    this.masterIndentService.getCustShippingDetailsByAcctNo(this.data.accountNumber).subscribe(res => {
      this.MasterIndentHeader.patchValue({
        shipToSiteUseId: res[0]
      })
      this.custShippingDetailsByAcctNu = res
      this.getCategoriesByPriceListId();
    });
  }




  getCategoriesByPriceListId() {
    this.masterIndentService.getCategoriesByPriceListId(this.MasterIndentHeader.value.shipToSiteUseId.priceListId).subscribe(
      res => {
        this.allCatgeriesList = res;
      });
  }

  getItemsByPriceListIdAndCategory(category, i,) {

    if (this.seqNo != null) {
      this.spinner.show();
      this.masterIndentService.getItemsByPriceListIdAndCategory(this.MasterIndentHeader.value.shipToSiteUseId.priceListId, category).subscribe((response) => {
        this.spinner.hide();
        this.itemCodeDesc = response;
        (this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup).controls[i].patchValue({ dp: this.itemCodeDesc });
      });
    }
    else {
      this.toastr.error('Please select route number', 'Create Indent', {
        timeOut: 5000
      });
    }

  }

  getCustomerBalanceByAcctNo() {
    this.masterIndentService.getCustomerBalanceByAcctNo(this.data.accountNumber).subscribe(
      res => {
        this.balanceNo = res;
      });
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  onChanges(): void {
    this.schduleList.get('selectAll').valueChanges.subscribe(bool => {
      if (bool === true) {
        this.selectLabel = 'UnSelect All';
      }
      else {
        this.selectLabel = 'Select All';
      }
      this.schduleList.get('Scheduleday').patchValue(Array(this.Scheduleday.length).fill(bool), { emitEvent: false });
    });
    this.schduleList.get('Scheduleday').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (allSelected === false) {
        this.selectLabel = 'Select All';
      }
      else {
        this.selectLabel = 'UnSelect All';
      }
      if (this.schduleList.get('selectAll').value !== allSelected) {
        this.schduleList.get('selectAll').patchValue(allSelected, { emitEvent: false });
      }
    });
  }



  itemCode(i, field) {
    let index = 0;
    const a = this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup;
    const b = a.controls[i] as FormGroup;
    this.MasterIndentLineItem.controls.mstrIndLItm.value.forEach(items => {
      if (index != i) {
        if (items.itemDesc.description == this.MasterIndentLineItem.controls.mstrIndLItm.value[i].itemDesc.description) {
          this.addMore = true;
          b.controls.crt.disable();
          b.controls.packets.disable();
          this.toastr.error('Item is already added in the Master Indent', 'Master Indent', {
            timeOut: 2000
          });
          return
        } else {
          this.enableDisableQtyFields(field.value.itemDesc.sellingUOM, i);
        }
      }
      index += 1;
      this.enableDisableQtyFields(field.value.itemDesc.sellingUOM, i);
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

  get formArr() {
    return this.MasterIndentLineItem.get('mstrIndLItm') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      dp: '',
      itemDesc: ['', [Validators.required]],
      crt: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(1), Validators.maxLength(4),]],
      packets: [{ value: '', disabled: true, }, [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      category: ['', [Validators.required]],
    });
  }

  submit(form: NgForm) {
    this.submitted = true;
    if (this.MasterIndentHeader.value.seq == null) {
      this.toastr.error('Please select route number', 'Update Indent', {
        timeOut: 2000
      });
      return;
    }
    if (this.MasterIndentHeader.invalid) {
      return;
    }
    if (this.schduleList.invalid) {
      return;
    }
    if (this.MasterIndentLineItem.invalid) {
      return;
    }
    this.masterIndentLineItems = this.MasterIndentHeader.get('masterIndentLineItems') as FormArray;
    const shift = this.MasterIndentHeader.get('shiftId').value;
    const mIndentEndDate = this.datePipe.transform(this.MasterIndentHeader.get('endDate').value, 'dd-MM-yyyy 23:59:59 ');
    const mIndentCreateDate = this.datePipe.transform(this.MasterIndentHeader.get('startDate').value,'dd-MM-yyyy 00:00:00');
    const selectedPreferences = this.schduleList.value.Scheduleday
      .map((checked, index) => checked ? this.Scheduleday[index].weekday : null)
      .filter(value => value !== null);
    const [mon, tue, wed, thu, fri, sat, sun] = this.schduleList.value.Scheduleday;
    this.MasterIndentHeader.patchValue({
      mon: mon ? "Y" : "N",
      tue: tue ? "Y" : "N",
      wed: wed ? "Y" : "N",
      thu: thu ? "Y" : "N",
      fri: fri ? "Y" : "N",
      sat: sat ? "Y" : "N",
      sun: sun ? "Y" : "N",
      partyId: this.MasterIndentHeader.value.shipToSiteUseId.partyId,
      custAccountId: this.MasterIndentHeader.value.shipToSiteUseId.customerAccountId,
      custAcctSiteId: this.MasterIndentHeader.value.shipToSiteUseId.custAcctSiteId,
      creationDate: this.datePipe.transform(new Date(),  'dd-MM-yyyy HH:MM:SS'),
      createdBy: this.data.userId,
      lastUpdateDate:this.datePipe.transform(new Date(),  'dd-MM-yyyy HH:MM:SS'),
      lastUpdateBy: this.data.userId,
      lastUpdateLogin: this.data.userId,
      startDate: mIndentCreateDate,
      endDate: mIndentEndDate,
      billToSiteUseId: this.MasterIndentHeader.value.billToSiteUseId.siteUseId,
      shipToSiteUseId: this.MasterIndentHeader.value.shipToSiteUseId.siteUseId,
      shiftId: shift,
      orderTypeId: this.MasterIndentHeader.value.orderTypeId.orderTypeId,
      seq: this.seqNo,
      route: this.routeNumber
    });
    form.value.mstrIndLItm.forEach(e => {
      this.masterIndentLineItems.push(this.fb.group({
        itemId: e.itemDesc.itemId,
        qtyCrates: parseInt(e.crt),
        qtyPkt: parseInt(e.packets),
        creationDate: this.datePipe.transform(new Date(),  'dd-MM-yyyy  HH:MM:SS'),
        createdBy: this.data.userId,
        lastUpdateDate: this.datePipe.transform(new Date(),  'dd-MM-yyyy  HH:MM:SS'),
        lastUpdateBy: this.data.userId,
        lastUpdateLogin: this.data.userId,
      }));
    });

    this.spinner.show();
    this.masterIndentService.createMstrIndent(this.MasterIndentHeader.value).subscribe(res => {
      ////console.log(res, 'Saved Create Master Indent!');
      this.masterIndentLineItems.controls = [];
      this.masterIndentLineItems.clear();
      this.schduleList.reset();
      this.MasterIndentLineItem.reset();
      this.MasterIndentHeader.reset();
      this.submitted = false;
      this.spinner.hide();
      this.mstrIndentId = res;
      this.toastr.success('Master Indent#' + this.mstrIndentId.mstHdrId + '\n Created Successfully.');
      this.router.navigateByUrl('/customer/master-indent/list-master-indents');
    }, error => {
      ////console.log(error, 'Something Went Wrong');
      this.spinner.hide();
      this.submitted = false;
      for (let index = 0; index < this.formArr.length; index++) {
        this.formArr.removeAt(index);
      }
      this.masterIndentLineItems.controls = [];
      this.schduleList.reset();
      this.MasterIndentHeader.reset();
      this.MasterIndentLineItem.reset();
      this.masterIndentLineItems.clear();
      this.toastr.error('Something Went Wrong', 'Create Master Indent!', {
        timeOut: 2000
      });
    });
  }


  addNewRow() {
    this.submitted = false;
    this.MasterIndentLineItem.controls.mstrIndLItm.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
    this.addMore = true;

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
        if (items.itemDesc.description == this.MasterIndentLineItem.controls.mstrIndLItm.value[i].itemDesc.description) {
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
  deleteRow(index: number) {
    this.addMore = false;
    if (this.formArr.length > 1) {
      this.formArr.removeAt(index);
    } else {
      this.toastr.error('At least One product Mandatory', 'Single row', {
        timeOut: 2000
      });
    }
  }

  cancel() {
    this.formArr.clear();
    this.schduleList.reset();
    this.MasterIndentLineItem.reset();
    this.MasterIndentHeader.reset();
    this.addNewRow();
    this.oderTyp = '';
  }

}


