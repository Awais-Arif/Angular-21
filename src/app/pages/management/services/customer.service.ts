import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { Customer } from '../models/customer.model';
import { CustomerDetail } from '../models/customer-detail.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private apiPath: string = 'Customer/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  public get(): Observable<HttpResponse<Customer[]>> {
    return this.apiService
      .get<Customer[]>(this.apiPath.replace('{endpoint}', 'GetAllList'));
  }

  public getById(id: number): Observable<HttpResponse<CustomerDetail>> {
    return this.apiService
      .get<CustomerDetail>(this.apiPath.replace('{endpoint}', ('GetById?Id=' + id)));
  }

}
