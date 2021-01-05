import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmc-manager',
  templateUrl: './bmc-manager.component.html',
  styleUrls: ['./bmc-manager.component.css']
})
export class BmcManagerComponent implements OnInit {


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
