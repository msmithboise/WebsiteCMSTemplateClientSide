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
    console.log(window.performance);
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
    //var url = 'hindsitedevelopment';

    //Put in an if statement if customPage.NumPageArray is null,then do a get request, otherwise just proceed with the
    //code using the numpage array

    if (
      this.customPageService.pageNumArray == null ||
      this.customPageService.pageNumArray.length <= 0
    ) {
      console.log('No present page data, need to retreive...');

      var data = await this.http
        .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
        .toPromise();
      console.log('data after retreival:  ', data);

      const homePageIndex = data.findIndex((x) => x.PageDescription == 'Home');
      console.log('homepageindex', homePageIndex);
      const homeArray = data[homePageIndex];
      console.log('homeArray', homeArray);

      data.forEach((element) => {
        pageNumArray.push(element.PageId);
        console.log('pageNumArray(pageGuard)', pageNumArray);
      });

      var trueHomeId = homeArray.PageId;
      console.log('truehomeid:', trueHomeId);

      this.redirectToTrueHome(
        currentPageId,
        currentPageDescription,
        trueHomeId
      );

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
        console.log('adding zero to page num array');
      }

      console.log('pageNumArray adding zero:  ', pageNumArray);

      this.pageExists = pageNumArray.includes(currentPageId);
    } else {
      console.log(
        'page data is already present, no need to retreive(pageGuard).'
      );
      pageNumArray.forEach((element) => {
        this.customPageService.pageNumArray.push(element.PageId);
      });

      if (!pageNumArray.includes(0)) {
        pageNumArray.push(0);
        console.log('adding zero to page num array');
      }

      console.log('pageNumArray adding zero:  ', pageNumArray);

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
    console.log('truehome id:  ', trueHomeId);
    console.log('currentPageId', currentPageId);
    console.log('currentPageDescription', currentPageDescription);
    if (currentPageId == 0 || currentPageDescription == '') {
      console.log('redirect to home id:  ', this.customPageService.trueHomeId);
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
