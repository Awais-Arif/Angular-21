export interface CustomerDetail {
  user: UserModel;
  profilePicture: string;
  appointments: AppointmentModel[];
  customerServiceRequests: CustomerServiceRequestDetailModel[];
  id: number;
}

export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface AppointmentModel {
  id: number;
  customerId: number;
  customerProfile: string;
  customerName: string;
  serviceProviderId: number;
  serviceProviderName: string;
  customerServiceName: string;
  startTime: Date;
  endTime: Date;
  appointmentStatusName: string;
  date: Date;
  rejectionReasonName: string;
  rejectionDescription: string;
  isRejected: boolean;
  appointmentTypeName: string;
}

export interface CustomerServiceRequestDetailModel {
  title: string;
  serviceType: ServiceTypeModel;
  description: string;
  images: string;
  budget: number;
  serviceRequestType: ServiceRequestType;
  service: any
}

export interface ServiceTypeModel {
  name: string;
}

export enum ServiceRequestType {
  CustomerServiceRequest = 1,
  CustomerRequestByService = 2
}
