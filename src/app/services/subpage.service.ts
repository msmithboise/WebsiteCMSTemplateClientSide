import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subpage } from '../models/subpage.model';
import { WebStructureService } from '../web-structure.service';
import { Webcontent } from '../WebContent/webcontent.model';

@Injectable({
  providedIn: 'root',
})
export class SubpageService {
  readonly webApi = this.webStructureService.globalApi;
  readonly webUrl = 'http://localhost:54704';
  subPageArray: Subpage[];
  subPageByPageIdArray: Subpage[];
  public subPageFormData: Subpage;
  public subPageContentByIdsArray: Webcontent[];
  public subPageContentArray: Webcontent[];
  public subPageStorage: Subpage[];

  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService
  ) {}

  //Get
  getSubPages(): Observable<Subpage[]> {
    return this.http.get<Subpage[]>(this.webApi + '/SubPages');
  }

  //Get by Page Id
  getSubPagesByPageId(pageId: number): Observable<Subpage[]> {
    return this.http.get<Subpage[]>(this.webApi + '/SubPages/' + pageId);
  }

  //Get All Subpages
  //Get All
  getAllSubPages() {
    this.http
      .get(this.webApi + '/SubPages')
      .toPromise()
      .then((res) => (this.subPageStorage = res as Subpage[]));
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
    return this.http.get<Webcontent[]>(this.webApi + '/SubContent');
  }

  //Get Web content by Page Id and SubPage Id
  getSubContentByIds(
    subPageId: number,
    pageId: number
  ): Observable<Webcontent[]> {
    // console.log('get in service');
    return this.http.get<Webcontent[]>(
      this.webApi + '/SubContent/' + pageId + '/' + subPageId
    );
  }

  //Post Web content to SubPage using PageId and SubPageId

  postSubContentByIds(formData: Webcontent): Observable<Webcontent[]> {
    console.log('in the sub service about to post..');
    return this.http.post<Webcontent[]>(this.webApi + '/SubContent', formData);
  }
}
