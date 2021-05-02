import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {KeycloakService} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
  }

  getUserInfo(): Observable<any> {
    return this.http
      .get(environment.apis.getUserInfo + this.keycloakService.getUsername())
      .pipe(catchError((httpError: any) => {
        return throwError(httpError);
      }));
  }
}
