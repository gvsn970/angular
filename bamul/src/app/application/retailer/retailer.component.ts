import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerComponent implements OnInit {
  view = false;
  constructor(private cs: CommonService, private titleService: Title) {
    this.cs.listen().subscribe((m: any) => {
      this.onFilterClick(m);
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  onFilterClick(view) {
    this.cs.getOption();
    this.view = !this.view;
    this.cs.setOption('view', this.view);
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
