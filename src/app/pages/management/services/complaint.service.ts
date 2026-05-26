import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { ComplaintDetailModel } from '../models/complaint-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private apiPath: string = 'Complaint/{endpoint}';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public updateStatus(id: number, status: number): Observable<HttpResponse<boolean>> {
    const body = { id, status };
    return this.apiService
      .put<any>(this.apiPath.replace('{endpoint}', 'UpdateStatus'), body);
  }

  public getAll(): Observable<HttpResponse<ComplaintDetailModel[]>> {
    return this.apiService
      .get<ComplaintDetailModel[]>(this.apiPath.replace('{endpoint}', 'GetAll'));
  }

}
