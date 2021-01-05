import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-onhand-quantity',
  templateUrl: './onhand-quantity.component.html',
  styleUrls: ['./onhand-quantity.component.css']
})
export class OnhandQuantityComponent implements OnInit {
  allitemonhandqtyList: Object;
  searchText: any = '';
  public search: any = '';
  listItemonhandquantityallwarehouse: Object;
  listItemonhandquantityallordertype: Object;
  constructor(private formBuilder: FormBuilder,
              private routeService: RouteService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private datePipe: DatePipe,
              private route: Router,
              private spinner: NgxSpinnerService , ) { }

  ngOnInit() {
    this.allitemonhandqty();
    this.itemonhandquantityallwarehouse();
  }

  itemonhandquantityallwarehouse(){
    this.spinner.show();
    this.routeService.itemonhandquantityallwarehouse().subscribe(res => {
      this.listItemonhandquantityallwarehouse = res;
      this.spinner.hide();
    });
  }
 
  globalSearch(selection) {
        this.search = selection;
  }

  redirectTo(path) {
    this.route.navigateByUrl('/sales-order/temp-indents');
  }

  allitemonhandqty() {
    this.spinner.show();
    this.routeService.allitemonhandqty().subscribe(res => {
      this.allitemonhandqtyList = res;
      this.spinner.hide();
    });
  }
}
