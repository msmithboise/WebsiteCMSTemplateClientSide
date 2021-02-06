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

    if (this.pageExists) {
      return true;
    } else {
      this.router.navigate(['pagenotfound']);
      return false;
    }
  }

  async getPageData(currentPageId: number, currentPageDescription: string) {
    var pageNumArray = [];
    var url = this.grabUrl();
    console.log('finalUrl after being grabbed:  ', url);
    console.log('numpage array', pageNumArray);
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
      console.log('data after page retreival..', data);

      data.forEach((element) => {
        pageNumArray.push(element.PageId);
        console.log('element.pageid foreach', element.PageId);
      });

      const homePageIndex = data.findIndex((x) => x.PageDescription == 'Home');
      console.log('homepageindex', homePageIndex);

      const homeArray = data[homePageIndex];
      console.log('homePageArray', homeArray);
      var trueHomeId = homeArray.PageId;
      console.log('truehomeid', trueHomeId);

      this.redirectToTrueHome(
        currentPageId,
        currentPageDescription,
        trueHomeId
      );

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
        console.log('add zero to pagenum array');
      }

      this.pageExists = pageNumArray.includes(currentPageId);
      console.log('page exists, look for the current page id', currentPageId);
    } else {
      pageNumArray.forEach((element) => {
        this.customPageService.pageNumArray.push(element.PageId);
        console.log(
          'page doesnt exist, adding it to pagenum array',
          pageNumArray
        );
      });

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
      }

      this.pageExists = this.customPageService.pageNumArray.includes(
        currentPageId
      );
      console.log('this pageExists', this.pageExists);
    }
  }

  redirectToTrueHome(
    currentPageId: number,
    currentPageDescription: string,
    trueHomeId: number
  ) {
    if (currentPageId == 0 || currentPageDescription == '') {
      console.log(
        'page is zero or blank, navigate to home with trueid',
        trueHomeId
      );
      this.router.navigate(['/Home/' + trueHomeId]);
    }
  }

  grabUrl() {
    var fullUrl = window.location.href;
    console.log('window.location', fullUrl);

    var urlArray = fullUrl.split('/');
    console.log('fullUrl after split', urlArray);

    var myUrl = urlArray[2];
    console.log('url at [2]', myUrl);

    var prodUrl = myUrl.split('.');
    console.log('url after 2nd split', prodUrl);

    var prodUrlFinal = prodUrl[1];

    console.log('final prodUrl', prodUrlFinal);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      return testUrl;
    } else {
      return prodUrlFinal;
    }

    //If test myUrl = localHost
  }
}
