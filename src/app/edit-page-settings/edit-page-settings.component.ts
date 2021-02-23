import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomPage } from '../models/custom-page.model';
import { Subpage } from '../models/subpage.model';
import { NullPageGuardService } from '../null-page-guard.service';
import { CustomPageService } from '../services/custom-page.service';
import { SubpageService } from '../services/subpage.service';
import { WebStructureService } from '../web-structure.service';
import { WebcontentService } from '../WebContent/webcontent.service';

@Component({
  selector: 'app-edit-page-settings',
  templateUrl: './edit-page-settings.component.html',
  styleUrls: ['./edit-page-settings.component.css'],
})
export class EditPageSettingsComponent implements OnInit {
  public isChecked: boolean;
  public isPagePublished: boolean;
  constructor(
    public customPageService: CustomPageService,
    public toastr: ToastrService,
    public subPageService: SubpageService,
    public webContentService: WebcontentService,
    public webStructureService: WebStructureService,
    public nullPageGuardService: NullPageGuardService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.grabAllPages();
  }

  grabAllPages() {
    this.customPageService.getCustomPageContent();
  }

  onChange(isChecked: boolean) {
    this.isChecked = isChecked;

    if (this.isChecked) {
      this.isPagePublished = true;
      console.log('isPagePublished: ', this.isPagePublished);
    } else {
      this.isPagePublished = false;
      console.log('isPagePublished: ', this.isPagePublished);
    }
  }

  addNewPage(form: NgForm) {
    form.value.ClientUrl = this.nullPageGuardService.grabUrl();

    if (this.isChecked) {
      form.value.IsPublished = true;
    } else {
      form.value.IsPublished = false;
    }

    console.log(
      'true home in custompageservice: ',
      this.customPageService.trueHomeId
    );

    this.customPageService
      .postWebPageContent(form.value)
      .subscribe((res: CustomPage[]) => {
        this.customPageService.customPageArray = res;

        this.grabAllPages();
        location.reload();
        this.toastr.success('Page created!');
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
    });

    if (this.subPageService.subPageArray != null) {
      if (this.subPageService.subPageArray.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  deletePage(pageId: number) {
    var containsSubpages = this.doesParentContainSubPages(pageId);
    var index = this.customPageService.pageNumArray.indexOf(pageId);

    this.customPageService.pageNumArray.splice(index, 1);

    // if (containsSubpages == true) {
    //   this.toastr.error(
    //     'Cannot delete Main page before subpages are deleted.  Please delete all linked subpages and try again.'
    //   );
    //   return;
    // }
    this.customPageService.deleteCustomPage(pageId).subscribe((res) => {
      this.grabAllPages();
    });
    this.toastr.warning('Page deleted!');
  }

  getSubPages(pageId: number, pageDescription: string) {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      this.router.navigate([
        '/edit-sub-page/' + pageDescription + '/' + pageId,
      ]);
    });
  }
}
