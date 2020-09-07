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
    private route: ActivatedRoute
  ) {}

  customPageArray: CustomPage[];
  pageIdSnapshot: number;

  webContentByPageIdArray: Webcontent[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];
  public show: boolean = false;
  public buttonName: any = 'Show';

  ngOnInit(): void {
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.grabAllContentByPageId();
  }

  toggleAddButton() {
    this.show = !this.show;
    console.log('adding text...');
  }

  onSubmit(form: NgForm) {
    //Submit for homepage content
    console.log('submitting...');
    console.log(form);
    this.insertRecord(form);
  }

  submitNewTextData(form: NgForm) {
    console.log('got yo hamster son....');
    console.log(form.value);

    this.insertRecord(form);
  }

  insertRecord(form: NgForm) {
    console.log('hamster should be here in insertRecord..');
    console.log(form.value);
    this.webContentService
      .postWebContentByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllContentByPageId();
      });
  }

  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = this.pageIdSnapshot;
    console.log('webcontentservice pg id snapshot');
    console.log(this.webContentService.pageIdSnapshot);
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
      .createCustomPage(this.customPageService.customPageFormData)
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
    console.log('hee hee that tickles!');
  }

  getCustomPageById(pageId: number): CustomPage {
    return this.customPageService.customPageArray.find(
      (x) => x.PageId === pageId
    );
  }
}
