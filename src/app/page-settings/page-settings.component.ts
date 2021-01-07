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
import { RowComponent } from '../row/row.component';

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
  public templateRowId: number;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public toastr: ToastrService,
    public router: Router,
    public customPageService: CustomPageService,
    public subPageService: SubpageService,
    public webStructureService: WebStructureService,
    public templateService: DefaultTemplateService
  ) {}

  //This component needs to grab all rows by page id
  ngOnInit(): void {
    //this.grabAllContentByPageId();
    this.getPageDesc();
    this.callCustomPageService();
    this.callCustomSubPageService();
    this.getRowsByPageId();
  }

  getPageDesc() {
    this.route.paramMap.subscribe((paramMap) => {
      this.pageDescription = paramMap.get('pageDescription');
    });
  }

  refresh() {
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
    });
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      this.webStructureService.rowsByPageIdArray = res;
      this.grabAllContentByPageId();
    });
  }

  addRow() {
    var newRow = this.rowFormTemplate.value;
    newRow.pageId = this.webContentService.pageIdSnapshot;
    newRow.RowId += newRow.RowId++;

    this.webStructureService.postRowsByPageId(newRow).subscribe((res) => {
      this.refresh();
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
    this.router.navigate(['dashboard/' + pageDescription + '/' + pageId]);
  }

  mainPageNav(pageDescription: string, pageId: number) {
    this.router.navigate([pageDescription + '/' + pageId]);
  }

  subPageNav(
    pageDescription: string,
    pageId: number,
    subPageDescription: string,
    subPageId: number
  ) {
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
    });
  }

  callCustomPageService() {
    this.customPageService.getCustomPageContent();
  }

  goBack() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;

      this.router.navigate([this.pageDescription + '/' + this.pageId]);
    });
  }

  addHyperLink(id: number, text: string, imageUrl: string) {
    this.selectedId = id;
  }

  openPageSettings() {
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

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      this.grabAllContentByPageId();
    });
  }

  deleteDialogue(id: number) {
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
    this.router.navigate(['/style-settings/' + textId]);
  }

  columnFormTemplate = new FormGroup({
    columnId: new FormControl(''),
    rowId: new FormControl(''),
    pageId: new FormControl(''),
    columnClass: new FormControl(''),
  });

  addTemplateColumn() {
    var newRowId = Number(localStorage.getItem('passedRowId'));

    var newColumn = this.columnFormTemplate.value;
    newColumn.pageId = this.webContentService.pageIdSnapshot;
    newColumn.columnId += newColumn.columnId++;
    newColumn.rowId = newRowId;

    this.webStructureService
      .postColumnsByRowId(newColumn)
      .subscribe((res) => {});
  }

  templateForm = new FormGroup({
    rowId: new FormControl(''),
    pageId: new FormControl(''),
  });

  createTemplate() {
    console.log('creating template..');

    var newRowId = Number(localStorage.getItem('passedRowId'));

    var newTemplateForm = this.templateForm.value;

    //newTemplateForm.rowId = newRowId;

    this.route.params.subscribe((params) => {
      newTemplateForm.pageId = params.pageId;
    });

    console.log('rowId', newTemplateForm.rowId);
    console.log('pageId', newTemplateForm.pageId);

    //Add first row
    this.webStructureService
      .postRowsByPageId(newTemplateForm)
      .subscribe((res) => {});

    //Add column size of 12
    this.addTemplateColumn();

    //Add image of 1000 x 2000px

    // text of mywebsite.com in middle of image.

    //Add
  }
}
