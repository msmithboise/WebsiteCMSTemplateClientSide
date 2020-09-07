import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Console } from 'console';

@Component({
  selector: 'app-custom-text-modal',
  templateUrl: './custom-text-modal.component.html',
  styleUrls: ['./custom-text-modal.component.css'],
  providers: [WebcontentService],
})
export class CustomTextModalComponent implements OnInit {
  closeResult = '';
  public fileToUpload: File = null;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  imageList: any[];
  fireBaseImageUrl: string;

  constructor(
    private modalService: NgbModal,
    public customTextService: CustomTextService,
    public customPageComponent: CustomPageComponent,
    public webContentService: WebcontentService,
    private storage: AngularFireStorage
  ) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  ngOnInit(): void {
    this.resetForm();
    // this.webContentService.getImageDetailList();
    // this.getImageDetails();
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
    console.log('here is firebaseurl property');
    console.log(this.fireBaseImageUrl);

    this.webContentService
      .postUploadedImage(this.fireBaseImageUrl)
      .subscribe((data) => {
        console.log('done!');
      });

    //Now we need to create a form to post to db
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  onImageSubmit(Image: File) {
    console.log(Image);
    this.webContentService.postFile(this.fileToUpload).subscribe((data) => {
      console.log('done!');
    });
  }

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
  });

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
              console.log("here's the finalize url");
              console.log(url);
              this.webContentService
                .postUploadedImage(url)
                .subscribe((data) => {
                  console.log('done!');
                });

              formValue['imageUrl'] = url;
              //this.webContentService.insertImageDetails(formValue);
              this.resetForm();
            });
          })
        )
        .subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      imageUrl: '',
      pageId: 0,
    });
    this.imgSrc = '/assets/placeholder.jpg';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
