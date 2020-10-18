import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomPage } from '../models/custom-page.model';
import { CustomPageService } from '../services/custom-page.service';
import { SubpageService } from '../services/subpage.service';

@Component({
  selector: 'app-edit-page-settings',
  templateUrl: './edit-page-settings.component.html',
  styleUrls: ['./edit-page-settings.component.css'],
})
export class EditPageSettingsComponent implements OnInit {
  constructor(
    public customPageService: CustomPageService,
    public toastr: ToastrService,
    public subPageService: SubpageService
  ) {}

  ngOnInit(): void {
    this.grabAllPages();
  }

  // grabAllUserData() {
  //   this.userService.getUserData().subscribe((res: User[]) => {
  //     this.userService.userArray = res;

  //     // console.log('Here is the images based on page id: ');
  //     // console.log(this.imagesByPageIdArray);
  //   });
  // }

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

  getSubPages() {
    this.subPageService.getSubPages().subscribe((res) => {
      console.log(res);
    });
  }
}
