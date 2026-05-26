import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../shared/services/api.service';
import { OrderDetailModel } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiPath: string = 'Order/{endpoint}';
  constructor(private http: HttpClient, private apiService: ApiService) { }

  public get(statusId: number): Observable<HttpResponse<OrderDetailModel[]>> {
    return this.apiService
      .get<OrderDetailModel[]>(this.apiPath.replace('{endpoint}', `GetAll?statusId=${statusId}`));
  }


}
