import { Component, OnInit } from '@angular/core';
import { MilkSocietyService } from 'src/app/shared/service/milk-society.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dispatch',
  templateUrl: './list-dispatch.component.html',
  styleUrls: ['./list-dispatch.component.css']
})
export class ListDispatchComponent implements OnInit {
  dispatchListItem: any;
  public showDialog: boolean = false;
  summaryMessage: any;
  userData: any;
  public search: any = '';
  constructor(private milkSocietyService: MilkSocietyService ,  private router: Router) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('data'));
    const vendorNumber = this.userData.vendorNum;
    this.milkSocietyService.getdispatchListBySocId(vendorNumber).subscribe((response) => {
      if (response)
        this.dispatchListItem = response;
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
  
  redirectTo(path,societyId ,shift ,Tripdate ) {
    console.log(societyId , shift , Tripdate);
    this.router.navigateByUrl('/' + path+societyId+'/'+shift+'/'+Tripdate);
  }

}
