import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomPage } from '../models/custom-page.model';
import { Observable } from 'rxjs';
import { CustomImage } from '../models/custom-image.model';
import { CustomImageService } from './custom-image.service';
import { WebStructureService } from '../web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService,
    public customImageService: CustomImageService
  ) {}

  public customPageArray: CustomPage[];
  public customPageArrayById: CustomPage;
  readonly webApi = this.webStructureService.globalApi;
  public pageFormData: CustomPage;

  // //Get form data
  // getCustomPageData() {
  //   this.http
  //     .get(this.webApi + '/CustomPages')
  //     .toPromise()
  //     .then((res) => (this.customPageArray = res as CustomPage[]));
  //   console.log(this.customPageArray);
  // }

  //Get
  getCustomPageContent(): Observable<CustomPage[]> {
    return this.http.get<CustomPage[]>(this.webApi + '/CustomPages');
  }

  //get by page id

  getPageById(id: number): Observable<CustomPage> {
    // const url = `${this.webApi}/'CustomPages/'${id}`;

    return this.http.get<CustomPage>(this.webApi + '/CustomPages/' + id);
  }

  selectPageId(pageId: string): string {
    //console.log(pageId);
    return pageId;
  }
  //Put
  createCustomPage(customPageFormData: CustomPage) {
    return this.http.post(
      this.webApi + '/CustomPages/' + customPageFormData.PageId,
      customPageFormData
    );
  }

  //post
  postWebPageContent(formData: CustomPage) {
    return this.http.post(this.webApi + '/CustomPages', formData);
  }

  //Delete
  deleteCustomPage(id: number) {
    return this.http.delete(this.webApi + '/CustomPages/' + id);
  }
}
