import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomTextService } from 'src/app/services/custom-text.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-text-modal',
  templateUrl: './custom-text-modal.component.html',
  styleUrls: ['./custom-text-modal.component.css'],
  providers: [WebcontentService],
})
export class CustomTextModalComponent implements OnInit {
  closeResult = '';
  public fileToUpload: File = null;

  constructor(
    private modalService: NgbModal,
    public customTextService: CustomTextService,
    public customPageComponent: CustomPageComponent,
    public webContentService: WebcontentService
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
    imageUrl: new FormControl(''),
    pageId: new FormControl(''),
  });

  ngOnInit(): void {}
}
