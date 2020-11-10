import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { CustomPage } from 'src/app/models/custom-page.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { CustomImage } from 'src/app/models/custom-image.model';
import { Key } from 'protractor';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomText } from 'src/app/models/custom-text.model';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { Console, timeStamp } from 'console';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '..//../safe.pipe';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { LoggedInUser } from 'src/app/models/logged-in-user.model';
import { DefaultTemplateService } from 'src/app/services/default-template.service';
import { NonNullAssert } from '@angular/compiler';
import { style } from '@angular/animations';
import { Http2ServerRequest } from 'http2';
import { WebStructureService } from 'src/app/web-structure.service';
import { Column } from 'src/app/models/column.model';
import { Row } from 'src/app/models/row.model';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
  template: `
    <button class="red-button">Button</button>
    <blue-button></blue-button>
  `,
})
export class CustomPageComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    public customImageService: CustomImageService,
    public customTextService: CustomTextService,
    public webContentService: WebcontentService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public toastr: ToastrService,
    public authService: AuthenticationService,
    public userService: UserService,
    public router: Router,
    public defaultTemplateService: DefaultTemplateService,
    public webStructureService: WebStructureService
  ) {}

  public photo =
    'https://images.unsplash.com/photo-1550778323-71868c7dea39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
  customPageArray: CustomPage[];
  pageIdSnapshot: number;
  transform = 'cover';
  oceanPhoto =
    'https://images.unsplash.com/photo-1601164768085-c3a5665db36f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

  webContentByPageIdArray: Webcontent[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];
  public show: boolean = false;
  public buttonName: any = 'Show';
  public isSetAsHeroImage: boolean = true;
  public isSetAsGalleryImage: boolean = false;
  public testGrid: string[];
  public resizeButtonToggled: boolean = false;
  public pageDescription: string;
  public pageId: number;
  public rowIds = [];
  public columnIds = [];

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.userService.getCurrentUserData();
    this.grabAllContentByPageId();
    this.grabAllUserData();
    this.createTestArray();
    this.getRowsByPageId();
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
    });
  }

  createLink(hyperLink: string) {
    return hyperLink;
  }

  openPageSettings() {
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;

    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;

      //console.log(this.pageId);

      //console.log(this.subPageId);
    });

    console.log('opened page settings.');

    this.router.navigate([
      '/settings/' + this.pageDescription + '/' + this.pageId,
    ]);
  }

  resizeToggled() {
    this.resizeButtonToggled = !this.resizeButtonToggled;
    console.log('button toggled');
  }

  createTestArray() {
    this.testGrid = ['hello', 'goodbye', 'good morning'];
    console.log(this.testGrid);
    return this.testGrid;
  }

  heroImageStyling = {
    return: '1000px',
  };

  textStyling = {
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("this.photo")',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '500px',
    backgroundRepeat: 'no-repeat',
    display: 'none',
  };

  filterNulls(imageUrl: string) {
    console.log('filtering...');
    debugger;
    if (imageUrl != null) {
    } else {
    }
  }

  changePhoto() {
    this.photo =
      'https://images.unsplash.com/photo-1601204200071-d223e81548f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80';

    this.photo = this.oceanPhoto;
    for (let i = 0; i < this.webContentService.webContentArray.length; i++) {
      this.photo = this.webContentService.webContentArray[i].ImageUrl;
    }

    this.photo = this.webContentService.webContentArray[0].ImageUrl;
  }

  grabAllUserData() {
    this.userService.getUserData().subscribe((res: User[]) => {
      this.userService.userArray = res;

      // console.log('Here is the images based on page id: ');
      // console.log(this.imagesByPageIdArray);
    });
  }

  toggleAddButton() {
    this.show = !this.show;
  }

  onSubmit(form: NgForm) {
    //Submit for homepage content
    this.insertRecord(form);
  }

  onEditSubmit(form: NgForm) {
    this.insertEditSettings(form);
  }

  insertEditSettings(form: NgForm) {
    console.log('form and id:');
    console.log(form);

    this.webContentService.postEditContentById(form.value).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  submitNewTextData(form: NgForm) {
    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    this.webContentService
      .postWebContentByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllContentByPageId();
      });
  }

  grabAllContentByPageId() {
    // console.log('grabbing content by page id');
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;

    this.customImageService
      .getWebContentByPageId(this.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
        console.log('here is the content array:');
        console.log(this.webContentService.webContentArray);

        // console.log('Here is the images based on page id: ');
        // console.log(this.imagesByPageIdArray);
      });
  }

  // postWebContentByPageId() {
  //   this.webContentService
  //     .postWebContentByPageId(
  //       this.webContentService.formData,
  //       this.pageIdSnapshot
  //     )
  //     .subscribe((res: CustomText[]) => {
  //       this.textByPageIdArray = res;
  //     });
  // }

  takePageIdSnapshot() {
    this.pageIdSnapshot = +this.route.snapshot.paramMap.get('pageId');

    this.customPageService
      .getPageById(this.pageIdSnapshot)
      .subscribe((res: CustomPage) => {
        this.customPageService.customPageArrayById = res;
      });
  }

  activatePagesById() {
    const pageId = this.route.snapshot.params['pageId'];
    this.selectedPageId = +this.getCustomPageById(pageId);
  }

  //Set Custom Page data to customPage service array
  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  //Post text box one
  postCustomPageData() {
    this.customPageService
      .createCustomPage(this.customPageService.pageFormData)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  insertCustomPageRecord(form: NgForm) {
    this.customPageService.createCustomPage(form.value).subscribe((res) => {
      //this.resetForm(form);

      this.customPageService.getCustomPageContent();
    });
  }

  onCustomPageSubmit(form: NgForm) {
    //Submit for custom page content
    this.insertCustomPageRecord(form);
  }

  getCustomPageById(pageId: number): CustomPage {
    return this.customPageService.customPageArray.find(
      (x) => x.PageId === pageId
    );
  }

  setAudioUrl(audioUrl: string) {
    var audio = new Audio();
    audio.src = audioUrl;

    // will need to santitize this
    //.trustAsResourceUrl(path + audioFile);

    if (audioUrl) {
      var cleanAudio = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl);
      return cleanAudio;
    }

    // var audio = document.getElementById('player');
    // console.log('audio');
    // console.log(audio);
    // console.log('passed in audio url');
    // console.log(audioUrl);
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
}
