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

  constructor(
    public customPageService: CustomPageService,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    public customImageService: CustomImageService
  ) {}

  customPageArray: CustomPage[];

  ngOnInit(): void {
    this.setSubPagesToLocalStorage();
    //grab custom page data on navbar load
    this.callCustomPageService();
    this.changePhoto();
    this.getSubPageLinks();
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
    // console.log('calling on click?');
    // console.log('customPage/' + pageDescription + '/' + pageId);
    this.router.navigate(['customPage/' + pageDescription + '/' + pageId]);
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
