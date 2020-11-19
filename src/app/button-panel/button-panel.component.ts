import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebcontentService } from '../WebContent/webcontent.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-button-panel',
  templateUrl: './button-panel.component.html',
  styleUrls: ['./button-panel.component.css'],
})
export class ButtonPanelComponent implements OnInit {
  @Input() columnId: number;
  @Output() refreshEvent = new EventEmitter<any>();
  public rowId = '';
  closeResult = '';
  public fileToUpload: File = null;
  imgSrc: string;
  audioSrc: string;
  gallerySrc: string;
  selectedGallery: any = null;
  selectedImage: any = null;
  selectedAudio: any = null;
  isGallerySubmitted: boolean;
  isSubmitted: boolean;
  isAudioSubmitted: boolean;
  imageList: any[];
  fireBaseImageUrl: string;
  resizeButtonToggled: boolean = false;
  selectedId: number;
  isFullsize: boolean;
  isChecked: boolean;
  public pageDescription: string;
  public pageId: number;
  public passedInColumnId: number;
  constructor(
    public webContentService: WebcontentService,
    private storage: AngularFireStorage,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  refreshContent() {
    this.refreshEvent.next('refreshColumns');
  }

  onChange(isChecked: boolean) {
    this.isChecked = isChecked;

    console.log('check');
    console.log(this.isChecked);
  }

  passColumnId(columnId: number) {
    console.log(columnId);
    this.passedInColumnId = columnId;
    console.log('passed in id');
    console.log(this.passedInColumnId);

    localStorage.setItem('passedId', this.passedInColumnId.toString());
  }

  //To create google map
  mapFormTemplate = new FormGroup({
    MapUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
  });
  onMapSubmit(formValue) {
    this.createGoogleMap(formValue);
  }

  createGoogleMap(form: FormGroup) {
    // console.log('map form to be posted');
    // console.log(form);

    var newMapForm = this.mapFormTemplate.value;
    newMapForm.pageId = this.webContentService.pageIdSnapshot;

    var colId = localStorage.getItem('passedId');

    newMapForm.columnId = Number(colId);

    // console.log('newMapForm before going to service');
    // console.log(newMapForm);

    //We are passing a form group here...
    this.webContentService.postGoogleMap(newMapForm).subscribe((res) => {
      this.toastr.success('Map added successfully!');
      this.refreshContent();
      //this.grabAllContentByPageId();
    });
  }

  get mapFormControls() {
    // console.log('map form controls');
    // console.log(this.mapFormTemplate['controls']);
    return this.mapFormTemplate['controls'];
  }

  //To embed image url

  embedUrlFormTemplate = new FormGroup({
    embedUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
  });

  submitEmbedUrlData(form: FormGroup) {
    // console.log('Embed form after submit');
    // console.log(form);
    this.insertEmbedUrlRecord(form);
  }

  insertEmbedUrlRecord(form: FormGroup) {
    // console.log('Embed form during insert record');
    // console.log(form);

    var newEmbedUrlForm = this.embedUrlFormTemplate.value;
    newEmbedUrlForm.pageId = this.webContentService.pageIdSnapshot;
    var colId = localStorage.getItem('passedId');

    newEmbedUrlForm.columnId = Number(colId);

    this.webContentService
      .postWebContentByPageId(newEmbedUrlForm)
      .subscribe((res) => {
        this.toastr.success('Video embed added successfully!');
        this.refreshContent();
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  showAudioPreview(event: any) {
    // console.log('show audio preview');

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.audioSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedAudio = event.target.files[0];
    } else {
      this.audioSrc = '/assets/placeholder.jpg';
      this.selectedAudio = null;
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

  //To upload audio

  audioUploadFormTemplate = new FormGroup({
    AudioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
  });
  get audioFormControls() {
    // console.log('audio form controls');
    // console.log(this.audioUploadFormTemplate['controls']);
    return this.audioUploadFormTemplate['controls'];
  }

  resetAudioForm() {
    this.audioUploadFormTemplate.reset();
    this.audioUploadFormTemplate.setValue({
      audioUrl: '',
      pageId: 0,
    });

    this.selectedAudio = null;
    this.isAudioSubmitted = false;
  }

  onAudioSubmit(formValue) {
    // console.log('audio submitted...');
    this.isAudioSubmitted = true;
    // console.log('this selectedAudio');
    // console.log(this.selectedAudio.name);
    if (this.audioUploadFormTemplate.valid) {
      var audioFilePath = `audio/${this.selectedAudio.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;

      // console.log('audio file path');
      // console.log(audioFilePath);
      const audiofileRef = this.storage.ref(audioFilePath);
      this.storage
        .upload(audioFilePath, this.selectedAudio)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            audiofileRef.getDownloadURL().subscribe((url) => {
              this.webContentService
                .postUploadedAudio(url)
                .subscribe((data) => {
                  this.refreshContent();
                });
              formValue['audioUrl'] = url;
              this.resetAudioForm();
            });
          })
        )
        .subscribe((res) => {
          this.refreshContent();
          //this.grabAllContentByPageId();
        });
      this.toastr.success('Audio uploaded successfully!');
    }

    // this.toastr.error('Audio failed to upload!');
  }

  //To embed image url

  submitAudioData(form: FormGroup) {
    // console.log('Audio form after submit');
    // console.log(form);
    this.insertAudioRecord(form);
  }

  insertAudioRecord(form: FormGroup) {
    // console.log('Embed form during insert record');
    // console.log(form);

    var newAudioForm = this.audioFormTemplate.value;
    newAudioForm.pageId = this.webContentService.pageIdSnapshot;
    var colId = localStorage.getItem('passedId');

    newAudioForm.columnId = Number(colId);

    this.webContentService
      .postWebContentByPageId(newAudioForm)
      .subscribe((res) => {
        this.toastr.success('Audio URL added successfully!');
        this.refreshContent();
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  audioFormTemplate = new FormGroup({
    audioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundColor: new FormControl(''),
    columnId: new FormControl(''),
  });

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
    columnId: new FormControl(''),
    body: new FormControl(''),
  });

  get formControls() {
    return this.formTemplate['controls'];
  }

  //To submit text body data
  submitNewTextData(form: FormGroup) {
    console.log('passed on submit columnId', this.passedInColumnId);
    this.insertTextRecord(form);
  }

  textFormTemplate = new FormGroup({
    TextBody: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
  });

  insertTextRecord(form: FormGroup) {
    var colId = localStorage.getItem('passedId');
    var newForm = this.textFormTemplate.value;
    newForm.pageId = this.webContentService.pageIdSnapshot;
    newForm.columnId = Number(colId);
    console.log('local storage id');
    console.log(Number(colId));

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      //this.resetForm(form);
      //this.grabAllContentByPageId();
      this.refreshContent();
      this.toastr.success('Text added successfully!');
    });
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      pageId: 0,
      backgroundImage: '',
      body: '',
    });
    this.imgSrc = '/assets/placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
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
                .postUploadedImage(url, this.isChecked)
                .subscribe((data) => {
                  this.refreshContent();
                });

              formValue['imageUrl'] = url;

              //this.webContentService.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe((res) => {
          //this.grabAllContentByPageId();
        });
      this.refreshContent();
      this.toastr.success('Image uploaded succesfully!');
    }
  }

  //To submit image url

  imageUrlFormTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
    height: new FormControl(''),
    width: new FormControl(''),
  });

  submitImageUrlData(form: FormGroup) {
    console.log('passed on submit columnId', this.passedInColumnId);
    // console.log('image form after submit');
    // console.log(form);
    this.insertImageUrlRecord(form);
  }

  insertImageUrlRecord(form: FormGroup) {
    var colId = localStorage.getItem('passedId');
    var newUrlForm = this.imageUrlFormTemplate.value;
    newUrlForm.pageId = this.webContentService.pageIdSnapshot;
    newUrlForm.columnId = Number(colId);

    this.webContentService
      .postWebContentByPageId(newUrlForm)
      .subscribe((res) => {
        this.toastr.success('Gallery Image added succesfully!');
        this.refreshContent();
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  //To submit background image

  bgImageUrlFormTemplate = new FormGroup({
    backgroundImage: new FormControl(''),
    pageId: new FormControl(''),
    columnId: new FormControl(''),
    height: new FormControl(''),
    width: new FormControl(''),
    isImage: new FormControl(''),
    body: new FormControl(''),
  });

  submitBgImageUrlData(form: FormGroup) {
    console.log('passed on submit columnId', this.passedInColumnId);
    // console.log('image form after submit');
    // console.log(form);
    this.insertBgImageUrlRecord(form);
  }

  insertBgImageUrlRecord(form: FormGroup) {
    var colId = localStorage.getItem('passedId');
    var newUrlForm = this.bgImageUrlFormTemplate.value;
    newUrlForm.pageId = this.webContentService.pageIdSnapshot;
    newUrlForm.columnId = Number(colId);

    console.log(this.isFullsize);

    if (this.isFullsize) {
      newUrlForm.isImage = true;
    } else {
      newUrlForm.isImage = false;
    }

    this.webContentService
      .postWebContentByPageId(newUrlForm)
      .subscribe((res) => {
        this.toastr.success('Background image added successfully!');
        this.refreshContent();
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  //To submit uploaded gallery form

  showGalleryPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.gallerySrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedGallery = event.target.files[0];
    } else {
      this.gallerySrc = '/assets/placeholder.jpg';
      this.selectedGallery = null;
    }
  }

  resetGalleryForm() {
    this.audioUploadFormTemplate.reset();
    this.audioUploadFormTemplate.setValue({
      imageUrl: '',
      pageId: 0,
      columnId: 0,
    });

    this.selectedAudio = null;
    this.isAudioSubmitted = false;
  }

  galleryImageTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),

    columnId: new FormControl(''),
  });

  get galleryFormControls() {
    // console.log('audio form controls');
    // console.log(this.audioUploadFormTemplate['controls']);
    return this.galleryImageTemplate['controls'];
  }

  onGalleryImageSubmit(formValue) {
    this.isGallerySubmitted = true;
    if (this.galleryImageTemplate.valid) {
      var filePath = `images/${this.selectedGallery.name
        .split('.')
        .slice(0, -1)
        .join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedGallery)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.webContentService
                .postUploadedGalleryImage(url)
                .subscribe((data) => {
                  this.refreshContent();
                });

              formValue['imageUrl'] = url;

              //this.webContentService.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe((res) => {
          this.refreshContent();
          //this.grabAllContentByPageId();
        });
      this.toastr.success('Gallery Image uploaded succesfully!');
    }
  }
}
