import { Timestamp } from 'rxjs';

export class TransportRoute {
     routeId: number;
     routrNumber: string;
     routrName: string;
     routrType: string;
     routrShift: string;
     createdByDept: number;
     routrAssociatedTo: number;
     startLocation: string;
     startLatitude: string;
     startLongitude: string;
     startTime: Timestamp<any>;
     endLocation: string;
     endLatitude: string;
     endLongitude: string;
     endTime: Timestamp<any>;
     routrDistanceInKM: number;
     routeStatus: string;
     paymentType: string;
     paymentAmount: number;
     recordCreationDate: Date;
     recordCreationBy: number;
     lastUpdateDate: Date;
     lastUpdateBy: number;
     //   Set<TransportRoutePoints> trRtPtList ;  //= new HashSet<TransportRoutePoints>(0)

}
