import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-orders-released',
  templateUrl: './orders-released.component.html',
  styleUrls: ['./orders-released.component.css']
})
export class OrdersReleasedComponent implements OnInit {
  releaseReason: FormGroup;
  submitted = false;
  shippingHeadersList;
  message: string;

  isSelectAll = false;
  searchText: any = '';
  listItem = [];
  addMore = true;
  positionSelect: any[] = [{ shift: 'M' }, { shift: 'E' }];
  modalRef: BsModalRef;
  allReeleasedHoldsOrder: object;
  rowData: any;
  selectedAll = false;
  disabledcheck = true;
  public search: any = '';

  constructor(private formBuilder: FormBuilder,
    private routeService: RouteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService , ) { }

  ngOnInit() {

    this.getAllReleasedHoldsOrder();
  }

  getAllReleasedHoldsOrder() {
    this.spinner.show();
    this.routeService.getAllReleasedHoldsOrder().subscribe(res => {
      this.allReeleasedHoldsOrder= res;
          this.spinner.hide();
    });
  }


  globalSearch(selection) {
    this.search = selection;
  }


}
