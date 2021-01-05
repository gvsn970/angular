
import { Driver } from './driver';

export class DriverDocuments {
    driverDocumentId: number;
    documentType: any;
    documentProviderName: string;
    documentNumber: number;
    docStartDate: Date;
    docEndDate: Date;
    driver: Driver;
    creationDate:Date;
    createdBy:number;
   lastUpdateDate:Date;
   lastUpdatedBy:number;
}