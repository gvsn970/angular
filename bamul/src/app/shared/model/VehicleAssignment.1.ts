import { Vehicle } from './vehicle';
export class VehicleAssignment {
    tenderRate: number;
    departmentTagging: string;
    vehicleAssignmentId: number;
    extraKMRate: number;
    tenderDieselPrice: number;
    gPSDeviceNumber: string;
    driverName: string;
    assignmentFromDate: Date;
    assignmenToDate: Date;
    ownership: string;
    vendorId: string;
    vehicle: Vehicle;
    lastUpdateDate: Date;
    lastUpdateBy: number;
}
