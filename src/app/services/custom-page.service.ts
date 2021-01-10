import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomPage } from '../models/custom-page.model';
import { Observable } from 'rxjs';
import { CustomImage } from '../models/custom-image.model';
import { CustomImageService } from './custom-image.service';
import { WebStructureService } from '../web-structure.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService,
    public customImageService: CustomImageService,
    public cookie: CookieService
  ) {}

  public customPageArray: CustomPage[];
  public customPageArrayById: CustomPage;
  readonly webApi = this.webStructureService.globalApi;
  public pageFormData: CustomPage;

  //Get
  getCustomPageContent() {
    var newArray = [];

    var workingArray = [];

    var mockUrl = 'www.riveroflifeidaho.com';

    var url = this.cookie.get('url');

    //   console.log('getting pages by client url...');
    //   console.log(url);

    this.http
      .get<CustomPage[]>(this.webApi + '/CustomPages')
      .subscribe((res) => {
        workingArray = res;

        for (let i = 0; i < workingArray.length; i++) {
          const element = workingArray[i];

          if (element.ClientUrl == url) {
            newArray.push(element);
          }
        }
      });

    this.customPageArray = newArray;
  }

  //GetByClientUrl

  //get by page id

  getPageById(id: number): Observable<CustomPage> {
    // const url = `${this.webApi}/'CustomPages/'${id}`;

    return this.http.get<CustomPage>(this.webApi + '/CustomPages/' + id);
  }

  selectPageId(pageId: string): string {
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
