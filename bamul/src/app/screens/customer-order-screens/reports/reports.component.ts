
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgForm, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterindentService } from 'src/app/shared/service/masterindent.service-rolesfolder';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class CustomerReportsComponent implements OnInit {
  custBilling: any;
  occupations: any;
  custNm: any;
  custAdress: any;
  objArray: any;
  itemCodeDesc: any = [];
  MasterIndentLineItem: FormGroup;
  MasterIndentHeader: FormGroup;
  MasterIndentSchedule: FormGroup;
  categories: any;
  formSubmitted = false;
  category: string;
  names: any;
  name: any;
  selectedAll: any;
  test: any[] = [];
  data: any;
  shift: any[] = ['Morning', 'Evening'];
  Scheduleday = [
    { id: 'MONDAY', weekday: 'MONDAY11' },
    { id: 'TUESDAY', weekday: 'TUESDAY' },
    { id: 'WEDNESDAY', weekday: 'WEDNESDAY' },
    { id: 'THURSDAY', weekday: 'THURSDAY' },
    { id: 'FRIDAY', weekday: 'FRIDAY' },
    { id: 'SATURDAY', weekday: 'SATURDAY' },
    { id: 'SUNDAY', weekday: 'SUNDAY' }
  ];

  orderLines: FormArray;
  mstrIndLItem: FormArray;
  isDisabled = false;
  oderTyp: object;
  customerShipping: object;
  PricesList: object;
  valueIndent: any;
  allCatgeries: object;
  customerDetailByAcctId: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private masterIndentService: MasterindentService
  ) {
    const formControls = this.Scheduleday.map(control => new FormControl(false));
    const selectAllControl = new FormControl(false);
    this.schduleList = this.fb.group({
      Scheduleday: new FormArray(formControls),
      selectAll: selectAllControl
    });
    this.getCustomerDetailByAcctId();

  }


  schduleList: FormGroup;

  ngOnInit() {

    this.MasterIndentHeader = this.fb.group({
      // mstrIndentId: number;
      partyId: '',
      partyName: '',
      custAccNumber: '',
      custAccId: '',
      custSiteId: '',
      custSiteNo: '',
      orderType: '', // add  drop down
      status: 'NEW',
      recordCreationDate: new Date(),
      recordCreationBy: '1234',
      lastUpdateDate: null,
      lastUpdateBy: null,

      mstrIndSechedule: this.fb.group({

        custAccId: '',
        custSiteId: '',
        mIndentCreateDate: '', // date
        mIndentEndDate: '', // date
        mIndentShift: '', // drop down
        mondaySchedule: '',
        tuesdaySchedule: '',
        wednwsdaySchedule: '',
        thursdaySchedule: '',
        fridaySchedule: '',
        saturdaySchedule: '',
        sundaySchedule: '',
        recordCreationDate: new Date(),
        recordCreationBy: 1234,
        lastUpdateDate: null,
        lastUpdateBy: null

      }),
      mstrIndLItem: this.fb.array([])
    });


    this.MasterIndentLineItem = this.fb.group({

      mstrIndLItm: this.fb.array([this.initItemRows()])
    });
    const disabledDates = [
      new Date('2019-02-05'),

    ];
    this.categories = [{ val: 'MILK' }, { val: 'SWEET' }, { val: 'CURD' }];
    this.onChanges();


    this.retrieveAllCategories();

    this.OrderType();

  }
  toggleDisabling(): void {

  }
  onChanges(): void {
    this.schduleList.get('selectAll').valueChanges.subscribe(bool => {
      this.schduleList
        .get('Scheduleday')
        .patchValue(Array(this.Scheduleday.length).fill(bool), { emitEvent: false });
    });
    this.schduleList.get('Scheduleday').valueChanges.subscribe(val => {
      const allSelected = val.every(bool => bool);
      if (this.schduleList.get('selectAll').value !== allSelected) {
        this.schduleList.get('selectAll').patchValue(allSelected, { emitEvent: false });
      }
    });
  }

  getItemsByPriceListIdAndCategory(category, i, t, field) {
    ////console.log(category, 'category', i);

    this.masterIndentService.getItemsByPriceListIdAndCategory(category).subscribe((response) => {

      ////console.log(response, 'response');
      this.itemCodeDesc = response;
      (this.MasterIndentLineItem.controls.mstrIndLItm as FormGroup).controls[i].patchValue({ dp: this.itemCodeDesc });

    });
  }
  getCustomerDetailByAcctId() {
    this.data = JSON.parse(localStorage.getItem('data'));
    this.masterIndentService.getCustomerDetailByAcctId(this.data.customerId).subscribe(res => {

      ////console.log(res);
      this.customerDetailByAcctId = res;
      localStorage.setItem('priceListId', JSON.stringify(this.customerDetailByAcctId));
    },
      error => {

        ////console.log(error);
      }
    );
  }

  OrderType() {
    const priceLstId = JSON.parse(localStorage.getItem('priceListId'));
    this.masterIndentService.OrderType(priceLstId.priceListId).subscribe(res => {

      //console.log(res);
      this.oderTyp = res;
    },
      error => {

        ////console.log(error);
      }
    );
  }
  itemCode(event, i, f) {
    ////console.log('selected', event.currentTarget.selectedIndex, this.MasterIndentLineItem.value.mstrIndLItm[i].selected);
    this.MasterIndentLineItem.value.mstrIndLItm[i].selected = event.currentTarget.selectedIndex;
    // f.controls['selected'].updateValue(event.currentTarget.selectedIndex);
    (this.MasterIndentLineItem.controls.mstrIndLItem as FormGroup).controls[i].patchValue({ slected1: event.currentTarget.selectedIndex });

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  retrieveAllCategories() {
    this.masterIndentService.retrieveAllCategories().subscribe(
      res => {

        ////console.log(res, 'allCatgeries');
        this.allCatgeries = res;
      }, error => {

        ////console.log(error, 'error');
      }
    );
  }

  get formArr() {
    return this.MasterIndentLineItem.get('mstrIndLItm') as FormArray;

  }



  initItemRows() {

    return this.fb.group({
      dp: '',
      crt: ['', [Validators.required, Validators.minLength(1)]],
      units: ['', [Validators.required, Validators.minLength(1)]],
      selected: [0],
      slected1: [0]

    });
  }

  submit(form: NgForm) {
    this.mstrIndLItem = this.MasterIndentHeader.get('mstrIndLItem') as FormArray;

    ////console.log('submit', form.value.mastrIndLItem);
    ////console.log(this.MasterIndentHeader);

    const selectedPreferences = this.schduleList.value.Scheduleday
      .map((checked, index) => checked ? this.Scheduleday[index].weekday : null)
      .filter(value => value !== null);

    const [mon, tue, wed, thu, fri, sat, sun] = this.schduleList.value.Scheduleday;

    this.MasterIndentHeader.patchValue({
      mstrIndSechedule: {
        mondaySchedule: mon ? 'MONDAY' : '',
        tuesdaySchedule: tue ? 'TUESDAY' : '',
        wednwsdaySchedule: wed ? 'WEDNESDAY' : '',
        thursdaySchedule: thu ? 'THURSDAY' : '',
        fridaySchedule: fri ? 'FRIDAY' : '',
        saturdaySchedule: sat ? 'SATURDAY' : '',
        sundaySchedule: sun ? 'SUNDAY' : '',
        custAccId: this.customerDetailByAcctId.customerAccountId,
        custSiteId: this.customerDetailByAcctId.custAcctSiteId,
      }
    });
    this.MasterIndentHeader.patchValue({
      partyId: this.customerDetailByAcctId.partyId,
      partyName: this.customerDetailByAcctId.partyName,
      custAccNumber: this.data.customerId,
      custAccId: this.customerDetailByAcctId.customerAccountId,
      custSiteId: this.customerDetailByAcctId.custAcctSiteId,
      custSiteNo: this.customerDetailByAcctId.partySiteNumber,

    });
    form.value.mstrIndLItm.forEach(e => {

      this.mstrIndLItem.push(this.fb.group({
        itemCode: e.dp[e.slected1].itemCode,
        itemDesc: e.dp[e.slected1].description,
        qtyCases: e.crt,
        qtyNumber: e.units,
        itemId: e.dp[e.slected1].itemId,
        uom: e.dp[e.slected1].uom,
        partyId: this.customerDetailByAcctId.partyId,
        custAccId: this.customerDetailByAcctId.customerAccountId,
        stSiteId: this.customerDetailByAcctId.custAcctSiteId,
        custSiteId: this.customerDetailByAcctId.custAcctSiteId,
        recordCreationDate: new Date(),
        recordCreationBy: 1234,
        lastUpdateDate: null,
        lastUpdateBy: null

      }));
    });

    ////console.log('Reactive Form submitted: ' + form.submitted);
    this.masterIndentService.createMstrIndent(this.MasterIndentHeader.value).subscribe(res => {
      ////console.log(res);
      this.mstrIndLItem.controls = [];
      this.mstrIndLItem.clear();
      alert('sucessfully created master indent');
    }, error => {

      ////console.log(error);
      this.mstrIndLItem.controls = [];
      this.mstrIndLItem.clear();


    });

  }
  addNewRow() {
    this.MasterIndentLineItem.controls.mstrIndLItm.setValidators([Validators.required]);
    this.formArr.push(this.initItemRows());
  }



  deleteRow(index: number) {
    if (index >= 1) {
      this.formArr.removeAt(index);

    } else {
      this.toastr.error('at least one product manditary', 'single row', {
        timeOut: 3000
      });

    }

  }




}


