import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MilkDispatchService } from 'src/app/shared/service/milk-dispatch.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-milk-transfer-dispatch',
  templateUrl: './milk-transfer-dispatch.component.html',
  styleUrls: ['./milk-transfer-dispatch.component.css']
})
export class MilkTransferDispatchComponent implements OnInit {
  CreateMilkDispatchLineItem: FormGroup;
  CreateMilkDispatchExtraLineItem: FormGroup;
  dcNumber: number;
  milkTransferData: any;
  status: string = 'N';
  routeNumber: number;
  vehicleNumber: number;
  driverNumber: number;
  backSealNumber: number;
  items: any = [];
  extraItems: any = [];
  submitted = false;
  milkDispatchData: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe,
    private MilkDispatchService: MilkDispatchService
  ) { }

  ngOnInit() {
    this.CreateMilkDispatchLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initItemRows()])
    });
    this.CreateMilkDispatchExtraLineItem = this.fb.group({
      newIndtLItem: this.fb.array([this.initNewItemRows()])
    });
    this.getItem();
    this.getExtraItems();
  }
  getItem() {
    this.MilkDispatchService.getItems().subscribe(
      res => {
        this.items = res;
      }, error => {
        ////console.log('error', error)
      });
  }
  getExtraItems() {
    this.MilkDispatchService.getExtraItems().subscribe(
      res => {
        this.extraItems = res;
      }, error => {
        ////console.log('error', error)
      });
  }
  get formArr() {
    return this.CreateMilkDispatchLineItem.get('newIndtLItem') as FormArray;
  }
  get NewFormArr() {
    return this.CreateMilkDispatchExtraLineItem.get('newIndtLItem') as FormArray;
  }
  addItemRow() {
    this.CreateMilkDispatchLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    let i = this.CreateMilkDispatchLineItem.controls.newIndtLItem.value.length;
    if (i < 3) {
      this.formArr.push(this.initItemRows());
      for (let index = 0; index < this.formArr.value.length; index++) {
        if (index != 0) {
          (this.CreateMilkDispatchLineItem.controls.newIndtLItem as FormGroup).controls[index].patchValue({ sampleNum: parseInt(this.formArr.value[index - 1].sampleNum) + 1 });
        }
      }
      (this.CreateMilkDispatchLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ serial_number: parseInt(i) + 1 });
    } else {
      this.toastr.error('', 'Max 3 Records can be added per DC', {
        timeOut: 4000
      });
    }
  }
  addExtraItemRow() {
    this.CreateMilkDispatchExtraLineItem.controls.newIndtLItem.setValidators([Validators.required]);
    let i = this.CreateMilkDispatchExtraLineItem.controls.newIndtLItem.value.length;
    // if (i < 3) {
    this.NewFormArr.push(this.initNewItemRows());
    (this.CreateMilkDispatchExtraLineItem.controls.newIndtLItem as FormGroup).controls[i].patchValue({ serial_number: parseInt(i) + 1 });
    // }
  }
  initItemRows() {
    return this.fb.group({
      serial_number: '1',
      selo_number: ['', Validators.required],
      item: ['', Validators.required],
      acidity: ['', Validators.required],
      seal_number: ['', Validators.required],
      remark: ''
    });
  }
  initNewItemRows() {
    return this.fb.group({
      serial_number: '1',
      item: ['', Validators.required],
      total_weight: ['', Validators.required],
      number_of_cans: ['', Validators.required],
      remark: ''
    });
  }
  getMilkTransferByChallanNo() {
    this.MilkDispatchService.getMilkTransferByChallanNo(this.dcNumber).subscribe(
      res => {
        this.milkTransferData = res;
        this.status = this.milkTransferData.status;
        this.routeNumber = this.milkTransferData.routeNumber ? this.milkTransferData.routeNumber : '';
        this.vehicleNumber = this.milkTransferData.milkTransDCVehicle ? this.milkTransferData.milkTransDCVehicle.vehicleNo : '';
        this.driverNumber = this.milkTransferData.milkTransDCVehicle ? this.milkTransferData.milkTransDCVehicle.driverId : '';
      }, error => {
        ////console.log('error', error)
      });
  }
  postCollectionData(milkDispatchForm, milkDispatchExtraForm) {
    this.submitted = true;
    this.milkDispatchData = [];
    if (milkDispatchForm.form.status != 'INVALID' && milkDispatchExtraForm.form.status != 'INVALID') {
      // //console.log('milkDispatchForm', milkDispatchForm.form.value.newIndtLItem)
      // //console.log('milkDispatchExtraForm', milkDispatchExtraForm.form.value.newIndtLItem)
      let data = JSON.parse(localStorage.getItem('data'));
      var recordCreationDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");
      milkDispatchForm.form.value.newIndtLItem.forEach(items => {
        this.milkDispatchData.push({
          itemId: this.items[items.item].itemId,
          itemCode: this.items[items.item].itemCode,
          itemDescription: this.items[items.item].itemDescription,
          srcTareWt: 0,
          srcGrossWt: 0,
          loadedQty: 0,
          loadedFat: 0.0,
          loadedSNF: 0.0,
          loadedAcidity: items.acidity,
          loadTimeTemp: 0,
          trgtGrossWt: null,
          trgtTareWt: null,
          receivedQty: 0,
          receivedFat: 0,
          receivedSNF: 0,
          receivedAcidity: 0.0,
          recdTimeTemp: 0,
          recordCreationDate: recordCreationDate,
          recordCreationBy: data.userId,
          lastUpdateDate: null,
          lastUpdateBy: null,
          milkTransDelHdr: {
            deliveryChallanNo: this.dcNumber
          }
        });
      });
      milkDispatchExtraForm.form.value.newIndtLItem.forEach(items => {
        this.milkDispatchData.push({
          itemId: this.extraItems[items.item].itemId,
          itemCode: this.extraItems[items.item].itemCode,
          itemDescription: this.extraItems[items.item].itemDescription,
          srcTareWt: 0,
          srcGrossWt: items.total_weight,
          loadedQty: 0,
          loadedFat: 0.0,
          loadedSNF: 0.0,
          loadedAcidity: 0.0,
          loadTimeTemp: 0,
          trgtGrossWt: items.total_weight,
          noOfcans: items.number_of_cans,
          trgtTareWt: null,
          receivedQty: 0,
          receivedFat: 0,
          receivedSNF: 0,
          receivedAcidity: 0.0,
          recdTimeTemp: 0,
          recordCreationDate: recordCreationDate,
          recordCreationBy: data.userId,
          lastUpdateDate: null,
          lastUpdateBy: null,
          milkTransDelHdr: {
            deliveryChallanNo: this.dcNumber
          }
        });
      });
      // //console.log('this.milkDispatchData', this.milkDispatchData)
      if (this.dcNumber) {
        this.MilkDispatchService.saveMTDCItems(this.milkDispatchData).subscribe(res => {
          this.toastr.success('Successfully Saved Milk dispatched');
        }, error => {
          ////console.log(error);
          this.toastr.error('Server not responding', '', {
            timeOut: 3000
          });
        });
      } else {
        this.toastr.error('Please insert correct DC number');
      }
    }
  }
}
