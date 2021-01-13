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
    //console.log(route.params.pageId);

    // Call page get request  (Wait to get pages)

    await this.getPageData(currentPageId);

    console.log(
      'hey you just got your page data!  does page exist?',
      this.pageExists
    );

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

    // this.http
    //   .get<CustomPage[]>(this.webApi + '/PagesByClientUrl/' + url)
    //   .subscribe((res) => {
    //     console.log('res', res);
    //     res.forEach((element) => {
    //       pageNumArray.push(element.PageId);
    //     });
    //     console.log(
    //       'page number array in guard service class:  ',
    //       pageNumArray
    //     );
    //     console.log('does this work?', pageNumArray.includes(currentPageId));
    //     this.pageExists = pageNumArray.includes(currentPageId);
    //     console.log('this page exists?', this.pageExists);

    //   });
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
