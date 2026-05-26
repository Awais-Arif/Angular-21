import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private apiPath: string = 'Settings/{endpoint}';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public get(): Observable<HttpResponse<Settings[]>> {
    return this.apiService
      .get<Settings[]>(this.apiPath.replace('{endpoint}', 'GetList'));
  }

  public post(withdrawalPercentage: number, servicePercentage: number, docAvailability: number): Observable<HttpResponse<Settings>> {
    const params: any = {
      "settingsModel": {
        "withdrawalPercentage": withdrawalPercentage,
        "servicePercentage": servicePercentage,
        "ServiceProviderAvailability": docAvailability,
      }
    };
    return this.apiService
      .post<Settings>(this.apiPath.replace('{endpoint}', 'Create'), params);
  }

  public put(withdrawalPercentage: number, servicePercentage: number, id: number, docAvailability: number): Observable<HttpResponse<Settings>> {
    const params: any = {
      "settingsModel": {
        "id": id,
        "withdrawalPercentage": withdrawalPercentage,
        "servicePercentage": servicePercentage,
        "ServiceProviderAvailability": docAvailability,
      }
    };
    return this.apiService
      .put<Settings>(this.apiPath.replace('{endpoint}', 'Update'), params);
  }

  public delete(id: number): Observable<HttpResponse<Settings>> {
    const params: any = {};
    params.id = id;
    return this.apiService
      .post<Settings>(this.apiPath.replace('{endpoint}', 'Delete'), params);
  }
}
