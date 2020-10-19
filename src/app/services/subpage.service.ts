import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subpage } from '../models/subpage.model';

@Injectable({
  providedIn: 'root',
})
export class SubpageService {
  readonly webApi = 'http://localhost:54704/api';
  subPageArray: Subpage[];
  public subPageFormData: Subpage;

  constructor(public http: HttpClient) {}

  //Get
  getSubPages(): Observable<Subpage[]> {
    return this.http.get<Subpage[]>(this.webApi + '/SubPages');
  }

  //Post/Put

  //post
  createSubPage(formData: Subpage) {
    return this.http.post(this.webApi + '/SubPages', formData);
  }
}
