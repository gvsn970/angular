import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-desk-user',
  templateUrl: './call-desk-user.component.html',
  styleUrls: ['./call-desk-user.component.css']
})
export class CallDeskUserComponent implements OnInit {

  constructor() { }

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
