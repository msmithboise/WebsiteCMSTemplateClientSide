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

  constructor(
    public webContentService: WebcontentService,
    public customImageService: CustomImageService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public toastr: ToastrService,
    public router: Router,
    public subPageService: SubpageService
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

    console.log('pageid');
    console.log(this.pageId);
    console.log('subpageid');
    console.log(this.subPageId);
    this.subPageService
      .getSubContentByIds(pageId, subPageId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentArray = res;
        console.log('getting content by page and sub page id..');
        console.log(res);
      });
  }

  openPageSettings() {
    console.log('opened page settings.');

    this.router.navigate(['/edit-page/']);
  }

  deleteDialogue(id: number) {
    console.log('trying to delete..');
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
        console.log('here are the page settings');
        console.log(res);
        this.webContentService.webContentArray = res;
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

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
  });

  selectItemToEdit(textId: number) {
    this.router.navigate(['/style-settings/' + textId]);
    console.log('item to edit');
    console.log(textId);
    this.webContentService
      .getEditContentById(textId)
      .subscribe((res: Webcontent[]) => {
        this.subPageService.subPageContentByIdsArray = res;
        console.log('res');
        console.log(res);
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
    console.log('newform pageid');
    newForm.pageId = this.pageId;
    console.log(newForm.pageId);
    console.log('newform subpageid');
    newForm.subPageId = this.subPageId;
    console.log(newForm.subPageId);

    this.webContentService.postWebContentByPageId(newForm).subscribe((res) => {
      //this.resetForm(form);
      this.toastr.success('Image uploaded succesfully!');
      this.getSubPageContentByIds(this.pageId, this.subPageId);
    });
  }

  //Submit Url data
  submitImageUrlData(form: FormGroup) {
    console.log('image form after submit');
    console.log(form);
    this.insertImageUrlRecord(form);
  }

  imageUrlFormTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  insertImageUrlRecord(form: FormGroup) {
    console.log('image form during insert record');
    console.log(form);

    var newUrlForm = this.imageUrlFormTemplate.value;
    newUrlForm.pageId = this.pageId;
    newUrlForm.subPageId = this.subPageId;

    this.webContentService
      .postWebContentByPageId(newUrlForm)
      .subscribe((res) => {
        //this.resetForm(form);
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
                .postUploadedImage(url)
                .subscribe((data) => {
                  this.getSubPageContentByIds(this.pageId, this.subPageId);
                });

              formValue['imageUrl'] = url;

              //this.webContentService.insertImageDetails(formValue);
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
    console.log('Embed form after submit');
    console.log(form);
    this.insertEmbedUrlRecord(form);
  }

  embedUrlFormTemplate = new FormGroup({
    embedUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

  insertEmbedUrlRecord(form: FormGroup) {
    console.log('Embed form during insert record');
    console.log(form);

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
}

//   openPageSettings() {
//     console.log('opened page settings.');

//     this.router.navigate(['/edit-page/']);
//   }

//   //Grab all webcontent to display for editing
//   grabAllContentByPageId() {
//     this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
//       'pageId'
//     );

//     this.customImageService
//       .getWebContentByPageId(this.webContentService.pageIdSnapshot)
//       .subscribe((res: Webcontent[]) => {
//         console.log('here are the page settings');
//         console.log(res);
//         this.webContentService.webContentArray = res;
//       });
//   }

//   embedUrlFormTemplate = new FormGroup({
//     embedUrl: new FormControl('', Validators.required),
//     pageId: new FormControl(''),
//   });

//   resetForm() {
//     this.formTemplate.reset();
//     this.formTemplate.setValue({
//       imageUrl: '',
//       pageId: 0,
//       backgroundImage: '',
//     });
//     this.imgSrc = '/assets/placeholder.jpg';
//     this.selectedImage = null;
//     this.isSubmitted = false;
//   }

//     var newUrlForm = this.imageUrlFormTemplate.value;
//     newUrlForm.pageId = this.webContentService.pageIdSnapshot;

//     this.webContentService
//       .postWebContentByPageId(newUrlForm)
//       .subscribe((res) => {
//         //this.resetForm(form);
//         this.grabAllContentByPageId();
//       });
//   }

//   getImageDetails() {
//     this.webContentService.imageDetailList
//       .snapshotChanges()
//       .subscribe((list) => {
//         this.imageList = list.map((item) => {
//           //write method here to set returned url to main database as "imageUrl" and pageId as snapshot
//           //Setting firebaseUrl reponse to property
//           this.fireBaseImageUrl = item.payload.val().imageUrl;

//           return item.payload.val();
//         });
//         this.setFireBaseUrlToImageUrl();
//       });
//   }

//   setFireBaseUrlToImageUrl() {
//     this.webContentService
//       .postUploadedImage(this.fireBaseImageUrl)
//       .subscribe((data) => {});

//     //Now we need to create a form to post to db
//   }

//   openStyleSettings(textId: string) {
//     console.log('opened page settings.');

//     this.router.navigate(['/style-settings/' + textId]);
//   }
// }
