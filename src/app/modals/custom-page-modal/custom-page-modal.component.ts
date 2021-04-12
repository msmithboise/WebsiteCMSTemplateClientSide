import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomPageService } from 'src/app/services/custom-page.service';
import { NgForm } from '@angular/forms';
import { timeStamp } from 'console';
import { CustomPage } from 'src/app/models/custom-page.model';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { SubpageService } from 'src/app/services/subpage.service';
import { WebStructureService } from 'src/app/web-structure.service';

@Component({
  selector: 'app-custom-page-modal',
  templateUrl: './custom-page-modal.component.html',
  styleUrls: ['./custom-page-modal.component.css'],
})
export class CustomPageModalComponent implements OnInit {
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    public customPageService: CustomPageService,
    public toastr: ToastrService,
    public subPageService: SubpageService,
    public webStructureService: WebStructureService
  ) {}

  ngOnInit(): void {}

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

  getSubPages() {
    this.subPageService.getSubPages().subscribe((res) => {});
    console.log('custom-page-modal: getSubPages');
    this.webStructureService.getRequests++;
  }

  addNewPage(form: NgForm) {
    this.customPageService
      .postWebPageContent(form.value)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
      });
    this.toastr.success('Page created!');
  }

  deleteDialogue(id: number, pageDescription: string) {
    if (
      confirm('Are you sure you want to delete' + ' ' + pageDescription + '?')
    ) {
      this.deletePage(id);
    }
  }

  deletePage(pageId: number) {
    this.customPageService.deleteCustomPage(pageId).subscribe((res) => {
      this.customPageService.getCustomPageContent();
      //this.resetForm();
    });
    this.toastr.error('Page deleted!');
  }
}
