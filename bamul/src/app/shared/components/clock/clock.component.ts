import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  now: number;
  constructor() {
    setInterval(() => {
      this.now = Date.now();
    }, 60000);
  }
  ngOnInit() {
    this.now = Date.now();
  }


}
