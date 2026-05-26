import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { RejectionReason } from '../models/rejection-reason.model';

@Injectable({
  providedIn: 'root',
})
export class RejectionReasonService {
  private apiPath: string = 'RejectionReason/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public get(): Observable<HttpResponse<RejectionReason[]>> {
    return this.apiService
    .get<RejectionReason[]>(this.apiPath.replace('{endpoint}','GetList'));
  }
  public post(name: string): Observable<HttpResponse<RejectionReason>> {
    const params: any = {};
    params.name = name;
    return this.apiService
    .post<RejectionReason>(this.apiPath.replace('{endpoint}','Create'), params);
  }

  public delete(id: number): Observable<HttpResponse<boolean>> {
    const params: any = {};
    params.id = id;
    return this.apiService
    .post<boolean>(this.apiPath.replace('{endpoint}','Delete'), params);
  }
  
}
