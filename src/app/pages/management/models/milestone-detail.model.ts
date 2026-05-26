export class MilestoneDetailModel {
  Id: number;
  Status: MilestoneStatusType;
  StartDate: Date;
  EndDate: Date;
  Price: number;
}

export enum MilestoneStatusType {
  Pending = 1,
  InProgress = 2,
  Completed = 3
}
