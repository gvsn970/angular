import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { ToastrService } from 'ngx-toastr';
import { Router , ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef ,} from 'ngx-bootstrap';
@Component({
  selector: 'app-other-sales-order-dispatch-security',
  templateUrl: './other-sales-order-dispatch-security.component.html',
  styleUrls: ['./other-sales-order-dispatch-security.component.css']
})
export class OtherSalesOrderDispatchSecurityComponent implements OnInit {


  shippingRemarks :any=''
  modalRef: BsModalRef;
  message: string;  
 time = new Date();
  listSalesOrderShipping:any;
 
  constructor(private routeService:RouteService,
    private  router:Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    
 
    this.listSalesOrderShipping=this.routeService.getOtherSalesOrderShipping()
    }
    

   openModal(template: any, index) {
     this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
   }
   decline(): void {
      this.router.navigate(['../other-sales-order-security'],{ relativeTo: this.route })
     this.message = 'Declined!';
     this.modalRef.hide();
   }
  confirm(index, field): void {
    
    let updateCreatesodispship={  
       "headerId":  this.listSalesOrderShipping.headerId, 
       "customerName": this.listSalesOrderShipping.customerName,
       "customerNumber": this.listSalesOrderShipping.customerNumber,
       "orderNumber": this.listSalesOrderShipping.orderNumber,
       "orderType": this.listSalesOrderShipping.orderType,
       "customerPo": this.listSalesOrderShipping.customerPo,
       "customerContact": this.listSalesOrderShipping.customerContact,
       "shipFromOrgId": this.listSalesOrderShipping.shipFromOrgId,
       "billToLoc":this.listSalesOrderShipping.billToLoc,
       "shipToLoc": this.listSalesOrderShipping.shipToLoc,
       "transporter":  this.listSalesOrderShipping.transporter,
       "vehicleNo": this.listSalesOrderShipping.vehicleNo,
       "dispatchedDocNumber":this.listSalesOrderShipping.dispatchedDocNumber,
       "dispatchedThrough":  this.listSalesOrderShipping.dispatchedThrough,
       "shippedDate": this.listSalesOrderShipping.shippedDate,
       "orderedDate":  this.listSalesOrderShipping.orderedDate,
       "soDispshipLines": this.listSalesOrderShipping.soDispshipLines ,
       "dispatchStatus":  this.listSalesOrderShipping.dispatchStatus,
       "dispatchRemarks":this.listSalesOrderShipping.dispatchRemarks,
       "shipStatus": "Y",
       "shippingRemarks": this.shippingRemarks 
   }
   this.modalRef.hide();
       this.routeService.updatesodispship(updateCreatesodispship).subscribe(res=>{
 
 this.shippingRemarks='';
 this.toastr.success('Sucessfully Shipping#' +this.listSalesOrderShipping.orderNumber + '\n Shipping.');
 this.router.navigate(['../other-sales-order-security'],{ relativeTo: this.route })
 
       })
   }
 back(){
   this.router.navigate(['../other-sales-order-security'],{ relativeTo: this.route }) 
 }

}
