import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { NgForm } from '@angular/forms';
import { timeStamp } from 'console';
import { CustomPage } from 'src/app/models/custom-page.model';

@Component({
  selector: 'app-custom-page-modal',
  templateUrl: './custom-page-modal.component.html',
  styleUrls: ['./custom-page-modal.component.css'],
})
export class CustomPageModalComponent implements OnInit {
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    public customPageService: CustomPageService
  ) {}

  ngOnInit(): void {}

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

  addNewPage(form: NgForm) {
    console.log('here is the page submit form:');
    console.log(form);

    this.customPageService
      .postWebPageContent(form.value)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
  }

  deletePage(pageId: number) {
    this.customPageService.deleteCustomPage(pageId).subscribe((res) => {
      this.customPageService.getCustomPageContent();
      //this.resetForm();
    });
  }
}
