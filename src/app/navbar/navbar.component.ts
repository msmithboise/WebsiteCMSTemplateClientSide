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
  public resizeButtonToggled: boolean = false;
  public isLoggedIn: boolean = false;
  public currentUserArray: User[];

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
    public navBarService: NavBarService
  ) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    this.getLoginData();
    this.grabAllContentByPageId();
    this.getNavBarData();
    this.setSubPagesToLocalStorage();
    //grab custom page data on navbar load
    this.callCustomPageService();
    this.changePhoto();
    this.getSubPageLinks();
  }

  // createNavBarData()
  // {
  //   this.navBarService.postNavBarData().subscribe((res: Navbar[]) => {
  //     this.navBarService.navBarArray = res;
  //     console.log('navBarData');
  //     console.log(this.navBarService.navBarArray);
  //   });
  // }

  getNavBarData() {
    this.navBarService.getNavBarData().subscribe((res) => {
      this.navBarService.navBarArray = res;
      console.log('navBarData');
      console.log(this.navBarService.navBarArray);
    });
  }

  grabAllContentByPageId() {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageId = Number(paramMap.get('pageId'));
      this.pageDescription = paramMap.get('pageDescription');

      console.log(this.pageId);

      console.log(this.pageDescription);
    });

    // this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    // console.log('pageid snap');
    // console.log(this.pageId);

    this.customImageService
      .getWebContentByPageId(this.pageId)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
        console.log('here is the content array:');
        console.log(this.webContentService.webContentArray);

        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  getLoginData() {
    this.userService.getLoggedInUser().subscribe((res: User[]) => {
      console.log('userdata');
      console.log(res);
      this.currentUserArray = res;
    });
  }

  logoutForm = new FormGroup({
    Username: new FormControl(''),
    Hash: new FormControl(''),
  });

  Logout(data: LoggedInUser) {
    var user = data;
    this.authService.removeToken;
    this.userService.userArray[0].isLoggedIn = false;
    this.userService.postLogoutData(data).subscribe((res: User[]) => {
      console.log('logout data:');
      console.log(res);
      this.userService.userArray = res;
    });
    this.router.navigate(['portal']);
    this.toastr.success('Logged out succesfully!');
  }

  resizeToggled() {
    this.resizeButtonToggled = !this.resizeButtonToggled;
    console.log('button toggled');
  }

  openPageSettings() {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageId = Number(paramMap.get('pageId'));
      this.pageDescription = paramMap.get('pageDescription');

      console.log(this.pageId);

      console.log(this.pageDescription);
    });

    console.log('opened page settings.');

    this.router.navigate([
      '/dashboard/' + this.pageDescription + '/' + this.pageId,
    ]);
    console.log('/settings/' + this.pageDescription + '/' + this.pageId);
  }

  getPageByIdOnHover(passedInPageId: number, pageDescription: string) {
    this.SubPageLocalStorage = this.untouchedStorage;
    // this.pageIdSnapshot = pageId.toString();
    this.lastHoveredNum = passedInPageId; //1
    this.pageIdSnapshot = passedInPageId.toString();
    this.pageDescriptionSnapshot = pageDescription;
    //  console.log('passed pageId on hover');
    //console.log(passedInPageId); //1
    //onsole.log('last number hovered over');
    //console.log(this.lastHoveredNum);

    //We want to compare the Id passed in on hover and
    this.SubPageLocalStorage = this.SubPageLocalStorage.filter(
      //this should compare the pageId of each sub page to the last number that was hovered over
      (x) => x.PageId.toString() === this.lastHoveredNum.toString()
    );
    //console.log('storage after filter');
    //console.log(this.SubPageLocalStorage);
  }

  setSubPagesToLocalStorage() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.SubPageLocalStorage = res;
      this.untouchedStorage = res;
      // console.log('localstorage subpages');
      //console.log(this.SubPageLocalStorage);
    });
  }

  showSubPagesById(pageId: number, pageDescription: string) {
    this.pageIdSnapshot = pageId.toString();
    this.pageDescriptionSnapshot = pageDescription;
    //  console.log('snapshots:');
    // console.log(this.pageIdSnapshot);
    //console.log(this.pageDescriptionSnapshot);

    this.subPageService
      .getSubPagesByPageId(pageId)
      .subscribe((res: Subpage[]) => {
        this.subPageService.subPageArray = res;
      });
  }

  getSubPageLinks() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      //   console.log(this.subPageService.subPageArray);
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
    height: '50px',
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
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  onClick(pageId: string, pageDescription: string) {
    console.log('navigating to main pages');
    console.log('customPage/' + pageDescription + '/' + pageId);
    // console.log('calling on click?');
    // console.log('customPage/' + pageDescription + '/' + pageId);
    this.router.navigate([pageDescription + '/' + pageId]);
    // .then(() => {
    //   window.location.reload();
    // });

    //this.grabAllContentByPageId();

    // this.customPageService.selectPageId(pageId);
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
    // .then(() => {
    //   window.location.reload();
    // });

    // navToSubPage(subPageId: number, subPageDescription: string) {
    //   this.router.navigate(
    //     [
    //       'customPage/' +
    //         this.pageDescriptionSnapshot +
    //         '/' +
    //         this.pageIdSnapshot +
    //         '/subPage/' +
    //         subPageDescription +
    //         '/' +
    //         subPageId,
    //     ],
    //     {
    //       queryParams: { refresh: new Date().getTime() },
    //     }
    //   );

    //   //this.getSubPageAllContent();
    //   //window.location.reload();
    // }

    //this.getSubPageAllContent();
    //window.location.reload();
  }
}
