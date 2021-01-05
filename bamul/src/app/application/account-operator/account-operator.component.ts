import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-operator',
  templateUrl: './account-operator.component.html',
  styleUrls: ['./account-operator.component.css']
})
export class AccountOperatorComponent implements OnInit {

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
