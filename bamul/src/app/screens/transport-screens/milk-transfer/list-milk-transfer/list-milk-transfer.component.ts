import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MilkTransferService } from '../milk-transfer.service';
import { DataService } from 'src/app/shared/service/data.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-list-milk-transfer',
  templateUrl: './list-milk-transfer.component.html',
  styleUrls: ['./list-milk-transfer.component.css']
})
export class ListMilkTransferComponent implements OnInit {

  constructor(private router: Router, private milkTransferService: MilkTransferService, private dataService: DataService, private datePipe: DatePipe) { }
  milkTransferListItem: any;
  ngOnInit() {
    this.getMilkTransferList();
  }

  getMilkTransferList() {
    this.milkTransferService.getMilkTransferList().subscribe((response) => {
      if (response)
        this.milkTransferListItem = response;
      //console.log(this.milkTransferListItem, 'milkTransferListItem');
    },
      error => {
        //console.log(error.error);
        this.milkTransferListItem = error.error;
      });
  }
  redirectTo(id: any) {
    //console.log('jsjd', id);
    this.dataService.setOption('deliveryChallanNo', id);
    //this.router.navigateByUrl('/' + path);
  }
}
