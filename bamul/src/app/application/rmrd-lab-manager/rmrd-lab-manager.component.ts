import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmrd-lab-manager',
  templateUrl: './rmrd-lab-manager.component.html',
  styleUrls: ['./rmrd-lab-manager.component.css']
})
export class RmrdLabManagerComponent implements OnInit {

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
