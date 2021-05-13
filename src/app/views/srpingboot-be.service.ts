import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class SrpingbootBeService {


  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http
      .get(environment.apis.getProducts)
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(environment.apis.uploadFile, formData).pipe(catchError((httpError: any) => {
      return throwError(httpError);
    }));
  }
}
