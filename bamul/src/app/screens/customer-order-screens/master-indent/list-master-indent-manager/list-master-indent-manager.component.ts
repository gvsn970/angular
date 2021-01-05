import { Component, OnInit } from '@angular/core';
import { MasterindentService } from '../../shared/components/services/masterindent.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-master-indent-manager',
  templateUrl: './list-master-indent-manager.component.html',
  styleUrls: ['./list-master-indent-manager.component.css']
})
export class ListMasterIndentManagerComponent implements OnInit {
  getMasterIndentList: any;
  data: any;
  masterIndentByCustomerId: any;
  masterIndentButton=false;
  p = 1;
  submitted = false;
  customerNo: FormGroup;
  custAvailable: boolean;
  accountNumber: any;
  customerBlank: boolean;
  customerListItem: any;
  constructor(private spinner: NgxSpinnerService,
    private masterIndentService: MasterindentService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cs: CommonService) { }

  ngOnInit() {    this.customerNo = this.formBuilder.group({
    custNo: ['',[Validators.required,Validators.maxLength(6),Validators.minLength(6)] ],
   });
   this.customerListItem = [];
  }

  masterIndentUpdate(path: any, i) {
    this.masterIndentService.masterindentList(i);
    localStorage.setItem('manager-edit-master-indent', JSON.stringify(i));
    this.router.navigateByUrl('mkt-dairy-manager/master-indent/' + path);
    this.getMasterIndentList = i;
    this.masterIndentService.setOptions(this.getMasterIndentList);
  }
  createIndentManger(){
    this.router.navigateByUrl('mkt-dairy-manager/master-indent/create-master-indent-manager');
    localStorage.setItem('create-indent-manager', JSON.stringify(this.accountNumber));
  }


  get f() { return this.customerNo.controls; }
  getCustomerDetails(element) {
    this.spinner.show();
    this.data = JSON.parse(localStorage.getItem('data'));
      this.masterIndentService.getMasterIndentsByAccountNumber(element).subscribe(res => {
        this.masterIndentByCustomerId = res;
        this.masterIndentButton=false;
        this.spinner.hide();
        if (res == '') {
          this.spinner.hide();
          this.masterIndentButton=true;
        }else{
        }
      });
  }

  selectEvent(item) {
    this.accountNumber = item;
    this.custAvailable = false;
    this.getCustomerDetails(this.accountNumber )
  }

  onChangeSearch(val: string) {
    if (val.length === 0) {
      this.customerBlank = true;
    }
    if (val.length > 3) {
      this.masterIndentService.getAccountNumber(val).subscribe((response) => {
        if (response)
          this.customerListItem = response;
        console.log(this.customerListItem, 'customerListItem');
      });
    }
    else {
      this.customerListItem = [];
      this.accountNumber = '';
      this.custAvailable = true;
    }
  }
}
