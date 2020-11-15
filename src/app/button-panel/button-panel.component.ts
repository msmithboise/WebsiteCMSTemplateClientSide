import { Component, Input, OnInit } from '@angular/core';
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
  public passedInColumnId: number;
  constructor(
    public webContentService: WebcontentService,
    private storage: AngularFireStorage,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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

    this.webContentService
      .postWebContentByPageId(newEmbedUrlForm)
      .subscribe((res) => {
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  showAudioPreview(event: any) {
    // console.log('show audio preview');

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

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.audioSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.audioSrc = '/assets/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  //To upload audio

  audioUploadFormTemplate = new FormGroup({
    AudioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
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
                .subscribe((data) => {});
              formValue['audioUrl'] = url;
              this.resetAudioForm();
            });
          })
        )
        .subscribe((res) => {
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

    this.webContentService
      .postWebContentByPageId(newAudioForm)
      .subscribe((res) => {
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }

  audioFormTemplate = new FormGroup({
    audioUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundColor: new FormControl(''),
  });

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
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
    });
  }

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
                .postUploadedImage(url)
                .subscribe((data) => {});

              formValue['imageUrl'] = url;

              //this.webContentService.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe((res) => {
          //this.grabAllContentByPageId();
        });
      this.toastr.success('Image uploaded succesfully!');
    }
  }

  //To submit image url

  imageUrlFormTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  submitImageUrlData(form: FormGroup) {
    // console.log('image form after submit');
    // console.log(form);
    this.insertImageUrlRecord(form);
  }

  insertImageUrlRecord(form: FormGroup) {
    // console.log('image form during insert record');
    // console.log(form);

    var newUrlForm = this.imageUrlFormTemplate.value;
    newUrlForm.pageId = this.webContentService.pageIdSnapshot;

    this.webContentService
      .postWebContentByPageId(newUrlForm)
      .subscribe((res) => {
        //this.resetForm(form);
        //this.grabAllContentByPageId();
      });
  }
}
