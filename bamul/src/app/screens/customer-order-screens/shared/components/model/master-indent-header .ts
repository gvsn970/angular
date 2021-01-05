import { MasterIndentSchedule } from './master-indent-schedule ';
import { MasterIndentLineItem } from './master-indent-line-item ';

export class MasterIndentHeader {
    mstrIndentId: number;
    partyId: number;
    partyName: string;
    custAccNumber: number;
    custAccId: number;
    custSiteId: number;
    custSiteNo: number;
    orderType: string;
    status: string;
    recordCreationDate: Date;
    recordCreationBy: number;
    lastUpdateDate: Date;
    lastUpdateBy: string;
    mihShift: string;
    mihRouteNo: string;
    mihSeqNo: number;
    mihOrderTypeId: number;
    mstrIndSechedule: MasterIndentSchedule;
    mstrIndLItem: MasterIndentLineItem;

}



