import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mkt-dairy-manager',
  templateUrl: './mkt-dairy-manager.component.html',
  styleUrls: ['./mkt-dairy-manager.component.css']
})
export class MktDairyManagerComponent implements OnInit {

  status = false;
  ngOnInit() {
  }
  toogleFullScreen() {
    this.status = !this.status;
    if (this.status) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

}
