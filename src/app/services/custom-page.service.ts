import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomPage } from '../models/custom-page.model';
import { Observable } from 'rxjs';
import { CustomImage } from '../models/custom-image.model';
import { CustomImageService } from './custom-image.service';
import { WebStructureService } from '../web-structure.service';
import { CookieService } from 'ngx-cookie-service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(
    public http: HttpClient,
    public webStructureService: WebStructureService,
    public customImageService: CustomImageService,
    public cookie: CookieService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  public customPageArray: CustomPage[];
  public customPageArrayById: CustomPage;
  readonly webApi = this.webStructureService.globalApi;
  public pageFormData: CustomPage;
  public pageNumArray = [];
  public pageExists: boolean;
  public trueHomeId: number;
  public pageId: number;
  public pageDescription: string;

  getCustomPageContent() {
    var url = this.grabUrl();

    this.http
      .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
      .subscribe((res) => {
        console.log('res', res);

        this.customPageArray = res;

        this.setTrueHomePage();
      });
  }

  setTrueHomePage() {
    const homePageIndex = this.customPageArray.findIndex(
      (x) => x.PageDescription == 'Home'
    );

    console.log('home index', homePageIndex);

    const homeArray = this.customPageArray[homePageIndex];

    console.log('Should be the Home array', homeArray);

    this.trueHomeId = homeArray.PageId;

    console.log('should be the homeId:  ', this.trueHomeId);
  }

  grabUrl() {
    var fullUrl = window.location.href;

    var urlArray = fullUrl.split('/');

    // console.log(urlArray);

    var myUrl = urlArray[2];

    // console.log(myUrl);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      // console.log('is test mode', testUrl);
      return testUrl;
    } else {
      return myUrl;
    }

    //If test myUrl = localHost
  }

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
