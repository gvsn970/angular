import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MilkTransferService } from '../milk-transfer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-milk-transfer',
  templateUrl: './new-milk-transfer.component.html',
  styleUrls: ['./new-milk-transfer.component.css']
})
export class NewMilkTransferComponent implements OnInit {

  destinationListItem: any;
  sourceListItem: any;
  ngFormCreateMilkTransfer: FormGroup;
  submitted = false;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private milkTransferService: MilkTransferService,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllSourceLocation();
    this.getAllDestinationLocation();
    this.ngFormCreateMilkTransfer = this.formBuilder.group({
      sourceID: ['', Validators.required],
      destinationID: ['', Validators.required],
      requiredQty: ['', Validators.required],
      transactionRemarks: ['', Validators.required]
    });
  }

  get f() { return this.ngFormCreateMilkTransfer.controls; }

  getAllSourceLocation() {
    this.milkTransferService.getAllSourceLocation().subscribe((response) => {
      if (response)
        this.sourceListItem = response;
      //console.log(this.sourceListItem, 'sourceListItem');
    });
  }

  getAllDestinationLocation() {
    this.milkTransferService.getAllDestinationLocation().subscribe((response) => {
      if (response)
        this.destinationListItem = response;
      //console.log(this.destinationListItem, 'destinationListItem');
    });
  }

  saveMilkTransferHeader() {

    // //console.log(objVal.sourceID, 'sourceID');
    // //console.log(objVal.destinationID, 'destinationID');
    this.submitted = true;
    if (this.ngFormCreateMilkTransfer.invalid) {
      return;
    }
    if (this.ngFormCreateMilkTransfer.valid) {
      const userData = JSON.parse(localStorage.getItem('data'));
      const formVal = this.ngFormCreateMilkTransfer.value;
      const sourceID = formVal.sourceID.split('-');
      const destinationID = formVal.destinationID.split('-');
      const fromOrgId = sourceID[0];
      const fromLocationId = sourceID[1];
      const fromSubInventory = sourceID[2];
      const toOrgId = destinationID[0];
      const toLocationId = destinationID[1];
      const toSubInventory = destinationID[2];
      const requiredTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
      const requiredDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      var objVal = {
        "requestType": "Milk Transfer",
        "status": "N",
        "fromOrgId": fromOrgId,
        "toOrgId": toOrgId,
        "fromLocationId": fromLocationId,
        "toLocationId": toLocationId,
        "fromSubInventory": fromSubInventory,
        "toSubInventory": toSubInventory,
        "fromOrgCode": null,
        "requiredDate": requiredDate,
        "requiredTime": requiredTime,
        "itemId": 28006,
        "itemCode": "UAT-RM",
        "itemDescription": "RAW MILK",
        "requiredQty": this.ngFormCreateMilkTransfer.value.requiredQty,
        "requiredFAT": null,
        "requiredSNF": null,
        "requiredRemarks": this.ngFormCreateMilkTransfer.value.transactionRemarks,
        "recordCreationDate": requiredDate,
        "recordCreationBy": userData.userId,
        "lastUpdateDate": null,
        "lastUpdateBy": null
      }
    }
    //console.log(objVal, 'sourceID');
    // //console.log(destinationID, 'destinationID');
    this.milkTransferService.saveMilkTransferHeader(objVal).subscribe((response) => {
      this.toastr.success('Milk Transferred Done Successfully', 'User', {
        timeOut: 4000
      });
      this.router.navigate(['/super-admin/milk-transfer/list-milk-transfer']);
    });
  }
}


