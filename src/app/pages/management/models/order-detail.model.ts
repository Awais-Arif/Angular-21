import { MilestoneDetailModel } from "./milestone-detail.model";

export class OrderDetailModel {
  id: number;
  service: any;
  customerServiceRequest: CustomerServiceRequestModel;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  haveMilestone: boolean;
  totalPrice: number;
  startDate: Date;
  endDate: Date;
  description: string;
  isAccepted: boolean;
  milestones: MilestoneDetailModel[];
}


export class CustomerServiceRequestModel {
  CustomerId: number;
  Title: string;
  ServiceTypeId: number;
  Description: string;
  Images: string;
  Budget: number;
}


export enum OrderStatus {
  Pending = 1,
  Confirm = 2,
  InProgress = 3,
  Completed = 4,
  Cancel = 5
}


export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3
}


