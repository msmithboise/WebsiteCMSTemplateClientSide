import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly webApi = 'http://localhost:54704/api';
  public userData: User[];

  constructor(public http: HttpClient) {}

  //Get

  //Get all content by page id
  getUserData() {
    return this.http.get<User[]>(this.webApi + '/User');
  }

  //Post/Update

  //Delete
}
