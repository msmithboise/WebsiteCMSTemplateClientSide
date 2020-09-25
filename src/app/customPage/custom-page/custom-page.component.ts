import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { CustomPage } from 'src/app/models/custom-page.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { CustomImage } from 'src/app/models/custom-image.model';
import { Key } from 'protractor';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomText } from 'src/app/models/custom-text.model';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { Console } from 'console';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '..//../safe.pipe';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
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
    public userService: UserService
  ) {}

  customPageArray: CustomPage[];
  pageIdSnapshot: number;
  transform = 'cover';

  webContentByPageIdArray: Webcontent[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];
  public show: boolean = false;
  public buttonName: any = 'Show';

  ngOnInit(): void {
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.grabAllContentByPageId();
    this.grabAllUserData();
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
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;

    this.customImageService
      .getWebContentByPageId(this.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;

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

  setYouTubeEmbed(embedLink) {
    if (embedLink != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + embedLink
      );
    }
  }

  Logout() {
    this.authService.removeToken;
    this.userService.isLoggedIn = false;
    this.toastr.success('Logged out succesfully!');
  }
}
