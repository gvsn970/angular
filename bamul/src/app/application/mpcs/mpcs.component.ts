import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mpcs',
  templateUrl: './mpcs.component.html',
  styleUrls: ['./mpcs.component.css']
})
export class MpcsComponent implements OnInit {

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
