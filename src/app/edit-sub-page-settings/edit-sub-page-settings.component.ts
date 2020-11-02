import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subpage } from '../models/subpage.model';
import { SubpageService } from '../services/subpage.service';

@Component({
  selector: 'app-edit-sub-page-settings',
  templateUrl: './edit-sub-page-settings.component.html',
  styleUrls: ['./edit-sub-page-settings.component.css'],
})
export class EditSubPageSettingsComponent implements OnInit {
  pageDescription: string;
  pageId: number;

  selectedDescription;
  constructor(
    public subPageService: SubpageService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit() {
    this.grabPageIdInfo();
    this.getSubPagesByPageId();
  }

  navToSubPage(subPageId: number, subPageDescription: string) {
    this.router.navigate([
      'customPage/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/' +
        'subPage/' +
        subPageDescription +
        '/' +
        subPageId,
    ]);
    console.log(
      'customPage/' +
        this.pageDescription +
        '/' +
        this.pageId +
        '/' +
        'subPage/' +
        subPageDescription +
        '/' +
        subPageId
    );
  }

  grabPageIdInfo() {
    this.pageDescription = this.route.snapshot.paramMap.get('pageDescription');
    console.log(this.pageDescription);
    this.pageId = Number(this.route.snapshot.paramMap.get('pageId'));
    console.log(this.pageId);
  }

  getSubPagesByPageId() {
    this.subPageService
      .getSubPagesByPageId(this.pageId)
      .subscribe((res: Subpage[]) => {
        this.subPageService.subPageByPageIdArray = res;

        console.log(this.subPageService.subPageByPageIdArray);
      });
  }

  addNewSubPage(form: FormGroup) {
    var newForm = this.subPageFormTemplate.value;

    newForm.pageId = this.pageId;
    newForm.pageDescription = this.pageDescription;

    this.subPageService.createSubPage(newForm).subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;
      this.getSubPages();
      this.toastr.success('Page created!');
      console.log(this.subPageService.subPageArray);
      this.getSubPagesByPageId();
    });
  }

  deleteDialogue(subPageId: number, subPageDescription: string) {
    if (
      confirm(
        'Are you sure you want to delete' + ' ' + subPageDescription + '?'
      )
    ) {
      this.deleteSubPage(subPageId);
    }
  }

  deleteSubPage(subPageId: number) {
    this.subPageService.deleteSubPage(subPageId).subscribe((res) => {
      this.getSubPages();
      //this.resetForm();
    });
    this.toastr.error('Page deleted!');
    this.getSubPagesByPageId();
  }

  getSubPages() {
    this.subPageService.getSubPages().subscribe((res: Subpage[]) => {
      this.subPageService.subPageArray = res;

      console.log(this.subPageService.subPageArray);
    });
  }

  subPageFormTemplate = new FormGroup({
    SubPageId: new FormControl(''),
    SubPageDescription: new FormControl(''),
    PageId: new FormControl(''),
    PageDescription: new FormControl(''),
  });

  //To submit text body data
  submitSubPageData(form: FormGroup) {
    this.addNewSubPage(form);
  }
}
