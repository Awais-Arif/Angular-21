import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { TherapyType } from '../models/therapy-type.model';

@Injectable({
  providedIn: 'root',
})
export class TherapyTypeService {
  private apiPath: string = 'TherapyType/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public get(): Observable<HttpResponse<TherapyType[]>> {
    return this.apiService
    .get<TherapyType[]>(this.apiPath.replace('{endpoint}','GetList'));
  }
  public post(name: string): Observable<HttpResponse<TherapyType>> {
    const params: any = {};
    params.name = name;
    return this.apiService
    .post<TherapyType>(this.apiPath.replace('{endpoint}','Create'), params);
  }
  


  public delete(id: number): Observable<HttpResponse<boolean>> {
    const params: any = {};
    params.id = id;
    return this.apiService
    .post<boolean>(this.apiPath.replace('{endpoint}','Delete'), params);
  }
  
}
