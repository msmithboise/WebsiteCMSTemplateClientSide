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

    await this.getPageData(currentPageId);

    this.redirectToTrueHome(currentPageId, currentPageDescription);

    if (this.pageExists) {
      return true;
    } else {
      this.router.navigate(['pagenotfound']);
      return false;
    }
  }

  async getPageData(currentPageId: number) {
    var pageNumArray = [];
    var url = this.grabUrl();

    var data = await this.http
      .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
      .toPromise();

    data.forEach((element) => {
      pageNumArray.push(element.PageId);
    });

    this.pageExists = pageNumArray.includes(currentPageId);
  }

  redirectToTrueHome(currentPageId: number, currentPageDescription: string) {
    if (currentPageId == 0 || currentPageDescription == '') {
      this.router.navigate(['/Home/' + this.customPageService.trueHomeId]);
    }
  }
  grabUrl() {
    var fullUrl = window.location.href;

    var urlArray = fullUrl.split('/');

    var myUrl = urlArray[2];

    var testUrl = 'localhost4200';

    if (myUrl == 'localhost:4200') {
      return testUrl;
    } else {
      return myUrl;
    }
  }
}
