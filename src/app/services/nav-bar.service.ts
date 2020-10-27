import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Navbar } from '../models/navbar.model';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  readonly webApi = 'http://localhost:54704/api';
  public navBarArray: Navbar[];

  constructor(public http: HttpClient) {}

  //Get Navbar data
  getNavBarData(): Observable<Navbar[]> {
    return this.http.get<Navbar[]>(this.webApi + '/NavBar');
  }
  //post
  postNavBarData(formData: Navbar) {
    return this.http.post(this.webApi + '/NavBar', formData);
  }
}
