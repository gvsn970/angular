import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmrd-lab-operator',
  templateUrl: './rmrd-lab-operator.component.html',
  styleUrls: ['./rmrd-lab-operator.component.css']
})
export class RmrdLabOperatorComponent implements OnInit {

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
