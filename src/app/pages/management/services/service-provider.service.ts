import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { ServiceProviderDetails } from '../models/service-provider-details.model';
import { ServiceProvider } from '../models/service-provider.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceProviderService {
  private apiPath: string = 'ServiceProvider/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  public get(): Observable<HttpResponse<ServiceProvider[]>> {
    return this.apiService
      .get<ServiceProvider[]>(this.apiPath.replace('{endpoint}', 'GetAllList'));
  }

  public getById(id: number): Observable<HttpResponse<ServiceProviderDetails>> {
    return this.apiService
      .get<ServiceProviderDetails>(this.apiPath.replace('{endpoint}', ('GetById?Id=' + id)));
  }

  public post(name: string): Observable<HttpResponse<ServiceProvider>> {
    const params: any = {};
    params.name = name;
    return this.apiService
      .post<ServiceProvider>(this.apiPath.replace('{endpoint}', 'Create'), params);
  }
  public approveServiceProvider(id: number): Observable<HttpResponse<ServiceProvider>> {
    const params: any = {
      "approveServiceProvider": {
        "ServiceProviderId": id,
        "isApproved": true
      }
    };
    return this.apiService
      .post<ServiceProvider>(this.apiPath.replace('{endpoint}', 'ApproveServiceProvider'), params);
  }
  public disapproveServiceProvider(id: number, rejectionReason: string): Observable<HttpResponse<ServiceProvider>> {
    const params: any = {
      "dissApproveServiceProviderModel": {
        "ServiceProviderId": id,
        "isApproved": false,
        "rejectionReason": rejectionReason,
      }
    };
    return this.apiService
      .post<ServiceProvider>(this.apiPath.replace('{endpoint}', 'DisapproveServiceProvider'), params);
  }

  public delete(id: number): Observable<HttpResponse<boolean>> {
    const params: any = {};
    params.id = id;
    return this.apiService
      .post<boolean>(this.apiPath.replace('{endpoint}', 'Delete'), params);
  }
}
