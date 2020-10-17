import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Console } from 'console';

import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { UserService } from 'src/app/services/user.service';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { DefaultTemplateService } from 'src/app/services/default-template.service';

@Component({
  selector: 'app-page-settings',
  templateUrl: './page-settings.component.html',
  styleUrls: ['./page-settings.component.css'],
  providers: [WebcontentService],
})
export class PageSettingsComponent implements OnInit {
  closeResult = '';
  public fileToUpload: File = null;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  imageList: any[];
  fireBaseImageUrl: string;
  resizeButtonToggled: boolean = false;

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.grabAllContentByPageId();
  }

  //Grab all webcontent to display for editing
  grabAllContentByPageId() {
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        console.log('here are the page settings');
        console.log(res);
        this.webContentService.webContentArray = res;
      });
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

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
  });

  textFormTemplate = new FormGroup({
    TextBody: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  imageUrlFormTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
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
        .subscribe();
      this.grabAllContentByPageId();
      this.toastr.success('Image uploaded succesfully!');
    }
  }

  //To submit text body data
  submitNewTextData(form: FormGroup) {
    this.insertTextRecord(form);
  }

  insertTextRecord(form: FormGroup) {
    var newForm = this.textFormTemplate.value;
    newForm.pageId = this.webContentService.pageIdSnapshot;

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
  }

  //To submit image url

  submitImageUrlData(form: FormGroup) {
    console.log('image form after submit');
    console.log(form);
    this.insertImageUrlRecord(form);
  }

  insertImageUrlRecord(form: FormGroup) {
    console.log('image form during insert record');
    console.log(form);

    var newUrlForm = this.imageUrlFormTemplate.value;
    newUrlForm.pageId = this.webContentService.pageIdSnapshot;

    this.webContentService.postImageUrlByPageId(newUrlForm).subscribe((res) => {
      //this.resetForm(form);
      this.grabAllContentByPageId();
    });
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
}
