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
    console.log('page description:  ', route.params.pageDescription);

    // Call page get request  (Wait to get pages)

    await this.getPageData(currentPageId);

    console.log(
      'hey you just got your page data!  does page exist?',
      this.pageExists
    );

    this.redirectToTrueHome(currentPageId);

    // For each page, just grab the page id's and put into array

    // if the id's in the page array don't match the currently navigated pageId destination

    //re-direct the page to a 404

    if (this.pageExists) {
      return true;
    } else {
      console.log('404');
      this.router.navigate(['pagenotfound']);
      return false;
    }
  }

  async getPageData(currentPageId: number) {
    var pageNumArray = [];
    var url = this.grabUrl();
    console.log('page destination:  ', currentPageId);

    console.log('waiting to get page data...');
    var data = await this.http
      .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
      .toPromise();
    console.log('data:  ', data);

    data.forEach((element) => {
      pageNumArray.push(element.PageId);
    });

    console.log('pageNums:  ', pageNumArray);

    this.pageExists = pageNumArray.includes(currentPageId);

    console.log('does the page exist?', this.pageExists);
  }

  redirectToTrueHome(currentPageId: number, currentPageDescription: string) {
    console.log('current page id in redirect method', currentPageId);
    if (currentPageId == 0 || currentPageDescription == '') {
      console.log(currentPageId == 0);
      this.router.navigate(['/Home/' + this.customPageService.trueHomeId]);
    }
  }
  grabUrl() {
    var fullUrl = window.location.href;

    var urlArray = fullUrl.split('/');

    //console.log(urlArray);

    var myUrl = urlArray[2];

    //console.log(myUrl);

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      //console.log('is test mode', testUrl);
      return testUrl;
    } else {
      return myUrl;
    }

    //If test myUrl = localHost
  }
}
