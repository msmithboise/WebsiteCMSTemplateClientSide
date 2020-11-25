import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { map, filter, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError, pipe } from 'rxjs';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  readonly webApi = this.webstructureService.globalApi;

  constructor(
    public httpClient: HttpClient,
    public webstructureService: WebStructureService
  ) {}

  ValidateUser(user: User) {
    var userData =
      'username=' +
      user.Username +
      '&password=' +
      user.Hash +
      '&grant_type=password';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
    });

    return this.httpClient
      .post(this.webApi + '/token', userData, { headers: reqHeader })
      .pipe(
        map((res) => res)
        // catchError((error: HttpErrorResponse) => {
        //   let errorMessage = '';

        //   if (error.error instanceof ErrorEvent) {
        //     // client-side error

        //     errorMessage = `Error: ${error.error.message}`;
        //   } else {
        //     // server-side error

        //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        //   }

        //   window.alert(errorMessage);

        //   return throwError(errorMessage);
        // })
      );
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    return localStorage.removeItem('token');
  }
}
