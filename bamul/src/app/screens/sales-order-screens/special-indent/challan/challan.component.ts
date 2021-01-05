import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challan',
  templateUrl: './challan.component.html',
  styleUrls: ['./challan.component.css']
})
export class ChallanComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  printMe() {
    window.print();
  }
  redirectTo(path: any) {
    this.router.navigateByUrl('/sales-order/' + path);
  }
}
