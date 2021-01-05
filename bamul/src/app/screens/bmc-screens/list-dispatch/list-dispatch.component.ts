import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MilkCollectionService } from 'src/app/shared/service/milk-collection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dispatch',
  templateUrl: './list-dispatch.component.html',
  styleUrls: ['./list-dispatch.component.css']
})
export class ListDispatchComponent implements OnInit {
  public search: any = '';
  constructor(private MilkCollectionServices: MilkCollectionService , private router: Router , 
              private spinnerService: Ng4LoadingSpinnerService) { }
    shippingHeadersList:any;
    shippingHeadersBmcList = []
    avgFat;
    avgClr;
    avgSnf;
    sumSociety;
    UserData;

  ngOnInit() {
    this.UserData = JSON.parse(localStorage.getItem('data'));
    this.spinnerService.show();
    this.MilkCollectionServices.getshippingHeaderBmc(this.UserData.supplierId).subscribe(
      (res : any) => {
          this.shippingHeadersList =  res.filter((res)=> {
            return res.receiptStatus !='Cancelled';
          });
          let result; 
          this.shippingHeadersList.forEach((element,i) => {
            result = this.shippingHeadersBmcList.find((data)=>data.bmcRefNo == element.bmcRefNo);
            if(element.bmcRefNo !=null) {
              //this.avgFat+=  (this.shippingHeadersList.avgFat*this.shippingHeadersList.netWeight);
              //this.sumSociety+= this.shippingHeadersList.netWeight;
              if(result==undefined) {
              element.customAvgFat = element.avgFat*element.quantityShipped; 
              element.customSociety= element.quantityShipped;
              element.customAvgSnf= element.avgSnf*element.quantityShipped
              this.shippingHeadersBmcList.push(element);
              }
              else {
                let index = this.shippingHeadersBmcList.findIndex((data)=>data.bmcRefNo == element.bmcRefNo);
                this.shippingHeadersBmcList[index].numOfContainers+= element.numOfContainers;
                this.shippingHeadersBmcList[index].quantityShipped+=element.quantityShipped
                // this.avgFat+=  (element.avgFat*element.netWeight);
                // this.sumSociety+= element.netWeight;
                this.shippingHeadersBmcList[index].customAvgFat += element.avgFat*element.quantityShipped;
                this.shippingHeadersBmcList[index].customAvgSnf += element.avgSnf*element.quantityShipped;  
                this.shippingHeadersBmcList[index].customSociety += element.quantityShipped;
                //this.shippingHeadersBmcList[index].customAvgFat = (this.shippingHeadersBmcList[index].customAvgFat/this.shippingHeadersBmcList[index].customSociety);
                //this.shippingHeadersBmcList[index].customAvgSnf = (this.shippingHeadersBmcList[index].customAvgSnf/this.shippingHeadersBmcList[index].customSociety);
                ////console.log(this.shippingHeadersBmcList[index]);

              }
              }
          });
          this.shippingHeadersBmcList.forEach((element,i)=> {
              element.overallcustomAvgFat = (this.shippingHeadersBmcList[i].customAvgFat/this.shippingHeadersBmcList[i].customSociety).toFixed(2);
              element.overallcustomAvgSnf = (this.shippingHeadersBmcList[i].customAvgSnf/this.shippingHeadersBmcList[i].customSociety).toFixed(2);
              ////console.log("original" ,element);
          })
          ////console.log(this.shippingHeadersBmcList);
          this.spinnerService.hide();
          ////console.log(this.shippingHeadersList);
      }, error => {
      });
  }
  globalSearch(selection) {
    this.search = selection;
  }
  redirectTo(path: any, id) {
    this.router.navigateByUrl(`/${path}/${id}`);
  }
}
