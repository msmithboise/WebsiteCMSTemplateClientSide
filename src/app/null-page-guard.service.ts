import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CustomPage } from './models/custom-page.model';
import { AuthenticationService } from './services/authentication.service';
import { CustomPageService } from './services/custom-page.service';
import { WebStructureService } from './web-structure.service';

@Injectable({
  providedIn: 'root',
})
export class NullPageGuardService implements CanActivate {
  readonly webApi = this.webStructureService.globalApi;
  public pageExists: boolean;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public customPageService: CustomPageService,
    public route: ActivatedRoute,
    public http: HttpClient,
    public webStructureService: WebStructureService,
    public cookie: CookieService
  ) {}

  // For each element in custom page array
  // if page entered does not match the page number within the array
  // redirect to a 404 page

  checkPageExists(currentPageId: number) {
    console.log('checking if page exists...');

    var newArray = [];

    var workingArray = [];

    var url = this.cookie.get('url');

    this.http
      .get<CustomPage[]>(this.webApi + '/GetPagesByUrl' + url)
      .subscribe((res) => {
        workingArray = res;

        for (let i = 0; i < workingArray.length; i++) {
          const element = workingArray[i];

          if (element.ClientUrl == url) {
            newArray.push(element);
          }
        }
      });

    // this.customPageService.customPageArray = newArray;

    // console.log('custom page array:  ', this.customPageService.customPageArray);

    // for (let i = 0; i < this.customPageService.customPageArray.length; i++) {
    //   const element = this.customPageService.customPageArray[i];

    //   console.log('element', element.PageId);
    // }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(route.params.pageId);

    var currentPageId = Number(route.params.pageId);

    var pageNumArray = [];

    var url = this.grabUrl();

    this.http
      .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
      .subscribe((res) => {
        console.log('res', res);

        console.log('page trying to be navigated to:  ', currentPageId);
        res.forEach((element) => {
          pageNumArray.push(element.PageId);
          console.log(pageNumArray);
        });

        this.pageExists = pageNumArray.includes(currentPageId);
        console.log((this.pageExists = pageNumArray.includes(currentPageId)));
      });

    return !this.pageExists;
  }

  grabUrl() {
    var fullUrl = window.location.href;

    var urlArray = fullUrl.split('/');

    console.log(urlArray);

    var myUrl = urlArray[2];

    console.log(myUrl);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      console.log('is test mode', testUrl);
      return testUrl;
    } else {
      return myUrl;
    }

    //If test myUrl = localHost
  }
}
