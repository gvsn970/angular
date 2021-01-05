import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/shared/service/route.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef ,} from 'ngx-bootstrap';

@Component({
  selector: 'app-other-sales-order-dispatch',
  templateUrl: './other-sales-order-dispatch.component.html',
  styleUrls: ['./other-sales-order-dispatch.component.css']
})
export class OtherSalesOrderDispatchComponent implements OnInit {
  allDispatchShipConfirm: any;
  dispatchRemarks:any=''
  modalRef: BsModalRef;
  message: string;  
 time = new Date();
  constructor(private routeService:RouteService,
    private  router:Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    ) { }

  ngOnInit() {
    this.allDispatchShipConfirm=this.routeService.getOtherSalesOrderDispatch()
    }
    

   openModal(template: any, index) {
     this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
   }
   decline(): void {
      this.router.navigateByUrl('/product-dispatch/other-sales-order-dispatch-list')
     this.message = 'Declined!';
     this.modalRef.hide();
   }
  confirm(index, field): void {
    
    let    saveCreatesodispship={  
       "headerId":  this.allDispatchShipConfirm.headerId, 
       "customerName": this.allDispatchShipConfirm.customerName,
       "customerNumber": this.allDispatchShipConfirm.customerNumber,
       "orderNumber": this.allDispatchShipConfirm.orderNumber,
       "orderType": this.allDispatchShipConfirm.orderType,
       "customerPo": this.allDispatchShipConfirm.customerPo,
       "customerContact": this.allDispatchShipConfirm.customerContact,
       "shipFromOrgId": this.allDispatchShipConfirm.shipFromOrgId,
       "billToLoc":this.allDispatchShipConfirm.billToLoction,
       "shipToLoc": this.allDispatchShipConfirm.shipToLocation,
       "transporter":  this.allDispatchShipConfirm.transporter,
       "vehicleNo": this.allDispatchShipConfirm.vehicleNo,
       "dispatchedDocNumber":this.allDispatchShipConfirm.dispatchDocNumber,
       "dispatchedThrough":  this.allDispatchShipConfirm.dispatchedThrough,
       "shippedDate": this.allDispatchShipConfirm.shippedDate,
       "orderedDate":  this.allDispatchShipConfirm.orderedDate,
       "soDispshipLines": this.allDispatchShipConfirm.dispatchShipConfirmLine ,
       "dispatchStatus": "Y",
       "dispatchRemarks": this.dispatchRemarks,
       "shipStatus": "N",
       "shippingRemarks": ""    
   }
   this.modalRef.hide();
       this.routeService.createsodispship(saveCreatesodispship).subscribe(res=>{
 
 this.dispatchRemarks='';
 this.toastr.success('Sucessfully Dispatched#' +this.allDispatchShipConfirm.orderNumber + '\n Dispatched.');
 this.router.navigateByUrl('/product-dispatch/other-sales-order-dispatch-list')
 
       })
   }
 

}
