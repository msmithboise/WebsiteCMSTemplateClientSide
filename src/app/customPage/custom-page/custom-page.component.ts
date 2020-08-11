import { Component, OnInit } from '@angular/core';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { CustomPage } from 'src/app/models/custom-page.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { CustomImage } from 'src/app/models/custom-image.model';
import { Key } from 'protractor';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.css'],
})
export class CustomPageComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute
  ) {}

  customPageArray: CustomPage[];
  pageIdSnapshot: number;
  imagesByPageIdArray: CustomImage[];
  selectedPageId: number;
  filteredImageArray: CustomImage[];

  ngOnInit(): void {
    this.callCustomPageService();
    this.takePageIdSnapshot();
    this.grabAllImagesByPageId();
  }

  grabAllImagesByPageId() {
    this.customImageService
      .getCustomImageContent()
      .subscribe((res: CustomImage[]) => {
        this.imagesByPageIdArray = res;
        //console.log(this.imagesByPageIdArray);
      });
  }

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
