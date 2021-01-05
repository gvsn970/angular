import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.css']
})
export class ViewCollectionComponent implements OnInit {
  orderdate = new Date();
  disabled = true;
  edit = true;

  constructor(private router: Router) { }


  redirectTo(path: any) {
    this.router.navigateByUrl('/' + path);
  }
  ngOnInit() {
    this.orderdate.setDate(this.orderdate.getDate() - 7);
  }
  allowEdit() {
    this.disabled = false;
    this.edit = false;
  }
  updateMe() {
    this.disabled = true;
    this.edit = true;
  }

}
