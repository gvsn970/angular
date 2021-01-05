import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dispatcher',
  templateUrl: './dispatcher.component.html',
  styleUrls: ['./dispatcher.component.css']
})
export class DispatcherComponent implements OnInit {
  view = false;
  constructor(private cs: CommonService, private titleService: Title) {

  }
  toogleMenu() {
    this.cs.getOption();
    this.view = !this.view;
    this.cs.setOption('view', this.view);
  }
  ngOnInit() {
    this.view = this.cs.getOption();
  }

}
