import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subpage } from '../models/subpage.model';
import { Webcontent } from '../WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class SubpageService {
  readonly webApi = 'http://localhost:54704/api';
  readonly webUrl = 'http://localhost:54704';
  subPageArray: Subpage[];
  subPageByPageIdArray: Subpage[];
  public subPageFormData: Subpage;
  public subPageContentByIdsArray: Webcontent[];
  public subPageContentArray: Webcontent[];

  constructor(public http: HttpClient) {}

  //Get
  getSubPages(): Observable<Subpage[]> {
    return this.http.get<Subpage[]>(this.webApi + '/SubPages');
  }

  //Get by Page Id
  getSubPagesByPageId(pageId: number): Observable<Subpage[]> {
    return this.http.get<Subpage[]>(this.webApi + '/SubPages/' + pageId);
  }

  //Post/Put

  //post
  createSubPage(formData: Subpage) {
    return this.http.post(this.webApi + '/SubPages', formData);
  }

  //Delete
  deleteSubPage(subPageId: number) {
    return this.http.delete(this.webApi + '/SubPages/' + subPageId);
  }

  //Get ALL subcontent
  getAllSubContent(): Observable<Webcontent[]> {
    return this.http.get<Webcontent[]>(this.webApi + '/WebContent');
  }

  //Get Web content by Page Id and SubPage Id
  getSubContentByIds(formData: Webcontent): Observable<Webcontent[]> {
    return this.http.get<Webcontent[]>(this.webApi + '/SubPageContent');
  }

  //Post Web content to SubPage using PageId and SubPageId

  postSubContentByIds(formData: Webcontent): Observable<Webcontent[]> {
    return this.http.get<Webcontent[]>(this.webUrl + '/SubPageContent/Create');
  }
}
