import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) { }

  /**
   * Delete a user account by delegating to ApiService.
   */
  public deleteAccount(email: string, password: string): Observable<HttpResponse<any>> {
    return this.api.post('Account/DeleteAccount', { email, password });
  }
}
