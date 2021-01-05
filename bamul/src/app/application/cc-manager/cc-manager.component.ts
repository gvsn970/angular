import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cc-manager',
  templateUrl: './cc-manager.component.html',
  styleUrls: ['./cc-manager.component.css']
})
export class CcManagerComponent implements OnInit {

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
