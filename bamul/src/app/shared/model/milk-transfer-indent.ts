import { Timestamp } from 'rxjs';

export class MilkTransferIndent {

    sourceLocationId: number;
    targetLocationId: number;
    requiredDate: Date;
    requiredTime: Timestamp<any>;
    requiredQty: number;
    requiredFAT: number;
    requiredSNF: number;
    status: String;
    requiredRemarks: String;
    vehicleNumber: String;
    driverNames: String;
    transactionRemarks: String;
    sourceTareWt: number;
    loadedQuantity: number;
    loadedFat: number;
    loadedSNF: number;
    sourceGrosseWt: number;
    loadingRemarks: String;
    firstSealNo: number;
    secondSealNo: number;
    thirdSealNo: number;
    depertureDate: Date;
    depertureTime: Timestamp<any>;
    depertureVerifiedBy: String;
    depertureSecurityRemarks: String;
    arrivalDate: Date;
    arrivalTime: Timestamp<any>;
    arrivalVerifiedBy: String;
    arrivalSecurityRemarks: String;
    targetRecvdGrossWt: number;
    receivdQuantity: number;
    receivdFat: number;
    receivdSNF: number;
    receivdTareWt: number;
    receivingRemarks: String;
    deliveryChallanRemarks: String;
    recordCreationDate: Date;
    recordCreationBy: number;
    lastUpdateDate: Date;
    lastUpdateBy: String;


}