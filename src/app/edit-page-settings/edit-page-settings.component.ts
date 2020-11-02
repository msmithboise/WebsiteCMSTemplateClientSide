import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomPage } from '../models/custom-page.model';
import { Subpage } from '../models/subpage.model';
import { CustomPageService } from '../services/custom-page.service';
import { SubpageService } from '../services/subpage.service';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-edit-page-settings',
  templateUrl: './edit-page-settings.component.html',
  styleUrls: ['./edit-page-settings.component.css'],
})
export class EditPageSettingsComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    public toastr: ToastrService,
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.grabAllPages();
  }

  grabAllPages() {
    this.customPageService
      .getCustomPageContent()
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
        console.log(res);
      });
  }

  addNewPage(form: NgForm) {
    this.customPageService
      .postWebPageContent(form.value)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;
        this.grabAllPages();
        this.toastr.success('Page created!');
        console.log('is this being calleD?');
      });
  }

  deleteDialogue(id: number, pageDescription: string) {
    if (
      confirm('Are you sure you want to delete' + ' ' + pageDescription + '?')
    ) {
      this.deletePage(id);
    }
  }

  doesParentContainSubPages(pageId: number) {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      console.log('array to delete');
      console.log(this.subPageService.subPageArray);
      console.log('array count');
      console.log(this.subPageService.subPageArray.length);
    });
    if (this.subPageService.subPageArray.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  deletePage(pageId: number) {
    var containsSubpages = this.doesParentContainSubPages(pageId);
    console.log('contains subpages');
    console.log(containsSubpages);

    if (containsSubpages == true) {
      this.toastr.error(
        'Cannot delete Main page before subpages are deleted.  Please delete all linked subpages and try again.'
      );
      return;
    }
    this.customPageService.deleteCustomPage(pageId).subscribe((res) => {
      this.grabAllPages();
      //this.resetForm();
    });
    this.toastr.warning('Page deleted!');
  }

  getSubPages(pageId: number, pageDescription: string) {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      console.log(this.subPageService.subPageArray);

      this.router.navigate([
        '/edit-sub-page/' + pageDescription + '/' + pageId,
      ]);
    });
  }
}
