import { MasterIndentHeader } from './master-indent-header ';

export class MasterIndentLineItem {
    lineItemId: number;
    mstrIndHdr: MasterIndentHeader;
    partyId: number;
    custAccId: number;
    custSiteId: number;
    orderType: string;
    itemId: number;
    itemCode: string;
    itemDesc: string;
    uom: string;
    qtyCases: number;
    qtyNumber: number;
    recordCreationDate: Date;
    recordCreationBy: number;
    lastUpdateDate: Date;
    lastUpdateBy: string;
}





