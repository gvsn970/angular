import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: any;
  isProfileCollapsed: any;
  data: any;

  constructor() { }

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('data'))
    ////console.log('data ', this.data);
  }

  logOut() {
    localStorage.clear();
  }

}
