import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmc-lab-operator',
  templateUrl: './bmc-lab-operator.component.html',
  styleUrls: ['./bmc-lab-operator.component.css']
})
export class BmcLabOperatorComponent implements OnInit {

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
