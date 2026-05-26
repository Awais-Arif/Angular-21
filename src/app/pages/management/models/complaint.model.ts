export class Complaint {
  title: string;
  description: string;
  usertype: string;
  status: ComplaintStatus;
}
export enum ComplaintStatus {
  Open = 1,
  InProgress = 2,
  Closed = 3
}


