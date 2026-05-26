export class ServiceProviderDetails {
  transactions: Transaction[];
  remainingEarnings: number;
  totalEarnings: number;
  totalWithDrawls: number;
  completedAppointments: number;
  remainingAppointments: number;
  totalAppointments: number;
  user: User;
  bio: string;
  gender: string;
  profilePicture: string;
  businessAddress: string;
  businessPhoneNumber: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  qualifications: Qualification[];
  serviceProviderTherapies: ServiceProviderTherapy[];
  serviceProviderLicense: ServiceProviderLicense;
  specializations: LicenseType[];
  appointments: Appointment[];
  id: number;
  Insurance: ServiceProviderInsurance;
}
export class Appointment {
  id: number;
  CustomerId: number;
  CustomerProfile: string;
  CustomerName: string;
  ServiceProviderId: number;
  ServiceProviderName: string;
  CustomerServiceName: string;
  startTime: string;
  endTime: string;
  appointmentStatusName: string;
  date: string;
  rejectionReasonName?: any;
  rejectionDescription?: any;
  isRejected: boolean;
  appointmentTypeName: string;
}
export class ServiceProviderLicense {
  board: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  licenseType: LicenseType;
  frontImage: string;
  backImage: string;
  id: number;
}
export class LicenseType {
  name: string;
  id: number;
}
export class ServiceProviderTherapy {
  ServiceProviderName: string;
  therapyName: string;
  id: number;
}
export class Qualification {
  ServiceProviderName?: any;
  name: string;
  institutionName: string;
  procurementYear: string;
  id: number;
}
export class User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  id: number;
}
export class Transaction {
  totalAmount: number;
  transactionId?: any;
  description: string;
  updatedOn: string;
  CustomerName: string;
  ServiceProviderName: string;
  CustomerService: CustomerService;
  id: number;
}
export class CustomerService {
  name: string;
  therapyName: string;
  ServiceProviderId: number;
  ServiceProviderName: string;
  CustomerId: number;
  CustomerName: string;
  charges: number;
  numberOfTimesAvailable: number;
  validTill: string;
  id: number;
}

export class ServiceProviderInsurance {
  InsuranceType: InsuranceTypes;
  CoverageDetails: string;
  StartDate: string;
  ExpiryDate: string;
  InsuranceProviderName: string;
  PolicyNumber: string;
  CoverageLimit: number;
  Deductible: number;
}

export enum InsuranceTypes {
  GeneralLiabilityInsurance = 0,
  WorkersCompensationInsurance = 1,
  ProfessionalLiabilityInsurance = 2,
  ToolsAndEquipmentInsurance = 3
}
