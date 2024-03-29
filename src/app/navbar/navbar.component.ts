import { Component, OnInit } from '@angular/core';
import { CustomPageService } from '../services/custom-page.service';
import { CustomPage } from '../models/custom-page.model';
import { Router, ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SubpageService } from '../services/subpage.service';
import { Subpage } from '../models/subpage.model';
import { WebcontentService } from '../WebContent/webcontent.service';
import { Webcontent } from '../WebContent/webcontent.model';
import { CustomImageService } from '../services/custom-image.service';
import { compileNgModule } from '@angular/compiler';
import { UserService } from '../services/user.service';
import { LoggedInUser } from '../models/logged-in-user.model';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { NavBarService } from '../services/nav-bar.service';
import { Navbar } from '../models/navbar.model';
import { WebStructureService } from '../web-structure.service';
import { CookieService } from 'ngx-cookie-service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public logoUrl =
    'https://images.unsplash.com/photo-1584553421349-3557471bed79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80';
  public photo = this.sanitizer.bypassSecurityTrustStyle('url(+ logoUrl +)');
  public testColor = '#C8B59E';
  public testBgRepeat = 'no-repeat';
  public logoIsRight: boolean;
  public logoIsLeft: boolean;
  public SubPageLocalStorage: Subpage[];
  public pageIdSnapshot: string;
  public pageDescriptionSnapshot: string;
  public lastHoveredNum: number;
  public untouchedStorage: Subpage[];
  public pageId: number;
  public pageDescription: string;
  public subPageId: number;
  public subPageDescription: string;
  public resizeButtonToggled: boolean = false;
  public isLoggedIn: boolean = false;
  public currentUserArray: User[];
  public hasCookieToken: boolean = false;
  public publishedNavLinks: CustomPage[] = [];
  public storedHoveredPageId: number;
  public navHovered: boolean;
  public storedSubParentId: number;
  public storedId: number;
  public subPageOneHeader: string;
  public subPageOneHeaderId: number;
  public subPageTwoHeader: string;
  public subPageTwoHeaderId: number;
  public subPageThreeHeader: string;
  public subPageThreeHeaderId: number;
  public subPageFourHeader: string;
  public subPageFourHeaderId: number;

  constructor(
    public customPageService: CustomPageService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    public userService: UserService,
    public authService: AuthenticationService,
    public toastr: ToastrService,
    public navBarService: NavBarService,
    public webStructureService: WebStructureService,
    public cookie: CookieService
  ) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    this.getLoginData();
    this.grabAllContentByPageId();
    // this.getNavBarData();
    this.grabNavbarByClient();
    this.setSubPagesToLocalStorage();
    //grab custom page data on navbar load
    this.grabPageData();
    //this.callCustomPageService();
    this.changePhoto();
    this.getSubPageLinks();
    this.checkForCookie();
  }

  isMobile() {
    if (window.innerWidth < 800) {
      return true;
    }
  }

  async grabPageData() {
    var url = this.customPageService.grabUrl();

    var data = this.navBarService.getNavBarLinksFromPages(url);

    data.subscribe((res) => {
      this.navBarService.navLinksByClientUrl = res;

      console.log('navbar: grabPageData');
      console.time('time');

      console.timeLog('time');

      this.webStructureService.getRequests++;

      for (let i = 0; i < this.navBarService.navLinksByClientUrl.length; i++) {
        const element = this.navBarService.navLinksByClientUrl[i];

        //this.navBarService.navLinksByClientUrl.splice(i, 1);
        if (element.isPublished == true && element.ParentId == null) {
          this.publishedNavLinks.push(element);
        }
      }
      console.timeEnd('time');
    });
  }

  grabNavbarByClient() {
    var url = this.webStructureService.findClientUrl();

    this.navBarService.getNavBarDataByClientUrl(url).subscribe((res) => {
      this.navBarService.navBarByClientUrlArray = res;
      console.log('navbar: grabNavbarByClient');
      this.webStructureService.getRequests++;
    });
  }

  navToNewsPage() {
    this.router.navigate(['news']);
  }

  checkForCookie() {
    //ngInit
    //if user does not have cookie, log them out, hasCookieToken is false

    if (this.cookie.get('token') == '' || this.cookie.get('token') == null) {
      this.hasCookieToken = false;
      localStorage.removeItem('userToken');

      this.userService.userArray[0].isLoggedIn = false;
    } else {
      if (localStorage.getItem('userToken') == this.cookie.get('token')) {
        this.hasCookieToken = true;
      }
    }
  }

  getNavBarData() {
    this.navBarService.getNavBarData().subscribe((res) => {
      console.log('navbar: getNavBarData');
      this.webStructureService.getRequests++;
      this.navBarService.navBarArray = res;
    });
  }

  grabAllContentByPageId() {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageId = Number(paramMap.get('pageId'));
      this.pageDescription = paramMap.get('pageDescription');
    });

    this.customImageService
      .getWebContentByPageId(this.pageId)
      .subscribe((res: Webcontent[]) => {
        console.log('navbar: grabAllContentByPageId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentArray = res;
      });
  }

  getLoginData() {
    this.userService.getLoggedInUser().subscribe((res: User[]) => {
      console.log('navbar: getLoginData');
      this.webStructureService.getRequests++;
      this.currentUserArray = res;
    });
  }

  logoutForm = new FormGroup({
    Username: new FormControl(''),
    Hash: new FormControl(''),
  });

  Logout(data: LoggedInUser) {
    var user = data;
    this.authService.removeToken();
    localStorage.removeItem('userToken');
    this.cookie.delete('token');

    this.userService.userArray[0].isLoggedIn = false;
    this.userService.postLogoutData(data).subscribe((res: User[]) => {
      console.log('navbar: Logout');
      this.webStructureService.getRequests++;
      this.userService.userArray = res;
    });
    this.router.navigate(['portal']);
    this.toastr.success('Logged out succesfully!');
  }

  resizeToggled() {
    this.resizeButtonToggled = !this.resizeButtonToggled;
  }

  openPageSettings() {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageId = Number(paramMap.get('pageId'));
      this.pageDescription = paramMap.get('pageDescription');
      this.subPageId = Number(paramMap.get('subPageId'));
      this.subPageDescription = paramMap.get('subPageDescription');
    });

    if (this.subPageDescription != null) {
      this.router.navigate([
        '/dashboard/' +
          this.pageDescription +
          '/' +
          this.pageId +
          '/' +
          this.subPageDescription +
          '/' +
          this.subPageId,
      ]);
    } else {
      this.router.navigate([
        '/dashboard/' + this.pageDescription + '/' + this.pageId,
      ]);
    }
  }

  clearSubPages(pageId: number, pageDescription: string, parentId: number) {
    //this needs to be if subpageparent id doesnt match the origin page id...

    // this.navBarService.subPageNavLinks = [];

    this.storedHoveredPageId = null;
    this.storedSubParentId = null;
  }

  //Mobile Nav bar

  closeNav() {
    document.getElementById('mainPageSideNav').style.width = '0';
  }

  openNav() {
    document.getElementById('mainPageSideNav').style.width = '250px';
  }

  openSubPageOneNav() {
    document.getElementById('subPageOneSideNav').style.width = '250px';
  }

  closeSubPageOneNav() {
    document.getElementById('subPageOneSideNav').style.width = '0';
  }

  openSubPageTwoNav() {
    document.getElementById('subPageTwoSideNav').style.width = '250px';
  }

  closeSubPageTwoNav() {
    document.getElementById('subPageTwoSideNav').style.width = '0';
  }

  openSubPageThreeNav() {
    document.getElementById('subPageThreeSideNav').style.width = '250px';
  }

  closeSubPageThreeNav() {
    document.getElementById('subPageThreeSideNav').style.width = '0';
  }

  openSubPageFourNav() {
    document.getElementById('subPageFourSideNav').style.width = '250px';
  }

  closeSubPageFourNav() {
    document.getElementById('subPageFourSideNav').style.width = '0';
  }

  onSideNavClick(pageId: string, pageDescription: string) {
    this.router.navigate([pageDescription + '/' + pageId]);

    this.navBarService.subPageNavLinks = [];
  }

  getSubPageOneOnClick(
    passedInPageId: number,
    pageDescription: string,
    parentPage: CustomPage
  ) {
    console.log('navbar: getSubPageOneOnClick');
    this.webStructureService.getRequests++;
    // this.SubPageLocalStorage = this.untouchedStorage;
    //clear the old data when I hover again to the next link...

    this.navBarService.subPageOneArray = [];

    this.navBarService.getSubPageLinks(passedInPageId).subscribe((res) => {
      this.navBarService.subPageOneArray = res;

      //If there are no pages in the array, simply redirect to that page, otherwise open up the side nav menu for that page.
      if (this.navBarService.subPageOneArray.length <= 0) {
        this.onSideNavClick(passedInPageId.toString(), pageDescription);
      } else {
        ('array NOT empty');

        //this.navBarService.subPageOneArray.unshift(parentPage);
        this.subPageOneHeader = parentPage.PageDescription;
        this.subPageOneHeaderId = parentPage.PageId;

        this.openSubPageOneNav();
      }
    });
  }

  navToSubPageHeader(header: string, headerId: number) {
    this.onSideNavClick(headerId.toString(), header);
  }

  getSubPageTwoOnClick(
    passedInPageId: number,
    pageDescription: string,
    parentPage: CustomPage
  ) {
    console.log('navbar: getSubPageTwoOnClick');
    this.webStructureService.getRequests++;
    this.navBarService.subPageTwoArray = [];

    this.navBarService.getSubPageLinks(passedInPageId).subscribe((res) => {
      this.navBarService.subPageTwoArray = res;

      //If there are no pages in the array, simply redirect to that page, otherwise open up the side nav menu for that page.
      if (this.navBarService.subPageTwoArray.length <= 0) {
        this.onSideNavClick(passedInPageId.toString(), pageDescription);
      } else {
        ('array NOT empty');

        //this.navBarService.subPageTwoArray.unshift(parentPage);
        this.subPageTwoHeader = parentPage.PageDescription;
        this.subPageTwoHeaderId = parentPage.PageId;
        this.openSubPageTwoNav();
      }
    });
  }

  getSubPageThreeOnClick(
    passedInPageId: number,
    pageDescription: string,
    parentPage: CustomPage
  ) {
    console.log('navbar: getSubPageThreeOnClick');
    this.webStructureService.getRequests++;
    this.navBarService.subPageThreeArray = [];

    this.navBarService.getSubPageLinks(passedInPageId).subscribe((res) => {
      this.navBarService.subPageThreeArray = res;

      //If there are no pages in the array, simply redirect to that page, otherwise open up the side nav menu for that page.
      if (this.navBarService.subPageThreeArray.length <= 0) {
        this.onSideNavClick(passedInPageId.toString(), pageDescription);
      } else {
        ('array NOT empty');

        // this.navBarService.subPageThreeArray.unshift(parentPage);
        this.subPageThreeHeader = parentPage.PageDescription;
        this.subPageThreeHeaderId = parentPage.PageId;

        this.openSubPageThreeNav();
      }
    });
  }

  getSubPageFourOnClick(
    passedInPageId: number,
    pageDescription: string,
    parentPage: CustomPage
  ) {
    console.log('navbar: getSubPageFourOnClick');
    this.webStructureService.getRequests++;
    this.navBarService.subPageFourArray = [];

    this.navBarService.getSubPageLinks(passedInPageId).subscribe((res) => {
      this.navBarService.subPageFourArray = res;

      if (this.navBarService.subPageFourArray.length <= 0) {
        this.onSideNavClick(passedInPageId.toString(), pageDescription);
      } else {
        ('array NOT empty');

        // this.navBarService.subPageFourArray.unshift(parentPage);
        this.subPageFourHeader = parentPage.PageDescription;
        this.subPageFourHeaderId = parentPage.PageId;

        this.openSubPageFourNav();
      }
    });
  }

  //Desktop nav bar
  getSubPageOneOnHover(passedInPageId: number, pageDescription: string) {
    console.log('navbar: getSubPageOneOnHover');
    this.webStructureService.getRequests++;
    // this.SubPageLocalStorage = this.untouchedStorage;
    //clear the old data when I hover again to the next link...
    this.navBarService.subPageOneArray = [];

    this.navBarService.getSubPageLinks(passedInPageId).subscribe((res) => {
      this.navBarService.subPageOneArray = res;
    });

    this.pageIdSnapshot = passedInPageId.toString();
    this.pageDescriptionSnapshot = pageDescription;
  }

  getSubPageTwoOnHover(
    subPageId: number,
    subPageDescription: string,
    parentId: number
  ) {
    console.log('navbar: getSubPageTwoOnHover');
    this.webStructureService.getRequests++;
    this.navBarService.subPageTwoArray = [];

    this.navBarService.getSubPageLinks(subPageId).subscribe((res) => {
      this.navBarService.subPageTwoArray = res;
    });
  }

  getSubPageThreeOnHover(
    subPageId: number,
    subPageDescription: string,
    parentId: number
  ) {
    console.log('navbar: getSubPageThreeOnHover');
    this.webStructureService.getRequests++;
    this.navBarService.subPageThreeArray = [];

    this.navBarService.getSubPageLinks(subPageId).subscribe((res) => {
      this.navBarService.subPageThreeArray = res;
    });
  }

  getSubPageFourOnHover(
    subPageId: number,
    subPageDescription: string,
    parentId: number
  ) {
    console.log('navbar: getSubPageFourOnHover');
    this.webStructureService.getRequests++;
    this.navBarService.subPageFourArray = [];

    this.navBarService.getSubPageLinks(subPageId).subscribe((res) => {
      this.navBarService.subPageFourArray = res;
    });
  }
  getPageByIdOnClick(passedInPageId: number, pageDescription: string) {
    // this.SubPageLocalStorage = this.untouchedStorage;

    this.lastHoveredNum = passedInPageId; //1
    this.pageIdSnapshot = passedInPageId.toString();
    this.pageDescriptionSnapshot = pageDescription;

    //We want to compare the Id passed in on hover and
    // this.SubPageLocalStorage = this.SubPageLocalStorage.filter(
    //this should compare the pageId of each sub page to the last number that was hovered over
    // (x) => x.PageId.toString() === this.lastHoveredNum.toString()
    //);
  }

  setSubPagesToLocalStorage() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      console.log('navbar: setSubPagesToLocalStorage');
      this.webStructureService.getRequests++;
      this.SubPageLocalStorage = res;
      this.untouchedStorage = res;
    });
  }

  showSubPagesById(pageId: number, pageDescription: string) {
    this.pageIdSnapshot = pageId.toString();
    this.pageDescriptionSnapshot = pageDescription;

    this.subPageService
      .getSubPagesByPageId(pageId)
      .subscribe((res: Subpage[]) => {
        this.subPageService.subPageArray = res;
      });
  }

  getSubPageLinks() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      console.log('navbar: getSubPageLinks');
      this.webStructureService.getRequests++;
      this.subPageService.subPageArray = res;
    });
  }

  setLogoRight() {
    this.logoIsRight = true;
    this.logoIsLeft = false;
  }
  setLogoLeft() {
    this.logoIsRight = false;
    this.logoIsLeft = true;
  }

  navFontStyling = {
    color: this.testColor,
  };

  navBarStyling = {
    backgroundColor: '#e3f2fd',
  };

  logoStyling = {
    backgroundImage: this.photo,
    width: '200px',
    height: '65px',
    backgroundSize: '50%',
    backgroundRepeat: this.testBgRepeat,
    backgroundPosition: 'center',
  };

  changePhoto() {
    this.photo =
      'https://images.unsplash.com/photo-1584553421349-3557471bed79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1329&q=80';
  }
  //Set Custom Page data to customPage service array
  callCustomPageService() {
    this.customPageService.getCustomPageContent();
  }

  onClick(pageId: string, pageDescription: string) {
    this.router.navigate([pageDescription + '/' + pageId]);

    this.navBarService.subPageNavLinks = [];
  }

  getSubPageAllContent() {
    this.subPageService.getAllSubContent().subscribe((res: Webcontent[]) => {
      console.log('navbar: getSubPageAllContent');
      this.webStructureService.getRequests++;
      this.subPageService.subPageContentArray = res;
    });
  }

  navToSubPage(subPageId: number, subPageDescription: string) {
    this.router.navigate([
      'customPage/' +
        this.pageDescriptionSnapshot +
        '/' +
        this.pageIdSnapshot +
        '/subPage/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
  }

  openMobileNav() {
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }
}
