import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiPath: string = 'Dashboard/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  public get(): Observable<HttpResponse<Dashboard>> {
    return this.apiService
      .get<Dashboard>(this.apiPath.replace('{endpoint}', 'GetDashboardCounts'));
  }
}
