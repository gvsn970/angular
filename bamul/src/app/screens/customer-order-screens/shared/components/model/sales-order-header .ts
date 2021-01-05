import { SalesOrderLineItem } from './sales-order-line-item';

export class SalesOrderHeader {
     orderItems: SalesOrderLineItem;
     invoiceToOrgId: Number;
     orderTypeId: Number;
     paymentTermId: Number;
     priceListId: Number;
     salesRepId: Number;
     shipToOrgId: Number;
     shipFromOrgId: Number;
     soldFromOrgId: Number;
     soldToOrgId: Number;
     orgId: Number;
     shift: string;
     status: string;
     promiseDate: Date;
     requestDate: Date;
     bookedFlag: string;
     cancelledFlag: string;
     freightTermsCode: string;
     orderSourceId: Number;
     orderedDate: Date;
     origSysDocumnetRef: any;
     pricingDate: Date;
     shippingMethodCode: string;
     transactionalCurrencyCode: string;
     accountNumber: string;
     orderNumber: Number


     




}

