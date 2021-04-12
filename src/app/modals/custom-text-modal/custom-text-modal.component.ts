import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Console } from 'console';
import { ActivatedRoute } from '@angular/router';
import { CustomImageService } from 'src/app/services/custom-image.service';
import { Webcontent } from 'src/app/WebContent/webcontent.model';
import { UserService } from 'src/app/services/user.service';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { DefaultTemplateService } from 'src/app/services/default-template.service';
import { WebStructureService } from 'src/app/web-structure.service';

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
  resizeButtonToggled: boolean = false;

  constructor(
    private modalService: NgbModal,
    public customTextService: CustomTextService,
    public customPageComponent: CustomPageComponent,
    public webContentService: WebcontentService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    public customImageService: CustomImageService,
    public userService: UserService,
    public toastr: ToastrService,
    public defaultTemplateService: DefaultTemplateService,
    public webStructureService: WebStructureService
  ) {}

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = ``;
        },
        (reason) => {
          this.closeResult = ``;
        }
      );
  }

  openContentEditor(contentEditor) {
    this.modalService
      .open(contentEditor, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = ``;
        },
        (reason) => {
          this.closeResult = ``;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return '';
    } else reason === ModalDismissReasons.BACKDROP_CLICK;
    return '';
  }

  ngOnInit(): void {
    this.resetForm();
    this.grabAllContentByPageId();
  }

  grabAllContentByPageId() {
    console.log('custom-text-modal: grabAllContentByPageId');
    this.webStructureService.getRequests++;
    this.webContentService.pageIdSnapshot = +this.route.snapshot.paramMap.get(
      'pageId'
    );

    this.customImageService
      .getWebContentByPageId(this.webContentService.pageIdSnapshot)
      .subscribe((res: Webcontent[]) => {
        this.webContentService.webContentArray = res;
      });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  onImageSubmit(Image: File) {
    this.webContentService.postFile(this.fileToUpload).subscribe((data) => {});
  }

  formTemplate = new FormGroup({
    imageUrl: new FormControl('', Validators.required),
    pageId: new FormControl(''),
    backgroundImage: new FormControl(''),
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

  deleteDialogue(id: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.onDelete(id);
    }
  }

  onDelete(id: number) {
    this.webContentService.deleteWebPageContent(id).subscribe((res) => {
      this.grabAllContentByPageId();
      this.resetForm();
    });
    this.toastr.error('Content deleted!');
  }

  get formControls() {
    return this.formTemplate['controls'];
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

  setEditForm(id) {}

  selectItemToEdit(webContentId) {
    this.webContentService
      .getEditContentById(webContentId)
      .subscribe((res: Webcontent[]) => {
        console.log('custom-text-modal: selectItemToEdit');
        this.webStructureService.getRequests++;
        this.webContentService.webContentByIdArray = res;
      });
  }

  setToDefaultTemplate() {
    let defaultTemplate = this.defaultTemplateForm.value;
    this.defaultTemplateService
      .setDefaultTemplate(defaultTemplate)
      .subscribe((res: Webcontent[]) => {
        this.defaultTemplateService.defaultTemplateArray = res;
      });
  }

  defaultTemplateForm = new FormGroup({
    PageId: new FormControl(''),
  });
}
