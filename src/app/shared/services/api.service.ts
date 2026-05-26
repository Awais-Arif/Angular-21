import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams, HttpEvent, HttpRequest, HttpParameterCodec } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.apiUrl = "https://api.mendedsolution.com/api/";
  }

  public get<T>(apiPath: string, params?: any): Observable<HttpResponse<T>> {
    return this.http
      .get<T>(getUrlFromDomainAndPath(this.apiUrl, apiPath), {
        observe: 'response',
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: params,
        }),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  public post<T>(apiPath: string, body?: T, params?: any, headers?: any): Observable<HttpResponse<T>> {
    return this.http
      .post<T>(getUrlFromDomainAndPath(this.apiUrl, apiPath), body, {
        observe: 'response',
        headers: headers,
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: params,
        }),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  public put<T>(apiPath: string, body?: T, params?: any): Observable<HttpResponse<T>> {
    return this.http
      .put<T>(getUrlFromDomainAndPath(this.apiUrl, apiPath), body, {
        observe: 'response',
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: params,
        }),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  public delete<T>(apiPath: string, body?: T, params?: any): Observable<HttpResponse<T>> {
    return this.http
      .delete<unknown>(getUrlFromDomainAndPath(this.apiUrl, apiPath), {
        observe: 'response',
        body: body,
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: params,
        }),
      })
      .pipe(catchError(this.handleError.bind(this)));
  }

  public download(apiPath: string, params?: any): Observable<HttpEvent<Blob>> {
    return this.http.request(
      new HttpRequest('GET', getUrlFromDomainAndPath(this.apiUrl, apiPath), null, {
        reportProgress: true,
        responseType: 'blob',
        params: new HttpParams({
          encoder: new CustomHttpParamEncoder(),
          fromObject: params,
        }),
      }),
    );
  }

  public upload(apiPath: string, formData: FormData): Observable<HttpEvent<void>> {
    return this.http.request(
      new HttpRequest('POST', getUrlFromDomainAndPath(this.apiUrl, apiPath), formData, {
        reportProgress: true,
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error);
    }

    this.toastService.showError('common.alert.error', 'common.message.errorMessage');
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}


export function getUrlFromDomainAndPath(domain: string, path: string) {
  if (domain.endsWith('/')) {
    domain = domain.slice(0, -1);
  }

  if (path.startsWith('/')) {
    path = path.substring(1);
  }

  return domain + '/' + path;
}

export class CustomHttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }
  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }
  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }
  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
