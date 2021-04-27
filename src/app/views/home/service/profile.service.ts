import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http
      .get<any>(environment.apis.mockAPI)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

}
