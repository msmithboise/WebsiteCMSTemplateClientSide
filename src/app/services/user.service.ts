import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly webApi = 'http://localhost:54704/api';
  public userFormData: User;
  public userArray: User[];
  public isLoggedIn: boolean;
  public loggedInUserArray: User[];

  constructor(public http: HttpClient) {}

  //Get

  //Get all content by page id
  getUserData() {
    return this.http.get<User[]>(this.webApi + '/User');
  }

  setUserDataToUserArray() {
    this.http
      .get(this.webApi + '/User')
      .toPromise()
      .then((res) => (this.userArray = res as User[]));
  }

  //Post/Update
  postRegistrationData(formData: User) {
    return this.http.post(this.webApi + '/User', formData);
  }

  postLoginData(user: User) {
    return this.http.post(this.webApi + '/Login', user);
  }

  postLogoutData(user: User) {
    return this.http.post(this.webApi + '/Logout', user);
  }

  //Delete

  //Post login
}
