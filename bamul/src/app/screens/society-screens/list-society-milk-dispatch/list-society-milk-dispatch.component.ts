import { Component, OnInit } from '@angular/core';
import { MilkSocietyService } from 'src/app/shared/service/milk-society.service';

@Component({
  selector: 'app-list-society-milk-dispatch',
  templateUrl: './list-society-milk-dispatch.component.html',
  styleUrls: ['./list-society-milk-dispatch.component.css']
})
export class ListSocietyMilkDispatchComponent implements OnInit {

  dispatchListItem: any;
  public showDialog = false;
  summaryMessage: any;
  userData: any;
  public search: any = '';
  constructor(private milkSocietyService: MilkSocietyService) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    this.milkSocietyService.getdispatchListBySocId('19').subscribe((response) => {
      if (response) {
        this.dispatchListItem = response;
      }
      //console.log(this.dispatchListItem, 'dispatchList');

    });
  }

  globalSearch(selection) {
    this.search = selection;
  }
  showSummary(message) {
    this.showDialog = !this.showDialog;
    this.summaryMessage = message;
  }

  modalClose() {
    this.showDialog = !this.showDialog;
  }

}

