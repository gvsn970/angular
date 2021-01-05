import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data: any;

  constructor(private router: Router) { }

  ngOnInit() {

    this.data = JSON.parse(localStorage.getItem('data'));
    //console.log('data ', this.data);
  }
  logOut() {

    localStorage.removeItem('data');
    localStorage.removeItem('priceListId');

    localStorage.clear();
    this.router.navigateByUrl('/login');

  }
  redirectTo(path: any) {
    this.router.navigateByUrl('/' + path);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.data = null;
  }

}
