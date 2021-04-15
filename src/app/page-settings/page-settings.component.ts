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
import { DashboardPresetService } from '../services/dashboard-preset.service';

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
  public colorOne: string;

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
    public templateService: DefaultTemplateService,
    public dashboardPresetService: DashboardPresetService
  ) {}

  //This component needs to grab all rows by page id
  ngOnInit(): void {
    //this.grabAllContentByPageId();
    this.getPageDesc();
    this.callCustomPageService();
    this.callCustomSubPageService();
    this.getRowsByPageId();
    this.getAllPresets();
  }
  lightMode(form: NgForm) {
    this.insertLightPresets(form);
  }

  insertLightPresets(form: NgForm) {
    form.value.colorOne = '#ffffff';
    form.value.colorTwo = '#ffffff';
    form.value.colorThree = '#ffffff';
    form.value.colorFour = '#ffffff';
    form.value.colorFive = '#D461EA';
    form.value.colorSix = '#1FA8A6';
    form.value.colorSeven = '#222222';
    form.value.colorEight = '#222222';

    this.dashboardPresetService.postPresets(form.value).subscribe((res) => {
      console.log(res);
      this.getAllPresets();
    });
  }

  darkMode(form: NgForm) {
    this.insertDarkPresets(form);
  }
  insertDarkPresets(form: NgForm) {
    form.value.colorOne = '#27293D';
    form.value.colorTwo = '#27293D';
    form.value.colorThree = '#27293D';
    form.value.colorFour = '#27293D';
    form.value.colorFive = '#E5B9EE';
    form.value.colorSix = '#24FFFB';
    form.value.colorSeven = '#B8B7B7';
    form.value.colorEight = '#B8B7B7';

    this.dashboardPresetService.postPresets(form.value).subscribe((res) => {
      console.log(res);
      this.getAllPresets();
    });
  }

  getAllPresets() {
    this.dashboardPresetService.getAllPresets().subscribe((res) => {
      this.dashboardPresetService.dashboardPresetArray = res;
    });
  }

  onPresetSubmit(form: NgForm) {
    console.log('posting presets');

    this.insertColorPresets(form);
  }

  insertColorPresets(form: NgForm) {
    this.dashboardPresetService.postPresets(form.value).subscribe((res) => {
      console.log(res);
    });
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
      console.log('page-settings: getRows');
      this.webStructureService.getRequests++;
      this.webStructureService.rowsArray = res;
    });
  }

  getRowsByPageId() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
    });

    this.webStructureService.getRowsByPageId(this.pageId).subscribe((res) => {
      console.log('page-settings: getRowsByPageId');
      this.webStructureService.getRequests++;
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
    this.toastr.success('Row Added!');
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
      console.log('page-settings: getSubPages');
      this.webStructureService.getRequests++;
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
        console.log('page-settings: grabAllContentByPageId');
        this.webStructureService.getRequests++;
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

  createTemplateDialogue() {
    if (confirm('Are you sure you want to create a new template?')) {
      this.createTemplate();
      this.refresh();
      this.grabAllContentByPageId();
    }
  }

  createTemplate() {
    //Call default template controller
    var newTemplateForm = this.templateForm.value;
    this.route.params.subscribe((params) => {
      newTemplateForm.pageId = params.pageId;
    });
    this.templateService
      .setDefaultTemplate(newTemplateForm)
      .subscribe((res) => {
        JSON.stringify(res);
      });
    this.refresh();
    this.grabAllContentByPageId();

    //var newRowId = Number(localStorage.getItem('passedRowId'));
  }
}
