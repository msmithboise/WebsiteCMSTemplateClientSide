import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Console } from 'console';

import { ActivatedRoute, Router } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { UserService } from 'src/app/services/user.service';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { DefaultTemplateService } from 'src/app/services/default-template.service';
import { CustomPageService } from '../services/custom-page.service';
import { CustomPage } from '../models/custom-page.model';
import { SubpageService } from '../services/subpage.service';
import { Subpage } from '../models/subpage.model';
import { SubpageDashboardComponent } from '../subpage-dashboard/subpage-dashboard.component';
import { HttpErrorResponse } from '@angular/common/http';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css'],
  providers: [WebcontentService],
})
export class PageSettingsComponent implements OnInit {
  public rowId = '';
  closeResult = '';
  public fileToUpload: File = null;
  imgSrc: string;
  audioSrc: string;
  selectedImage: any = null;
  selectedAudio: any = null;
  isSubmitted: boolean;
  isAudioSubmitted: boolean;
  imageList: any[];
  fireBaseImageUrl: string;
  resizeButtonToggled: boolean = false;
  selectedId: number;
  public pageDescription: string;
  public pageId: number;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public toastr: ToastrService,
    public router: Router,
    public customPageService: CustomPageService,
    public subPageService: SubpageService,
    public webStructureService: WebStructureService
  ) {}

  //This component needs to grab all rows by page id
  ngOnInit(): void {
    //this.grabAllContentByPageId();
    this.callCustomPageService();
    this.callCustomSubPageService();
    this.getRowsByPageId();
  }

  //Add row

  rowFormTemplate = new FormGroup({
    rowId: new FormControl(''),
    pageId: new FormControl(''),
  });

  getRows() {
    this.webStructureService.getRows().subscribe((res) => {
      this.webStructureService.rowsArray = res;

      // console.log('getting rows');
      // console.log(this.webStructureService.rowsArray);
    });
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
      this.grabAllContentByPageId();
      console.log('getting rows by page id', Number(this.pageId));
      console.log(this.webStructureService.rowsByPageIdArray);
    });
  }

  addRow() {
    // console.log('Adding row');

    var newRow = this.rowFormTemplate.value;
    newRow.pageId = this.webContentService.pageIdSnapshot;
    newRow.RowId += newRow.RowId++;

    // console.log('newRow', newRow);

    this.webStructureService.postRowsByPageId(newRow).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  dashboardSubNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
    this.router.navigate([
      'dashboard/' +
        pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
  }

  dashboardMainNav(pageDescription: string, pageId: number) {
    // console.log('main page nav');
    // console.log(pageDescription, pageId);

    this.router.navigate(['dashboard/' + pageDescription + '/' + pageId]);
  }

  mainPageNav(pageDescription: string, pageId: number) {
    // console.log('main page nav');
    // console.log(pageDescription, pageId);

    this.router.navigate([pageDescription + '/' + pageId]);
  }

  subPageNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
    // console.log('sub id');
    // console.log(subPageId);

    this.router.navigate([
      pageDescription +
        '/' +
        pageId +
        '/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
  }

  callCustomSubPageService() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;
      // console.log('subpages');
      // console.log(res);
    });
  }

  callCustomPageService() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  goBack() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;

      this.router.navigate([this.pageDescription + '/' + this.pageId]);
    });
  }

  addHyperLink(id: number, text: string, imageUrl: string) {
    // console.log('item to add link to:');
    // console.log(id);
    // console.log(text);
    // console.log(imageUrl);

    this.selectedId = id;
  }

  openPageSettings() {
    // console.log('opened page settings.');

    this.router.navigate(['/edit-page/']);
  }

  //Grab all webcontent to display for editing
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        // console.log('here are the page settings');
        // console.log(res);
        this.webContentService.webContentArray = res;
      });
  }

  //TO submit link data

  linkFormTemplate = new FormGroup({
    HyperLink: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    Id: new FormControl(''),
  });

  submitNewLinkData(form: FormGroup) {
    this.insertLinkRecord(form);
  }

  insertLinkRecord(form: FormGroup) {
    var newForm = this.linkFormTemplate.value;
    newForm.pageId = this.webContentService.pageIdSnapshot;
    newForm.Id = this.selectedId;

    // console.log('link form');
    // console.log(newForm);

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  //To create google map
  mapFormTemplate = new FormGroup({
    MapUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });
  onMapSubmit(formValue) {
    this.createGoogleMap(formValue);
  }

  createGoogleMap(form: FormGroup) {
    // console.log('map form to be posted');
    // console.log(form);

    var newMapForm = this.mapFormTemplate.value;
    newMapForm.pageId = this.webContentService.pageIdSnapshot;

    // console.log('newMapForm before going to service');
    // console.log(newMapForm);

    //We are passing a form group here...
    this.webContentService.postGoogleMap(newMapForm).subscribe((res) => {
      this.grabAllContentByPageId();
    });
  }

  get mapFormControls() {
    // console.log('map form controls');
    // console.log(this.mapFormTemplate['controls']);
    return this.mapFormTemplate['controls'];
  }

  getImageDetails() {
    this.webContentService.imageDetailList
      .snapshotChanges()
      .subscribe((list) => {
        this.imageList = list.map((item) => {
          //write method here to set returned url to main database as "imageUrl" and pageId as snapshot
          //Setting firebaseUrl reponse to property
          this.fireBaseImageUrl = item.payload.val().imageUrl;

          return item.payload.val();
        });
        this.setFireBaseUrlToImageUrl();
      });
  }

  setFireBaseUrlToImageUrl() {
    this.webContentService
      .postUploadedImage(this.fireBaseImageUrl)
      .subscribe((data) => {});

    //Now we need to create a form to post to db
  }

  deleteDialogue(id: number) {
    // console.log('trying to delete..');
    if (confirm('Are you sure you want to delete this?')) {
      this.onDelete(id);
    }
  }

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
  });

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      pageId: 0,
      backgroundImage: '',
    });
    this.imgSrc = '/assets/placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  onDelete(id: number) {
    this.webContentService.deleteWebPageContent(id).subscribe((res) => {
      this.grabAllContentByPageId();
      this.resetForm();
    });
    this.toastr.error('Content deleted!');
  }

  openStyleSettings(textId: string) {
    console.log('opened page settings.');

    this.router.navigate(['/style-settings/' + textId]);
  }
}
