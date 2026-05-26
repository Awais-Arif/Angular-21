import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { WithdrawalRequest } from '../models/withdrawal-request.model';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalRequestService {
  private apiPath: string = 'WithdrawalRequest/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public get(): Observable<HttpResponse<WithdrawalRequest[]>> {
    return this.apiService
    .get<WithdrawalRequest[]>(this.apiPath.replace('{endpoint}','GetList'));
  }
  public approveRequest(id:number):Observable<HttpResponse<any>>{
    const model = {
      withDrawalId:id
    };
    return this.apiService
    .post<any>(this.apiPath.replace('{endpoint}','Approve'),model);
  }
}
