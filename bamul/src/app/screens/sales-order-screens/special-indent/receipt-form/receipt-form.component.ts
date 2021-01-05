import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent implements OnInit {

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
