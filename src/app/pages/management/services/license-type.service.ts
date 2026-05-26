import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { LicenseType } from '../models/license-type.model';

@Injectable({
  providedIn: 'root',
})
export class LicenseTypeService {
  private apiPath: string = 'LicenseType/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public get(): Observable<HttpResponse<LicenseType[]>> {
    return this.apiService
    .get<LicenseType[]>(this.apiPath.replace('{endpoint}','GetList'));
  }
  public post(name: string): Observable<HttpResponse<LicenseType>> {
    const params: any = {};
    params.name = name;
    return this.apiService
    .post<LicenseType>(this.apiPath.replace('{endpoint}','Create'), params);
  }
  


  public delete(id: number): Observable<HttpResponse<boolean>> {
    const params: any = {};
    params.id = id;
    return this.apiService
    .post<boolean>(this.apiPath.replace('{endpoint}','Delete'), params);
  }
  
}
