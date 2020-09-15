import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { WebcontentService } from 'src/app/WebContent/webcontent.service';
import { CustomPageComponent } from 'src/app/customPage/custom-page/custom-page.component';

@Component({
  selector: 'app-edit-content-modal',
  templateUrl: './edit-content-modal.component.html',
  styleUrls: ['./edit-content-modal.component.css'],
})
export class EditContentModalComponent implements OnInit {
  closeResult = '';
  constructor(
    public modalService: NgbModal,
    public webContentService: WebcontentService,
    public customPageComponent: CustomPageComponent
  ) {}

  ngOnInit(): void {}

  openContentEditor(contentEditor) {
    this.modalService
      .open(contentEditor, { ariaLabelledBy: 'modal-basic-title' })
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
}
