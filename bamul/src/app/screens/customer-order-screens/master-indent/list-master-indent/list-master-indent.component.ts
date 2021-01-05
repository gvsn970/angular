import { Component, OnInit } from '@angular/core';
import { MasterindentService } from '../../shared/components/services/masterindent.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/service/common.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-list-master-indent',
  templateUrl: './list-master-indent.component.html',
  styleUrls: ['./list-master-indent.component.css']
})
export class ListMasterIndentComponent implements OnInit {
  getMasterIndentList: any;
  data: any;
  masterIndentByCustomerId: object;
  p = 1;
  constructor(
private spinner: NgxSpinnerService ,
private masterIndentService: MasterindentService,
    private router: Router,
    private cs: CommonService
  ) { }

  ngOnInit() {
    //updated code1
    this.getMasterIndentsByAccountNumber();
  }
  masterIndentUpdate( i) {
    this.masterIndentService.masterindentList(i);
    localStorage.setItem('edit-master-indent', JSON.stringify(i));
    this.getMasterIndentList = i;
    this.masterIndentService.setOptions( this.getMasterIndentList );
    if (i.status == "ERROR" || i.status == "ACTIVE"|| i.status == "NEW") {
      this.router.navigateByUrl('customer/master-indent/edit-master-indent' );
    } else {
      this.router.navigateByUrl('customer/master-indent/master-indent-view');
    }
  }

  getMasterIndentsByAccountNumber() {
    this.spinner.show();
    this.data = JSON.parse(localStorage.getItem('data'));
    this.masterIndentService.getMasterIndentsByAccountNumber(this.data.accountNumber).subscribe(res => {
      this.masterIndentByCustomerId = res;
      this.spinner.hide();
    });
  }

}
