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
import { retry } from 'rxjs/operators';
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
  public pageDataResult = [];
  public currentPageId: number;
  public userIsLoggingIn: boolean;
  public trueHome: number;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public customPageService: CustomPageService,
    public route: ActivatedRoute,
    public http: HttpClient,
    public webStructureService: WebStructureService,
    public cookie: CookieService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    var currentPageId = Number(route.params.pageId);
    var currentPageDescription = route.params.pageDescription;
    this.currentPageId = currentPageId;

    await this.getPageData(currentPageId, currentPageDescription);

    if (this.pageExists || this.userIsLoggingIn == true) {
      this.userIsLoggingIn = false;
      return true;
    } else {
      this.router.navigate(['pagenotfound']);
      return false;
    }
  }

  async getPageData(currentPageId: number, currentPageDescription: string) {
    var pageNumArray = [];
    var url = this.grabUrl();

    //var url = 'hindsitedevelopment';

    //Put in an if statement if customPage.NumPageArray is null,then do a get request, otherwise just proceed with the
    //code using the numpage array

    if (
      this.customPageService.pageNumArray == null ||
      this.customPageService.pageNumArray.length <= 0
    ) {
      var data = await this.http
        .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
        .toPromise();

      data.forEach((element) => {
        pageNumArray.push(element.PageId);
      });

      const homePageIndex = data.findIndex((x) => x.PageDescription == 'Home');

      const homeArray = data[homePageIndex];

      var trueHomeId = homeArray.PageId;
      this.customPageService.trueHomeId = trueHomeId;

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
      }

      this.pageExists = pageNumArray.includes(currentPageId);
    } else {
      pageNumArray.forEach((element) => {
        this.customPageService.pageNumArray.push(element.PageId);
      });

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
      }

      this.pageExists = this.customPageService.pageNumArray.includes(
        currentPageId
      );
    }
  }

  redirectToTrueHome(
    currentPageId: number,
    currentPageDescription: string,
    trueHomeId: number
  ) {
    if (currentPageId == 0 || currentPageDescription == '') {
      this.router.navigate(['/Home/' + trueHomeId]);
    }
  }

  grabUrl() {
    var fullUrl = window.location.href;

    var urlArray = fullUrl.split('/');

    var myUrl = urlArray[2];

    var prodUrl = myUrl.split('.');

    if (prodUrl[0] == 'com') {
      var prodUrlFinal = prodUrl[1];
    }

    if (prodUrl[1] == 'com') {
      prodUrlFinal = prodUrl[0];
    }

    if (prodUrl[2] == 'com') {
      prodUrlFinal = prodUrl[1];
    }

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      this.webStructureService.FinalProdUrl = testUrl;
      return testUrl;
    } else {
      this.webStructureService.FinalProdUrl = prodUrlFinal;
      return prodUrlFinal;
    }

    //If test myUrl = localHost
  }

  goHomeAfterLogin() {
    this.router.navigate(['Home/' + this.trueHome]);
    this.userIsLoggingIn = false;
  }
}
