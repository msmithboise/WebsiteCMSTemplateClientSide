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
    this.callCustomPageService();
    this.changePhoto();
    this.getSubPageLinks();
    this.checkForCookie();
  }

  isMobile() {
    if (window.innerWidth < 800) {
      return true;
    }
  }

  grabNavbarByClient() {
    var url = this.webStructureService.findClientUrl();

    console.log('clienturl in navbar  ', url);

    this.navBarService.getNavBarDataByClientUrl(url).subscribe((res) => {
      this.navBarService.navBarByClientUrlArray = res;
      console.log(
        'res in navbar service',
        this.navBarService.navBarByClientUrlArray
      );
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
        this.webContentService.webContentArray = res;
      });
  }

  getLoginData() {
    this.userService.getLoggedInUser().subscribe((res: User[]) => {
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

  getPageByIdOnHover(passedInPageId: number, pageDescription: string) {
    this.SubPageLocalStorage = this.untouchedStorage;

    this.lastHoveredNum = passedInPageId; //1
    this.pageIdSnapshot = passedInPageId.toString();
    this.pageDescriptionSnapshot = pageDescription;

    //We want to compare the Id passed in on hover and

    if (this.SubPageLocalStorage != null) {
      this.SubPageLocalStorage = this.SubPageLocalStorage.filter(
        //this should compare the pageId of each sub page to the last number that was hovered over
        (x) => x.PageId.toString() === this.lastHoveredNum.toString()
      );
    }
  }

  getPageByIdOnClick(passedInPageId: number, pageDescription: string) {
    this.SubPageLocalStorage = this.untouchedStorage;

    this.lastHoveredNum = passedInPageId; //1
    this.pageIdSnapshot = passedInPageId.toString();
    this.pageDescriptionSnapshot = pageDescription;

    //We want to compare the Id passed in on hover and
    this.SubPageLocalStorage = this.SubPageLocalStorage.filter(
      //this should compare the pageId of each sub page to the last number that was hovered over
      (x) => x.PageId.toString() === this.lastHoveredNum.toString()
    );
  }

  setSubPagesToLocalStorage() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
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
  }

  getSubPageAllContent() {
    this.subPageService.getAllSubContent().subscribe((res: Webcontent[]) => {
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
