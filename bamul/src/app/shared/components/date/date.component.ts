import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  currentDate: any;
  constructor() {
    this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
  }
  ngOnInit() {
  }

}
