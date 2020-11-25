import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggedInUser } from '../models/logged-in-user.model';
import { User } from '../models/user.model';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly webApi = this.webStructureService.globalApi;
  public userFormData: User;
  public userArray: User[];
  public isLoggedIn: boolean;
  public loggedInUserArray: LoggedInUser[];

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

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

  postLogoutData(user: LoggedInUser) {
    return this.http.post(this.webApi + '/Logout', user);
  }

  postCurrentUserData(user: LoggedInUser) {
    return this.http.post(this.webApi + '/loggedInUser', user);
  }

  getCurrentUserData() {
    this.http
      .get(this.webApi + '/loggedInUser')
      .toPromise()
      .then((res) => (this.loggedInUserArray = res as LoggedInUser[]));
  }

  getLoggedInUser() {
    return this.http.get<User[]>(this.webApi + '/loggedInUser');
  }
}
