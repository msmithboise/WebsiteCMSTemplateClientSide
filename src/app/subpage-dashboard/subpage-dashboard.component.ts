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
import { SubpageService } from '../services/subpage.service';
import { WebStructureService } from '../web-structure.service';

@Component({
  selector: 'app-subpage-dashboard',
  templateUrl: './subpage-dashboard.component.html',
  styleUrls: ['./subpage-dashboard.component.css'],
  providers: [WebcontentService],
})
export class SubpageDashboardComponent implements OnInit {
  closeResult = '';
  public fileToUpload: File = null;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  imageList: any[];
  fireBaseImageUrl: string;
  resizeButtonToggled: boolean = false;
  public pageId: number;
  public subPageId: number;
  public pageDescription: string;
  public subPageDescription: string;

  selectedAudio: any = null;

  isAudioSubmitted: boolean;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public toastr: ToastrService,
    public router: Router,
    public subPageService: SubpageService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
    this.getSubPageContentByIds(this.pageId, this.subPageId);
  }

  getRouteParams() {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
      this.subPageDescription = params.subPageDescription;

      this.subPageId = params.subPageId;
    });
  }

  getSubPageContentByIds(pageId: number, subPageId: number) {
    pageId = this.pageId;
    subPageId = this.subPageId;

    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        console.log('subpage-dashboard: getSubPageContentByIds');
        this.webStructureService.getRequests++;
        this.subPageService.subPageContentArray = res;
      });
  }

  openPageSettings() {
    this.router.navigate(['/edit-page/']);
  }

  deleteDialogue(id: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: number) {
    this.webContentService.deleteWebPageContent(id).subscribe((res) => {
      this.getSubPageContentByIds(this.pageId, this.subPageId);
      this.resetForm();
    });
    this.toastr.warning('Content deleted!');
  }

  //Change this to grab by SUBPAGE ID & PAGE ID
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        console.log('subpage-dashboard: grabAllContentByPageId');
        this.webStructureService.getRequests++;
        this.webContentService.webContentArray = res;
      });
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      pageId: 0,
      subPageId: 0,
      backgroundImage: '',
    });
    this.imgSrc = '/assets/placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    subPageId: new FormControl(''),
    backgroundImage: new FormControl(''),
  });

  selectItemToEdit(textId: number) {
    this.route.params.subscribe((params) => {
      this.pageId = params.pageId;
      this.pageDescription = params.pageDescription;
      this.subPageId = params.subPageId;
      this.subPageDescription = params.subPageDescription;
    });
    this.router.navigate([
      '/style-settings/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/' +
        this.subPageDescription +
        '/' +
        this.subPageId +
        '/' +
        textId,
    ]);

    this.webContentService
      .getEditContentById(textId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;
      });
  }

  onContentSubmit(form: NgForm) {
    //Submit for homepage content
    this.insertContentRecord(form);
  }

  insertContentRecord(form: NgForm) {
    this.webContentService
      .postWebContentByPageId(form.value)
      .subscribe((res) => {
        //this.resetForm(form);
        this.grabAllContentByPageId();
      });
  }

  //To submit text body data
  submitNewTextData(form: FormGroup) {
    this.insertTextRecord(form);
  }

  textFormTemplate = new FormGroup({
    TextBody: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    subPageId: new FormControl(''),
  });

  insertTextRecord(form: FormGroup) {
    var newForm = this.textFormTemplate.value;

    newForm.pageId = this.pageId;

    newForm.subPageId = this.subPageId;

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      this.toastr.success('Image uploaded succesfully!');
      this.getSubPageContentByIds(this.pageId, this.subPageId);
    });
  }

  //Submit Url data
  submitImageUrlData(form: FormGroup) {
    this.insertImageUrlRecord(form);
  }

  imageUrlFormTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  insertImageUrlRecord(form: FormGroup) {
    var newUrlForm = this.imageUrlFormTemplate.value;
    newUrlForm.pageId = this.pageId;
    newUrlForm.subPageId = this.subPageId;

    this.webContentService
      .postWebContentByPageId(newUrlForm)
      .subscribe((res) => {
        this.getSubPageContentByIds(this.pageId, this.subPageId);
        this.toastr.success('Image Url uploaded succesfully!');
      });
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `images/${this.selectedImage.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.webContentService
                .postUploadedSubPageImage(url)
                .subscribe((data) => {
                  this.getSubPageContentByIds(this.pageId, this.subPageId);
                });

              formValue['imageUrl'] = url;

              this.resetForm();
            });
          })
        )
        .subscribe((res) => {
          this.getSubPageContentByIds(this.pageId, this.subPageId);
        });
      this.toastr.success('Image uploaded succesfully!');
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/placeholder.jpg';
      this.selectedImage = null;
    }
  }
  get formControls() {
    return this.formTemplate['controls'];
  }

  //Submit Embed
  submitEmbedUrlData(form: FormGroup) {
    this.insertEmbedUrlRecord(form);
  }

  embedUrlFormTemplate = new FormGroup({
    embedUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  insertEmbedUrlRecord(form: FormGroup) {
    var newEmbedUrlForm = this.embedUrlFormTemplate.value;
    newEmbedUrlForm.pageId = this.pageId;
    newEmbedUrlForm.subpageid = this.subPageId;

    this.webContentService
      .postWebContentByPageId(newEmbedUrlForm)
      .subscribe((res) => {
        this.getSubPageContentByIds(this.pageId, this.subPageId);
        this.toastr.success('Video uploaded succesfully!');
      });
  }
  //To upload audio

  audioUploadFormTemplate = new FormGroup({
    AudioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    subPageId: new FormControl(''),
  });
  get audioFormControls() {
    return this.audioUploadFormTemplate['controls'];
  }

  resetAudioForm() {
    this.audioUploadFormTemplate.reset();
    this.audioUploadFormTemplate.setValue({
      audioUrl: '',
      pageId: 0,
      subPageId: 0,
    });

    this.selectedAudio = null;
    this.isAudioSubmitted = false;
  }

  onAudioSubmit(formValue) {
    this.isAudioSubmitted = true;

    if (this.audioUploadFormTemplate.valid) {
      var audioFilePath = `audio/${this.selectedAudio.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;

      const audiofileRef = this.storage.ref(audioFilePath);
      this.storage
        .upload(audioFilePath, this.selectedAudio)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            audiofileRef.getDownloadURL().subscribe((url) => {
              this.webContentService
                .postUploadedSubPageAudio(url)
                .subscribe((data) => {});
              formValue['audioUrl'] = url;
              this.resetAudioForm();
            });
          })
        )
        .subscribe((res) => {
          this.grabAllContentByPageId();
        });
      this.toastr.success('Audio uploaded successfully!');
    }

    // this.toastr.error('Audio failed to upload!');
  }

  //To embed image url

  submitAudioData(form: FormGroup) {
    this.insertAudioRecord(form);
  }

  insertAudioRecord(form: FormGroup) {
    var newAudioForm = this.audioFormTemplate.value;
    newAudioForm.pageId = this.pageId;

    newAudioForm.subPageId = this.subPageId;

    this.webContentService
      .postWebContentByPageId(newAudioForm)
      .subscribe((res) => {
        this.grabAllContentByPageId();
      });
  }
  audioFormTemplate = new FormGroup({
    audioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    subPageId: new FormControl(''),

    backgroundColor: new FormControl(''),
  });
  showAudioPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedAudio = event.target.files[0];
    } else {
      this.imgSrc = '/assets/placeholder.jpg';
      this.selectedAudio = null;
    }
  }

  //To create google map
  mapFormTemplate = new FormGroup({
    MapUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    subPageId: new FormControl(''),
  });
  onMapSubmit(formValue) {
    this.createGoogleMap(formValue);
  }

  createGoogleMap(form: FormGroup) {
    var newMapForm = this.mapFormTemplate.value;
    newMapForm.pageId = this.pageId;
    newMapForm.subPageId = this.subPageId;

    //We are passing a form group here...
    this.webContentService.postGoogleMap(newMapForm).subscribe((res) => {
      this.grabAllContentByPageId();
    });
  }

  get mapFormControls() {
    return this.mapFormTemplate['controls'];
  }
}
