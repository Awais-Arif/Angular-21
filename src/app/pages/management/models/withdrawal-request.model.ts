import { WithDrawalStatus } from "./withdrawal-status.model";

export interface WithdrawalRequest {
  userId: number;
  id: number;
  amount: number;
  serviceProviderId: number;
  serviceProviderName: string;
  createOn: Date;
  withDrawalStatusId: WithDrawalStatus;
}
