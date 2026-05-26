import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { Specialization } from '../models/specialization.model';

@Injectable({
  providedIn: 'root',
})
export class SpecializationService {
  private apiPath: string = 'Specialization/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public get(): Observable<HttpResponse<Specialization[]>> {
    return this.apiService
    .get<Specialization[]>(this.apiPath.replace('{endpoint}','GetList'));
  }
  public post(name: string): Observable<HttpResponse<Specialization>> {
    const params: any = {};
    params.name = name;
    return this.apiService
    .post<Specialization>(this.apiPath.replace('{endpoint}','Create'), params);
  }

  public delete(id: number): Observable<HttpResponse<boolean>> {
    const params: any = {};
    params.id = id;
    return this.apiService
    .post<boolean>(this.apiPath.replace('{endpoint}','Delete'), params);
  }
  
}
